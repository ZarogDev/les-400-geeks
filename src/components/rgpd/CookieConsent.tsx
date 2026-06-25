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
    <div className="fixed bottom-4 left-4 z-[9999] max-w-sm p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl flex flex-col gap-3 font-sans text-xs text-zinc-600 dark:text-zinc-300">
      <p className="leading-relaxed">
        Nous utilisons des cookies pour assurer le bon fonctionnement du site et améliorer votre expérience. <Link href="/politique-confidentialite" className="underline font-medium hover:text-zinc-900 dark:hover:text-white transition-colors">En savoir plus</Link>.
      </p>
      <div className="flex items-center gap-2 mt-1">
        <button onClick={acceptAll} className="flex-1 py-2 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg hover:opacity-90 transition-opacity font-medium">
          Accepter
        </button>
        <button onClick={declineAll} className="flex-1 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
          Refuser
        </button>
      </div>
    </div>
  );
}
