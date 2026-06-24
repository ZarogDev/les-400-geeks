"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <motion.nav 
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : "-100%" }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-[60] flex items-start justify-between px-8 py-6 mix-blend-difference text-white pointer-events-auto"
      >
        <Link href="/" className="flex flex-col items-center hover:opacity-80 transition-opacity mt-2">
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, height: 0 }}
                animate={{ opacity: 1, scale: 1, height: "auto" }}
                exit={{ opacity: 0, scale: 0.8, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-2 overflow-hidden"
              >
                <Image 
                  src="/images/logo.png" 
                  alt="Logo Les 400 Geeks" 
                  width={140} 
                  height={140} 
                  priority
                  className="object-contain filter invert" 
                />
              </motion.div>
            )}
          </AnimatePresence>
          <span className="font-heading text-3xl md:text-4xl tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Les 400 Geeks
          </span>
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 hover:bg-white/10 rounded-full transition-colors focus:outline-none"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-white text-black flex flex-col items-center justify-center"
          >
            {/* Background Image harmonieuse et lumineuse */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/navbar_bg.png"
                alt="Menu Background"
                fill
                className="object-cover opacity-30"
                priority
              />
              <div className="absolute inset-0 bg-white/70" />
            </div>

            {/* Menu Links */}
            <ul className="z-10 flex flex-col items-center gap-12 font-heading text-5xl md:text-7xl">
              <li>
                <Link href="/" onClick={() => setIsOpen(false)} className="hover:text-[#D4AF37] transition-colors drop-shadow-sm">
                  L'Accueil
                </Link>
              </li>
              <li>
                <Link href="/carte" onClick={() => setIsOpen(false)} className="hover:text-[#D4AF37] transition-colors drop-shadow-sm">
                  La Carte
                </Link>
              </li>
              <li>
                <Link href="/reservation" onClick={() => setIsOpen(false)} className="hover:text-[#D4AF37] transition-colors drop-shadow-sm">
                  Réservation
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
