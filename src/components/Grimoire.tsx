"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Feather } from "lucide-react";
import { GiDragonSpiral } from "react-icons/gi";

const pagesContent = [
  {
    left: (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h2 className="font-heading text-5xl md:text-7xl text-black mb-8">Le Grimoire<br/>des Quêtes</h2>
        <div className="w-24 h-[2px] bg-[#D4AF37] mb-8"></div>
        <p className="font-sans text-black/60 italic text-lg">Histoires, légendes et témoignages des aventuriers passés.</p>
      </div>
    ),
    right: (
      <div className="flex flex-col h-full justify-center px-4 md:px-12">
        <div className="flex gap-1 mb-6 text-[#D4AF37]">
          {[...Array(5)].map((_, j) => <Star key={j} fill="currentColor" size={24} />)}
        </div>
        <p className="font-sans italic text-black/80 text-xl md:text-3xl mb-8 leading-relaxed">
          "Une claque visuelle et gustative. Le 'Souffle de la Nature' m'a littéralement transporté dans les plaines d'Hyrule."
        </p>
        <p className="font-heading font-bold text-black uppercase tracking-widest">— Arthur L.</p>
      </div>
    )
  },
  {
    left: (
      <div className="flex flex-col h-full justify-center px-4 md:px-12">
        <div className="flex gap-1 mb-6 text-[#D4AF37]">
          {[...Array(5)].map((_, j) => <Star key={j} fill="currentColor" size={24} />)}
        </div>
        <p className="font-sans italic text-black/80 text-xl md:text-3xl mb-8 leading-relaxed">
          "Un équilibre parfait entre le clin d'œil geek et la grande gastronomie. Le service est impeccable, digne d'un boss de fin."
        </p>
        <p className="font-heading font-bold text-black uppercase tracking-widest">— Sophie M.</p>
      </div>
    ),
    right: (
      <div className="flex flex-col h-full justify-center px-4 md:px-12">
        <div className="flex gap-1 mb-6 text-[#D4AF37]">
          {[...Array(5)].map((_, j) => <Star key={j} fill="currentColor" size={24} />)}
        </div>
        <p className="font-sans italic text-black/80 text-xl md:text-3xl mb-8 leading-relaxed">
          "Le Cube de Compagnie en dessert... C'était presque un crève-cœur de le manger tellement il était parfait !"
        </p>
        <p className="font-heading font-bold text-black uppercase tracking-widest">— Julien D.</p>
      </div>
    )
  },
  {
    left: (
      <div className="flex flex-col h-full justify-center px-4 md:px-12 text-center">
        <Feather size={56} className="mx-auto mb-8 text-[#D4AF37]" strokeWidth={1} />
        <h3 className="font-heading text-4xl text-black mb-4">Laissez votre trace</h3>
        <p className="font-sans text-black/60 italic text-lg mb-8">Gravez votre expérience dans la légende et rejoignez la guilde.</p>
      </div>
    ),
    right: (
      <div className="flex flex-col h-full justify-center px-4 md:px-12">
        <form className="flex flex-col gap-8" onSubmit={(e) => { e.preventDefault(); alert("Message ajouté au Grimoire !"); }}>
          <div className="flex flex-col gap-2">
            <label className="font-heading uppercase tracking-widest text-xs text-black/50">Nom du Joueur</label>
            <input required type="text" className="border-b border-black/20 pb-2 bg-transparent focus:outline-none focus:border-[#D4AF37] transition-colors font-sans text-black text-lg" placeholder="Votre nom" />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-heading uppercase tracking-widest text-xs text-black/50">Votre Message</label>
            <textarea required rows={5} className="border-b border-black/20 pb-2 bg-transparent focus:outline-none focus:border-[#D4AF37] transition-colors resize-none font-sans text-black text-lg" placeholder="Racontez-nous votre aventure..."></textarea>
          </div>
          <button type="submit" className="mt-4 bg-black text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black py-4 font-heading uppercase tracking-widest transition-colors duration-500 w-full shadow-lg">
            Signer le Grimoire
          </button>
        </form>
      </div>
    )
  }
];

export default function Grimoire() {
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const next = () => {
    if (currentPage < pagesContent.length - 1) setCurrentPage(p => p + 1);
  };
  const prev = () => {
    if (currentPage > 0) setCurrentPage(p => p - 1);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center p-4 min-h-[700px] md:min-h-[800px] [perspective:2000px]">
      
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div 
            key="closed"
            initial={{ opacity: 0, rotateY: -10, scale: 0.95 }}
            animate={{ opacity: 1, rotateY: 0, scale: 1 }}
            exit={{ opacity: 0, rotateY: 90, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[450px] md:max-w-[500px] h-[650px] md:h-[750px] cursor-pointer group"
            onClick={() => setIsOpen(true)}
          >
            {/* The Book Cover */}
            <div className="w-full h-full bg-[#1c130d] bg-[radial-gradient(ellipse_at_center,_#2c1f16_0%,_#100a06_100%)] rounded-r-3xl rounded-l-sm shadow-[30px_20px_60px_rgba(0,0,0,0.8)] border-y-[12px] border-r-[12px] border-l-[6px] border-[#0a0705] relative overflow-hidden flex flex-col items-center justify-center transition-transform duration-700 group-hover:scale-[1.03]">
              
              {/* Embossed Border Ornaments */}
              <div className="absolute inset-4 border-[3px] border-[#8a6d3b]/40 rounded-xl pointer-events-none" />
              <div className="absolute inset-6 border border-[#8a6d3b]/20 rounded-lg pointer-events-none" />
              
              {/* Metallic Corners */}
              <div className="absolute top-2 left-2 w-12 h-12 md:w-16 md:h-16 border-t-[6px] border-l-[6px] border-[#D4AF37] rounded-tl-xl shadow-[3px_3px_15px_rgba(0,0,0,0.9)] pointer-events-none" />
              <div className="absolute top-2 right-2 w-12 h-12 md:w-16 md:h-16 border-t-[6px] border-r-[6px] border-[#D4AF37] rounded-tr-xl shadow-[-3px_3px_15px_rgba(0,0,0,0.9)] pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-12 h-12 md:w-16 md:h-16 border-b-[6px] border-l-[6px] border-[#D4AF37] rounded-bl-xl shadow-[3px_-3px_15px_rgba(0,0,0,0.9)] pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-12 h-12 md:w-16 md:h-16 border-b-[6px] border-r-[6px] border-[#D4AF37] rounded-br-xl shadow-[-3px_-3px_15px_rgba(0,0,0,0.9)] pointer-events-none" />

              {/* Spine edge (Reliure) */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0705] via-[#2c1f16] to-transparent shadow-[10px_0_20px_rgba(0,0,0,0.9)] pointer-events-none" />
              <div className="absolute left-10 top-0 bottom-0 w-[2px] bg-black/70 pointer-events-none" />
              <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-[#D4AF37]/20 pointer-events-none" />
              
              {/* Book Clasp / Lock (Fermoir) */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-24 md:w-8 md:h-32 bg-gradient-to-l from-[#4a3b20] to-[#8a6d3b] rounded-l-md border-y-2 border-l-2 border-[#D4AF37] shadow-[-5px_0_15px_rgba(0,0,0,0.9)] pointer-events-none" />

              {/* Contenu de la couverture */}
              <div className="relative z-10 flex flex-col items-center justify-center p-8 mt-4 pl-12">
                
                {/* 3D Dragon Relief */}
                <div className="relative mb-10 transform group-hover:scale-105 transition-transform duration-700">
                  <GiDragonSpiral 
                    size={200} 
                    className="text-[#D4AF37]"
                    style={{ filter: "drop-shadow(4px 6px 4px rgba(0,0,0,0.9)) brightness(0.9) contrast(1.2)" }} 
                  />
                  {/* Subtle inner glow for metallic effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent mix-blend-overlay rounded-full pointer-events-none" />
                </div>
                
                {/* Titles */}
                <h2 className="font-heading text-5xl md:text-6xl text-[#D4AF37] text-center mb-6 drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)] tracking-wider uppercase">
                  Le Grimoire
                </h2>
                
                <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mb-8 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]"></div>
                
                <div className="px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-heading uppercase tracking-[0.2em] text-xs md:text-sm hover:bg-[#D4AF37] hover:text-[#1c130d] transition-all duration-500 shadow-[0_5px_15px_rgba(0,0,0,0.6)] group-hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] bg-[#1c130d]/50 backdrop-blur-sm relative overflow-hidden group/btn">
                  <span className="relative z-10">Ouvrir le Livre</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="open"
            initial={{ opacity: 0, rotateX: 20, scale: 0.9 }}
            animate={{ opacity: 1, rotateX: 0, scale: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="w-full h-[700px] md:h-[800px] relative"
          >
            {/* Reliure arrière / Couverture cuir */}
            <div className="absolute inset-4 md:inset-0 bg-[#2a231b] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-[#14100c] transform rotate-1 pointer-events-none" />
            <div className="absolute inset-4 md:inset-0 bg-[#1c1712] rounded-xl border-2 border-[#D4AF37]/30 transform -rotate-1 pointer-events-none" />
            
            {/* Pages du livre */}
            <div className="relative w-full h-[95%] md:h-full bg-[#FDFCF0] rounded-md shadow-inner flex flex-col md:flex-row overflow-hidden border border-black/10 z-10 mx-2 md:mx-6 my-auto">
              
              {/* Ombre de la reliure centrale */}
              <div className="absolute left-1/2 top-0 bottom-0 w-12 -ml-6 bg-gradient-to-r from-transparent via-black/10 to-transparent z-20 hidden md:block pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, rotateY: 30 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: -30 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full h-full flex flex-col md:flex-row origin-left md:origin-center"
                >
                  {/* Page Gauche */}
                  <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden flex flex-col">
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/5 to-transparent pointer-events-none hidden md:block" />
                    {pagesContent[currentPage].left}
                    <div className="absolute bottom-6 left-8 text-black/30 font-sans text-sm">{currentPage * 2 + 1}</div>
                  </div>

                  {/* Séparation Mobile */}
                  <div className="w-full h-[1px] bg-black/10 md:hidden" />

                  {/* Page Droite */}
                  <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden flex flex-col">
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/5 to-transparent pointer-events-none hidden md:block" />
                    {pagesContent[currentPage].right}
                    <div className="absolute bottom-6 right-8 text-black/30 font-sans text-sm">{currentPage * 2 + 2}</div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Boutons de Navigation (Marque-pages) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-8 z-30">
                <button 
                  onClick={prev} 
                  disabled={currentPage === 0}
                  className="p-3 bg-white hover:bg-[#D4AF37] hover:text-white rounded-full border border-black/10 text-black disabled:opacity-0 transition-all shadow-lg focus:outline-none"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={next} 
                  disabled={currentPage === pagesContent.length - 1}
                  className="p-3 bg-white hover:bg-[#D4AF37] hover:text-white rounded-full border border-black/10 text-black disabled:opacity-0 transition-all shadow-lg focus:outline-none"
                >
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Bouton Fermer */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 md:right-10 text-black/40 hover:text-black font-heading uppercase tracking-widest text-xs transition-colors z-30"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
