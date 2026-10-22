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
    image?: string;
    secondaryImage?: string;
    secondaryTitle?: string;
  };
  gallery: {
    title: string;
    caption: string;
    image?: string;
  }[];
};

export const experienceData: ExperienceDetail[] = [
  {
    slug: "yantra-3-project-demonstration-1st-place",
    title: "1st Place Winner, Project Demonstration — Koshi Yantra 3.0",
    category: "Achievement",
    organization: "Robotics Association of Nepal - EAST",
    roleOrAward: "1st Position Winner (NPR 20,000 Cash Prize)",
    date: "18–19 Falgun 2081 B.S.",
    location: "Fujisan Sagarmatha School, Itahari-19",
    summary: "Won 1st place and NPR 20,000 cash prize in the national Project Demonstration competition at Koshi Yantra 3.0 with our group project: an offline voice-controlled smart automation system featuring master-client architecture, voice talk-back, and walking robotic motion.",
    about: "In the Project Demonstration exhibition at Koshi Yantra 3.0 ('Biggest Robotics Festival in Koshi Province'), presented by Robotics Association of Nepal - EAST at Fujisan Sagarmatha Boarding School, Itahari-19, Bhawanipur, our engineering group showcased a distributed smart automation and interactive robotics system. Built with a decentralized master node and client node, the system allows users to control household appliances entirely through offline voice recognition — operating with zero reliance on cloud services or internet connectivity. For lifelike engagement, the robot talks back with audio confirmation and features synchronized physical motion, including left/right orientation and walking locomotion. The project earned 1st place alongside a cash prize of NPR 20,000.",
    worksDone: [
      "Architected a decentralized master-client wireless network linking central voice processing to distributed appliance switching nodes",
      "Implemented edge offline speech recognition to enable private, low-latency device control without internet dependency",
      "Integrated two-way audio talk-back feedback confirming user instructions and reporting appliance status",
      "Constructed mechanical linkages and servo/motor kinematics for coordinated left/right rotation and walking locomotion",
      "Delivered live competitive demonstration rounds to technical judges and industry evaluators"
    ],
    skillsGained: ["Offline Voice Recognition", "Distributed Master-Client IoT", "Robotic Kinematics & Locomotion", "Embedded Systems", "Live Technical Demonstration"],
    certificate: {
      title: "Certificate of Achievement — First Position in Project Demonstration",
      issuer: "Robotics Association of Nepal - EAST & Koshi Yantra 3.0 Committee",
      award: "1st Position Winner · NPR 20,000 Cash Prize",
      date: "18–19 Falgun 2081 B.S.",
      verificationNote: "Officially awarded First Position in the Project Demonstration competition at Koshi Yantra 3.0 for exceptional engineering in offline voice automation and interactive robotic motion.",
      image: "/images/certificates/koshi-yantra-project-demo.jpg",
    },
    gallery: [
      {
        title: "Official 1st Position Certificate of Achievement",
        caption: "Certificate of Achievement for securing First Position in Project Demonstration at Koshi Yantra 3.0.",
        image: "/images/certificates/koshi-yantra-project-demo.jpg",
      },
      {
        title: "Master & Client Offline Voice Demo",
        caption: "Live demonstration of offline voice recognition controlling client devices with real-time audio talk-back.",
      },
      {
        title: "Locomotion & Walking Mechanism",
        caption: "Calibrating the interactive robotic node's left-right directional turning and walking locomotion.",
      }
    ]
  },
  {
    slug: "robo-soccer-semi-finalist",
    title: "Semi-Finalist & Participation, Robo Soccer — Koshi Yantra 3.0",
    category: "Achievement",
    organization: "Robotics Association of Nepal - EAST",
    roleOrAward: "Robo Soccer Semi-Finalist & Participant",
    date: "18–19 Falgun 2081 B.S.",
    location: "Fujisan Sagarmatha School, Itahari-19",
    summary: "Qualified through rigorous tournament knockout stages to the semi-finals in the Robo Soccer championship at Koshi Yantra 3.0 with a custom low-profile ball-handling robot.",
    about: "The Robo Soccer Championship at Koshi Yantra 3.0, organized by Robotics Association of Nepal - EAST at Fujisan Sagarmatha Boarding School, Itahari-19, put speed, steering accuracy, and ball control to the test on an indoor competition pitch. Nishant designed an agile, low-ground-clearance differential drive bot outfitted with a front ball-retention scoop and sprint boost circuitry. The robot advanced through preliminary qualifiers and quarter-finals with clean sweep match scores, reaching the tournament semi-finals.",
    worksDone: [
      "Tuned micro-gear motor torque curves using PWM to balance sprint speed with ball dribbling stability",
      "Constructed a high-traction rubber wheel setup for aggressive acceleration on tournament turf",
      "Integrated emergency fail-safe stops to comply with tournament safety regulations",
      "Executed offensive passing and ball interception strategies against formidable opponent teams"
    ],
    skillsGained: ["High-speed RF Remote Control", "PWM Motor Control", "Mechanical Traction Optimization", "Tournament Strategy"],
    certificate: {
      title: "Certificate of Participation — Robo Soccer",
      issuer: "Robotics Association of Nepal - EAST (Koshi Yantra 3.0)",
      award: "Semi-Finalist & Participation Certificate",
      date: "18–19 Falgun 2081 B.S.",
      verificationNote: "Awarded with Certificate of Participation, recognizing enthusiasm, dedication, and technical robotics skills while advancing to the semi-finals in the Robo Soccer competition.",
      image: "/images/certificates/koshi-yantra-robo-soccer.jpg",
    },
    gallery: [
      {
        title: "Official Robo Soccer Certificate",
        caption: "Certificate of Participation presented by Robotics Association of Nepal - EAST at Koshi Yantra 3.0.",
        image: "/images/certificates/koshi-yantra-robo-soccer.jpg",
      },
      {
        title: "Robo Soccer Pitch Match",
        caption: "Scoring an offensive goal past the opponent keeper robot during quarter-finals.",
      },
      {
        title: "Bot Front Scoop Inspection",
        caption: "Fine-tuning the ball collector geometry and steering angle on the practice pitch.",
      }
    ]
  },
  {
    slug: "obstacle-avoiding-car-workshop",
    title: "Obstacle Avoiding Car Workshop",
    category: "Certification",
    organization: "Shikshadeep B.S.S., Biratnagar",
    roleOrAward: "Workshop Participant & Builder",
    date: "20–27 Magh 2081 B.S.",
    location: "Biratnagar-9, Morang, Nepal",
    summary: "Completed a week-long intensive hands-on robotics workshop at Shikshadeep B.S.S., building and programming an autonomous obstacle-avoiding mobile car with ultrasonic sensor scanning and motor driver kinematics.",
    about: "Organized at Shikshadeep Boarding Secondary School in Biratnagar-9, Morang, this week-long hands-on engineering workshop immersed students in autonomous mobile robotics. Nishant participated while studying in Class XII, wiring HC-SR04 ultrasonic sensors, mounting micro-servos for rotational path-scanning, interfacing dual H-bridge motor drivers, and tuning autonomous collision avoidance firmware in C++. The certificate of participation was officially awarded in the presence of Chief Minister Hon. Hikmat Kumar Karki and Chairman Bhim Parajuli.",
    worksDone: [
      "Constructed differential-drive 4WD robotic chassis with ultrasonic distance sensor mounting",
      "Programmed autonomous obstacle-detection algorithms with dynamic servo-panning clearance calculation",
      "Tuned motor PWM velocity curves and pivot turning maneuvers to navigate confined obstacles",
      "Presented working autonomous car prototypes during final workshop demonstrations"
    ],
    skillsGained: ["Autonomous Robotics", "Ultrasonic Sensor Ranging", "Microcontroller Interfacing", "Motor Driver Circuitry", "C++ Embedded Logic"],
    certificate: {
      title: "Certificate of Participation — Obstacle Avoiding Car Workshop",
      issuer: "Shikshadeep Boarding Secondary School, Biratnagar",
      date: "2081-10-20 to 2081-10-27 B.S.",
      award: "Workshop Participant & Hardware Builder",
      verificationNote: "Awarded by Chief Minister of Koshi Province Hon. Hikmat Kumar Karki, Chairman Bhim Parajuli, and Principal Gyan Bahadur Khadka.",
      image: "/images/certificates/obstacle-avoiding-car-workshop.jpg",
    },
    gallery: [
      {
        title: "Official Workshop Certificate",
        caption: "Certificate of Participation awarded by Hon. Chief Minister Hikmat Kumar Karki and Shikshadeep B.S.S. leadership.",
        image: "/images/certificates/obstacle-avoiding-car-workshop.jpg",
      }
    ]
  },
  {
    slug: "astronomy-satellite-rocket-workshop",
    title: "Astronomy, Satellite & Rocket Science Workshop",
    category: "Certification",
    organization: "Shikshadeep B.S.S. & The Squad of Changemakers",
    roleOrAward: "Active Workshop Participant",
    date: "27 Mangsir – 2 Poush 2080 B.S.",
    location: "Biratnagar, Nepal",
    summary: "Participated in specialized astronomy, satellite telemetry, and rocket science workshop exploring celestial mechanics, satellite communication principles, and amateur rocketry.",
    about: "Conducted over six intensive days at Shikshadeep Boarding Secondary School in collaboration with The Squad of Changemakers, this workshop introduced participants to practical astrophysics, satellite orbital dynamics, radio telemetry tracking, and rocket propulsion mechanics. Nishant engaged in hands-on model rocketry builds, trajectory calculations, and satellite sensor payload discussions.",
    worksDone: [
      "Studied orbital mechanics, satellite telemetry bands, and ground-station signal reception principles",
      "Participated in miniature rocket assembly, stability fin alignment, and propellant physics labs",
      "Analyzed atmospheric sensing payloads and telemetry transmission for cubesat architectures",
      "Collaborated in team aerospace design reviews and flight-trajectory modeling"
    ],
    skillsGained: ["Aerospace Fundamentals", "Satellite Telemetry Principles", "Model Rocket Dynamics", "Atmospheric Sensing", "Scientific Collaboration"],
    certificate: {
      title: "Certificate of Participation — Astronomy / Satellite / Rocket Science Workshop",
      issuer: "Shikshadeep B.S.S. & The Squad of Changemakers",
      date: "27th Mangsir to 2nd Poush 2080 B.S.",
      award: "Active Workshop Participant Certification",
      verificationNote: "Officially awarded by Chairman Sushil Dev Bhattarai (The Squad of Changemakers), Principal Gyan Bahadur Khadka, and Chairman Bhim Parajuli.",
      image: "/images/certificates/astronomy-satellite-rocket-workshop.jpg",
    },
    gallery: [
      {
        title: "Official Workshop Certificate",
        caption: "Certificate of Participation in Astronomy, Satellite & Rocket Science Workshop at Shikshadeep B.S.S.",
        image: "/images/certificates/astronomy-satellite-rocket-workshop.jpg",
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
