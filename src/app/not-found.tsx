import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center text-center px-4 relative overflow-hidden bg-[#FAFAFA]">
      
      {/* Background decoration */}
      <h1 className="font-heading text-[150px] md:text-[300px] text-black/5 absolute select-none pointer-events-none z-0">
        404
      </h1>
      
      <div className="relative z-10 flex flex-col items-center max-w-2xl">
        <Image 
          src="/images/logo.png" 
          alt="Les 400 Geeks Logo" 
          width={150} 
          height={150} 
          className="object-contain mix-blend-multiply mb-8 opacity-80" 
        />
        
        <h2 className="font-heading text-5xl md:text-7xl text-black mb-6">Quête Introuvable</h2>
        
        <div className="w-16 h-[2px] bg-[#D4AF37] mb-8"></div>
        
        <p className="font-sans text-lg md:text-xl text-black/60 mb-12 leading-relaxed italic">
          Il semblerait que vous ayez pris un mauvais chemin dans le donjon. Cette salle n'existe pas ou a été engloutie par le brouillard.
        </p>
        
        <Link 
          href="/" 
          className="px-10 py-4 bg-black text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors duration-500 font-heading uppercase tracking-widest text-sm shadow-xl"
        >
          Retourner au Village (Accueil)
        </Link>
      </div>
    </div>
  );
}
