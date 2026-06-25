"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  };

  const declineAll = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 bg-[#0a0a0a] border-t border-white/10 text-white shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-sm">
      <div className="flex-1 max-w-4xl mx-auto">
        <p className="opacity-80 leading-relaxed">
          Nous utilisons des cookies pour assurer le bon fonctionnement du site, mesurer notre audience et améliorer votre expérience. Vous pouvez personnaliser vos choix ou accepter tous les cookies. En savoir plus sur notre <Link href="/politique-confidentialite" className="underline hover:text-white/80 transition-colors">Politique de confidentialité</Link>.
        </p>
      </div>
      <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
        <button onClick={declineAll} className="px-4 py-2 border border-white/20 rounded-md hover:bg-white/5 transition-colors whitespace-nowrap">
          Tout refuser
        </button>
        <button onClick={acceptAll} className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition-colors whitespace-nowrap font-medium">
          Tout accepter
        </button>
      </div>
    </div>
  );
}
