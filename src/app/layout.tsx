import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { site } from "@/data/site";
import { HeroIntroProvider } from "@/context/HeroIntroContext";
import FloatingBadge from "@/components/FloatingBadge";
import ScrollAvatar from "@/components/ScrollAvatar";
import CursorFollower from "@/components/CursorFollower";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const description = `${site.name} is a ${site.role.toLowerCase()} at ${site.university} building robotics, IoT and web projects.`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.role}`, template: `%s | ${site.name}` },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${site.name} | ${site.role}`,
    description,
    url: "/",
    siteName: site.name,
    type: "website",
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
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        <HeroIntroProvider>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:shadow-lg focus:outline-none"
          >
            Skip to content
          </a>
          <CursorFollower />
          <FloatingBadge />
          <ScrollAvatar />
          {children}
        </HeroIntroProvider>
      </body>
    </html>
  );
}
