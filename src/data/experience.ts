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
    slug: "nvidia-edge-ai-jetson-nano",
    title: "Getting Started with AI on Jetson Nano",
    category: "Certification",
    organization: "NVIDIA Deep Learning Institute",
    roleOrAward: "Certificate of Competency",
    date: "February 24, 2026",
    location: "Online / NVIDIA Developer Programs",
    summary: "Official NVIDIA Certificate of Competency demonstrating practical mastery in building and deploying deep learning computer vision pipelines on NVIDIA Jetson Nano.",
    about: "Awarded by the NVIDIA Deep Learning Institute (DLI) upon successfully demonstrating competence in configuring, training, and running computer vision models directly on NVIDIA Jetson Nano edge developer hardware. The curriculum covered PyTorch deep learning fundamentals, dataset collection, classification and regression model training, camera pipelines, and real-time edge AI inference accelerated by CUDA and TensorRT.",
    worksDone: [
      "Configured PyTorch and Jetson Inference developer container runtime on NVIDIA Jetson Nano",
      "Trained classification and regression deep learning models using live USB/CSI camera feeds",
      "Optimized neural networks with NVIDIA TensorRT for real-time edge GPU inference",
      "Implemented automated image collection, labeling, and transfer learning workflows"
    ],
    skillsGained: ["NVIDIA Jetson Nano", "TensorRT Optimization", "PyTorch", "Computer Vision", "Edge AI Inference"],
    certificate: {
      title: "NVIDIA DLI Certificate of Competency",
      issuer: "NVIDIA Deep Learning Institute",
      date: "February 24, 2026",
      award: "Certificate of Competency (Cert ID: 6-fhOY6SSEIRkhR6h9Gp3A)",
      verificationNote: "Official NVIDIA DLI certification awarded by Will Ramey (Senior Director, Developer Programs) under Certification ID 6-fhOY6SSEIRkhR6h9Gp3A.",
      image: "/images/certificates/nvidia-ai-jetson-nano.png",
    },
    gallery: [
      {
        title: "Official NVIDIA DLI Certificate",
        caption: "Certificate of Competency in 'Getting Started with AI on Jetson Nano' (ID: 6-fhOY6SSEIRkhR6h9Gp3A) signed by Will Ramey.",
        image: "/images/certificates/nvidia-ai-jetson-nano.png",
      },
      {
        title: "Edge AI Perception Pipeline",
        caption: "Real-time object detection and regression inference running live on Jetson Nano CUDA cores.",
      }
    ]
  },
  {
    slug: "ku-ntic-edge-ai-jetson-nano",
    title: "Edge AI with NVIDIA Jetson Nano Workshop",
    category: "Certification",
    organization: "Kathmandu University IT Center (KUITC) & IoT R&D Lab",
    roleOrAward: "Workshop Participant & Hardware Builder",
    date: "January 23, 2026",
    location: "Kathmandu University, Dhulikhel",
    summary: "Completed a hands-on technical workshop on Edge AI with NVIDIA Jetson Nano organized by the Kathmandu University Information Technology Center and IoT R&D Lab.",
    about: "Participated in an intensive hands-on workshop on 'Edge AI with NVIDIA Jetson Nano: From Setup to Real-Time AI Applications' organized by Kathmandu University Information Technology Center (KUITC) and the IoT R&D Lab held on January 23, 2026. The training focused on edge computing fundamentals, embedded Linux OS configuration for Jetson platforms, sensor and camera interfacing, and deploying real-time AI perception models on physical hardware.",
    worksDone: [
      "Set up JetPack OS, developer toolchains, and Linux environments on NVIDIA Jetson Nano hardware",
      "Connected and calibrated camera inputs and peripheral sensors through onboard GPIO and CSI ports",
      "Ran real-time neural network inference for object detection and visual awareness tasks",
      "Collaborated on practical Edge AI and IoT applications under the mentorship of KU faculty"
    ],
    skillsGained: ["Edge AI Hardware Setup", "JetPack SDK", "KU IoT Lab Tools", "Sensor Integration", "Linux for Embedded AI"],
    certificate: {
      title: "Certificate of Completion — Edge AI with NVIDIA Jetson Nano",
      issuer: "Kathmandu University Information Technology Center (KUITC) & IoT R&D Lab",
      date: "January 23, 2026",
      award: "Workshop Certificate of Completion",
      verificationNote: "Official Certificate from Kathmandu University IT Center & IoT R&D Lab signed by Associate Director Prof. Dr. Sudan Jha.",
      image: "/images/certificates/kuitc-edge-ai-jetson-nano.jpg",
    },
    gallery: [
      {
        title: "KUITC Edge AI Workshop Certificate",
        caption: "Official Certificate from Kathmandu University IT Center & IoT R&D Lab signed by Prof. Dr. Sudan Jha.",
        image: "/images/certificates/kuitc-edge-ai-jetson-nano.jpg",
      },
      {
        title: "Jetson Nano Testing Lab",
        caption: "Bench testing real-time camera inference and TensorRT neural networks during the KU workshop.",
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
    slug: "ku-robotics-101-workshop",
    title: "3-Days Robotics 101 Workshop — KURC",
    category: "Certification",
    organization: "Kathmandu University Robotics Club (KURC)",
    roleOrAward: "Bootcamp Graduate",
    date: "12–14 November 2025",
    location: "Kathmandu University, Dhulikhel",
    summary: "Completed 3-day intensive robotics fundamentals bootcamp organized by Kathmandu University Robotics Club, acquiring hands-on mastery of fundamental robotics and circuit concepts.",
    about: "Organized by Kathmandu University Robotics Club (KURC) and supported by the Technical Training Center (TTC) at Kathmandu University, Dhulikhel, the 3-Days Robotics 101 Workshop provided rigorous foundational training in robotics engineering. The curriculum immersed attendees in breadboard circuit prototyping, analog and digital sensors, PWM motor actuation, microcontroller logic, and debugging techniques.",
    worksDone: [
      "Assembled and debugged electronic circuits on breadboards with microcontrollers and motor drivers",
      "Calibrated analog sensors and integrated digital input/output peripherals for robotics control",
      "Implemented real-time sensor polling and motor speed modulation routines",
      "Collaborated with peers to complete culminating practical hardware robotics challenges"
    ],
    skillsGained: ["Robotics Fundamentals", "Breadboard Circuit Prototyping", "Sensor Interfacing", "Motor Driver Topologies", "Practical Hardware Debugging"],
    certificate: {
      title: "Certificate of Participation — 3-Days Robotics 101 Workshop",
      issuer: "Kathmandu University Robotics Club (KURC) & KU-TTC",
      date: "12th November to 14th November 2025",
      award: "Practical Robotics 101 Certification",
      verificationNote: "Certified by Assoc. Prof. Dr. Diwakar Bista (Assoc. Director KU-TTC / Advisor KURC) and Mr. Pranshu Bikram Karki (President KURC).",
      image: "/images/certificates/ku-robotics-101-workshop.jpg",
    },
    gallery: [
      {
        title: "KURC Robotics 101 Certificate",
        caption: "Official Certificate of Participation proudly presented by Kathmandu University Robotics Club.",
        image: "/images/certificates/ku-robotics-101-workshop.jpg",
      }
    ]
  },
  {
    slug: "cyber-security-career-conclave",
    title: "Cyber Security Training Class — Career Conclave",
    category: "Certification",
    organization: "Prashikshan in association with Career Conclave",
    roleOrAward: "Cyber Security Trainee",
    date: "19 June – 3 July 2025",
    location: "Kathmandu, Nepal",
    summary: "Completed comprehensive cybersecurity training class organized by Prashikshan and Career Conclave, covering threat modeling, vulnerability assessment, and foundational defense.",
    about: "Conducted over two weeks from June 19 to July 3, 2025, this intensive cybersecurity training class was organized by Prashikshan in association with Career Conclave and led by expert trainer Amritansu Ghimire. The program focused on core network architecture security, threat surfaces, penetration testing fundamentals, web application security vulnerabilities (OWASP Top 10), and proactive cyber hygiene.",
    worksDone: [
      "Explored TCP/IP network packets, port scanning methodologies, and Wireshark traffic inspection",
      "Analyzed common cybersecurity vulnerabilities, attack vectors, and authentication weaknesses",
      "Practiced secure coding habits and defensive measures against SQL injection and cross-site scripting",
      "Executed lab simulations identifying security misconfigurations in virtualized environments"
    ],
    skillsGained: ["Network Security Fundamentals", "Vulnerability Assessment", "OWASP Top 10", "Traffic Inspection", "Defensive Security"],
    certificate: {
      title: "Certificate of Participation — Cyber Security Training Class",
      issuer: "Prashikshan in association with Career Conclave",
      date: "19th June to 3rd July, 2025",
      award: "Cyber Security IT Training Certification",
      verificationNote: "Certified by Ashis Prasai (CEO Prashikshan) and Amritansu Ghimire (Trainer, Cyber Security).",
      image: "/images/certificates/cyber-security-career-conclave.jpg",
    },
    gallery: [
      {
        title: "Cyber Security Training Certificate",
        caption: "Official Certificate of Participation presented by Prashikshan and Career Conclave.",
        image: "/images/certificates/cyber-security-career-conclave.jpg",
      }
    ]
  },
  {
    slug: "cyber-security-techspire",
    title: "IT Training Class: Cyber Security — Techspire College & APU",
    category: "Certification",
    organization: "Prashikshan & Techspire College (in collaboration with Asia Pacific University)",
    roleOrAward: "Cyber Security Trainee",
    date: "3–18 July 2025",
    location: "Techspire College, Kathmandu",
    summary: "Completed advanced 15-day IT training class in Cyber Security hosted at Techspire College, with academic collaboration from Asia Pacific University (APU) and U-ThinkCrazy.",
    about: "Organized by Prashikshan from July 3rd to July 18th, 2025, with Techspire College as the Venue Partner, supported by U-ThinkCrazy, and in academic collaboration with Asia Pacific University (APU). The curriculum deepened practical security engineering skills, covering firewalls, cryptography basics, endpoint defense, malware analysis fundamentals, and industry incident response frameworks.",
    worksDone: [
      "Configured host-based firewalls, secure subnetting rules, and encrypted communications protocols",
      "Studied cryptographic hashing, symmetric/asymmetric encryption, and digital signatures",
      "Analyzed endpoint attack patterns and security logging mechanisms in Linux/Windows environments",
      "Completed end-to-end security defense challenge scenarios under trainer Amritansu Ghimire"
    ],
    skillsGained: ["Endpoint Security", "Applied Cryptography", "Firewall Configuration", "Threat Detection", "System Hardening"],
    certificate: {
      title: "Certificate of Participation — IT Training Class: Cyber Security",
      issuer: "Prashikshan, Techspire College & Asia Pacific University (APU)",
      date: "July 3rd to July 18th, 2025",
      award: "Advanced Cyber Security IT Training Certification",
      verificationNote: "Signed by Laxman Pokhrel (CEO/Principal Techspire College), Aashish Parsai (Deputy CEO), Suraj Dhungana (MD U Think Crazy), and Amritansu Ghimire.",
      image: "/images/certificates/cyber-security-techspire.jpg",
    },
    gallery: [
      {
        title: "Techspire Cyber Security Certificate",
        caption: "Official Certificate of Participation presented by Prashikshan, Techspire College, and APU.",
        image: "/images/certificates/cyber-security-techspire.jpg",
      }
    ]
  },
  {
    slug: "ai-python-career-conclave",
    title: "AI with Python Training Class — Career Conclave",
    category: "Certification",
    organization: "Prashikshan in association with Career Conclave",
    roleOrAward: "AI with Python Trainee",
    date: "19 June – 3 July 2025",
    location: "Kathmandu, Nepal",
    summary: "Completed hands-on Artificial Intelligence and Python programming training class organized by Prashikshan and Career Conclave, instructed by Satkar Wagle.",
    about: "Held from June 19 to July 3, 2025, this training class focused on Python programming tailored for Artificial Intelligence and Machine Learning applications. Instructed by Satkar Wagle and organized by Prashikshan in association with Career Conclave, the course covered Python object-oriented programming, NumPy vector manipulation, Pandas data analysis, Matplotlib visualization, and fundamental machine learning algorithms.",
    worksDone: [
      "Implemented data manipulation pipelines using NumPy arrays and Pandas dataframes",
      "Built and evaluated predictive classification and regression models using Scikit-Learn",
      "Visualized exploratory data analysis distributions and correlation matrices using Matplotlib",
      "Constructed foundational neural network architectures and activation function experiments"
    ],
    skillsGained: ["Python for AI", "NumPy & Pandas", "Supervised Learning", "Data Visualization", "Machine Learning Foundations"],
    certificate: {
      title: "Certificate of Participation — AI with Python Training Class",
      issuer: "Prashikshan in association with Career Conclave",
      date: "19th June to 3rd July, 2025",
      award: "AI with Python IT Training Certification",
      verificationNote: "Certified by Ashis Prasai (CEO Prashikshan) and Satkar Wagle (Trainer, AI with Python).",
      image: "/images/certificates/ai-python-career-conclave.jpg",
    },
    gallery: [
      {
        title: "AI with Python Certificate",
        caption: "Official Certificate of Participation in AI with Python Training Class.",
        image: "/images/certificates/ai-python-career-conclave.jpg",
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
    gallery: [],
  },
  {
    slug: "robo-war-associate-manager",
    title: "Associate Event Manager, ROBO WAR (AAVISHKAR'26)",
    category: "Experience",
    organization: "Kathmandu University Robotics Club (KURC)",
    roleOrAward: "Asso. Event Manager",
    date: "2026",
    location: "Kathmandu University, Dhulikhel",
    summary: "Served as Associate Event Manager for the flagship ROBO WAR competition at AAVISHKAR'26, coordinating tournament arena integrity, bot safety scrutiny, referee management, and live operational execution.",
    about: "AAVISHKAR'26 is the premier annual technical festival organized by the Kathmandu University Robotics Club (KURC) at Kathmandu University. As the Associate Event Manager for the headline ROBO WAR combat competition, Nishant was recognized with an official Certificate of Appreciation for technical expertise, leadership commitment, and vital contributions that ensured the safe and seamless execution of high-intensity robot battles between collegiate engineering teams across Nepal.",
    worksDone: [
      "Supervised arena containment structure, safety shields, and combat pit readiness",
      "Conducted rigorous technical inspections for 30+ competing bots to verify electrical and weapon safety standards",
      "Managed live tournament brackets, referee communications, and audience crowd flow",
      "Resolved emergency on-ground technical disputes and operational logistics with poise"
    ],
    skillsGained: ["Large-scale Event Logistics", "Technical Safety Compliance", "Team Coordination", "Crisis Resolution", "Tournament Operations"],
    certificate: {
      title: "Certificate of Appreciation — Asso. Event Manager for AAVISHKAR'26",
      issuer: "Kathmandu University Robotics Club (KURC)",
      date: "2026",
      award: "Asso. Event Manager Honor",
      verificationNote: "In recognition of dedicated service as Asso. Event Manager for AAVISHKAR'26. Signed by Coordinator Arekn Shrestha, President Pranshu Bikram Karki, and Advisor Asso. Prof. Diwakar Bista Ph.D.",
      image: "/images/certificates/aavishkar-robowar-event-manager.jpg",
    },
    gallery: [
      {
        title: "Official KURC Certificate of Appreciation",
        caption: "Certificate of Appreciation for dedicated service as Asso. Event Manager for AAVISHKAR'26.",
        image: "/images/certificates/aavishkar-robowar-event-manager.jpg",
      }
    ]
  },
  {
    slug: "techx-kathmandu-2026",
    title: "TechX Kathmandu 2026 — Cattle Health Tracker Demonstration",
    category: "Achievement",
    organization: "Vishwokarma Labs (Supported by Khalti by IME)",
    roleOrAward: "Project Innovator & Exhibitor",
    date: "4th April, 2026",
    location: "Kathmandu, Nepal",
    summary: "Demonstrated the custom-engineered Cattle Health Tracker hardware prototype at Vishwokarma Labs TechX Kathmandu 2026, receiving the Participation Award for innovation and technical contribution.",
    about: "Vishwokarma Labs TechX Kathmandu 2026 brought together forward-thinking engineers, creators, and tech leaders to celebrate grassroots innovation and cutting-edge applied technology. Nishant exhibited and live-demonstrated the Cattle Health Tracker — a telemetry-driven livestock monitoring device designed for real-time temperature tracking, activity sensing, and early health anomaly detection. The project attracted significant attention from tech enthusiasts, researchers, and event partners including Khalti by IME, earning him an official Participation Award for contributing to a community dedicated to innovation, technology, and creation.",
    worksDone: [
      "Presented live hardware telemetry and sensor demonstrations of the Cattle Health Tracker prototype",
      "Explained biometric telemetry algorithms, anomaly filtering, and livestock health tracking circuits to attendees and evaluators",
      "Engaged in technical exchange with industry professionals, IoT developers, and investors",
      "Gathered constructive user feedback on wearable ergonomics and agricultural deployment feasibility"
    ],
    skillsGained: ["Live Hardware Demonstration", "IoT Product Pitching", "Livestock Telemetry Engineering", "Technical Communication", "Prototyping & Feedback Iteration"],
    certificate: {
      title: "Participation Award — Vishwokarma Labs TechX Kathmandu 2026",
      issuer: "Vishwokarma Labs (in association with Khalti by IME)",
      date: "4th April, 2026",
      award: "Participation Award for Innovation & Creation",
      verificationNote: "Presented to Nishant Sah for being a part of Vishwokarma Labs TechX Kathmandu 2026 and contributing to a community dedicated to innovation, technology, and creation. Signed by Swornim Raj Shrestha.",
      image: "/images/certificates/techx-kathmandu-cattle-tracker.jpg",
    },
    gallery: [
      {
        title: "Official TechX Kathmandu Participation Award",
        caption: "Participation Award presented to Nishant Sah at Vishwokarma Labs TechX Kathmandu 2026 on 4th April, 2026.",
        image: "/images/certificates/techx-kathmandu-cattle-tracker.jpg",
      },
      {
        title: "Cattle Tracker Dashboard at TechX Exhibition",
        caption: "Live demonstration of the Cattle Tracker web portal and mobile dashboard at the Vishwokarma Labs TechX venue.",
        image: "/images/projects/cattle-tracker-dashboard.webp",
      }
    ]
  },
  {
    slug: "nepal-scouts-community-service",
    title: "Certificate of Appreciation, Mahashivaratri Community Service — RONB & 100 Group",
    category: "Achievement",
    organization: "Routine of Nepal Banda, 100 Group, Blood For Nepal & Vatsalya Sadan",
    roleOrAward: "Community Volunteer & Event Support",
    date: "February 15, 2026",
    location: "Pashupatinath, Kathmandu",
    summary: "Awarded Certificate of Appreciation for selfless community volunteering, supporting devotees, and maintaining order during Mahashivaratri at Pashupatinath.",
    about: "During the massive Mahashivaratri festival on February 15, 2026 at Pashupatinath Temple, Nishant volunteered with the campaign organized by 100 Group in collaboration with Blood For Nepal, Routine of Nepal Banda (RONB), Creating Opportunities International, and Vatsalya Sadan. He dedicated his time to supporting hundreds of thousands of visiting devotees, managing crowd flow, assisting emergency stations, and ensuring smooth operations throughout the sacred celebration. In recognition of his tireless efforts and selfless dedication, he was honored with an official Certificate of Appreciation.",
    worksDone: [
      "Supported pilgrims and devotees with navigation, crowd coordination, and safety guidance across the Pashupatinath premises",
      "Assisted emergency support desks and volunteer queues in collaboration with Blood For Nepal and 100 Group",
      "Maintained orderly visitor passage and assisted elderly and vulnerable devotees in high-density areas",
      "Collaborated closely with civil volunteers and event organizers to ensure smooth festival flow"
    ],
    skillsGained: ["Civic Responsibility", "Crowd Safety & Coordination", "Emergency Teamwork", "Community Leadership", "Humanitarian Service"],
    certificate: {
      title: "Certificate of Appreciation — Mahashivaratri Community Service",
      issuer: "Routine of Nepal Banda, 100 Group, Blood For Nepal & Creating Opportunities",
      date: "February 15, 2026",
      award: "Selfless Dedication & Service Award",
      verificationNote: "Awarded in appreciation of invaluable time, commitment, and active involvement during Mahashivaratri on February 15, 2026 at Pashupatinath. Signed by Victor Paudel (Routine of Nepal Banda), Hitlal Shrestha (100 Group), Jay Krishna Mahato (Blood For Nepal), Sujit K. Chaudhary (Creating Opportunities), and Anjali Neupane (Vatsalya Sadan).",
      image: "/images/certificates/ronb-blood-for-nepal-community-service.jpg",
    },
    gallery: [
      {
        title: "Official Certificate of Appreciation",
        caption: "Presented by Routine of Nepal Banda, 100 Group, Blood For Nepal, Creating Opportunities, and Vatsalya Sadan.",
        image: "/images/certificates/ronb-blood-for-nepal-community-service.jpg",
      }
    ],
  }
];
