"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('cookie-consent')) setShow(true);
  }, []);

  const accept = () => { localStorage.setItem('cookie-consent', 'accepted'); setShow(false); };
  const decline = () => { localStorage.setItem('cookie-consent', 'declined'); setShow(false); };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Consentement cookies"
      className="fixed bottom-5 right-5 z-[9999] max-w-[300px]"
    >
      <div
        className="p-5 flex flex-col gap-3.5"
        style={{
          background: '#e8e8e8',
          borderTop: '3px solid #D4AF37',
          boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
        }}
      >
        <p className="font-sans text-[11.5px] leading-relaxed text-black/60">
          Cookies pour le bon fonctionnement du site.{' '}
          <Link href="/politique-confidentialite" className="text-[#D4AF37] underline underline-offset-2 hover:text-[#b8982e] transition-colors">
            En savoir plus
          </Link>
        </p>
        <div className="flex gap-2">
          <button
            onClick={accept}
            className="flex-1 py-2 font-bold text-[10.5px] uppercase tracking-wider transition-opacity hover:opacity-85"
            style={{ background: '#D4AF37', color: '#121212' }}
          >
            Accepter
          </button>
          <button
            onClick={decline}
            className="flex-1 py-2 text-[10.5px] uppercase tracking-wider text-black/35 border border-black/15 hover:text-black/60 transition-colors"
          >
            Refuser
          </button>
        </div>
      </div>
    </div>
  );
}
