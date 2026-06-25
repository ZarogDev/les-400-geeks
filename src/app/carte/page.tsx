import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import CarteClient from "./CarteClient";

export const metadata: Metadata = {
  title: "La Carte | Les 400 Geeks",
  description: "Découvrez notre carte gastronomique : entrées, plats, desserts et élixirs inspirés des univers vidéoludiques. Une expérience culinaire épique.",
  alternates: { canonical: "https://les-400-geeks.vercel.app/carte" },
};

function groupByCategory(items: { category: string; title: string; description: string; price: string }[]) {
  const map = new Map<string, typeof items>();
  for (const item of items) {
    if (!map.has(item.category)) map.set(item.category, []);
    map.get(item.category)!.push(item);
  }
  return Array.from(map.entries()).map(([category, items]) => ({ category, items }));
}

export default async function CartePage() {
  const menuItems = await prisma.menuItem.findMany({ orderBy: { orderIndex: 'asc' } });

  if (!menuItems.length) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#FAFAFA] text-center px-4">
        <h1 className="font-heading text-4xl text-black/50 animate-pulse">La carte est en cours de création...</h1>
        <p className="font-sans text-black/70 mt-4 italic">Nos mages préparent les ingrédients.</p>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Menu",
    "name": "La Carte des 400 Geeks",
    "description": "Menu gastronomique inspiré des univers vidéoludiques",
    "inLanguage": "fr",
    "hasMenuSection": groupByCategory(menuItems).map(({ category, items }) => ({
      "@type": "MenuSection",
      "name": category,
      "hasMenuItem": items.map(item => ({
        "@type": "MenuItem",
        "name": item.title,
        "description": item.description,
        "offers": {
          "@type": "Offer",
          "price": item.price.replace(/[^0-9.,]/g, ''),
          "priceCurrency": "EUR"
        }
      }))
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CarteClient menuItems={menuItems} />
    </>
  );
}
