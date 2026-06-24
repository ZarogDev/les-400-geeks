"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Splash Screen Cinématique
 * Apparaît à la première ouverture du site.
 */
export default function SplashScreen({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const validRoutes = ["/", "/carte", "/reservation"];
  // Si la route n'est pas dans la liste, on est potentiellement sur une 404. On désactive le splash.
  const is404 = !validRoutes.includes(pathname || "");

  const [showSplash, setShowSplash] = useState(!is404);

  useEffect(() => {
    // Le splash dure 2.8 secondes puis on révèle le contenu
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0705] pointer-events-auto"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: "-10vh", filter: "blur(10px)" }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Conteneur de l'animation */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="flex flex-col items-center justify-center"
            >
              
              {/* Typographie animée à la place de l'image (plus clean) */}
              <motion.h1 
                initial={{ opacity: 0, letterSpacing: "0.5em", filter: "blur(10px)" }}
                animate={{ opacity: 1, letterSpacing: "0.1em", filter: "blur(0px)" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="font-heading text-4xl md:text-6xl text-[#D4AF37] mb-8 drop-shadow-[0_0_15px_rgba(212,175,55,0.6)] uppercase text-center"
              >
                Les 400 Geeks
              </motion.h1>
              
              {/* Ligne qui se dessine */}
              <motion.div 
                className="w-0 h-[2px] bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]"
                animate={{ width: "120%" }}
                transition={{ duration: 1.2, delay: 0.4, ease: "circOut" }}
              />

              {/* Sous-titre */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="font-sans text-[#D4AF37] uppercase tracking-[0.3em] text-xs mt-6"
              >
                La quête commence...
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Révélation du site : on bloque le défilement pendant l'intro */}
      <div className={showSplash ? "h-screen overflow-hidden pointer-events-none" : ""}>
        {children}
      </div>
    </>
  );
}
