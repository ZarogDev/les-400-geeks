import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Les 400 Geeks | Restaurant Gastronomique",
  description: "L'épique s'invite à votre table. Découvrez une fusion unique entre la haute gastronomie et la culture vidéoludique. Réservez votre quête dès aujourd'hui.",
  keywords: ["restaurant", "gastronomique", "geek", "gaming", "lyon", "paris", "fine dining", "jeux vidéo"],
  authors: [{ name: "ZarogDev" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://les-400-geeks.vercel.app",
    title: "Les 400 Geeks | Restaurant Gastronomique",
    description: "La haute gastronomie rencontre la culture vidéoludique.",
    siteName: "Les 400 Geeks",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Les 400 Geeks",
      },
    ],
  },
};

import SmoothScroll from "@/components/SmoothScroll";
import SplashScreen from "@/components/SplashScreen";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} ${playfair.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-background text-foreground relative md:cursor-none">
        <SmoothScroll>
          <SplashScreen>
            <CustomCursor />
            <ScrollProgress />
            <Navbar />
            <main className="flex-1 flex flex-col pt-[88px] relative z-0">
              {children}
            </main>
            <Footer />
            <BackToTop />
          </SplashScreen>
        </SmoothScroll>
      </body>
    </html>
  );
}
