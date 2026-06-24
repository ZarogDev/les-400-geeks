"use client";

import { ReactLenis } from 'lenis/react';

/**
 * Wrapper de Smooth Scrolling avec Lenis.
 * Apporte de l'inertie et une sensation premium à la navigation.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis 
      root 
      options={{ 
        lerp: 0.08, // Quantité d'inertie (plus petit = plus lisse)
        duration: 1.5, 
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
