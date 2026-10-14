"use client";
import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';

// Le site ne dépose aucun traceur soumis à consentement (pas d'analytics ni de publicité) :
// ce bandeau est purement informatif. Le choix est mémorisé 6 mois (recommandation CNIL).
const KEY = 'cookie-consent';
const SIX_MONTHS = 1000 * 60 * 60 * 24 * 182;

// Lecture côté client uniquement (false au rendu serveur et à l'hydratation).
const subscribe = () => () => {};
function needsBanner() {
  let seenAt = 0;
  try {
    seenAt = Number(JSON.parse(localStorage.getItem(KEY) ?? '{}').at ?? 0);
  } catch {
    seenAt = 0;
  }
  return !seenAt || Date.now() - seenAt > SIX_MONTHS;
}

export default function CookieConsent() {
  const shouldShow = useSyncExternalStore(subscribe, needsBanner, () => false);
  const [dismissed, setDismissed] = useState(false);
  const show = shouldShow && !dismissed;

  const close = () => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ value: 'informed', at: Date.now() }));
    } catch {}
    setDismissed(true);
  };

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Information sur les cookies"
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
        <p className="font-sans text-[11.5px] leading-relaxed text-black/70">
          Aucun cookie publicitaire ni de mesure d&apos;audience sur ce site de démonstration : seulement le strict
          nécessaire.{' '}
          <Link href="/politique-de-confidentialite#cookies" className="text-[#8a6d12] underline underline-offset-2 hover:text-black transition-colors">
            En savoir plus
          </Link>
        </p>
        <button
          onClick={close}
          className="py-2 font-bold text-[10.5px] uppercase tracking-wider transition-opacity hover:opacity-85"
          style={{ background: '#D4AF37', color: '#121212' }}
        >
          J&apos;ai compris
        </button>
      </div>
    </div>
  );
}
