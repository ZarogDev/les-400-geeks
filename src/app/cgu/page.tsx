import React from 'react';

export const metadata = {
  title: "Conditions générales d'utilisation",
  description: "Conditions générales d'utilisation du site de démonstration Les 400 Geeks.",
};

const h2 = 'text-2xl font-semibold mb-4 text-black dark:text-white';

export default function CGU() {
  return (
    <div className="min-h-screen pt-32 pb-16 px-6 max-w-4xl mx-auto font-sans">
      <h1 className="text-4xl font-bold mb-12">Conditions générales d&apos;utilisation (CGU)</h1>

      <div className="space-y-8 text-black/80 dark:text-white/80">
        <p className="border border-[#D4AF37]/60 p-4">
          <strong>Site de démonstration réalisé par ZarogDev.</strong> Les 400 Geeks est une marque fictive : aucun
          repas n&apos;est vendu et aucune table n&apos;est réservée. Merci de ne saisir que des informations fictives.
        </p>

        <section>
          <h2 className={h2}>1. Objet</h2>
          <p>
            Les présentes CGU encadrent l&apos;utilisation du site Les 400 Geeks, édité par ZarogDev (voir les{' '}
            <a href="/mentions-legales" className="underline">mentions légales</a>). Utiliser le site implique
            d&apos;en accepter les conditions.
          </p>
        </section>

        <section>
          <h2 className={h2}>2. Réservation simulée</h2>
          <p>
            Le formulaire de réservation illustre un parcours de réservation. Il envoie un e-mail de confirmation à
            l&apos;adresse saisie, mais aucune table n&apos;est réservée et aucun engagement n&apos;est pris. N&apos;indiquez
            pas l&apos;adresse e-mail d&apos;un tiers sans son accord, ni d&apos;information de santé réelle (allergies).
          </p>
        </section>

        <section>
          <h2 className={h2}>3. Avis publiés dans le Grimoire</h2>
          <p>
            Les avis sont publiés sous la responsabilité de leur auteur. Sont interdits les contenus illicites,
            injurieux, diffamatoires, discriminatoires, publicitaires, ou contenant des données personnelles de tiers.
            ZarogDev retire les contenus contraires à ces règles dès qu&apos;il en a connaissance ; un avis négatif mais
            sincère n&apos;est pas retiré pour ce seul motif. En publiant un avis, vous garantissez en être l&apos;auteur
            et autorisez ZarogDev à l&apos;afficher sur ce site, à titre gratuit, pour la durée de la démonstration.
          </p>
        </section>

        <section>
          <h2 className={h2}>4. Signalement et recours</h2>
          <p>
            Pour signaler un contenu que vous estimez illicite, écrivez à{' '}
            <a href="mailto:zarogdev@gmail.com" className="underline">contact@zarogdev.fr</a> en indiquant le contenu
            concerné, les raisons du signalement, vos nom et e-mail, et en déclarant de bonne foi l&apos;exactitude de
            ces informations (règlement (UE) 2022/2065 sur les services numériques, art. 16). Chaque signalement reçoit
            une réponse ; si un contenu est retiré, son auteur peut demander les motifs de la décision et la contester à
            la même adresse (art. 17).
          </p>
        </section>

        <section>
          <h2 className={h2}>5. Responsabilité</h2>
          <p>
            ZarogDev s&apos;efforce d&apos;assurer la disponibilité du site sans pouvoir la garantir. Le contenu étant
            fictif, il ne constitue ni une offre commerciale ni une information sur un restaurant réel.
            L&apos;utilisateur s&apos;engage à ne rien faire qui puisse nuire au bon fonctionnement du site.
          </p>
        </section>

        <section>
          <h2 className={h2}>6. Modification et droit applicable</h2>
          <p>
            Les CGU peuvent évoluer ; la version en ligne fait foi. Elles sont régies par le droit français. En cas de
            litige, une solution amiable est recherchée avant toute action ; à défaut, les tribunaux français sont
            compétents.
          </p>
        </section>

        <p className="text-sm">Dernière mise à jour : 12 octobre 2026.</p>
      </div>
    </div>
  );
}
