import React from 'react';

export const metadata = {
  title: 'Mentions Légales',
  description: 'Mentions légales du site',
};

export default function MentionsLegales() {
  return (
    <div className="min-h-screen pt-32 pb-16 px-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-4xl font-bold mb-12">Mentions Légales</h1>
      
      <div className="space-y-8 text-black/80 dark:text-white/80">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">1. Éditeur du site</h2>
          <p>Le présent site est édité par l'agence web <strong>ZarogDev</strong>.</p>
          <p>Email : <a href="mailto:contact@zarogdev.fr" className="underline">contact@zarogdev.fr</a></p>
          <p>Site web : <a href="https://zarogdev.fr" className="underline">zarogdev.fr</a></p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">2. Hébergement</h2>
          <p>Le site est hébergé par <strong>Vercel Inc.</strong></p>
          <p>340 S Lemon Ave #4133 Walnut, CA 91789, États-Unis.</p>
          <p>Site web : <a href="https://vercel.com" className="underline">vercel.com</a></p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">3. Propriété intellectuelle</h2>
          <p>La structure générale du site, ainsi que les textes, graphiques, images, sons et vidéos la composant, sont la propriété de l'éditeur ou de ses partenaires. Toute représentation et/ou reproduction et/ou exploitation partielle ou totale des contenus et services proposés par le site, par quelque procédé que ce soit, sans l'autorisation préalable et par écrit de l'éditeur et/ou de ses partenaires est strictement interdite et serait susceptible de constituer une contrefaçon au sens des articles L 335-2 et suivants du Code de la propriété intellectuelle.</p>
        </section>
      </div>
    </div>
  );
}
