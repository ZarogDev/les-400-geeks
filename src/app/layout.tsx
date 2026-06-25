import CookieConsent from '@/components/rgpd/CookieConsent';
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
  alternates: { canonical: "https://les-400-geeks.vercel.app" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://les-400-geeks.vercel.app",
    title: "Les 400 Geeks | Restaurant Gastronomique",
    description: "La haute gastronomie rencontre la culture vidéoludique.",
    siteName: "Les 400 Geeks",
    images: [
      {
        url: "https://les-400-geeks.vercel.app/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Les 400 Geeks — Restaurant Gastronomique",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Les 400 Geeks | Restaurant Gastronomique",
    description: "La haute gastronomie rencontre la culture vidéoludique.",
    images: ["https://les-400-geeks.vercel.app/images/hero.png"],
  },
};

import SmoothScroll from "@/components/SmoothScroll";
import SplashScreen from "@/components/SplashScreen";

const restaurantJsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Les 400 Geeks",
  "description": "Restaurant gastronomique alliant haute cuisine et culture vidéoludique. Chaque plat est un hommage aux univers virtuels.",
  "url": "https://les-400-geeks.vercel.app",
  "image": "https://les-400-geeks.vercel.app/images/hero.png",
  "servesCuisine": ["Gastronomique Française", "Fusion"],
  "priceRange": "€€€",
  "inLanguage": "fr",
  "hasMap": "https://les-400-geeks.vercel.app",
  "acceptsReservations": "True",
  "sameAs": ["https://les-400-geeks.vercel.app"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${outfit.variable} ${playfair.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-background text-foreground relative md:cursor-none">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
        />
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
        <CookieConsent />
      </body>
    </html>
  );
}
