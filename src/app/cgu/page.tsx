import React from 'react';

export const metadata = {
  title: 'Conditions Générales d\'Utilisation',
  description: 'Conditions Générales d\'Utilisation (CGU)',
};

export default function CGU() {
  return (
    <div className="min-h-screen pt-32 pb-16 px-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-4xl font-bold mb-12">Conditions Générales d'Utilisation (CGU)</h1>
      
      <div className="space-y-8 text-black/80 dark:text-white/80">
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">1. Objet</h2>
          <p>Les présentes Conditions Générales d'Utilisation ont pour objet de définir les modalités de mise à disposition des services du site et les conditions d'utilisation par l'utilisateur.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">2. Accès au site</h2>
          <p>L'éditeur s'efforce de permettre l'accès au site 24 heures sur 24, 7 jours sur 7, sauf en cas de force majeure ou d'un événement hors de son contrôle, et sous réserve des éventuelles pannes et interventions de maintenance nécessaires au bon fonctionnement du site et des services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">3. Responsabilité de l'utilisateur</h2>
          <p>L'utilisateur est seul responsable de l'utilisation qu'il fait des informations et services disponibles sur le site. Il s'engage à n'effectuer aucune action pouvant nuire au bon fonctionnement du site.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">4. Modification des CGU</h2>
          <p>L'éditeur se réserve le droit de modifier, à tout moment et sans préavis, les présentes conditions d'utilisation afin de les adapter aux évolutions du site et/ou de son exploitation.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-white">5. Droit applicable</h2>
          <p>Tant le présent site que les modalités et conditions de son utilisation sont régis par le droit français, quel que soit le lieu d'utilisation. En cas de contestation éventuelle, et après l'échec de toute tentative de recherche d'une solution amiable, les tribunaux français seront seuls compétents pour connaître de ce litige.</p>
        </section>
      </div>
    </div>
  );
}
