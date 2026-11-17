import type { Metadata, Viewport } from "next";
import { Chakra_Petch, JetBrains_Mono } from "next/font/google";
import { site } from "@/data/site";
import { OG_IMAGE, siteUrl } from "@/lib/seo";
import { HeroIntroProvider } from "@/context/HeroIntroContext";
import FloatingBadge from "@/components/FloatingBadge";
import ScrollAvatar from "@/components/ScrollAvatar";
import CursorFollower from "@/components/CursorFollower";
import CinematicIntro from "@/components/CinematicIntro";
import SoundToggle from "@/components/SoundToggle";
import SmoothScroll from "@/components/SmoothScroll";
import KeyToEnter from "@/components/KeyToEnter";
import "./globals.css";

const display = Chakra_Petch({ subsets: ["latin"], weight: ["500", "600", "700"], display: "swap", variable: "--font-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-jetbrains" });

const description = `${site.name} is a ${site.role.toLowerCase()} at ${site.university} building robotics, IoT and web projects.`;

const pageTitle = `${site.name} | ${site.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: pageTitle, template: `%s | ${site.name}` },
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: { title: pageTitle, description, url: "/", siteName: site.name, type: "website", locale: "en_US", images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", title: pageTitle, description, images: [OG_IMAGE.url] },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined,
  },
};

export const viewport: Viewport = {
  themeColor: "#121216",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${mono.variable}`}>
      <head>
        {/* Preconnect to Google Fonts CDN to reduce DNS + TLS handshake time */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload LCP hero image — browser fetches before React renders */}
        <link
          rel="preload"
          as="image"
          href={site.photo}
          fetchPriority="high"
          type="image/webp"
        />
      </head>
      <body>
        <HeroIntroProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-lg focus:outline-none"
          >
            Skip to content
          </a>
          <SmoothScroll />
          <KeyToEnter />
          <CinematicIntro />
          <SoundToggle />
          <CursorFollower />
          <FloatingBadge />
          <ScrollAvatar />
          {children}
        </HeroIntroProvider>
      </body>
    </html>
  );
}
