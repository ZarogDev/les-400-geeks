"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type MenuItem = {
  id: string;
  title: string;
  description: string;
  hint: string;
  price: string;
  image: string;
  category: string;
};

export default function CartePage() {
  const [initialMenuItems, setInitialMenuItems] = useState<MenuItem[]>([]);
  const [activeItem, setActiveItem] = useState<MenuItem | null>(null);

  useEffect(() => {
    fetch('/api/menu').then(res => res.json()).then(data => {
      setInitialMenuItems(data);
      if (data.length > 0) setActiveItem(data[0]);
    });
  }, []);

  useEffect(() => {
    if (initialMenuItems.length === 0) return;
    const handleScroll = () => {
      const sections = document.querySelectorAll('.menu-section');
      let currentItem = initialMenuItems[0];
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 + 100) {
          const id = section.getAttribute('data-id');
          const found = initialMenuItems.find(i => i.id === id);
          if (found) currentItem = found;
        }
      });
      setActiveItem(currentItem);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialMenuItems]);

  if (!initialMenuItems || initialMenuItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#FAFAFA] text-center px-4">
        <h1 className="font-heading text-4xl text-black/50 animate-pulse">La carte est en cours de création...</h1>
        <p className="font-sans text-black/40 mt-4 italic">Nos mages préparent les ingrédients.</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen bg-[#FAFAFA]">
        {/* Left Side - Scrolling Menu */}
        <div className="w-full md:w-[55%] p-8 md:p-24 lg:px-32 flex flex-col pt-32 relative z-10">
          <h1 className="font-heading text-5xl md:text-7xl mb-16 md:mb-24 text-black border-b pb-8 border-black/10">La Carte</h1>
          
          <div className="flex flex-col space-y-32 md:space-y-48 pb-16">
            {initialMenuItems.map((item, index) => (
              <motion.div 
                key={item.id}
                data-id={item.id}
                className="menu-section flex flex-col gap-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-[#D4AF37] font-sans tracking-[0.3em] uppercase text-xs md:text-sm">{item.category}</span>
                <h2 className="font-heading text-4xl md:text-5xl text-black leading-tight">{item.title}</h2>
                <p className="font-sans text-black/60 text-lg leading-relaxed max-w-md">
                  {item.description}
                </p>
                
                {/* Indice Quête */}
                <div className="border-l-2 border-[#D4AF37] pl-4 py-2 mt-2">
                  <p className="font-sans italic text-sm text-black/50">
                    {item.hint}
                  </p>
                </div>

                <span className="font-heading text-2xl text-black border-t border-black/10 pt-4 mt-2 max-w-[100px]">{item.price}</span>
                
                {/* Mobile Image inline */}
                <div className="block md:hidden relative w-full h-[350px] mt-8 shadow-2xl overflow-hidden rounded-sm group">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 0vw"
                    priority={index < 2}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side - Sticky Image Viewer */}
        <div className="w-full md:w-[45%] h-screen sticky top-0 bg-black overflow-hidden hidden md:block shadow-[-10px_0_30px_rgba(0,0,0,0.1)]">
          {initialMenuItems.map((item, index) => {
            const isActive = activeItem?.id === item.id;
            return (
              <div 
                key={item.id} 
                className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
                style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? 'auto' : 'none', zIndex: isActive ? 10 : 0 }}
              >
                <div className="absolute inset-0 bg-black/20 z-10" />
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="50vw"
                  priority={index < 3}
                  quality={85}
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_100%)] opacity-80 z-10 pointer-events-none" />
                
                <div 
                  className="absolute bottom-24 left-16 right-16 z-20 transition-all duration-1000"
                  style={{ transform: `translateY(${isActive ? 0 : 20}px)`, opacity: isActive ? 1 : 0 }}
                >
                  <span className="text-[#D4AF37] font-sans tracking-[0.3em] uppercase text-xs mb-2 block">{item.category}</span>
                  <h3 className="font-heading text-5xl text-white drop-shadow-2xl">{item.title}</h3>
                  <div className="w-16 h-[2px] bg-[#D4AF37] mt-6 shadow-[0_0_10px_#D4AF37]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Call to Action Final (Full Width) */}
      <div className="w-full bg-[#0a0705] py-24 flex flex-col items-center justify-center text-center relative z-20 border-t border-[#D4AF37]/20 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        <h2 className="font-heading text-4xl md:text-6xl text-[#D4AF37] mb-6 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">Prêt pour la quête ?</h2>
        <p className="font-sans text-white/70 mb-10 max-w-lg italic text-lg px-4">
          Réservez votre place à notre table et laissez-nous vous forger un souvenir impérissable.
        </p>
        <Link href="/reservation" className="px-10 py-5 bg-[#D4AF37] text-[#0a0705] hover:bg-white hover:text-black transition-colors duration-500 font-heading uppercase tracking-[0.2em] text-xs md:text-sm shadow-[0_0_20px_rgba(212,175,55,0.4)]">
          Réserver une table
        </Link>
      </div>
    </>
  );
}
