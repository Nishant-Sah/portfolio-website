// High-Fidelity Procedural Bomb & Explosion Sound Engine (Web Audio API)
// Synthesizes realistic ordnance shockwaves, seismic blast sub-drops,
// expanding fireball noise, ground debris, and stereophonic rolling canyon echoes.

const KEY = "sound-muted";
const MASTER_VOLUME = 0.85;

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let compressor: DynamicsCompressorNode | null = null;
let reverbConvolver: ConvolverNode | null = null;
let reverbGain: GainNode | null = null;
let echoInput: GainNode | null = null;

// Pre-computed audio buffers
let brownNoiseBuf: AudioBuffer | null = null;
let pinkNoiseBuf: AudioBuffer | null = null;
let shrapnelBuf: AudioBuffer | null = null;
let distortionCurve: Float32Array | null = null;

let muted = false;
const subscribers = new Set<() => void>();

if (typeof window !== "undefined") {
  try {
    muted = window.localStorage.getItem(KEY) === "1";
  } catch {
    muted = false;
  }
}

const rnd = (min: number, max: number) => min + Math.random() * (max - min);
const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val));

// Non-linear tape/tube saturation curve for explosive punch without harsh digital clipping
function getDistortionCurve(k = 32): Float32Array {
  if (distortionCurve) return distortionCurve;
  const n = 2048;
  const curve = new Float32Array(n);
  const deg = Math.PI / 180;
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / n - 1;
    curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
  }
  distortionCurve = curve;
  return curve;
}

// Generate organic Brownian noise (1/f^2) - deep rumble, tectonic blast body, no harsh hiss
function createBrownNoise(c: AudioContext, seconds = 3.5): AudioBuffer {
  const sr = c.sampleRate;
  const len = Math.floor(sr * seconds);
  const buf = c.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let last = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.024 * white) / 1.024;
      d[i] = last * 3.6;
    }
  }
  return buf;
}

// Generate organic Pink noise (1/f) - fireball roar and mid air-blast displacement
function createPinkNoise(c: AudioContext, seconds = 3.5): AudioBuffer {
  const sr = c.sampleRate;
  const len = Math.floor(sr * seconds);
  const buf = c.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.12;
      b6 = white * 0.115926;
    }
  }
  return buf;
}

// Generate granular shockwave shrapnel & soil scatter buffer
function createShrapnelNoise(c: AudioContext, seconds = 2.0): AudioBuffer {
  const sr = c.sampleRate;
  const len = Math.floor(sr * seconds);
  const buf = c.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) {
      // Poisson crackle pulses simulating airborne gravel, dirt and shrapnel
      const isPulse = Math.random() < 0.012;
      d[i] = isPulse ? (Math.random() * 2 - 1) * Math.pow(Math.random(), 2) * 1.5 : (Math.random() * 2 - 1) * 0.03;
    }
  }
  return buf;
}

// Generate realistic open-air canyon / landscape impulse response for bomb reverberation
function createBombReverbBuffer(c: AudioContext, seconds = 4.0): AudioBuffer {
  const sr = c.sampleRate;
  const len = Math.floor(sr * seconds);
  const buf = c.createBuffer(2, len, sr);
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch);
    let lp = 0;
    for (let i = 0; i < len; i++) {
      const k = i / len;
      const noise = Math.random() * 2 - 1;
      // High frequencies absorb quickly over long atmospheric distances
      lp += (noise - lp) * Math.max(0.03, 0.42 * (1 - k * 0.85));
      const decay = Math.pow(1 - k, 2.4);
      d[i] = lp * decay * 0.7;
    }
    // Discrete terrain reflections (ground slap, hills, distant mountains)
    const reflections = [
      { t: 0.038, g: 0.75 },
      { t: 0.082, g: -0.55 },
      { t: 0.155, g: 0.45 },
      { t: 0.290, g: -0.38 },
      { t: 0.490, g: 0.32 },
      { t: 0.780, g: -0.24 },
      { t: 1.180, g: 0.18 },
      { t: 1.750, g: -0.12 },
    ];
    reflections.forEach(({ t, g }) => {
      const idx = Math.floor(t * sr) + ch * 19;
      if (idx < len) {
        d[idx] += g * (ch === 0 ? 1 : 0.88);
      }
    });
  }
  return buf;
}

function ensure(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (ctx) return ctx;
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;

  const c = new AC();

  // Master brickwall dynamics compressor & limiter for thunderous bomb punch
  compressor = c.createDynamicsCompressor();
  compressor.threshold.setValueAtTime(-14, c.currentTime);
  compressor.knee.setValueAtTime(8, c.currentTime);
  compressor.ratio.setValueAtTime(8, c.currentTime);
  compressor.attack.setValueAtTime(0.002, c.currentTime);
  compressor.release.setValueAtTime(0.28, c.currentTime);

  masterGain = c.createGain();
  masterGain.gain.setValueAtTime(muted ? 0 : MASTER_VOLUME, c.currentTime);
  masterGain.connect(compressor);
  compressor.connect(c.destination);

  // Generate noise buffers
  brownNoiseBuf = createBrownNoise(c, 4.0);
  pinkNoiseBuf = createPinkNoise(c, 4.0);
  shrapnelBuf = createShrapnelNoise(c, 2.5);

  // Open-air massive blast reverb convolver
  reverbConvolver = c.createConvolver();
  reverbConvolver.buffer = createBombReverbBuffer(c, 4.2);
  reverbGain = c.createGain();
  reverbGain.gain.setValueAtTime(0.65, c.currentTime);
  reverbConvolver.connect(reverbGain);
  reverbGain.connect(masterGain);

  // Multi-Tap Rolling Blast Echo Network
  // Mimics realistic bomb echoes bouncing off horizon ridges, canyons, and buildings
  echoInput = c.createGain();
  echoInput.gain.setValueAtTime(1.0, c.currentTime);

  const echoOutGain = c.createGain();
  echoOutGain.gain.setValueAtTime(0.62, c.currentTime);
  echoOutGain.connect(masterGain);

  // Tap 1: Immediate blast slapback (left)
  const delay1 = c.createDelay(1.5);
  delay1.delayTime.setValueAtTime(0.16, c.currentTime);
  const filter1 = c.createBiquadFilter();
  filter1.type = "lowpass";
  filter1.frequency.setValueAtTime(1400, c.currentTime);
  const panner1 = c.createStereoPanner();
  panner1.pan.setValueAtTime(-0.45, c.currentTime);

  // Tap 2: Secondary terrain bounce (right)
  const delay2 = c.createDelay(2.0);
  delay2.delayTime.setValueAtTime(0.34, c.currentTime);
  const filter2 = c.createBiquadFilter();
  filter2.type = "lowpass";
  filter2.frequency.setValueAtTime(950, c.currentTime);
  const panner2 = c.createStereoPanner();
  panner2.pan.setValueAtTime(0.5, c.currentTime);

  // Tap 3: Rolling distant thunder reflection (center-left)
  const delay3 = c.createDelay(2.5);
  delay3.delayTime.setValueAtTime(0.62, c.currentTime);
  const filter3 = c.createBiquadFilter();
  filter3.type = "lowpass";
  filter3.frequency.setValueAtTime(620, c.currentTime);
  const panner3 = c.createStereoPanner();
  panner3.pan.setValueAtTime(-0.25, c.currentTime);

  // Tap 4: Deep horizon rumble return with feedback (cross-delayed)
  const delay4 = c.createDelay(3.0);
  delay4.delayTime.setValueAtTime(0.98, c.currentTime);
  const filter4 = c.createBiquadFilter();
  filter4.type = "lowpass";
  filter4.frequency.setValueAtTime(380, c.currentTime);
  const panner4 = c.createStereoPanner();
  panner4.pan.setValueAtTime(0.2, c.currentTime);

  // Echo feedback loop with low-pass damping (each rolling echo gets darker & rumblier)
  const echoFeedback = c.createGain();
  echoFeedback.gain.setValueAtTime(0.44, c.currentTime);

  echoInput.connect(delay1);
  delay1.connect(filter1);
  filter1.connect(panner1);
  panner1.connect(echoOutGain);

  echoInput.connect(delay2);
  delay2.connect(filter2);
  filter2.connect(panner2);
  panner2.connect(echoOutGain);

  filter1.connect(delay3);
  delay3.connect(filter3);
  filter3.connect(panner3);
  panner3.connect(echoOutGain);

  filter2.connect(delay4);
  delay4.connect(filter4);
  filter4.connect(panner4);
  panner4.connect(echoOutGain);

  // Cross feedback from tap 4 back into tap 2 for long rolling thunder tail
  filter4.connect(echoFeedback);
  echoFeedback.connect(delay2);

  ctx = c;
  return c;
}

function live(): AudioContext | null {
  const c = ensure();
  if (!c) return null;
  if (c.state === "suspended") {
    void c.resume();
  }
  return !muted ? c : null;
}

// Spatial & FX routing helper
function routeSignal(
  c: AudioContext,
  src: AudioNode,
  pan = 0,
  wetRev = 0.45,
  wetEcho = 0.5
) {
  if (!masterGain) return;
  const panner = c.createStereoPanner();
  panner.pan.setValueAtTime(clamp(pan, -0.9, 0.9), c.currentTime);
  src.connect(panner);

  // Direct dry/main send
  panner.connect(masterGain);

  // Reverb send
  if (wetRev > 0 && reverbConvolver) {
    const revSend = c.createGain();
    revSend.gain.setValueAtTime(wetRev, c.currentTime);
    panner.connect(revSend);
    revSend.connect(reverbConvolver);
  }

  // Rolling echo send
  if (wetEcho > 0 && echoInput) {
    const echoSend = c.createGain();
    echoSend.gain.setValueAtTime(wetEcho, c.currentTime);
    panner.connect(echoSend);
    echoSend.connect(echoInput);
  }
}

// High-impact sub-bass drop / detonation pulse
function synthSubDrop(
  c: AudioContext,
  startFreq: number,
  endFreq: number,
  duration: number,
  peakGain: number,
  startTime: number,
  pan: number,
  drive = true,
  wetRev = 0.5,
  wetEcho = 0.4
) {
  const osc = c.createOscillator();
  const oscSub = c.createOscillator();
  const gain = c.createGain();

  osc.type = "sine";
  oscSub.type = "triangle";

  // Rapid pitch plunge for that heavy explosive shock punch
  const plungeTime = Math.min(0.065, duration * 0.15);
  osc.frequency.setValueAtTime(startFreq, startTime);
  osc.frequency.exponentialRampToValueAtTime(endFreq * 1.5, startTime + plungeTime);
  osc.frequency.exponentialRampToValueAtTime(endFreq, startTime + duration);

  oscSub.frequency.setValueAtTime(startFreq * 0.75, startTime);
  oscSub.frequency.exponentialRampToValueAtTime(endFreq, startTime + plungeTime);
  oscSub.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq * 0.7), startTime + duration);

  // Envelope
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(peakGain, startTime + 0.003);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  if (drive) {
    const shaper = c.createWaveShaper();
    shaper.curve = getDistortionCurve(45) as Float32Array<ArrayBuffer>;
    shaper.oversample = "2x";
    osc.connect(shaper);
    oscSub.connect(shaper);
    shaper.connect(gain);
  } else {
    osc.connect(gain);
    oscSub.connect(gain);
  }

  routeSignal(c, gain, pan, wetRev, wetEcho);
  osc.start(startTime);
  oscSub.start(startTime);
  osc.stop(startTime + duration + 0.05);
  oscSub.stop(startTime + duration + 0.05);
}

// Synthesize filtered blast noise (fireball roar, supersonic snap, debris)
function synthBlastNoise(
  c: AudioContext,
  buf: AudioBuffer,
  filterType: BiquadFilterType,
  fStart: number,
  fEnd: number,
  duration: number,
  peakGain: number,
  startTime: number,
  pan: number,
  q = 1.4,
  attack = 0.003,
  wetRev = 0.55,
  wetEcho = 0.5
) {
  const src = c.createBufferSource();
  src.buffer = buf;

  const filter = c.createBiquadFilter();
  filter.type = filterType;
  filter.Q.setValueAtTime(q, startTime);
  filter.frequency.setValueAtTime(fStart, startTime);
  filter.frequency.exponentialRampToValueAtTime(Math.max(25, fEnd), startTime + duration * 0.85);

  const gain = c.createGain();
  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(peakGain, startTime + attack);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  src.connect(filter);
  filter.connect(gain);
  routeSignal(c, gain, pan, wetRev, wetEcho);

  src.start(startTime, rnd(0, 1.0));
  src.stop(startTime + duration + 0.05);
}

export const sfx = {
  unlock: () => {
    const c = ensure();
    if (c && c.state === "suspended") void c.resume();
  },

  // Incoming Falling Bomb / Projectile Descending Air Whistle
  whoosh: (pan = 0) => {
    const c = live();
    if (!c || !pinkNoiseBuf) return;
    const t = c.currentTime;

    // Slicing incoming air friction
    synthBlastNoise(
      c,
      pinkNoiseBuf,
      "bandpass",
      2600,
      340,
      0.46,
      0.24,
      t,
      pan,
      2.8,
      0.08,
      0.3,
      0.15
    );

    // Whistling falling projectile tone
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(780, t);
    osc.frequency.exponentialRampToValueAtTime(260, t + 0.44);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.12, t + 0.32);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.46);

    osc.connect(gain);
    routeSignal(c, gain, pan, 0.25, 0.15);
    osc.start(t);
    osc.stop(t + 0.5);
  },

  // Realistic Multi-Layer Bomb Explosion with Rolling Echo
  impact: (power = 1.0, pan = 0, index = 0, total = 11) => {
    const c = live();
    if (!c || !brownNoiseBuf || !pinkNoiseBuf || !shrapnelBuf) return;

    const t = c.currentTime;
    const p = clamp(power, 0.6, 1.7);
    const progress = index / Math.max(1, total - 1);
    const pitchDetune = rnd(0.96, 1.04);

    // 1. Supersonic Detonation Crack (The instant sharp shockwave snap)
    synthBlastNoise(
      c,
      pinkNoiseBuf,
      "highpass",
      2400,
      1200,
      0.045,
      0.75 * p,
      t,
      pan,
      1.2,
      0.001,
      0.3,
      0.2
    );

    // Instant detonation shock click
    const clickOsc = c.createOscillator();
    const clickGain = c.createGain();
    clickOsc.type = "triangle";
    clickOsc.frequency.setValueAtTime(380 * pitchDetune, t);
    clickOsc.frequency.exponentialRampToValueAtTime(50, t + 0.025);
    clickGain.gain.setValueAtTime(0.6 * p, t);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.025);
    clickOsc.connect(clickGain);
    routeSignal(c, clickGain, pan, 0.2, 0.1);
    clickOsc.start(t);
    clickOsc.stop(t + 0.03);

    // 2. Heavy Sub-Bass Bomb Detonation (The visceral chest-thumping shockwave)
    const baseFreq = (95 + progress * 24) * pitchDetune;
    synthSubDrop(
      c,
      baseFreq * 2.2,
      32,
      1.15,
      0.95 * p,
      t,
      pan,
      true,
      0.55,
      0.5
    );

    // 3. Fireball & Violent Air Displacement (Brown Noise explosive roar)
    synthBlastNoise(
      c,
      brownNoiseBuf,
      "lowpass",
      2800,
      75,
      1.4,
      0.9 * p,
      t,
      pan,
      2.4,
      0.004,
      0.65,
      0.58
    );

    // 4. Mid-Frequency Shockwave Crunch (air displacement body)
    synthBlastNoise(
      c,
      pinkNoiseBuf,
      "bandpass",
      480,
      160,
      0.65,
      0.55 * p,
      t,
      pan,
      1.8,
      0.006,
      0.5,
      0.45
    );

    // 5. Airborne Dirt & Shrapnel Scatter (granular crater debris)
    synthBlastNoise(
      c,
      shrapnelBuf,
      "bandpass",
      1200,
      380,
      0.8,
      0.4 * p,
      t + 0.015,
      pan,
      1.5,
      0.02,
      0.45,
      0.4
    );

    // 6. Deep Rolling Horizon Thunder Echo (delayed secondary reflection)
    const echoDelay = rnd(0.12, 0.2);
    synthBlastNoise(
      c,
      brownNoiseBuf,
      "lowpass",
      650,
      55,
      1.6,
      0.45 * p,
      t + echoDelay,
      -pan * 0.7,
      1.8,
      0.03,
      0.75,
      0.6
    );
  },

  // Massive MOAB Tactical Bomb Finale (Climax detonation when all letters strike)
  finale: () => {
    const c = live();
    if (!c || !brownNoiseBuf || !pinkNoiseBuf || !shrapnelBuf) return;

    const t = c.currentTime + 0.02;

    // 1. Massive Supersonic Detonation Crack
    synthBlastNoise(c, pinkNoiseBuf, "highpass", 1800, 800, 0.09, 1.1, t, 0, 1.2, 0.001, 0.45, 0.4);

    // 2. Colossal Seismic Sub-Drop (plunges down to 22Hz with long ground vibration)
    synthSubDrop(c, 240, 24, 3.2, 1.2, t, 0, true, 0.7, 0.65);
    synthSubDrop(c, 160, 36, 1.8, 0.75, t, 0, true, 0.6, 0.5);

    // 3. Expanding MOAB Fireball Roar (Stereo Wide Brown Noise blast)
    synthBlastNoise(c, brownNoiseBuf, "lowpass", 3800, 50, 2.8, 1.1, t, -0.3, 2.6, 0.003, 0.75, 0.65);
    synthBlastNoise(c, brownNoiseBuf, "lowpass", 3200, 55, 2.8, 1.0, t + 0.015, 0.35, 2.5, 0.004, 0.75, 0.65);

    // 4. Ground Ejection & Shockwave Crunch
    synthBlastNoise(c, pinkNoiseBuf, "bandpass", 620, 120, 1.4, 0.7, t, 0, 2.0, 0.005, 0.6, 0.55);
    synthBlastNoise(c, shrapnelBuf, "bandpass", 1600, 280, 1.6, 0.55, t + 0.025, 0, 1.4, 0.03, 0.6, 0.5);

    // 5. Long Horizon Rolling Blast Echo Wave (bounces back and forth for 3+ seconds)
    [0.22, 0.55, 0.98, 1.55].forEach((delay, i) => {
      const panSide = i % 2 === 0 ? -0.6 : 0.6;
      synthBlastNoise(
        c,
        brownNoiseBuf!,
        "lowpass",
        550 - i * 80,
        45,
        2.2,
        0.55 * Math.pow(0.72, i),
        t + delay,
        panSide,
        2.0,
        0.05,
        0.85,
        0.7
      );
    });
  },

  // Atmospheric Pre-Drop Tension Drone
  intro: () => {
    const c = live();
    if (!c || !brownNoiseBuf) return;
    const t = c.currentTime;

    // Distant horizon warning rumble
    synthBlastNoise(c, brownNoiseBuf, "lowpass", 260, 120, 2.8, 0.45, t, 0, 2.0, 0.4, 0.55, 0.4);

    // Deep sub harmonic drone
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(46, t);
    osc.frequency.linearRampToValueAtTime(58, t + 2.5);

    const lpf = c.createBiquadFilter();
    lpf.type = "lowpass";
    lpf.frequency.setValueAtTime(140, t);

    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(0.25, t + 1.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 2.8);

    osc.connect(lpf);
    lpf.connect(gain);
    routeSignal(c, gain, 0, 0.4, 0.3);
    osc.start(t);
    osc.stop(t + 2.9);
  },

  isMuted: () => muted,
  setMuted: (v: boolean) => {
    muted = v;
    try {
      window.localStorage.setItem(KEY, v ? "1" : "0");
    } catch {
      muted = v;
    }
    if (masterGain && ctx) {
      masterGain.gain.setTargetAtTime(v ? 0 : MASTER_VOLUME, ctx.currentTime, 0.05);
    }
    subscribers.forEach((cb) => cb());
  },
  subscribe: (cb: () => void) => {
    subscribers.add(cb);
    return () => {
      subscribers.delete(cb);
    };
  },
};
