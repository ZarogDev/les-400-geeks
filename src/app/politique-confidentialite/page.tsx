import React from 'react';

export const metadata = {
  title: 'Politique de Confidentialité',
  description: 'Politique de confidentialité et protection des données',
};

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen pt-32 pb-16 px-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-4xl font-bold mb-12">Politique de Confidentialité</h1>
      
      <div className="space-y-8 text-black/80 dark:text-white/80">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">1. Collecte des données personnelles</h2>
          <p>Nous pouvons recueillir des informations personnelles telles que votre nom, votre adresse e-mail, etc. Ces informations sont collectées lorsque vous utilisez nos formulaires de contact ou nos services en ligne.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">2. Utilisation des données</h2>
          <p>Les données collectées sont utilisées uniquement pour :</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Vous fournir les services demandés.</li>
            <li>Répondre à vos demandes de contact.</li>
            <li>Améliorer l'expérience utilisateur de notre site.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">3. Protection des données</h2>
          <p>Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre l'accès, la modification, la divulgation ou la destruction non autorisés.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">4. Partage des données</h2>
          <p>Nous ne vendons, n'échangeons ni ne louons vos données personnelles à des tiers. Nous pouvons partager des informations avec des prestataires de services de confiance pour nous aider à exploiter notre site Web ou mener nos affaires, tant que ces parties acceptent de garder ces informations confidentielles.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">5. Vos droits (RGPD)</h2>
          <p>Conformément à la réglementation européenne en vigueur (RGPD), vous disposez des droits suivants concernant vos données personnelles :</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Droit d'accès et de rectification.</li>
            <li>Droit d'effacement de vos données.</li>
            <li>Droit de retirer votre consentement à tout moment.</li>
          </ul>
          <p className="mt-4">Pour exercer ces droits, veuillez nous contacter à l'adresse suivante : <a href="mailto:contact@zarogdev.fr" className="underline">contact@zarogdev.fr</a>.</p>
        </section>
        
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">6. Cookies</h2>
          <p>Notre site utilise des cookies pour améliorer votre expérience. Un bandeau de consentement vous permet d'accepter ou de refuser ces cookies lors de votre première visite.</p>
        </section>
      </div>
    </div>
  );
}
