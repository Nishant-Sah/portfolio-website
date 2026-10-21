export type ExperienceDetail = {
  slug: string;
  title: string;
  category: "Experience" | "Achievement" | "Certification";
  organization: string;
  roleOrAward: string;
  date: string;
  location?: string;
  summary: string;
  about: string;
  worksDone: string[];
  skillsGained: string[];
  certificate?: {
    title: string;
    issuer: string;
    date?: string;
    award?: string;
    verificationNote?: string;
  };
  gallery: {
    title: string;
    caption: string;
  }[];
};

export const experienceData: ExperienceDetail[] = [
  {
    slug: "yantra-3-project-demonstration-1st-place",
    title: "1st Place Winner, Project Demonstration — Yantra 3.0",
    category: "Achievement",
    organization: "Robotics Association of Nepal & Yantra Committee",
    roleOrAward: "1st Place Winner (NPR 20,000 Cash Prize)",
    date: "2026",
    location: "Kathmandu, Nepal",
    summary: "Won 1st place and NPR 20,000 cash prize in the national Project Demonstration competition with our group project: an offline voice-controlled smart automation system featuring master-client architecture, voice talk-back, and walking robotic motion.",
    about: "In the Project Demonstration exhibition at Yantra 3.0, Nepal's premiere national robotics and innovation symposium, our engineering group showcased a distributed smart automation and interactive robotics system. Built with a decentralized master node and client node, the system allows users to control household appliances entirely through offline voice recognition — operating with zero reliance on cloud services or internet connectivity. For lifelike engagement, the robot talks back with audio confirmation and features synchronized physical motion, including left/right orientation and walking locomotion. The project earned 1st place among top engineering institutions across Nepal alongside a cash prize of NPR 20,000.",
    worksDone: [
      "Architected a decentralized master-client wireless network linking central voice processing to distributed appliance switching nodes",
      "Implemented edge offline speech recognition to enable private, low-latency device control without internet dependency",
      "Integrated two-way audio talk-back feedback confirming user instructions and reporting appliance status",
      "Constructed mechanical linkages and servo/motor kinematics for coordinated left/right rotation and walking locomotion",
      "Delivered live competitive demonstration rounds to technical judges and industry evaluators"
    ],
    skillsGained: ["Offline Voice Recognition", "Distributed Master-Client IoT", "Robotic Kinematics & Locomotion", "Embedded Systems", "Live Technical Demonstration"],
    certificate: {
      title: "1st Place Award Certificate — Project Demonstration",
      issuer: "Robotics Association of Nepal (RAN) & Yantra 3.0 Committee",
      award: "1st Place Winner · NPR 20,000 Cash Prize",
      date: "2026",
      verificationNote: "Officially awarded 1st place in the Project Demonstration competition at Yantra 3.0 for exceptional engineering in offline voice automation and interactive robotic motion."
    },
    gallery: [
      {
        title: "1st Place Trophy & Award Presentation",
        caption: "Receiving the 1st Place Trophy and NPR 20,000 cash prize certificate on the Yantra 3.0 main stage."
      },
      {
        title: "Master & Client Offline Voice Demo",
        caption: "Live demonstration of offline voice recognition controlling client devices with real-time audio talk-back."
      },
      {
        title: "Locomotion & Walking Mechanism",
        caption: "Calibrating the interactive robotic node's left-right directional turning and walking locomotion."
      }
    ]
  },
  {
    slug: "robo-soccer-semi-finalist",
    title: "Semi-Finalist, Robo Soccer Championship",
    category: "Achievement",
    organization: "Robotics Association of Nepal (Yantra 3.0)",
    roleOrAward: "Semi-Finalist Recognition",
    date: "2026",
    location: "Kathmandu, Nepal",
    summary: "Qualified through rigorous league stages to the semi-finals in the national Robo Soccer tournament at Yantra 3.0 with a custom low-profile ball-handling robot.",
    about: "The Robo Soccer Championship at Yantra 3.0 puts speed, steering accuracy, and ball control to the test on a custom pitch. Nishant designed an agile, low-ground-clearance differential drive bot outfitted with a front ball-retention scoop and sprint boost circuitry. The robot advanced through preliminary qualifiers and quarter-finals with clean sweep match scores, reaching the tournament semi-finals.",
    worksDone: [
      "Tuned micro-gear motor torque curves using PWM to balance sprint speed with ball dribbling stability",
      "Constructed a high-traction rubber wheel setup for aggressive acceleration on tournament turf",
      "Integrated emergency fail-safe stops to comply with tournament safety regulations",
      "Executed offensive passing and ball interception strategies against formidable opponent teams"
    ],
    skillsGained: ["High-speed RF Remote Control", "PWM Motor Control", "Mechanical Traction Optimization", "Tournament Strategy"],
    certificate: {
      title: "Robo Soccer Semi-Finalist Recognition",
      issuer: "Robotics Association of Nepal (Yantra 3.0)",
      award: "Semi-Finalist & Participation Certificate",
      date: "2026",
      verificationNote: "Awarded with participation certificate, responsive ball control, and advancing to the semi-finals in the Robo Soccer tournament."
    },
    gallery: [
      {
        title: "Robo Soccer Pitch Match",
        caption: "Scoring an offensive goal past the opponent keeper robot during quarter-finals."
      },
      {
        title: "Bot Front Scoop Inspection",
        caption: "Fine-tuning the ball collector geometry and steering angle on the practice pitch."
      }
    ]
  },
  {
    slug: "stem-robotics-trainer",
    title: "STEM & Robotics Youth Trainer",
    category: "Experience",
    organization: "Youth STEM Nepal & Community Outreach",
    roleOrAward: "Lead Robotics Trainer",
    date: "2025 - Present",
    location: "Various Schools, Nepal",
    summary: "Mentored and trained roughly 200 to 300 secondary school students in robotics, electronics fundamentals, sensor interfacing, and Arduino programming.",
    about: "Passionate about democratizing STEM education in Nepal, Nishant has conducted hands-on robotics bootcamps and workshops across multiple schools. He designed beginner-friendly hardware kits, led interactive sessions on circuit breadboarding, taught basic C++ micro-coding, and guided young minds through building their very first autonomous line followers and obstacle avoiders.",
    worksDone: [
      "Designed hands-on curriculum spanning basic electronics, breadboard wiring, and microcontrollers",
      "Facilitated interactive labs where students built obstacle avoidance and sensor alarm projects",
      "Mentored student teams in school-level science fairs and coding exhibitions",
      "Created visual reference guides and Arduino code templates for classroom self-study"
    ],
    skillsGained: ["Technical Pedagogy & Mentorship", "Curriculum Development", "Public Speaking", "Community Engagement"],
    certificate: {
      title: "Certificate of Appreciation for Youth STEM Leadership",
      issuer: "School STEM Outreach Initiative",
      date: "2025 - 2026",
      award: "Youth Educator of the Year in Robotics",
      verificationNote: "Honored for dedicated service in training over 250 students in hands-on robotics and technology."
    },
    gallery: [
      {
        title: "Classroom Arduino Workshop",
        caption: "Guiding students through LED blinking and ultrasonic sensor wiring."
      },
      {
        title: "Student Project Exhibition Day",
        caption: "Students proudly demonstrating their obstacle avoidance cars built during the workshop."
      }
    ]
  },
  {
    slug: "robo-war-associate-manager",
    title: "Associate Event Manager, ROBO WAR (Aavishkar'26)",
    category: "Experience",
    organization: "Kathmandu University Robotics Club (KURC)",
    roleOrAward: "Associate Event Manager",
    date: "2026",
    location: "Kathmandu University, Dhulikhel",
    summary: "Coordinated arena construction, safety inspections, bracket scheduling, and live operations for the high-octane ROBO WAR event at Aavishkar'26.",
    about: "Aavishkar'26 is the premier annual technical festival organized at Kathmandu University. As the Associate Event Manager for the flagship ROBO WAR competition, Nishant was responsible for arena safety containment, team technical scrutinies (weight, weapon RPM, fail-safe cutoffs), referee match scoring, and coordinating the logistics for dozens of visiting collegiate teams.",
    worksDone: [
      "Supervised arena integrity checks and reinforced poly-carbonate containment shields",
      "Conducted rigorous technical inspections for 30+ competing bots to verify electrical safety standards",
      "Managed live tournament brackets, referee communications, and audience crowd flow",
      "Resolved emergency on-ground technical disputes with fairness and poise"
    ],
    skillsGained: ["Large-scale Event Logistics", "Technical Safety Compliance", "Team Coordination", "Crisis Resolution"],
    certificate: {
      title: "Letter of Commendation & Managerial Certificate",
      issuer: "Kathmandu University Robotics Club (KURC) & Aavishkar'26 Executive Board",
      date: "2026",
      verificationNote: "Awarded for exceptional organizational stewardship and operational execution of ROBO WAR 2026."
    },
    gallery: [
      {
        title: "ROBO WAR Arena Enclosure",
        caption: "Overseeing safety containment and combat pit readiness before tournament kickoff."
      },
      {
        title: "Technical Scrutiny Desk",
        caption: "Weighing and inspecting bot weapon mechanisms for tournament safety adherence."
      }
    ]
  },
  {
    slug: "techx-kathmandu-2026",
    title: "TechX Kathmandu 2026 Innovation Showcase",
    category: "Achievement",
    organization: "TechX Nepal",
    roleOrAward: "Invited Project Exhibitor",
    date: "2026",
    location: "Kathmandu, Nepal",
    summary: "Exhibited IoT and smart assistive hardware prototypes to industry professionals, investors, and tech leaders at TechX Kathmandu.",
    about: "TechX Kathmandu is an innovation convention bringing together engineers, tech startups, and academic researchers. Nishant presented his Smart Blind Stick and Smart Home Monitoring prototypes, engaging with visitors, collecting user feedback, and discussing scalable manufacturing opportunities.",
    worksDone: [
      "Delivered live prototype hardware demonstrations to hundreds of event attendees",
      "Presented technical pitch presentations on assistive technology and rural IoT monitoring",
      "Networked with hardware manufacturers and embedded software industry leaders"
    ],
    skillsGained: ["Technical Communication", "Product Pitching", "Feedback Iteration", "Public Demos"],
    certificate: {
      title: "Certificate of Participation & Innovation Showcase",
      issuer: "TechX Nepal Organizing Committee",
      date: "2026",
      verificationNote: "Awarded for active demonstration and exhibition of innovative hardware engineering projects."
    },
    gallery: [
      {
        title: "Hardware Exhibition Booth",
        caption: "Demonstrating the Smart Blind Stick ultrasonic haptic system to attendees."
      }
    ]
  },
  {
    slug: "nepal-scouts-community-service",
    title: "Certificate of Appreciation, Nepal Scouts Community Service",
    category: "Achievement",
    organization: "Nepal Scouts & Red Cross Nepal",
    roleOrAward: "Community Volunteer & Camp Coordinator",
    date: "Mahashivaratri 2026",
    location: "Pashupatinath, Kathmandu",
    summary: "Awarded Certificate of Appreciation for volunteer leadership, medical assistance, and organizing blood donation camps during Mahashivaratri 2026.",
    about: "During the massive Mahashivaratri gathering at Pashupatinath, Nishant volunteered with the Nepal Scouts to coordinate crowds, manage emergency first-aid stations, and facilitate a community blood donation camp that collected hundreds of pints for emergency blood banks.",
    worksDone: [
      "Organized blood donor intake and coordinated logistics with local medical teams",
      "Managed crowd safety and provided emergency guidance to pilgrims",
      "Demonstrated exemplary civic leadership and humanitarian commitment"
    ],
    skillsGained: ["Civic Responsibility", "Emergency First Response", "Crowd Management", "Humanitarian Service"],
    certificate: {
      title: "Certificate of Appreciation for Social Service",
      issuer: "Nepal Scouts National Headquarters",
      date: "2026",
      award: "Civic Service Excellence",
      verificationNote: "Official citation honoring selfless community volunteering and blood donation leadership."
    },
    gallery: [
      {
        title: "Blood Donation Camp Setup",
        caption: "Volunteering alongside medical teams during the community blood drive."
      }
    ]
  },
  {
    slug: "nvidia-edge-ai-jetson-nano",
    title: "NVIDIA Edge AI with Jetson Nano & Isaac Sim",
    category: "Certification",
    organization: "NVIDIA Deep Learning Institute (DLI) & KU NTIC",
    roleOrAward: "Certified Edge AI Developer",
    date: "2025 - 2026",
    location: "Kathmandu University NTIC",
    summary: "Certified in building robotic perception pipelines on NVIDIA Jetson Nano, simulated environments with Isaac Sim, and LLM augmentation with RAG.",
    about: "Completed intensive specialized training through NVIDIA Deep Learning Institute workshops held at Kathmandu University NTIC. Covered embedded computer vision, neural network inference on GPU Tensor Cores, photorealistic synthetic training in Isaac Sim, and Retrieval Augmented Generation (RAG) models.",
    worksDone: [
      "Deployed optimized PyTorch and TensorRT object detection models on Jetson Nano",
      "Built synthetic physics environments and differential drive robots inside NVIDIA Isaac Sim",
      "Integrated RAG pipelines with vector databases for knowledge retrieval"
    ],
    skillsGained: ["Jetson Nano Architecture", "NVIDIA Isaac Sim", "Edge AI Inference", "TensorRT", "RAG Pipelines"],
    certificate: {
      title: "NVIDIA DLI Certificate of Competency",
      issuer: "NVIDIA Deep Learning Institute (DLI)",
      date: "2025 - 2026",
      award: "Specialized Edge AI & Robotics Simulation Certification",
      verificationNote: "Official completion of 'Getting Started with Jetson Nano' and 'Building Robots in Isaac Sim'."
    },
    gallery: [
      {
        title: "Jetson Nano Testing Lab",
        caption: "Bench testing real-time camera inference and TensorRT neural networks."
      }
    ]
  }
];
