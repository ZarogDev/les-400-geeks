"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.scrollY > 400);

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          aria-label="Retour en haut"
          className="fixed bottom-8 right-8 z-40 p-4 bg-black text-white rounded-full shadow-2xl hover:bg-[#D4AF37] hover:text-black transition-all motion-reduce:transition-none focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D4AF37]"
        >
          <ArrowUp size={24} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
