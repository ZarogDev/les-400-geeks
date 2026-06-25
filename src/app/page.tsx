"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Grimoire from "@/components/Grimoire";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen mt-[-88px]">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          <Image
            src="/images/hero.png"
            alt="Le Souffle de la Nature"
            fill
            className="object-cover opacity-50 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
        </div>
        
        <div className="relative z-10 text-center text-white flex flex-col items-center max-w-5xl px-4 mt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-heading text-6xl md:text-8xl lg:text-9xl tracking-wider mb-6 drop-shadow-2xl bg-gradient-to-r from-[#D4AF37] via-[#FFF1C5] to-[#D4AF37] text-transparent bg-clip-text"
          >
            L&apos;Épique à votre Table
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-sans text-lg md:text-2xl text-white/90 mb-12 max-w-2xl font-light tracking-wide"
          >
            Quand la haute gastronomie rencontre vos univers virtuels favoris. Une expérience sensorielle inoubliable, subtilement inspirée de la culture vidéoludique.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <Link 
              href="/carte"
              className="group relative px-8 py-4 border border-[#D4AF37] text-[#D4AF37] hover:text-black overflow-hidden transition-colors duration-500 font-heading tracking-widest uppercase text-sm md:text-base inline-block"
            >
              <span className="absolute inset-0 bg-[#D4AF37] transform scale-x-0 origin-left transition-transform duration-500 ease-out group-hover:scale-x-100 z-0"></span>
              <span className="relative z-10">Découvrir la Carte</span>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Concept Section */}
      <section className="py-32 px-6 md:px-16 lg:px-32 bg-[#FAFAFA] flex flex-col items-center text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-black mb-8">L&apos;Origine de la Quête</h2>
          <div className="w-24 h-[1px] bg-[#D4AF37] mb-12"></div>
          <p className="font-sans text-black/70 text-lg md:text-xl max-w-3xl leading-relaxed mb-8">
            {`« Les 400 Geeks » est né d'une idée folle : marier le raffinement des grandes tables étoilées avec la passion débordante pour l'univers du jeu vidéo.`}
          </p>
          <p className="font-sans text-black/70 text-lg md:text-xl max-w-3xl leading-relaxed">
            {`Ici, chaque plat est un hommage. Pas de cosplay ou de décors en plastique, mais une véritable réinterprétation culinaire de mondes imaginaires. Nos chefs manient le couteau comme d'autres manient la manette, pour vous offrir des plats aussi beaux qu'un chef-d'œuvre graphique en 4K.`}
          </p>
        </motion.div>
      </section>

      {/* Grimoire Section */}
      <section className="py-24 px-4 md:px-16 bg-[#FAFAFA] border-t border-black/5 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <Grimoire />
        </motion.div>
      </section>
    </div>
  );
}
