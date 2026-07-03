# Les 400 Geeks

Site vitrine du restaurant "Les 400 Geeks", un concept qui fusionne haute gastronomie et culture vidéoludique (plats inspirés de Portal, Assassin's Creed, Dark Souls, etc.). Le site présente la carte du restaurant, permet aux clients de réserver une table (avec e-mail de confirmation automatique) et de laisser un avis via un "Grimoire" interactif. Un dashboard d'administration protégé permet au gérant de gérer la carte (ajout/édition/suppression des plats) en temps réel sans intervention technique.

## Stack technique

- Framework : Next.js 16.2.9 (App Router, Turbopack)
- Langage : TypeScript 5
- ORM : Prisma 7.8.0 (adapters `@prisma/adapter-neon` et `@prisma/adapter-pg`)
- Base de données : PostgreSQL (Neon), modèles `Review` (avis clients) et `MenuItem` (plats de la carte, images en Base64)
- Styling : Tailwind CSS 4, composants UI type shadcn (`src/components/ui`), animations Framer Motion, scroll fluide Lenis
- E-mails transactionnels : Resend (confirmation de réservation)
- Gestionnaire de paquets : npm (package-lock.json présent)
- Variables d'environnement requises (voir `.env.example`) :
  - `DATABASE_URL` — connexion poolée Neon utilisée par le runtime Next.js
  - `DIRECT_URL` — connexion directe utilisée par le CLI Prisma (migrate, db push, studio)
  - `ADMIN_PASSWORD` — mot de passe du dashboard admin
  - `RESEND_API_KEY` — clé API Resend pour l'envoi des e-mails de réservation
  - `RESEND_FROM_EMAIL` — adresse expéditeur vérifiée dans Resend

## Architecture

```
src/
├── app/
│   ├── page.tsx                    # Page d'accueil
│   ├── carte/                      # Carte gastronomique (plats depuis la BDD)
│   ├── reservation/                # Formulaire de réservation
│   ├── admin/                      # Dashboard admin (gestion de la carte)
│   │   └── login/                  # Authentification admin
│   ├── cgu/                        # Conditions générales d'utilisation
│   ├── mentions-legales/           # Mentions légales
│   ├── politique-confidentialite/  # Politique de confidentialité (RGPD)
│   ├── api/
│   │   ├── admin/menu/             # CRUD des plats (protégé, réservé à l'admin)
│   │   ├── menu/                   # Lecture publique de la carte
│   │   ├── reservation/            # Réception + envoi e-mail de réservation (Resend)
│   │   └── reviews/                # Lecture/écriture des avis (Grimoire)
│   ├── layout.tsx / template.tsx   # Layout global, transitions de page
│   ├── not-found.tsx               # Page 404 personnalisée
│   ├── robots.ts / sitemap.ts      # SEO
│   └── globals.css                 # Styles globaux Tailwind
├── components/
│   ├── Navbar.tsx, Footer.tsx      # Navigation et pied de page
│   ├── Grimoire.tsx                # Livre d'avis interactif
│   ├── CustomCursor.tsx            # Curseur personnalisé doré
│   ├── SmoothScroll.tsx, ScrollProgress.tsx  # Scroll fluide (Lenis) + indicateur
│   ├── SplashScreen.tsx, BackToTop.tsx       # Écran de chargement, retour en haut
│   ├── rgpd/CookieConsent.tsx      # Bandeau de consentement cookies
│   └── ui/                         # Composants UI réutilisables (bouton, etc.)
├── lib/
│   ├── prisma.ts                   # Client Prisma (adapter Neon/pg)
│   └── utils.ts                    # Fonctions utilitaires
├── generated/                      # Client Prisma généré
└── proxy.ts                        # Proxy applicatif
prisma/
├── schema.prisma                   # Modèles Review, MenuItem
└── seed.js                         # Script de seed initial de la carte
```

## Auteur

ZarogDev — 2026

## Démo en ligne

https://les-400-geeks.vercel.app

## Aperçu

![Aperçu de la page d'accueil](docs/screenshot-home.png)

## Scripts npm

- `npm run dev` — lance le serveur de développement (Turbopack)
- `npm run build` — génère le client Prisma puis build l'application (`prisma generate && next build`)
- `npm run start` — démarre l'application en mode production
- `npm run lint` — vérifie le code avec ESLint

### Initialisation de la base de données

```bash
npx prisma generate
node prisma/seed.js   # injecte la carte d'origine
```
