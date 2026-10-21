export const site = {
  name: "Nishant Sah",
  role: "Computer Engineering Student",
  university: "Kathmandu University",
  location: "Siraha, Dhangadhi, Nepal",
  mapUrl: "https://maps.app.goo.gl/a9crFnxadbZzTmWR9",
  tagline: "I build robotics, IoT and software projects, from ESP32 dashboards to competition robots.",
  // Set NEXT_PUBLIC_SITE_URL to your real .np domain before deploying.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "nishantsah295@gmail.com",
  linkedin: "https://www.linkedin.com/in/nishant-sah-874314333/",
  github: "https://github.com/Nishant-Sah",
  // TODO: put your resume in /public and set e.g. "/resume.pdf". Hidden while null.
  resume: null as string | null,
  photo: "/images/profile.webp",
  photoSize: { width: 1220, height: 1289 },
};
