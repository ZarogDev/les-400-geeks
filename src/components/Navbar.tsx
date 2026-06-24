"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLenis } from 'lenis/react';

/**
 * Composant de navigation principal (Navbar).
 * Affiche le titre et un menu burger.
 * Contient la logique d'affichage conditionnel du logo dans le menu ouvert.
 * Gère le blocage du défilement lorsque le menu est ouvert.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const lenis = useLenis();

  useEffect(() => {
    const handleScroll = () => {
      // Le titre n'est visible que si on est tout en haut de la page (moins de 50px de scroll)
      setIsAtTop(window.scrollY < 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initialisation au montage
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "unset";
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = "unset";
    };
  }, [isOpen, lenis]);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[60] flex items-start justify-between px-8 py-6 mix-blend-difference text-white pointer-events-none">
        <Link 
          href="/" 
          className={`flex flex-col items-center hover:opacity-80 transition-opacity duration-300 mt-2 pointer-events-auto ${(!isAtTop || isOpen) ? 'opacity-0 invisible' : 'opacity-100 visible'}`}
        >
          <span className="font-heading text-3xl md:text-4xl tracking-widest uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Les 400 Geeks
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link 
            href="/admin"
            title="Administration"
            className={`p-3 text-white hover:text-white/70 hover:bg-white/10 rounded-full transition-all duration-300 focus:outline-none pointer-events-auto ${(!isAtTop && !isOpen) ? 'opacity-0 invisible scale-90' : 'opacity-100 visible scale-100'}`}
          >
            <Lock size={24} />
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-3 hover:bg-white/10 rounded-full transition-all duration-300 focus:outline-none pointer-events-auto ${(!isAtTop && !isOpen) ? 'opacity-0 invisible scale-90' : 'opacity-100 visible scale-100'}`}
          >
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </nav>

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

            {/* Logo centré dans le menu */}
            <div className="z-10 mb-8 md:mb-12 flex flex-col items-center">
              <Image 
                src="/images/logo.png" 
                alt="Logo Les 400 Geeks" 
                width={200} 
                height={200} 
                className="object-contain mix-blend-multiply mb-2 w-[100px] md:w-[150px]" 
              />
              <span className="font-heading text-2xl md:text-5xl tracking-widest uppercase text-black">
                Les 400 Geeks
              </span>
            </div>

            {/* Menu Links */}
            <ul className="z-10 flex flex-col items-center gap-8 md:gap-12 font-heading text-4xl md:text-7xl">
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
