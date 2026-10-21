export type ProjectCertificate = {
  title: string;
  issuer: string;
  award?: string;
  date?: string;
  note?: string;
};

export type ProjectGalleryItem = {
  title: string;
  caption: string;
  image?: string;
  aspect?: string;
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  semester?: string;
  description: string;
  detailedDescription: string;
  tags: string[];
  status?: "In progress" | "Completed";
  repo?: string;
  demo?: string;
  features: string[];
  hardware?: string[];
  software?: string[];
  certificate?: ProjectCertificate;
  gallery: ProjectGalleryItem[];
};

export const projects: Project[] = [
  {
    slug: "advanced-home-automation-system",
    title: "Advanced Home Automation System using ESP32",
    category: "IoT & Embedded",
    semester: "2nd Semester Project",
    status: "Completed",
    description: "A fully local ESP32-based home automation system — control four appliances over Wi-Fi through a browser, with DHT22-driven automatic fan control and real-time LCD status feedback. No cloud, no app, no subscription.",
    detailedDescription: "Designed and built during the 2nd semester of Computer Engineering at Kathmandu University. The ESP32 hosts an HTTP web server directly on the local Wi-Fi network, allowing any browser-connected device to toggle four relays and monitor appliance states in real time. A DHT22 sensor continuously reads temperature; when it crosses a configurable threshold, the fan relay switches on automatically without any user intervention. A 1602 I2C LCD mounted on the board displays live appliance status at a glance — no phone required. All control stays entirely on the local network with no dependence on third-party cloud services, external apps, or paid subscriptions.",
    tags: ["ESP32", "C/C++", "IoT", "HTTP", "Wi-Fi", "I2C", "DHT22", "Relay", "LCD", "2nd Sem"],
    repo: "https://github.com/Nishant-Sah/Home_Automation_with_ESP32",
    features: [
      "Web-based control of four appliances over Wi-Fi from any browser on the local network",
      "DHT22 temperature sensor with configurable threshold for automatic fan relay switching",
      "1602 I2C LCD displaying real-time appliance status without needing a phone or app",
      "Fully local architecture — no cloud services, third-party apps, or subscriptions required",
      "HTTP server hosted directly on the ESP32 serving a custom HTML/CSS control interface",
      "I2C communication between ESP32 and LCD for clean, minimal wiring"
    ],
    hardware: [
      "ESP32 Dev Module (Wi-Fi + GPIO)",
      "4-Channel 5V Relay Module (appliance switching)",
      "DHT22 Temperature & Humidity Sensor",
      "1602 I2C LCD Display",
      "Power supply & connecting wires"
    ],
    software: ["Embedded C/C++ (Arduino Framework)", "HTML/CSS (web control interface)", "Wi-Fi (802.11 b/g/n)", "HTTP", "I2C protocol"],
    gallery: [
      {
        title: "ESP32 Hardware Setup",
        caption: "ESP32 wired to the 4-channel relay module, DHT22 sensor, and 1602 I2C LCD on a local test bench."
      },
      {
        title: "Browser Control Interface",
        caption: "Custom HTML/CSS page served by the ESP32 — toggle four appliances from any browser on the local Wi-Fi network."
      },
      {
        title: "Auto Fan Control & LCD Feedback",
        caption: "DHT22 triggers the fan relay when temperature exceeds the set threshold; the LCD shows live appliance states."
      }
    ]
  },

  {
    slug: "offline-voice-automation-system",
    title: "Offline Voice Automation & Interactive Robotic Node",
    category: "IoT & Robotics",
    semester: "Group Innovation Project",
    status: "Completed",
    description: "1st Prize winner in Project Demonstration — an offline voice-controlled smart automation system built by our group with master-client nodes, voice talk-back, and directional walking motion.",
    detailedDescription: "Developed as a group engineering project and awarded 1st Place in the Project Demonstration competition (NPR 20,000 Cash Prize). The project implements a smart home automation architecture using a master node and client node to control appliances entirely via voice commands offline — with zero reliance on cloud or internet. The system actively talks back with voice feedback to confirm user commands and features physical robotic interaction, including left/right head/body rotation and walking motion.",
    tags: ["Offline Voice", "Master-Client", "Home Automation", "Robotics", "1st Prize", "Embedded C++", "IoT"],
    certificate: {
      title: "1st Prize Winner — Project Demonstration",
      issuer: "Yantra 3.0 Robotics & Innovation Festival",
      award: "1st Place (NPR 20,000 Cash Prize) — Project Demonstration",
      date: "2026",
      note: "Awarded 1st place in project demonstration for our group's offline voice-controlled master-client automation, two-way voice talk-back, and interactive walking motion."
    },
    features: [
      "Master node and client node distributed network for multi-room appliance control",
      "100% offline edge speech recognition — control devices by voice with zero internet or cloud dependence",
      "Interactive voice talk-back audio feedback confirming commands and reporting live status",
      "Synchronized physical robotic motion with left/right directional orientation and walking locomotion",
      "Low-latency wireless node-to-node telemetry linking master voice controller to client modules",
      "Multi-channel relay module for safe electrical switching of household loads"
    ],
    hardware: [
      "Master Processing Controller Node",
      "Offline Speech Recognition Hardware Unit",
      "Wireless Client Node (ESP32/RF)",
      "Multi-Channel Relay Module",
      "Audio Amplifier & Speaker System (Voice Talk-Back)",
      "Servo & Motor Kinematics Assembly (Walking & Left/Right Motion)"
    ],
    software: [
      "Embedded C++",
      "Offline Voice Command Processing Engine",
      "Master-Client Wireless Communication Protocol",
      "Audio Feedback & Voice Prompt Playback System",
      "Kinematic Motor Control for Walking and Directional Motion"
    ],
    gallery: [
      {
        title: "Master & Client Node Setup",
        caption: "Master controller with offline voice recognition communicating wirelessly with the client node to switch appliances."
      },
      {
        title: "Voice Talk-Back & Motion Mechanism",
        caption: "Integrated audio amplifier for voice responses and motorized walking/directional movement mechanism."
      },
      {
        title: "1st Prize Project Demonstration Award",
        caption: "Official 1st Prize recognition and NPR 20,000 award in the Project Demonstration competition."
      }
    ]
  },

  {
    slug: "robo-soccer-bot",
    title: "Robo Soccer Bot",
    category: "Robotics",
    semester: "Competition Robotics",
    status: "Completed",
    description: "A high-speed competition robot engineered for robo-soccer tournaments, tuned for agility, swift torque response, and competitive ball control.",
    detailedDescription: "Engineered specifically for competitive robo-soccer arenas where agility, low ground clearance, and instant acceleration determine victory. Built using dual high-RPM planetary metal gear motors, heavy-duty motor drivers, custom chassis reinforcement, and low-latency wireless radio control. Advanced through tournament preliminary rounds and reached the semi-finals in competitive play.",
    tags: ["Robotics", "Motor Drivers", "High Torque", "RF Control", "Competition"],
    certificate: {
      title: "Robo Soccer Semi-Finalist Recognition",
      issuer: "Robotics Association of Nepal (Yantra 3.0)",
      award: "Semi-Finalist",
      date: "2026",
      note: "Awarded with participation certificate, responsive ball control, and advancing to the semi-finals in the Robo Soccer tournament."
    },
    features: [
      "Custom low-profile chassis with center-of-gravity optimization for anti-topple stability",
      "High-current motor driver circuit capable of delivering peak bursts without overheating",
      "Low-latency 2.4GHz radio frequency transceiver control with dual joysticks",
      "Durable ball-dribbling and guide scoop designed to maintain control under contact"
    ],
    hardware: ["High-RPM Metal Gear DC Motors", "High-Amp Dual Motor Driver", "2.4GHz RF Transceiver", "LiPo 3S Battery Pack", "Custom Reinforced Acrylic/Aluminum Frame"],
    software: ["Embedded C++", "PWM Motor Curve Tuning", "Fail-safe Radio Signal Handler"],
    gallery: [
      {
        title: "Robo Soccer Bot Arena Stance",
        caption: "Low-clearance combat-ready chassis with optimized front ball-scoop geometry."
      },
      {
        title: "Drivetrain & High-Torque Motors",
        caption: "Dual geared motor configuration configured for high-speed counter-rotations and sprint bursts."
      },
      {
        title: "Tournament Semi-Finalist Certificate",
        caption: "Official participation certificate and semi-finalist recognition from Robotics Association of Nepal (Yantra 3.0)."
      }
    ]
  },
  {
    slug: "cattle-health-tracker",
    title: "Cattle Health Tracker",
    category: "IoT & Assistive",
    semester: "IoT Solutions",
    status: "Completed",
    description: "Sensor-based monitoring device for livestock health, enabling early detection of illnesses, body temperature anomalies, and activity tracking.",
    detailedDescription: "Livestock health is critical for rural agriculture and veterinary care. The Cattle Health Tracker is a wearable, non-invasive telemetry unit designed to gather physiological signals from livestock. It continuously records body temperature, movement activity, and pulse trends, alerting farm caretakers when abnormal signatures indicate fever, stress, or estrus.",
    tags: ["Sensors", "Monitoring", "ESP32", "Livestock Tech", "Alerts"],
    repo: "https://github.com/Nishant-Sah/Cattle-Health-Tracker",
    features: [
      "Continuous non-invasive temperature and biometric telemetry",
      "Accelerometer-based activity tracking to detect lethargy or restlessness",
      "Wireless telemetry transmission to local farm receiver node",
      "Energy-conserving sleep cycle firmware for multi-day battery life"
    ],
    hardware: ["Microcontroller Node", "Contact Temperature Sensor (DS18B20)", "MPU6050 Accelerometer", "Wireless Transceiver", "Rechargeable Lithium Battery"],
    software: ["Arduino C++", "Data Filtering & Anomaly Detection Algorithm", "SMS / Web Alert Trigger"],
    gallery: [
      {
        title: "Wearable Sensor Module Prototype",
        caption: "Compact sensor enclosure designed with weather-resistant sealing for livestock collar mounting."
      },
      {
        title: "Telemetry Data Stream",
        caption: "Time-series logging of cattle body temperatures and movement intensity."
      }
    ]
  },
  {
    slug: "smart-blind-stick",
    title: "Smart Blind Stick",
    category: "Assistive Tech",
    semester: "Social Impact Project",
    status: "Completed",
    description: "An assistive navigation stick for visually impaired individuals that detects obstacles in multiple zones and issues audio/haptic alerts.",
    detailedDescription: "Designed with empathy and accessibility at its core, this electronic mobility cane enhances safety for visually impaired people. Using an array of ultrasonic distance sensors positioned at varying angles, it detects both ground obstacles and knee-to-waist hazards that traditional canes miss, translating obstacle proximity into intuitive haptic buzzer vibrations.",
    tags: ["Arduino", "Ultrasonic", "Assistive Tech", "Haptics", "Sensors"],
    repo: "https://github.com/Nishant-Sah/Smart-Blind-Stick",
    features: [
      "Multi-angle ultrasonic obstacle detection covering forward and ground planes",
      "Proportional haptic vibration feedback that intensifies as obstacles approach",
      "Acoustic buzzer tone patterns for water/puddle and elevation change detection",
      "Lightweight ergonomic mounting with minimal power consumption"
    ],
    hardware: ["Arduino Nano", "HC-SR04 Ultrasonic Sensors", "Vibration Motor Module", "Piezo Buzzer", "9V / Lithium Power Pack"],
    software: ["C++", "Ping Timing & Multi-Zone Distance Algorithms"],
    gallery: [
      {
        title: "Cane Sensor Array Assembly",
        caption: "Dual ultrasonic transducers positioned for forward detection and downward terrain sensing."
      },
      {
        title: "Haptic Feedback & Grip Unit",
        caption: "Integrated vibration motor and buzzer alerting system embedded inside the cane handle."
      }
    ]
  },
  {
    slug: "bluetooth-controlled-robot",
    title: "Bluetooth Controlled Robot",
    category: "Robotics",
    semester: "Robotics Prototyping",
    status: "Completed",
    description: "A maneuverable mobile robot driven wirelessly from a smartphone over Bluetooth with custom command parsing and directional steering.",
    detailedDescription: "A wireless differential-drive mobile robot controlled via an Android smartphone over an HC-05 Bluetooth serial link. Features bi-directional motor control with PWM speed throttling, emergency safety stop on signal loss, and instant response steering for navigation across tight corners.",
    tags: ["Bluetooth", "Arduino", "Motor Control", "Mobile App", "Robotics"],
    repo: "https://github.com/Nishant-Sah/Bluetooth-Controlled-Robot",
    features: [
      "Wireless serial communication pairing via HC-05 / HC-06 Bluetooth module",
      "PWM-based 4-wheel differential drive for smooth acceleration and pivot turning",
      "Automatic fail-safe stop trigger if the Bluetooth connection drops",
      "Custom command packet protocol for directional control and speed modes"
    ],
    hardware: ["Arduino Uno", "HC-05 Bluetooth Module", "L298N Motor Driver", "BO Gear Motors", "Chassis with Rubber Wheels", "Battery Bank"],
    software: ["Embedded C++", "UART Serial Protocol Handler", "Android Controller App"],
    gallery: [
      {
        title: "Robot Chassis & Electronics",
        caption: "Wired microcontroller, motor driver, and wireless Bluetooth receiver on 4WD platform."
      },
      {
        title: "Mobile App Control Testing",
        caption: "Bluetooth serial terminal and touch joystick interface paired to the robot."
      }
    ]
  },
  {
    slug: "obstacle-avoidance-robot",
    title: "Obstacle Avoidance Robot",
    category: "Robotics",
    semester: "Autonomous Robotics",
    status: "Completed",
    description: "An autonomous wheeled robot that navigates unfamiliar environments using ultrasonic distance ranging and servo-swept path decisions.",
    detailedDescription: "An autonomous mobile robot designed to explore indoor environments without human intervention. Mounted with an ultrasonic sensor on a sweeping micro-servo, the robot scans its surroundings when detecting an obstacle ahead, evaluates clearance paths to the left and right, and executes autonomous avoidance turns.",
    tags: ["Arduino", "Ultrasonic", "Servo Motor", "L298N", "Autonomous"],
    repo: "https://github.com/Nishant-Sah/Obstacle-Avoidance-Robot",
    features: [
      "Active 180-degree servo panning to measure situational clearances before turning",
      "Autonomous path-decision algorithm picking the widest open avenue",
      "Collision avoidance thresholding with reverse and pivot escape sequences",
      "High-grip rubber wheels and dual motor differential drive"
    ],
    hardware: ["Arduino Uno", "HC-SR04 Ultrasonic Sensor", "SG90 Micro Servo", "L298N Dual H-Bridge", "Gear Motors & Swivel Caster"],
    software: ["Arduino C++", "Servo Sweep & Ranging Logic", "Differential Steering Routines"],
    gallery: [
      {
        title: "Servo & Ultrasonic Sensor Head",
        caption: "Front-mounted scanning assembly that rotates dynamically to detect path clearance."
      },
      {
        title: "Navigation Test Run",
        caption: "Autonomous obstacle avoidance and path planning through indoor labyrinth tests."
      }
    ]
  },
  {
    slug: "u-turn-robot",
    title: "U-Turn Robot",
    category: "Robotics",
    semester: "Kinematics & Movement",
    status: "Completed",
    description: "A precision navigation robot programmed to execute calibrated 180-degree U-turns using accurate motor timing and obstacle feedback.",
    detailedDescription: "Constructed to study precise robotic kinematics and turning geometry. When encountering dead-ends or designated boundary markers, the U-Turn robot computes the required rotational arc and differential wheel velocity to execute a tight, controlled 180-degree maneuver without drifting off-course.",
    tags: ["Motors", "Sensors", "Kinematics", "Arduino", "Robotics"],
    repo: "https://github.com/Nishant-Sah/U-Turn-Robot",
    features: [
      "Calibrated differential pivot kinematics for exact 180-degree reversals",
      "Front bumper / distance sensor trigger detecting boundary limits",
      "Counter-rotating wheel torque distribution for minimal turning radius",
      "Reproducible trajectory repeatability on varied surfaces"
    ],
    hardware: ["Arduino Microcontroller", "Precision Geared DC Motors", "Motor Driver Circuit", "Infrared / Ultrasonic Boundary Detectors", "Chassis"],
    software: ["C++", "Kinematic Velocity & Rotation Calibration Algorithm"],
    gallery: [
      {
        title: "Pivot Steering Mechanism",
        caption: "Wheel balance and center-of-rotation layout tuned for zero-radius turning."
      },
      {
        title: "Trajectory Testing Track",
        caption: "Precision measurement test measuring turning angle repeatability across multiple runs."
      }
    ]
  },
  {
    slug: "e-commerce-website",
    title: "E-commerce Website",
    category: "Web Development",
    semester: "Software Project",
    status: "In progress",
    description: "A modern, full-featured online storefront built with clean component architecture, responsive product browsing, and cart management.",
    detailedDescription: "A full-stack oriented web application currently under active development. Features an interactive product catalog with category filtering, real-time search, responsive shopping cart with local persistence, and clean, accessible user interface components.",
    tags: ["HTML", "CSS", "JavaScript", "Web", "Full Stack"],
    features: [
      "Responsive mobile-first storefront layout",
      "Dynamic product filtering and multi-category sorting",
      "Client-side shopping cart with instant checkout calculation",
      "Modern dark/light aesthetic and accessible keyboard navigation"
    ],
    hardware: ["Cloud Server / Localhost"],
    software: ["HTML5", "CSS3 / Modern Layouts", "JavaScript / TypeScript", "LocalStorage API"],
    gallery: [
      {
        title: "Storefront UI Design",
        caption: "Modern product cards with instant hover previews and cart toggles."
      }
    ]
  },
  {
    slug: "smart-irrigation-system",
    title: "Smart Irrigation System",
    category: "Agriculture & IoT",
    semester: "Green Tech",
    status: "Completed",
    description: "Automated precision agriculture system that monitors soil moisture and regulates water pumping to conserve water and optimize plant health.",
    detailedDescription: "An intelligent irrigation controller designed for agricultural efficiency. By reading capacitive soil moisture and temperature levels, the system automatically activates low-voltage water pump relays only when soil moisture drops below calibrated thresholds, preventing over-watering and conserving resources.",
    tags: ["Arduino", "Sensors", "Agriculture", "Automation"],
    features: [
      "Continuous soil moisture sensing with calibrated dry/wet thresholds",
      "Automated submersible pump relay control with safety run-time limits",
      "Visual status indicators and manual override toggle",
      "Reduces water waste by up to 40% compared to scheduled timers"
    ],
    hardware: ["Arduino Uno", "Capacitive Soil Moisture Sensor", "Submersible 5V/12V Pump", "Relay Switch", "Water Level Float Sensor"],
    software: ["Arduino C++", "Hysteresis Sensor Filter"],
    gallery: [
      {
        title: "Field Deployment Test",
        caption: "Soil probe and relay pumping system installed in a potted test bed."
      }
    ]
  },
  {
    slug: "lpg-gas-temperature-detection",
    title: "LPG Gas & Temperature Detection",
    category: "Safety & IoT",
    semester: "Industrial Safety",
    status: "Completed",
    description: "Safety alarm system that detects flammable gas concentrations and ambient heat, initiating immediate audible and visual alarms.",
    detailedDescription: "A life-safety system designed for kitchens and commercial workshops. It monitors air quality for combustible hydrocarbon gases (LPG, propane, methane) and elevated temperatures. Upon detecting hazardous thresholds, it sounds a loud buzzer, flashes warning LEDs, and can trigger an exhaust fan or shutoff solenoid.",
    tags: ["Sensors", "Alerts", "Safety", "Arduino"],
    features: [
      "High-sensitivity gas detection tuned for liquefied petroleum gas (LPG)",
      "Dual threshold evaluation for gas parts-per-million and temperature",
      "Immediate loud audible buzzer and flashing emergency status LEDs",
      "Optional relay output for automatic exhaust ventilation"
    ],
    hardware: ["MQ-5 / MQ-2 Gas Sensor", "LM35 Temperature Sensor", "Arduino Controller", "Piezo Alarm Siren", "Indicator LEDs"],
    software: ["Embedded C++", "Analog Gas Curve Calibration Algorithm"],
    gallery: [
      {
        title: "Safety Sensor Test Unit",
        caption: "Gas sensor calibration bench with alarm indicator LEDs and test gas release."
      }
    ]
  },
  {
    slug: "line-following-robot",
    title: "Line Following Robot",
    category: "Robotics",
    semester: "Industrial Automation",
    status: "Completed",
    description: "An automated guided robot that traces complex floor tracks using an array of infrared reflectance sensors and PID-style correction.",
    detailedDescription: "Engineered to demonstrate automated guided vehicle (AGV) concepts used in smart warehouses. It uses an infrared reflectance sensor bar to detect high-contrast tracks on the floor. An embedded control loop constantly adjusts left and right motor velocities to maintain smooth, high-speed tracking through sharp corners and intersections.",
    tags: ["IR Sensors", "Microcontroller", "PID Control", "Robotics"],
    features: [
      "Multi-channel infrared reflectance sensor array",
      "Fast differential motor steering for sharp 90-degree bend tracking",
      "Calibrated black-on-white and white-on-black surface detection",
      "Smooth curve following with minimal oscillation"
    ],
    hardware: ["TCRT5000 IR Sensor Array", "Arduino Nano", "Micro Metal Gear Motors", "Motor Shield", "Lightweight LiPo Battery"],
    software: ["C++", "Line Position Estimation & Motor Differential Control"],
    gallery: [
      {
        title: "Infrared Sensor Underside Array",
        caption: "Bottom-mounted IR emitters and phototransistors reading track reflectivity."
      }
    ]
  },
  {
    slug: "smart-dustbin",
    title: "Smart Dustbin",
    category: "Automation",
    semester: "Clean Tech",
    status: "Completed",
    description: "A touchless hygiene dustbin that automatically lifts its lid using ultrasonic proximity detection and servo actuation.",
    detailedDescription: "Built to promote public and domestic hygiene. The bin senses hands or trash approaching within 20 cm using an ultrasonic ranger, smoothly actuates a servo motor to open the lid, waits for 4 seconds, and closes automatically without requiring any physical contact.",
    tags: ["Arduino", "Sensors", "Servo", "Hygiene Automation"],
    features: [
      "Contactless hygienic operation preventing surface germ transmission",
      "Smooth servo-driven lid mechanism with soft-close timing",
      "Low idle standby power consumption for prolonged battery runtime",
      "False-trigger rejection logic for casual passer-by movements"
    ],
    hardware: ["Arduino Controller", "HC-SR04 Distance Sensor", "SG90 Metal Gear Servo", "Battery Pack"],
    software: ["Arduino C++", "Timer Delays & Debounce Routine"],
    gallery: [
      {
        title: "Lid Actuator Mechanism",
        caption: "Servo arm linkage engineered to lift bin lid smoothly without mechanical stress."
      }
    ]
  },
  {
    slug: "mini-weather-monitoring-station",
    title: "Mini Weather Monitoring Station",
    category: "IoT",
    semester: "Atmospheric Sensing",
    status: "Completed",
    description: "A compact meteorological unit that measures ambient temperature, relative humidity, and heat index, outputting to a digital display.",
    detailedDescription: "A self-contained desktop weather station designed for local ambient observation. Gathers high-accuracy humidity and thermal readings, calculates perceived heat index, and formats data cleanly onto a local backlit I2C screen with periodic trend updates.",
    tags: ["IoT", "Sensors", "I2C Display", "Weather"],
    features: [
      "Real-time ambient temperature and humidity tracking",
      "Accurate NOAA heat index calculation algorithm",
      "I2C liquid crystal display with custom weather icons",
      "Compact desktop form factor"
    ],
    hardware: ["Arduino Nano", "DHT22 Precision Sensor", "16x2 I2C Character Display", "Power Adapter"],
    software: ["Arduino C++", "Heat Index Formulas", "LiquidCrystal_I2C Library"],
    gallery: [
      {
        title: "Desktop Weather Station",
        caption: "Enclosed weather module showing live Celsius, humidity percentage, and comfort rating."
      }
    ]
  }
];

