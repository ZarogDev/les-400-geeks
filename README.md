# Les 400 Geeks 🎮🍽️

Une fusion unique entre la haute gastronomie étoilée et la culture vidéoludique. Ce projet est une application web Next.js 14+ (App Router) conçue avec un design haut de gamme (Glassmorphism, animations fluides, UI/UX soignée).

## 🚀 Fonctionnalités

- **UI/UX Haut de Gamme :** Transitions de pages fluides (Framer Motion), Custom Cursor doré, barre de progression de défilement.
- **Le Grimoire Interactif :** Un livre de quêtes en 3D/CSS permettant de lire et laisser des avis. Connecté à une base de données.
- **Carte Gastronomique :** Présentation élégante des plats inspirés de jeux vidéos célèbres (Portal, Assassin's Creed, Final Fantasy VII, Dark Souls, etc.).
- **Réservation Épique :** Formulaire de réservation en Glassmorphism relié à une API d'e-mail (Resend) pour les confirmations.
- **Optimisation SEO & A11y :** Parfaitement structuré pour les moteurs de recherche (Sitemap, OpenGraph, Schema.org) et accessible (WCAG).

## 🛠️ Stack Technique

- **Framework :** Next.js 14 (App Router)
- **Styling :** Tailwind CSS
- **Animations :** Framer Motion
- **Icônes :** Lucide React & React Icons
- **Backend & BDD :** Prisma ORM (SQLite / PostgreSQL)
- **Emails :** Resend API
- **Déploiement :** Vercel

## 📦 Installation & Lancement

1. Clonez le dépôt GitHub.
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Configurez les variables d'environnement (Créez un fichier `.env.local` en vous basant sur `.env.example`).
4. Initialisez la base de données :
   ```bash
   npx prisma generate
   npx prisma db push
   ```
5. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
   
Le site sera accessible sur `http://localhost:3000`.

## 🎨 Ligne Directrice Design

Le design doit toujours rester **épique mais subtil**. Pas de couleurs criardes typiques du "gaming". Nous utilisons :
- Une palette sombre (Noir, Marron Cuir, Gris Anthracite).
- Des accents or/doré (`#D4AF37`) pour le luxe.
- Des textures subtiles (Bruit, Parchemin, Verre dépoli).

---
© 2026 ZarogDev. Agence digitale — design & développement signés ZarogDev. contact@zarogdev.fr
