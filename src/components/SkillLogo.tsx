import React from "react";

interface SkillLogoProps {
  name: string;
  className?: string;
  size?: number;
}

export default function SkillLogo({ name, className = "", size = 48 }: SkillLogoProps) {
  const norm = name.toLowerCase().trim();

  // 1. C++
  if (norm.includes("c++")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={className}
        aria-label="C++ Logo"
      >
        <path
          fill="#00599C"
          d="M64 1.5L120.4 34v65L64 126.5 7.6 99V34L64 1.5z"
        />
        <path
          fill="#004482"
          d="M64 1.5v125l56.4-32.5V34L64 1.5z"
        />
        <path
          fill="#659AD2"
          d="M64 14.8l44.8 25.9v51.8L64 118.4 19.2 92.5V40.7L64 14.8z"
        />
        {/* White C */}
        <path
          fill="#FFFFFF"
          d="M60.3 43.6c-13.8 0-22.7 9.8-22.7 22.8 0 13.1 8.9 22.8 22.7 22.8 8.1 0 14.5-3.4 18.2-8.6l-8.6-5.8c-2.3 3.1-5.7 4.9-9.6 4.9-7.2 0-11.8-5.3-11.8-13.3 0-8 4.6-13.3 11.8-13.3 3.9 0 7.3 1.8 9.6 4.9l8.6-5.8c-3.7-5.2-10.1-8.6-18.2-8.6z"
        />
        {/* White ++ */}
        <path
          fill="#FFFFFF"
          d="M84.5 59.5h3v-7h4v7h3v4h-3v7h-4v-7h-3v-4zm15 0h3v-7h4v7h3v4h-3v7h-4v-7h-3v-4z"
        />
      </svg>
    );
  }

  // 2. C
  if (norm === "c" || norm.startsWith("c ")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={className}
        aria-label="C Logo"
      >
        <path
          fill="#00599C"
          d="M64 1.5L120.4 34v65L64 126.5 7.6 99V34L64 1.5z"
        />
        <path
          fill="#004482"
          d="M64 1.5v125l56.4-32.5V34L64 1.5z"
        />
        <path
          fill="#659AD2"
          d="M64 14.8l44.8 25.9v51.8L64 118.4 19.2 92.5V40.7L64 14.8z"
        />
        {/* White C */}
        <path
          fill="#FFFFFF"
          d="M66.5 39.5c-16.2 0-26.8 11.4-26.8 26.8 0 15.4 10.6 26.8 26.8 26.8 9.5 0 17.1-4 21.5-10.1l-10.1-6.8c-2.7 3.6-6.7 5.7-11.3 5.7-8.5 0-14-6.3-14-15.6s5.5-15.6 14-15.6c4.6 0 8.6 2.1 11.3 5.7l10.1-6.8c-4.4-6.1-12-10.1-21.5-10.1z"
        />
      </svg>
    );
  }

  // 3. JavaScript
  if (norm.includes("javascript") || norm === "js") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={className}
        aria-label="JavaScript Logo"
      >
        <rect width="128" height="128" fill="#F7DF1E" rx="6" />
        <path
          fill="#323330"
          d="M116 95.5c0 11.9-7 18-17.2 18-9.2 0-14.5-4.7-17.2-10.5l9.4-5.7c1.8 3.2 3.4 5.9 7.3 5.9 3.7 0 6.1-1.5 6.1-7.2V55.6h11.6v39.9zM76.4 94.2c0 13.8-8.1 20.1-19.9 20.1-10.7 0-16.9-5.5-20-13.7l9.4-5.5c2.5 4.1 5.7 7.1 11.4 7.1 4.8 0 7.8-2.4 7.8-5.9 0-4.1-3.1-5.6-8.4-7.9l-2.9-1.2C45.6 83.4 40 78.5 40 68.8c0-9.5 7.2-16.7 18.5-16.7 8 0 13.8 2.8 17.9 10.1l-9.1 5.8c-2.2-3.9-4.5-5.4-8.8-5.4-4 0-6.5 2.5-6.5 5.8 0 4.1 2.5 5.7 8.4 8.1l2.9 1.2c10.2 4.4 15.9 9 15.9 19.2-.2.1-.8.3-.8.3z"
        />
      </svg>
    );
  }

  // 4. TailwindCSS
  if (norm.includes("tailwind")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 54 33"
        fill="none"
        className={className}
        aria-label="Tailwind CSS Logo"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M27 0c-7.2 0-11.7 3.6-13.5 10.8 2.7-3.6 5.85-4.95 9.45-4.05 2.054.513 3.522 2.004 5.147 3.653C30.744 13.09 33.808 16.2 40.5 16.2c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C36.756 3.11 33.692 0 27 0zM13.5 16.2C6.3 16.2 1.8 19.8 0 27c2.7-3.6 5.85-4.95 9.45-4.05 2.054.514 3.522 2.004 5.147 3.653C17.244 29.29 20.308 32.4 27 32.4c7.2 0 11.7-3.6 13.5-10.8-2.7 3.6-5.85 4.95-9.45 4.05-2.054-.513-3.522-2.004-5.147-3.653C23.256 19.31 20.192 16.2 13.5 16.2z"
          fill="#38BDF8"
        />
      </svg>
    );
  }

  // 4. Git & GitHub
  if (norm.includes("git")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className={className}
        aria-label="GitHub Logo"
      >
        <circle cx="24" cy="24" r="23" fill="#FFFFFF" />
        <path
          fill="#181717"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 6C14.06 6 6 14.06 6 24c0 7.95 5.15 14.69 12.3 17.07 1 .18 1.36-.43 1.36-.96 0-.48-.02-2.04-.03-3.72-5 1.09-6.06-2.14-6.06-2.14-.82-2.08-2-2.63-2-2.63-1.63-1.12.12-1.09.12-1.09 1.81.13 2.76 1.86 2.76 1.86 1.61 2.75 4.22 1.95 5.24 1.49.16-1.16.63-1.95 1.14-2.4-3.99-.45-8.19-2-8.19-8.88 0-1.96.7-3.56 1.85-4.82-.19-.46-.8-2.28.17-4.76 0 0 1.51-.48 4.94 1.84 1.43-.4 2.97-.6 4.5-.61 1.53.01 3.07.21 4.5.61 3.43-2.33 4.94-1.84 4.94-1.84.98 2.48.37 4.3.18 4.76 1.15 1.26 1.85 2.86 1.85 4.82 0 6.9-4.21 8.42-8.22 8.87.64.56 1.22 1.65 1.22 3.32 0 2.4-.02 4.34-.02 4.93 0 .54.36 1.16 1.38.96C36.86 38.68 42 31.95 42 24c0-9.94-8.06-18-18-18z"
        />
      </svg>
    );
  }

  // 5. Data Structures & Algorithms
  if (norm.includes("data structures") || norm.includes("dsa") || norm.includes("algorithm")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className={className}
        aria-label="Data Structures & Algorithms Logo"
      >
        <defs>
          <linearGradient id="dsaGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#C084FC" />
          </linearGradient>
          <linearGradient id="dsaGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#818CF8" />
          </linearGradient>
        </defs>
        {/* Tree Edges */}
        <line x1="24" y1="12" x2="13" y2="28" stroke="url(#dsaGrad1)" strokeWidth="3" strokeLinecap="round" />
        <line x1="24" y1="12" x2="35" y2="28" stroke="url(#dsaGrad1)" strokeWidth="3" strokeLinecap="round" />
        <line x1="13" y1="28" x2="8" y2="40" stroke="url(#dsaGrad2)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="13" y1="28" x2="19" y2="40" stroke="url(#dsaGrad2)" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="35" y1="28" x2="41" y2="40" stroke="url(#dsaGrad2)" strokeWidth="2.5" strokeLinecap="round" />
        
        {/* Root Node */}
        <circle cx="24" cy="12" r="7" fill="#18181B" stroke="#A855F7" strokeWidth="2.5" />
        <circle cx="24" cy="12" r="3" fill="#C084FC" />
        
        {/* Level 1 Nodes */}
        <circle cx="13" cy="28" r="6" fill="#18181B" stroke="#6366F1" strokeWidth="2.5" />
        <circle cx="13" cy="28" r="2.5" fill="#818CF8" />
        <circle cx="35" cy="28" r="6" fill="#18181B" stroke="#6366F1" strokeWidth="2.5" />
        <circle cx="35" cy="28" r="2.5" fill="#818CF8" />

        {/* Leaf Nodes */}
        <circle cx="8" cy="40" r="4.5" fill="#18181B" stroke="#38BDF8" strokeWidth="2" />
        <circle cx="19" cy="40" r="4.5" fill="#18181B" stroke="#38BDF8" strokeWidth="2" />
        <circle cx="41" cy="40" r="4.5" fill="#18181B" stroke="#38BDF8" strokeWidth="2" />
      </svg>
    );
  }

  // 6. E-commerce Website
  if (norm.includes("e-commerce") || norm.includes("ecommerce") || norm.includes("store")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className={className}
        aria-label="E-commerce Logo"
      >
        <defs>
          <linearGradient id="ecomGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        {/* Cart Body */}
        <path
          d="M8 10h5l4.5 19.5a2 2 0 002 1.5h18a2 2 0 002-1.5L42 15H15.5"
          fill="none"
          stroke="url(#ecomGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Wheels */}
        <circle cx="20" cy="38" r="3.5" fill="#34D399" />
        <circle cx="36" cy="38" r="3.5" fill="#38BDF8" />
        {/* Shopping Tag / Sparkle */}
        <path
          d="M26 18l3 3 7-7"
          fill="none"
          stroke="#F472B6"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // 7. Arduino
  if (norm.includes("arduino")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={className}
        aria-label="Arduino Logo"
      >
        <circle cx="64" cy="64" r="58" fill="#00979C" />
        {/* Infinity loop */}
        <path
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M44 48c-8.8 0-16 7.2-16 16s7.2 16 16 16c9.6 0 14.4-6.4 20-16 5.6-9.6 10.4-16 20-16 8.8 0 16 7.2 16 16s-7.2 16-16 16c-9.6 0-14.4-6.4-20-16-5.6-9.6-10.4-16-20-16z"
        />
        {/* Minus on left */}
        <rect x="39" y="62" width="10" height="4" fill="#00979C" />
        {/* Plus on right */}
        <rect x="79" y="62" width="10" height="4" fill="#00979C" />
        <rect x="82" y="59" width="4" height="10" fill="#00979C" />
      </svg>
    );
  }

  // 8. NodeMCU / ESP8266 / ESP32
  if (norm.includes("esp") || norm.includes("nodemcu")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className={className}
        aria-label="ESP32 Logo"
      >
        <rect x="10" y="10" width="28" height="28" rx="4" fill="#E11D48" />
        <rect x="14" y="14" width="20" height="20" rx="2" fill="#18181B" />
        {/* Antenna / Wi-Fi */}
        <path d="M20 22a5.5 5.5 0 018 0" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M22 25a2.5 2.5 0 014 0" stroke="#FB7185" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="24" cy="28" r="1.5" fill="#FFFFFF" />
        {/* Pins */}
        <rect x="14" y="6" width="3" height="4" fill="#E11D48" />
        <rect x="22.5" y="6" width="3" height="4" fill="#E11D48" />
        <rect x="31" y="6" width="3" height="4" fill="#E11D48" />
        <rect x="14" y="38" width="3" height="4" fill="#E11D48" />
        <rect x="22.5" y="38" width="3" height="4" fill="#E11D48" />
        <rect x="31" y="38" width="3" height="4" fill="#E11D48" />
      </svg>
    );
  }

  // 9. Python
  if (norm.includes("python")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 128 128"
        className={className}
        aria-label="Python Logo"
      >
        <path
          fill="#3776AB"
          d="M63.5 6.5C36.8 6.5 38.3 18.1 38.3 18.1l.03 12h25.7v3.6H25.3S7 31.7 7 58.5c0 26.8 16 25.8 16 25.8h9.6v-13.6s-.5-16.2 15.9-16.2h25.4s15.3.3 15.3-14.8V21.8s2.2-15.3-25.7-15.3zm-13.9 7.7a4.2 4.2 0 110 8.4 4.2 4.2 0 010-8.4z"
        />
        <path
          fill="#FFD43B"
          d="M64.5 121.5c26.7 0 25.2-11.6 25.2-11.6l-.03-12H64v-3.6h38.7s18.3 2 18.3-24.8c0-26.8-16-25.8-16-25.8h-9.6v13.6s.5 16.2-15.9 16.2H44.1s-15.3-.3-15.3 14.8v17.9s-2.2 15.3 25.7 15.3zm13.9-7.7a4.2 4.2 0 110-8.4 4.2 4.2 0 010 8.4z"
        />
      </svg>
    );
  }

  // 10. ROS / ROS2
  if (norm.includes("ros")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className={className}
        aria-label="ROS2 Logo"
      >
        <circle cx="12" cy="12" r="4.5" fill="#5885AF" />
        <circle cx="24" cy="12" r="4.5" fill="#5885AF" />
        <circle cx="36" cy="12" r="4.5" fill="#5885AF" />
        <circle cx="12" cy="24" r="4.5" fill="#5885AF" />
        <circle cx="24" cy="24" r="4.5" fill="#5885AF" />
        <circle cx="36" cy="24" r="4.5" fill="#5885AF" />
        <circle cx="12" cy="36" r="4.5" fill="#5885AF" />
        <circle cx="24" cy="36" r="4.5" fill="#5885AF" />
        <circle cx="36" cy="36" r="4.5" fill="#5885AF" />
      </svg>
    );
  }

  // 11. KiCad
  if (norm.includes("kicad")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className={className}
        aria-label="KiCad Logo"
      >
        <rect x="4" y="10" width="40" height="28" rx="6" fill="#1C3F73" stroke="#3182CE" strokeWidth="2" />
        <text x="10" y="29" fill="#FFFFFF" fontWeight="900" fontSize="14" fontFamily="sans-serif">Ki</text>
        <circle cx="17.5" cy="19" r="1.5" fill="#FF6B35" />
        <text x="24" y="29" fill="#E2E8F0" fontWeight="700" fontSize="13" fontFamily="sans-serif">Cad</text>
      </svg>
    );
  }

  // 12. Jetson / NVIDIA
  if (norm.includes("jetson") || norm.includes("nvidia")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className={className}
        aria-label="NVIDIA Jetson Logo"
      >
        <path
          d="M24 8C13.5 8 8 16.5 8 24s6.5 15.5 16 15.5c7.8 0 13.5-5.2 14.8-12.2H32c-1.1 3.5-4.5 6.2-8.3 6.2-5.4 0-9.2-4.2-9.2-9.5s3.8-9.5 9.2-9.5c3.8 0 7.2 2.7 8.3 6.2h6.8C37.5 13.2 31.8 8 24 8z"
          fill="#76B900"
        />
        <circle cx="24" cy="24" r="4" fill="#76B900" />
      </svg>
    );
  }

  // 13. Docker
  if (norm.includes("docker")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className={className}
        aria-label="Docker Logo"
      >
        {/* Containers */}
        <rect x="18" y="15" width="4" height="4" fill="#2496ED" rx="0.5" />
        <rect x="23" y="15" width="4" height="4" fill="#2496ED" rx="0.5" />
        <rect x="13" y="20" width="4" height="4" fill="#2496ED" rx="0.5" />
        <rect x="18" y="20" width="4" height="4" fill="#2496ED" rx="0.5" />
        <rect x="23" y="20" width="4" height="4" fill="#2496ED" rx="0.5" />
        <rect x="28" y="20" width="4" height="4" fill="#2496ED" rx="0.5" />
        <rect x="8" y="25" width="4" height="4" fill="#2496ED" rx="0.5" />
        <rect x="13" y="25" width="4" height="4" fill="#2496ED" rx="0.5" />
        <rect x="18" y="25" width="4" height="4" fill="#2496ED" rx="0.5" />
        <rect x="23" y="25" width="4" height="4" fill="#2496ED" rx="0.5" />
        <rect x="28" y="25" width="4" height="4" fill="#2496ED" rx="0.5" />
        {/* Whale Body */}
        <path
          d="M6 30c2.5 5 8 7 17 7 12 0 18-5 19-10 1-1 2-2 3-2-2-1-4-1-6 0-1-3-3-4-6-4-1 0-2 0-3 .5C38 18 34 16 30 16v9H6c0 1.5 0 3.5 0 5z"
          fill="#2496ED"
        />
        <circle cx="12" cy="30" r="1" fill="#FFFFFF" />
      </svg>
    );
  }

  // 14. Linux
  if (norm.includes("linux")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className={className}
        aria-label="Linux Logo"
      >
        <circle cx="24" cy="24" r="21" fill="#27272A" stroke="#FBBF24" strokeWidth="2.5" />
        {/* Terminal prompt symbol or Tux face */}
        <path d="M16 18l7 6-7 6" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <line x1="26" y1="30" x2="34" y2="30" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  // 15. AI / ML
  if (norm.includes("ai") || norm.includes("ml")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className={className}
        aria-label="AI / ML Logo"
      >
        <circle cx="24" cy="14" r="4.5" fill="#A855F7" />
        <circle cx="14" cy="30" r="4" fill="#EC4899" />
        <circle cx="34" cy="30" r="4" fill="#8B5CF6" />
        <circle cx="24" cy="38" r="4" fill="#06B6D4" />
        <line x1="24" y1="14" x2="14" y2="30" stroke="#A855F7" strokeWidth="2.5" />
        <line x1="24" y1="14" x2="34" y2="30" stroke="#8B5CF6" strokeWidth="2.5" />
        <line x1="14" y1="30" x2="24" y2="38" stroke="#EC4899" strokeWidth="2.5" />
        <line x1="34" y1="30" x2="24" y2="38" stroke="#06B6D4" strokeWidth="2.5" />
      </svg>
    );
  }

  // 16. IoT / Sensors
  if (norm.includes("iot") || norm.includes("sensor")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className={className}
        aria-label="IoT Logo"
      >
        <circle cx="24" cy="24" r="5" fill="#10B981" />
        <path d="M16 16a11.3 11.3 0 0116 0" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M12 12a17 17 0 0124 0" fill="none" stroke="#6EE7B7" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M32 32a11.3 11.3 0 01-16 0" fill="none" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M36 36a17 17 0 01-24 0" fill="none" stroke="#6EE7B7" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 17. Robotics
  if (norm.includes("robot") || norm.includes("embedded") || norm.includes("isaac")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className={className}
        aria-label="Robotics Logo"
      >
        <rect x="12" y="14" width="24" height="20" rx="5" fill="#3B82F6" stroke="#60A5FA" strokeWidth="2" />
        {/* Antenna */}
        <line x1="24" y1="8" x2="24" y2="14" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="24" cy="8" r="2.5" fill="#93C5FD" />
        {/* Eyes */}
        <circle cx="19" cy="22" r="3" fill="#FFFFFF" />
        <circle cx="29" cy="22" r="3" fill="#FFFFFF" />
        <circle cx="19" cy="22" r="1.5" fill="#1D4ED8" />
        <circle cx="29" cy="22" r="1.5" fill="#1D4ED8" />
        {/* Mouth */}
        <line x1="19" y1="28" x2="29" y2="28" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // 18. Cloud
  if (norm.includes("cloud")) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        className={className}
        aria-label="Cloud Logo"
      >
        <path
          d="M14 34h21a8 8 0 002.5-15.6 11 11 0 00-21.5-1.9A8 8 0 0014 34z"
          fill="#38BDF8"
          stroke="#7DD3FC"
          strokeWidth="2"
        />
      </svg>
    );
  }

  // Fallback Modern Chip Logo
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      className={className}
      aria-label={`${name} Logo`}
    >
      <rect x="12" y="12" width="24" height="24" rx="4" fill="#8B5CF6" />
      <circle cx="24" cy="24" r="5" fill="#FFFFFF" />
    </svg>
  );
}
