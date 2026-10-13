import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t-[8px] border-black/80 bg-[#e8e8e8] mt-auto relative z-10">
      <div className="py-16 px-6 text-center flex flex-col items-center justify-center gap-12">

      <Link href="/" className="hover:scale-105 transition-transform">
        <Image 
          src="/images/logo.png" 
          alt="Les 400 Geeks Logo" 
          width={400} 
          height={400} 
          className="object-contain mix-blend-multiply w-[60px] md:w-[90px] lg:w-[120px]" 
        />
      </Link>

      <div className="flex flex-col items-center gap-6">
        <div className="flex gap-8 text-black/60">
          <Link href="https://www.instagram.com/zarogdev" aria-label="Instagram — ZarogDev" className="hover:text-[#D4AF37] transition-colors">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </Link>
          <Link href="https://twitter.com/zarogdev" aria-label="Twitter / X — ZarogDev" className="hover:text-[#D4AF37] transition-colors">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
          </Link>
          <Link href="https://www.facebook.com/zarogdev" aria-label="Facebook — ZarogDev" className="hover:text-[#D4AF37] transition-colors">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </Link>
        </div>
        <p className="text-[11px] text-black/60 font-sans max-w-lg">
          Site de démonstration : Les 400 Geeks est une marque fictive, aucune réservation réelle n&apos;est effectuée.
        </p>
      </div>
      </div>

      {/* Barre du bas — modèle Seven Films (centrée sur toute la page) */}
      <div className="grid grid-cols-1 justify-items-center gap-3 border-t border-black/15 px-5 pb-24 pt-5 text-center font-sans text-[11px] text-black/60 xl:grid-cols-[1fr_auto_1fr] xl:items-center xl:justify-items-stretch xl:gap-x-8 xl:px-[clamp(96px,8vw,112px)] xl:pb-6">
        <p className="xl:text-left">
          © 2026 <strong className="font-bold text-black">ZarogDev.</strong> Agence digitale — Tous droits réservés
        </p>
        <nav aria-label="Informations légales" className="flex flex-wrap justify-center gap-x-5 gap-y-1">
          <Link href="/mentions-legales" className="hover:text-[#8a6d12] transition-colors">Mentions légales</Link>
          <Link href="/cgu" className="hover:text-[#8a6d12] transition-colors">CGU</Link>
          <Link href="/politique-confidentialite" className="hover:text-[#8a6d12] transition-colors">Confidentialité</Link>
          <Link href="/politique-confidentialite#cookies" className="hover:text-[#8a6d12] transition-colors">Cookies</Link>
        </nav>
        <p className="xl:text-right">
          design &amp; développement signés <strong className="font-bold text-black">ZarogDev.</strong>{" "}
          <a href="mailto:zarogdev@gmail.com" className="hover:text-[#8a6d12] transition-colors">contact@zarogdev.fr</a>
        </p>
      </div>
    </footer>
  );
}
