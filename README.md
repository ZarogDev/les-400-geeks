# Les 400 Geeks 🎮🍽️

Une fusion unique entre la haute gastronomie étoilée et la culture vidéoludique. Ce projet est une application web Next.js (App Router) conçue avec un design haut de gamme (Glassmorphism, animations fluides, UI/UX soignée).

## 🚀 Fonctionnalités

- **UI/UX Haut de Gamme :** Transitions de pages fluides (Framer Motion), Custom Cursor doré, scroll doux (Lenis), et navbar dynamique.
- **Le Grimoire Interactif :** Un livre de quêtes en 3D/CSS permettant de lire et laisser des avis, connecté à une base de données.
- **Carte Gastronomique Dynamique :** Présentation élégante des plats inspirés de jeux vidéos (Portal, Assassin's Creed, Dark Souls, etc.). Les plats sont générés dynamiquement depuis la base de données.
- **Dashboard Administrateur (/admin) :** Interface sécurisée (protégée par session cookie) permettant l'ajout, l'édition et la suppression des plats de la carte en temps réel.
- **Réservation Épique :** Formulaire de réservation en Glassmorphism relié à une API d'e-mail (Resend) pour les confirmations.
- **Optimisation SEO & A11y :** Structure sémantique, page 404 personnalisée, metadata complètes.

## 🛠️ Stack Technique

- **Framework :** Next.js 16.2 (App Router & Turbopack)
- **Styling :** Tailwind CSS 4
- **Animations :** Framer Motion & Lenis Scroll
- **Icônes :** Lucide React & React Icons
- **Backend & BDD :** Prisma ORM avec pilote `@prisma/adapter-pg`
- **Base de données :** PostgreSQL (hébergé sur Neon)
- **Emails :** Resend API

## 📦 Installation & Lancement

1. Clonez le dépôt GitHub.
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Configurez les variables d'environnement dans un fichier `.env` :
   ```env
   DATABASE_URL="postgresql://[user]:[password]@[host]:5432/[db]?schema=public"
   ADMIN_PASSWORD="votre_mot_de_passe_securise"
   ```
4. Initialisez la base de données (si ce n'est pas déjà fait) :
   ```bash
   npx prisma generate
   node prisma/seed.js  # Pour injecter la carte d'origine
   ```
5. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
   
Le site sera accessible sur `http://localhost:3000`.

## 🎨 Ligne Directrice Design

Le design doit toujours rester **épique mais subtil**. Pas de couleurs criardes typiques du "gaming". Nous utilisons :
- Une palette sombre (Noir `#0a0705`, Marron Cuir, Gris Anthracite).
- Des accents or/doré (`#D4AF37`) pour le luxe.
- Des textures subtiles (Bruit, Parchemin, Verre dépoli) et des effets de halo lumineux.

---
© 2026 ZarogDev. Agence digitale — design & développement signés ZarogDev. contact@zarogdev.fr
