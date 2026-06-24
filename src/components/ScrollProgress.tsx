"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#D4AF37] via-[#FFF1C5] to-[#D4AF37] origin-left z-[70]"
      style={{ scaleX }}
    />
  );
}

export default function ScrollProgress() {
  const [isVisible, setIsVisible] = useState(false);

  // On attend la fin du Splash Screen (2.8s) pour que le scroll soit débloqué,
  // AVANT d'exécuter le hook useScroll de Framer Motion.
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 2800);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return <ProgressBar />;
}
