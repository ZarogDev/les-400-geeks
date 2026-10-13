import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

// Réseaux de l'agence ZarogDev (standard maison)
const SOCIALS: { name: string; href: string; icon: ReactNode }[] = [
  {
    name: "GitHub",
    href: "https://github.com/ZarogDev/",
    icon: <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/saabri-el-haloui/",
    icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/zarogdev/",
    icon: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>,
  },
  {
    name: "Malt",
    href: "https://www.malt.fr/profile/zarogdev",
    icon: <><rect x="2" y="2" width="20" height="20" rx="6" /><path d="M7 16V8l5 5 5-5v8" /></>,
  },
];

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
        <ul className="flex gap-8 text-black/60" aria-label="Réseaux sociaux ZarogDev">
          {SOCIALS.map((s) => (
            <li key={s.name}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={`${s.name} — ZarogDev (nouvel onglet)`} className="hover:text-[#D4AF37] transition-colors">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
              </a>
            </li>
          ))}
        </ul>
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
          <Link href="/politique-de-confidentialite" className="hover:text-[#8a6d12] transition-colors">Confidentialité</Link>
          <Link href="/politique-de-confidentialite#cookies" className="hover:text-[#8a6d12] transition-colors">Cookies</Link>
        </nav>
        <p className="xl:text-right">
          design &amp; développement signés <strong className="font-bold text-black">ZarogDev.</strong>{" "}
          <a href="mailto:zarogdev@gmail.com" className="hover:text-[#8a6d12] transition-colors">contact@zarogdev.fr</a>
        </p>
      </div>
    </footer>
  );
}
