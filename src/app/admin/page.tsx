"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type MenuItem = {
  id?: string;
  title: string;
  description: string;
  hint: string;
  price: string;
  image: string;
  category: string;
  orderIndex: number;
};

export default function AdminDashboard() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [hint, setHint] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Entrée");
  const [image, setImage] = useState("");
  const [orderIndex, setOrderIndex] = useState(0);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/menu");
      const data = await res.json();
      setItems(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { title, description, hint, price, image, category, orderIndex };
    
    try {
      if (editingItem?.id) {
        // Update
        await fetch(`/api/admin/menu/${editingItem.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Create
        await fetch("/api/admin/menu", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      resetForm();
      fetchItems();
    } catch (error) {
      alert("Erreur lors de la sauvegarde.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Voulez-vous vraiment supprimer ce plat ?")) return;
    try {
      await fetch(`/api/admin/menu/${id}`, { method: "DELETE" });
      fetchItems();
    } catch (error) {
      alert("Erreur lors de la suppression.");
    }
  };

  const edit = (item: MenuItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setDescription(item.description);
    setHint(item.hint);
    setPrice(item.price);
    setCategory(item.category);
    setImage(item.image);
    setOrderIndex(item.orderIndex);
  };

  const resetForm = () => {
    setEditingItem(null);
    setTitle("");
    setDescription("");
    setHint("");
    setPrice("");
    setCategory("Entrée");
    setImage("");
    setOrderIndex(0);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] pt-32 pb-16 px-4 md:px-16 text-black font-sans">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        
        {/* Colonne Liste */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6">
          <h1 className="font-heading text-4xl md:text-5xl border-b border-black/10 pb-4">
            Gestion de la Carte
          </h1>
          
          {loading ? (
            <p className="italic text-black/50">Chargement des données...</p>
          ) : items.length === 0 ? (
            <p className="italic text-black/50">La carte est vide. Ajoutez votre premier plat !</p>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row items-center gap-6 bg-white p-4 shadow-sm border border-black/5 rounded-md">
                  {item.image && (
                    <div className="w-24 h-24 relative rounded-md overflow-hidden shrink-0 shadow-inner bg-black/5">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="bg-[#D4AF37] text-white text-[10px] uppercase font-bold px-2 py-1 rounded-sm">{item.category}</span>
                      <span className="text-black/40 text-xs">Ordre: {item.orderIndex}</span>
                    </div>
                    <h3 className="font-heading text-2xl">{item.title}</h3>
                    <p className="text-black/60 text-sm line-clamp-1">{item.description}</p>
                    <p className="font-heading text-lg mt-1">{item.price}</p>
                  </div>
                  <div className="flex flex-col md:flex-row gap-2 shrink-0">
                    <button onClick={() => edit(item)} className="px-4 py-2 bg-black text-white text-xs uppercase tracking-widest hover:bg-black/80 transition-colors rounded-sm">
                      Modifier
                    </button>
                    <button onClick={() => handleDelete(item.id!)} className="px-4 py-2 border border-red-500 text-red-500 text-xs uppercase tracking-widest hover:bg-red-50 transition-colors rounded-sm">
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Colonne Formulaire */}
        <div className="w-full lg:w-1/3 bg-white p-6 md:p-8 shadow-xl border border-black/5 rounded-md sticky top-32 h-fit">
          <h2 className="font-heading text-3xl mb-6">
            {editingItem ? "Modifier le Plat" : "Nouveau Plat"}
          </h2>
          
          <form onSubmit={handleSave} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase font-bold text-black/60 tracking-wider">Titre</label>
              <input required value={title} onChange={e => setTitle(e.target.value)} className="border border-black/20 p-2 rounded-sm focus:border-black focus:outline-none" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase font-bold text-black/60 tracking-wider">Catégorie</label>
              <select required value={category} onChange={e => setCategory(e.target.value)} className="border border-black/20 p-2 rounded-sm focus:border-black focus:outline-none bg-white">
                <option value="Mise en bouche">Mise en bouche</option>
                <option value="Entrée">Entrée</option>
                <option value="Plat">Plat</option>
                <option value="Dessert">Dessert</option>
                <option value="Élixir & Boisson">Élixir & Boisson</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase font-bold text-black/60 tracking-wider">Description</label>
              <textarea required rows={3} value={description} onChange={e => setDescription(e.target.value)} className="border border-black/20 p-2 rounded-sm focus:border-black focus:outline-none resize-none" />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase font-bold text-black/60 tracking-wider">Indice (Quête)</label>
              <input required value={hint} onChange={e => setHint(e.target.value)} className="border border-black/20 p-2 rounded-sm focus:border-black focus:outline-none" />
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-1 flex-1">
                <label className="text-xs uppercase font-bold text-black/60 tracking-wider">Prix (ex: 18€)</label>
                <input required value={price} onChange={e => setPrice(e.target.value)} className="border border-black/20 p-2 rounded-sm focus:border-black focus:outline-none" />
              </div>
              <div className="flex flex-col gap-1 w-24">
                <label className="text-xs uppercase font-bold text-black/60 tracking-wider">Ordre</label>
                <input type="number" required value={orderIndex} onChange={e => setOrderIndex(Number(e.target.value))} className="border border-black/20 p-2 rounded-sm focus:border-black focus:outline-none" />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs uppercase font-bold text-black/60 tracking-wider">Image (Upload direct)</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />
              {image && (
                <div className="mt-2 w-full h-32 relative rounded-sm overflow-hidden border border-black/10">
                  <Image src={image} alt="Preview" fill className="object-cover" />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <button type="submit" className="w-full bg-[#D4AF37] text-black font-heading uppercase py-3 tracking-widest hover:bg-black hover:text-white transition-colors shadow-md">
                {editingItem ? "Mettre à jour" : "Ajouter à la carte"}
              </button>
              {editingItem && (
                <button type="button" onClick={resetForm} className="w-full border border-black/20 text-black/60 font-sans py-2 hover:bg-black/5 transition-colors">
                  Annuler
                </button>
              )}
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
