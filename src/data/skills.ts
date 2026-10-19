export type Skill = { name: string; note?: string };

export const skillGroups: { title: string; items: Skill[] }[] = [
  { title: "Programming & web", items: [{ name: "C++" }, { name: "C" }, { name: "HTML & CSS" }, { name: "Data structures & algorithms", note: "learning" }, { name: "E-commerce website", note: "building" }, { name: "Git & GitHub", note: "basics" }] },
  { title: "Hardware & robotics", items: [{ name: "Arduino" }, { name: "NodeMCU ESP8266/32" }, { name: "IoT systems" }, { name: "Sensor interfacing" }, { name: "Embedded systems", note: "basics" }, { name: "Robotics prototyping" }] },
  { title: "AI, tools & cloud", items: [{ name: "NVIDIA Jetson Nano", note: "basics" }, { name: "Isaac Sim", note: "basics" }, { name: "Docker", note: "fundamentals" }, { name: "Linux", note: "basics" }, { name: "Cloud", note: "fundamentals" }, { name: "AI/ML", note: "basics" }] },
];

export const experience = [
  { title: "STEM & Robotics Trainer", detail: "Trained roughly 200-300 students through school visits and STEM outreach in robotics and basic electronics." },
  { title: "Associate Event Manager, ROBO WAR", detail: "Coordinated logistics and on-ground operations at Aavishkar'26, organized by the Kathmandu University Robotics Club." },
  { title: "Communities", detail: "Active member of Neura Innovation; associated with Beyond Academia and Robo Nepal." },
];

export const achievements = [
  "1st place, Yantra 3.0 robotics competition (NPR 20,000 prize)",
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
