export type Skill = { name: string; shortName?: string; note?: string };

export const skillGroups: { title: string; items: Skill[] }[] = [
  {
    title: "Programming & web",
    items: [
      { name: "C++", shortName: "C++" },
      { name: "C", shortName: "C" },
      { name: "JavaScript", shortName: "JavaScript" },
      { name: "TailwindCSS", shortName: "Tailwindcss" },
      { name: "Data structures & algorithms", shortName: "DSA", note: "learning" },
      { name: "E-commerce website", shortName: "E-Commerce", note: "building" },
      { name: "Git & GitHub", shortName: "GitHub" },
    ],
  },
  {
    title: "Hardware & robotics",
    items: [
      { name: "Arduino", shortName: "Arduino" },
      { name: "NodeMCU ESP8266/32", shortName: "NodeMCU ESP32" },
      { name: "IoT systems", shortName: "IoT Systems" },
      { name: "Sensor interfacing", shortName: "Sensors" },
      { name: "Embedded systems", shortName: "Embedded" },
      { name: "Robotics prototyping", shortName: "Robotics" },
    ],
  },
  {
    title: "AI, tools & cloud",
    items: [
      { name: "NVIDIA Jetson Nano", shortName: "Jetson Nano", note: "basics" },
      { name: "Isaac Sim", shortName: "Isaac Sim", note: "basics" },
      { name: "Docker", shortName: "Docker" },
      { name: "Linux", shortName: "Linux" },
      { name: "Cloud", shortName: "Cloud", note: "fundamentals" },
      { name: "AI/ML", shortName: "AI / ML", note: "basics" },
    ],
  },
];

export const experience = [
  { title: "STEM & Robotics Trainer", detail: "Trained roughly 200-300 students through school visits and STEM outreach in robotics and basic electronics." },
  { title: "Associate Event Manager, ROBO WAR", detail: "Coordinated logistics and on-ground operations at Aavishkar'26, organized by the Kathmandu University Robotics Club." },
  { title: "Communities", detail: "Active member of Neura Innovation; associated with Beyond Academia and Robo Nepal." },
];

export const achievements = [
  "1st place in Project Demonstration, Yantra 3.0 (NPR 20,000 prize)",
  "Semi-finalist, Robo Soccer competition",
  "Participated in TechX Kathmandu 2026",
  "Certificate of Appreciation, Mahashivaratri 2026 blood donation and community service with Nepal Scouts",
];

export const certifications = [
  "NVIDIA: Getting Started with Jetson Nano",
  "NVIDIA: Building Your First Robot in Isaac Sim",
  "NVIDIA: Building A Brain in 10 Minutes",
  "NVIDIA: Augment Your LLM Using Retrieval Augmented Generation (RAG)",
  "Workshop: Edge AI with NVIDIA Jetson Nano, Kathmandu University NTIC",
];
