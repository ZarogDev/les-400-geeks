"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const menuItems = [
  {
    id: "potion",
    title: "La Potion Rouge",
    description: "Amuse-bouche : Sphère de tomate confite au basilic, éclatant en bouche avec une liqueur douce.",
    hint: "Quête : Restaure 50 cœurs instantanément.",
    price: "18€",
    image: "/images/potion.png",
    category: "Mise en bouche"
  },
  {
    id: "zelda",
    title: "Le Souffle de la Nature",
    description: "Consommé de champignons sauvages, herbes fraîches, et brume fumée au bois de hêtre.",
    hint: "Quête : Une mélodie jouée sur un ocarina réveille cette forêt.",
    price: "32€",
    image: "/images/hero.png",
    category: "Entrée"
  },
  {
    id: "dune",
    title: "L'Épice de Shai-Hulud",
    description: "Saint-Jacques snackées, déclinaison de carottes au cumin, sabayon safrané.",
    hint: "Quête : Celui qui contrôle ce plat contrôle l'univers.",
    price: "36€",
    image: "/images/dune.png",
    category: "Entrée"
  },
  {
    id: "halo",
    title: "L'Anneau de Halo",
    description: "Couronne d'agneau rôtie basse température, purée d'artichauts, jus corsé à l'ail noir.",
    hint: "Quête : Protégez l'humanité de l'Alliance Covenante.",
    price: "45€",
    image: "/images/halo.png", 
    category: "Plat"
  },
  {
    id: "subnautica",
    title: "Le Léviathan",
    description: "Filet de bar de ligne nacré, écume d'eau de mer, algues wakamé et perles de yuzu.",
    hint: "Quête : Ne nagez pas trop profond sur la planète 4546B...",
    price: "42€",
    image: "/images/leviathan.png", 
    category: "Plat"
  },
  {
    id: "ff7",
    title: "L'Éclat de Matéria",
    description: "Sphère parfaite en trompe-l'œil, cœur coulant yuzu et menthe glaciale, coque émeraude luminescente sur un crumble volcanique au sésame noir.",
    hint: "Quête : Équipez cette sphère dans votre épée broyeuse pour lancer une magie dévastatrice.",
    price: "28€",
    image: "/images/ff7.png", 
    category: "Dessert"
  },
  {
    id: "portal",
    title: "Le Cube de Compagnie",
    description: "Entremet géométrique parfait, mousse litchi, cœur framboise et glaçage miroir.",
    hint: "Quête : Le gâteau n'est peut-être pas un mensonge après tout.",
    price: "24€",
    image: "/images/portal.png", 
    category: "Dessert"
  },
  {
    id: "assassin",
    title: "La Pomme d'Eden",
    description: "Pomme confite au caramel beurre salé, coque en chocolat rubis, insert praliné croustillant.",
    hint: "Quête : Un puissant artefact de la Première Civilisation.",
    price: "26€",
    image: "/images/eden.png",
    category: "Dessert"
  },
  {
    id: "nuka",
    title: "Nuka-Cola Quantum",
    description: "Cocktail signature bleu luminescent : Gin, curaçao, citron vert et soda artisanal.",
    hint: "Quête : La boisson rafraîchissante des Terres Désolées (Zéro Radiation).",
    price: "16€",
    image: "/images/nuka.png",
    category: "Élixir & Boisson"
  },
  {
    id: "estus",
    title: "Flasque d'Estus",
    description: "Infusion ardente : Whisky tourbé, sirop de miel épicé, bitter orange et fumée de cannelle.",
    hint: "Quête : Reposez-vous au feu de camp pour remplir cette flasque.",
    price: "18€",
    image: "/images/estus.png",
    category: "Élixir & Boisson"
  }
];

export default function Carte() {
  const [activeItem, setActiveItem] = useState(menuItems[0]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.menu-section');
      let currentItem = menuItems[0];
      
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 + 100) {
          const id = section.getAttribute('data-id');
          const found = menuItems.find(i => i.id === id);
          if (found) currentItem = found;
        }
      });
      setActiveItem(currentItem);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#FAFAFA]">
      {/* Left Side - Scrolling Menu */}
      <div className="w-full md:w-[55%] p-8 md:p-24 lg:px-32 flex flex-col pt-32 relative z-10">
        <h1 className="font-heading text-5xl md:text-7xl mb-16 md:mb-24 text-black border-b pb-8 border-black/10">La Carte</h1>
        
        <div className="flex flex-col space-y-32 md:space-y-48 pb-48 md:pb-64">
          {menuItems.map((item, index) => (
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
        {menuItems.map((item, index) => {
          const isActive = activeItem.id === item.id;
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
  );
}
