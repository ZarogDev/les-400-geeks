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
  description: "L'épique s'invite à votre table. Découvrez une fusion unique entre la haute gastronomie et la culture vidéoludique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${playfair.variable} ${outfit.variable} h-full antialiased scroll-smooth`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans bg-background text-foreground relative md:cursor-none">
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <main className="flex-1 flex flex-col pt-[88px] relative z-0">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
