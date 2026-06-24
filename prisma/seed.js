require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const menuItems = [
  {
    title: "La Potion Rouge",
    description: "Amuse-bouche : Sphère de tomate confite au basilic, éclatant en bouche avec une liqueur douce.",
    hint: "Quête : Restaure 50 cœurs instantanément.",
    price: "18€",
    image: "/images/potion.png",
    category: "Mise en bouche",
    orderIndex: 1
  },
  {
    title: "Le Souffle de la Nature",
    description: "Consommé de champignons sauvages, herbes fraîches, et brume fumée au bois de hêtre.",
    hint: "Quête : Une mélodie jouée sur un ocarina réveille cette forêt.",
    price: "32€",
    image: "/images/hero.png",
    category: "Entrée",
    orderIndex: 2
  },
  {
    title: "L'Épice de Shai-Hulud",
    description: "Saint-Jacques snackées, déclinaison de carottes au cumin, sabayon safrané.",
    hint: "Quête : Celui qui contrôle ce plat contrôle l'univers.",
    price: "36€",
    image: "/images/dune.png",
    category: "Entrée",
    orderIndex: 3
  },
  {
    title: "L'Anneau de Halo",
    description: "Couronne d'agneau rôtie basse température, purée d'artichauts, jus corsé à l'ail noir.",
    hint: "Quête : Protégez l'humanité de l'Alliance Covenante.",
    price: "45€",
    image: "/images/halo.png", 
    category: "Plat",
    orderIndex: 4
  },
  {
    title: "Le Léviathan",
    description: "Filet de bar de ligne nacré, écume d'eau de mer, algues wakamé et perles de yuzu.",
    hint: "Quête : Ne nagez pas trop profond sur la planète 4546B...",
    price: "42€",
    image: "/images/leviathan.png", 
    category: "Plat",
    orderIndex: 5
  },
  {
    title: "L'Éclat de Matéria",
    description: "Sphère parfaite en trompe-l'œil, cœur coulant yuzu et menthe glaciale, coque émeraude luminescente sur un crumble volcanique au sésame noir.",
    hint: "Quête : Équipez cette sphère dans votre épée broyeuse pour lancer une magie dévastatrice.",
    price: "28€",
    image: "/images/ff7.png", 
    category: "Dessert",
    orderIndex: 6
  },
  {
    title: "Le Cube de Compagnie",
    description: "Entremet géométrique parfait, mousse litchi, cœur framboise et glaçage miroir.",
    hint: "Quête : Le gâteau n'est peut-être pas un mensonge après tout.",
    price: "24€",
    image: "/images/portal.png", 
    category: "Dessert",
    orderIndex: 7
  },
  {
    title: "La Pomme d'Eden",
    description: "Pomme confite au caramel beurre salé, coque en chocolat rubis, insert praliné croustillant.",
    hint: "Quête : Un puissant artefact de la Première Civilisation.",
    price: "26€",
    image: "/images/eden.png",
    category: "Dessert",
    orderIndex: 8
  },
  {
    title: "Nuka-Cola Quantum",
    description: "Cocktail signature bleu luminescent : Gin, curaçao, citron vert et soda artisanal.",
    hint: "Quête : La boisson rafraîchissante des Terres Désolées (Zéro Radiation).",
    price: "16€",
    image: "/images/nuka.png",
    category: "Élixir & Boisson",
    orderIndex: 9
  },
  {
    title: "Flasque d'Estus",
    description: "Infusion ardente : Whisky tourbé, sirop de miel épicé, bitter orange et fumée de cannelle.",
    hint: "Quête : Reposez-vous au feu de camp pour remplir cette flasque.",
    price: "18€",
    image: "/images/estus.png",
    category: "Élixir & Boisson",
    orderIndex: 10
  }
];

async function main() {
  console.log("Clearing and seeding database...");
  await prisma.menuItem.deleteMany({});
  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: item
    });
  }
  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
