import React from 'react';

export const metadata = {
  title: 'Politique de confidentialité et cookies',
  description: 'Politique de confidentialité et de cookies du site de démonstration Les 400 Geeks.',
};

const h2 = 'text-2xl font-semibold mb-4 text-black dark:text-white';
const cell = 'border border-black/15 dark:border-white/15 px-3 py-2 align-top';

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen pt-32 pb-16 px-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-4xl font-bold mb-12">Politique de confidentialité et cookies</h1>

      <div className="space-y-8 text-black/80 dark:text-white/80">
        <p className="border border-[#D4AF37]/60 p-4">
          Les 400 Geeks est un <strong>site de démonstration</strong> réalisé par ZarogDev. Merci de n&apos;y saisir
          que des informations fictives.
        </p>

        <section>
          <h2 className={h2}>1. Responsable du traitement</h2>
          <p>
            ZarogDev, Saabri EL HALOUI, EI — adresse : 25 rue de Warens, 73000 Chambéry — e-mail :{' '}
            <a href="mailto:zarogdev@gmail.com" className="underline">contact@zarogdev.fr</a>.
          </p>
        </section>

        <section>
          <h2 className={h2}>2. Données traitées, finalités et bases légales</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <strong>Réservation simulée</strong> (nom, e-mail, nombre de personnes, date, demandes particulières) :
              envoyer l&apos;e-mail de confirmation de démonstration à l&apos;adresse saisie. Ces données ne sont pas
              enregistrées en base de données. Base légale : intérêt légitime de ZarogDev à présenter son savoir-faire
              (art. 6.1.f RGPD). N&apos;indiquez aucune information de santé réelle (allergies) : ce sont des données
              sensibles (art. 9 RGPD).
            </li>
            <li>
              <strong>Avis du Grimoire</strong> (nom ou pseudonyme, texte, note) : publication immédiate et visible de
              tous. Base légale : intérêt légitime (art. 6.1.f RGPD).
            </li>
            <li>
              <strong>Espace d&apos;administration</strong> (cookie de session) : sécuriser l&apos;accès. Base
              légale : intérêt légitime (art. 6.1.f RGPD).
            </li>
            <li>
              <strong>Journaux techniques</strong> de l&apos;hébergeur (adresse IP, date, page demandée) : sécurité
              et bon fonctionnement. Base légale : intérêt légitime (art. 6.1.f RGPD).
            </li>
          </ul>
          <p className="mt-4">Aucune donnée n&apos;est vendue, ni utilisée à des fins publicitaires ou de profilage.</p>
        </section>

        <section>
          <h2 className={h2}>3. Durées de conservation</h2>
          <p>
            Réservations : non conservées par le site (l&apos;e-mail envoyé reste dans les journaux d&apos;envoi de
            Resend selon sa politique). Avis : tant qu&apos;ils sont affichés, et au plus 3 ans, ou jusqu&apos;à votre
            demande de suppression. Journaux de l&apos;hébergeur : selon la politique de Vercel.
          </p>
        </section>

        <section>
          <h2 className={h2}>4. Destinataires et sous-traitants</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Vercel Inc. (États-Unis) : hébergement du site.</li>
            <li>Neon (base de données PostgreSQL, avis et carte) : région d&apos;hébergement [À COMPLÉTER].</li>
            <li>Resend (États-Unis) : envoi de l&apos;e-mail de confirmation.</li>
          </ul>
          <p className="mt-4">
            Transferts hors de l&apos;Union européenne : les prestataires américains sont encadrés par le cadre de
            protection des données UE-États-Unis (Data Privacy Framework) lorsqu&apos;ils y sont certifiés, ou à défaut
            par les clauses contractuelles types de la Commission européenne.
          </p>
        </section>

        <section>
          <h2 className={h2}>5. Vos droits</h2>
          <p>
            Vous disposez des droits d&apos;accès, de rectification, d&apos;effacement, de limitation,
            d&apos;opposition et de portabilité, ainsi que du droit de définir des directives sur le sort de vos données
            après votre décès (art. 15 à 21 RGPD ; art. 85 de la loi Informatique et Libertés). Pour faire supprimer un
            avis ou exercer vos droits, écrivez à{' '}
            <a href="mailto:zarogdev@gmail.com" className="underline">contact@zarogdev.fr</a>. Vous pouvez aussi
            adresser une réclamation à la CNIL (<a href="https://www.cnil.fr" className="underline">cnil.fr</a>).
          </p>
        </section>

        <section id="cookies">
          <h2 className={h2}>6. Cookies et stockage local</h2>
          <p className="mb-4">
            Ce site n&apos;utilise <strong>aucun cookie publicitaire ni de mesure d&apos;audience</strong>. Il ne
            dépose que des traceurs strictement nécessaires, exemptés de consentement (art. 82 de la loi Informatique
            et Libertés) :
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr><th className={cell}>Nom</th><th className={cell}>Émetteur</th><th className={cell}>Finalité</th><th className={cell}>Durée</th></tr>
              </thead>
              <tbody>
                <tr><td className={cell}>cookie-consent (stockage local)</td><td className={cell}>Les 400 Geeks</td><td className={cell}>Ne plus afficher le bandeau d&apos;information</td><td className={cell}>6 mois</td></tr>
                <tr><td className={cell}>admin_session (cookie)</td><td className={cell}>Les 400 Geeks</td><td className={cell}>Session de l&apos;espace d&apos;administration uniquement</td><td className={cell}>7 jours</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <p className="text-sm">Dernière mise à jour : 12 octobre 2026.</p>
      </div>
    </div>
  );
}
