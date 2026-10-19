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
    slug: "yantra-3-robotics-championship",
    title: "1st Place Winner, Yantra 3.0 Robotics Championship",
    category: "Achievement",
    organization: "Robotics Association of Nepal & Kathmandu University",
    roleOrAward: "1st Place Winner (NPR 20,000 Cash Prize)",
    date: "2026",
    location: "Kathmandu, Nepal",
    summary: "Secured first position and cash prize in the prestigious Yantra 3.0 robotics championship competing against top engineering institutions across Nepal.",
    about: "Yantra is one of Nepal's premiere annual robotics symposiums and arena combat competitions. Nishant's robotics team designed, assembled, and calibrated a custom high-performance arena robot built for agility, aggressive torque delivery, and tactical maneuvering. Through intense knockout heats and high-pressure tactical showdowns, our build remained resilient and clinched the 1st place championship trophy and a cash prize of NPR 20,000.",
    worksDone: [
      "Engineered reinforced chassis and high-torque dual-drive powertrain from raw metal components",
      "Calibrated real-time wireless 2.4GHz RF communication for zero-latency operator control",
      "Conducted arena impact simulations and rapid field repairs under strict tournament timeouts",
      "Strategized match offensive/defensive driving maneuvers during quarter, semi, and final rounds"
    ],
    skillsGained: ["Robotics Hardware Architecture", "Arena Combat Kinematics", "Rapid Circuit Troubleshooting", "Competitive Team Leadership"],
    certificate: {
      title: "1st Place Championship Trophy & Award Certificate",
      issuer: "Robotics Association of Nepal (RAN) & Yantra Committee",
      award: "1st Place Winner · NPR 20,000 Cash Prize",
      date: "2026",
      verificationNote: "Officially awarded for exceptional robot engineering and championship victory in the Yantra 3.0 Robotics Tournament."
    },
    gallery: [
      {
        title: "Championship Trophy & Award Presentation",
        caption: "Receiving the 1st Place Trophy and NPR 20,000 prize certificate on the main stage."
      },
      {
        title: "Arena Combat Match In Progress",
        caption: "Tactical positioning and rapid maneuvering during the intense championship final round."
      },
      {
        title: "Pit Crew & Robot Calibration",
        caption: "Pre-match voltage testing, motor driver tuning, and battery swaps between tournament heats."
      }
    ]
  },
  {
    slug: "robo-soccer-semi-finalist",
    title: "Semi-Finalist, Robo Soccer Championship",
    category: "Achievement",
    organization: "Kathmandu University Robotics Club & Regional Arenas",
    roleOrAward: "Semi-Finalist Trophy",
    date: "2026",
    location: "Dhulikhel, Nepal",
    summary: "Qualified through rigorous league stages to the semi-finals in the national Robo Soccer tournament with a custom low-profile ball-handling robot.",
    about: "The Robo Soccer Championship puts speed, steering accuracy, and ball control to the test on a custom carpet pitch. Nishant designed an agile, low-ground-clearance differential drive bot outfitted with a front ball-retention scoop and sprint boost circuitry. The robot advanced through preliminary qualifiers and quarter-finals with clean sweep match scores, reaching the tournament semi-finals.",
    worksDone: [
      "Tuned micro-gear motor torque curves using PWM to balance sprint speed with ball dribbling stability",
      "Constructed a high-traction rubber wheel setup for aggressive acceleration on tournament turf",
      "Integrated emergency fail-safe stops to comply with tournament safety regulations",
      "Executed offensive passing and ball interception strategies against formidable opponent teams"
    ],
    skillsGained: ["High-speed RF Remote Control", "PWM Motor Control", "Mechanical Traction Optimization", "Tournament Strategy"],
    certificate: {
      title: "Robo Soccer Semi-Finalist Certificate of Excellence",
      issuer: "Kathmandu University Robotics Club (KURC)",
      award: "Semi-Finalist Recognition",
      date: "2026",
      verificationNote: "Awarded in recognition of outstanding athletic robot performance and advancing to the semi-finals."
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
