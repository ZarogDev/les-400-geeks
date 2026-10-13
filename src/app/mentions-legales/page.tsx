import React from 'react';

export const metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales du site de démonstration Les 400 Geeks, réalisé par ZarogDev.',
};

const h2 = 'text-2xl font-semibold mb-4 text-black dark:text-white';

export default function MentionsLegales() {
  return (
    <div className="min-h-screen pt-32 pb-16 px-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-4xl font-bold mb-12">Mentions légales</h1>

      <div className="space-y-8 text-black/80 dark:text-white/80">
        <p>
          Informations publiées en application de l&apos;article 1-1 de la loi n° 2004-575 du 21 juin 2004 pour la
          confiance dans l&apos;économie numérique (LCEN).
        </p>

        <section>
          <h2 className={h2}>1. Éditeur du site</h2>
          <p>
            Saabri EL HALOUI, entrepreneur individuel (EI), nom commercial <strong>ZarogDev</strong><br />
            Statut : Entreprise individuelle<br />
            SIREN / SIRET : [À COMPLÉTER, si activité professionnelle déclarée]<br />
            Adresse : 25 rue de Warens, 73000 Chambéry, France<br />
            Téléphone : <a href="tel:+33652268275" className="underline">06 52 26 82 75</a><br />
            E-mail : <a href="mailto:zarogdev@gmail.com" className="underline">contact@zarogdev.fr</a><br />
            TVA non applicable, art. 293 B du CGI.
          </p>
          <p className="mt-4 border border-[#D4AF37]/60 p-4">
            <strong>Site de démonstration réalisé par ZarogDev.</strong> Les 400 Geeks est une marque fictive ; aucun
            restaurant n&apos;existe et aucune réservation réelle n&apos;est effectuée. La carte, les prix et les avis par
            défaut sont imaginaires.
          </p>
        </section>

        <section>
          <h2 className={h2}>2. Directeur de la publication</h2>
          <p>Saabri EL HALOUI.</p>
        </section>

        <section>
          <h2 className={h2}>3. Hébergement</h2>
          <p>
            <strong>Vercel Inc.</strong><br />
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis<br />
            Site : <a href="https://vercel.com" className="underline">vercel.com</a> — Contact :{' '}
            <a href="https://vercel.com/help" className="underline">vercel.com/help</a><br />
            Base de données : Neon (PostgreSQL managé).
          </p>
        </section>

        <section>
          <h2 className={h2}>4. Conception &amp; développement</h2>
          <p>
            ZarogDev — Agence digitale — design &amp; développement signés ZarogDev. Saabri EL HALOUI, entrepreneur
            individuel (EI), 25 rue de Warens, 73000 Chambéry, France. Téléphone : 06 52 26 82 75 — e-mail :{' '}
            <a href="mailto:zarogdev@gmail.com" className="underline">contact@zarogdev.fr</a> — site :{' '}
            <a href="https://zarogdev.fr" target="_blank" rel="noopener noreferrer" className="underline">zarogdev.fr</a>.
          </p>
        </section>

        <section>
          <h2 className={h2}>5. Propriété intellectuelle</h2>
          <p>
            La conception, le code, la charte graphique et les textes de ce site sont la propriété de ZarogDev. Toute
            reproduction ou représentation, totale ou partielle, sans autorisation écrite préalable est interdite et
            constituerait une contrefaçon (art. L122-4 et L335-2 et suivants du Code de la propriété intellectuelle).
          </p>
          <p className="mt-4">
            Les noms de jeux vidéo et d&apos;univers évoqués par la carte (Portal, Dark Souls, Final Fantasy, Halo,
            Fallout, Dune, etc.) sont des marques ou des œuvres appartenant à leurs titulaires respectifs. Ils sont cités
            à titre de clin d&apos;œil, sans lien d&apos;affiliation, de partenariat ni d&apos;approbation de leur part.
          </p>
          <p className="mt-4">
            Visuels (plats, salle, logo) : visuels de démonstration de ZarogDev. Polices Playfair Display et Outfit :
            Google Fonts, licence SIL Open Font License 1.1, servies depuis le site lui-même. Icônes : Lucide (licence
            ISC) et React Icons.
          </p>
        </section>

        <section>
          <h2 className={h2}>6. Données personnelles et cookies</h2>
          <p>
            Voir la <a href="/politique-de-confidentialite" className="underline">politique de confidentialité et cookies</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
