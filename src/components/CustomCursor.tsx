"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isHovering = useRef(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      isHovering.current =
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button";
    };

    const animate = () => {
      const { x, y } = posRef.current;
      // Dot: suit exactement
      dot.style.transform = `translate(${x - 4}px, ${y - 4}px) scale(${isHovering.current ? 0 : 1})`;
      // Ring: lerp pour le retard
      ringPos.current.x += (x - ringPos.current.x) * 0.15;
      ringPos.current.y += (y - ringPos.current.y) * 0.15;
      const scale = isHovering.current ? 1.5 : 1;
      ring.style.transform = `translate(${ringPos.current.x - 20}px, ${ringPos.current.y - 20}px) scale(${scale})`;
      ring.style.backgroundColor = isHovering.current ? "rgba(212, 175, 55, 0.1)" : "rgba(212, 175, 55, 0)";
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-2 h-2 bg-[#D4AF37] rounded-full pointer-events-none z-[100] mix-blend-difference will-change-transform"
        style={{ transition: "transform 0.08s ease-out" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-10 h-10 border border-[#D4AF37] rounded-full pointer-events-none z-[100] mix-blend-difference will-change-transform"
        style={{ transition: "background-color 0.2s ease" }}
      />
    </>
  );
}
