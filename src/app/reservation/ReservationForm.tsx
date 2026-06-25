"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function ReservationForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      size: formData.get("size"),
      date: formData.get("date"),
      notes: formData.get("notes"),
    };

    try {
      const res = await fetch("/api/reservation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError("Une erreur est survenue lors de votre réservation. Veuillez réessayer.");
      }
    } catch {
      setError("Erreur de connexion. Vérifiez votre réseau et réessayez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-32 px-4 pb-24 relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/navbar_bg.png"
          alt=""
          fill
          className="object-cover opacity-70"
          priority
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="max-w-4xl w-full z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-heading text-5xl md:text-7xl text-[#D4AF37] mb-6 drop-shadow-[0_5px_10px_rgba(0,0,0,0.8)]">
            Réserver votre Table
          </h1>
          <p className="font-sans text-white/90 text-lg md:text-xl font-light drop-shadow-md">
            Préparez-vous pour une quête gastronomique inoubliable.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="backdrop-blur-xl bg-black/40 p-16 shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-center border border-white/10 rounded-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
            <h2 className="font-heading text-4xl text-[#D4AF37] mb-6">Quête Acceptée !</h2>
            <p className="text-white/80 text-lg mb-8">Votre table est réservée. Notre guilde vous attend pour une soirée épique.</p>
            <button onClick={() => setSubmitted(false)} className="px-8 py-3 border border-[#D4AF37] text-sm uppercase tracking-widest text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors">
              Nouvelle réservation
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            onSubmit={handleSubmit}
            className="backdrop-blur-xl bg-[#0a0705]/60 p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col gap-10 border border-white/10 rounded-3xl relative"
          >
            <div className="absolute top-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
            <div className="absolute bottom-0 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
              <div className="flex flex-col gap-3">
                <label htmlFor="res-name" className="font-heading uppercase tracking-widest text-xs text-[#D4AF37]">Nom du Joueur</label>
                <input required id="res-name" type="text" name="name" className="border-b border-white/20 pb-3 bg-transparent text-white text-lg focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-white/30" placeholder="Votre nom" />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="res-email" className="font-heading uppercase tracking-widest text-xs text-[#D4AF37]">Email de Contact</label>
                <input required id="res-email" type="email" name="email" className="border-b border-white/20 pb-3 bg-transparent text-white text-lg focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-white/30" placeholder="email@exemple.com" />
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="res-size" className="font-heading uppercase tracking-widest text-xs text-[#D4AF37]">Taille de l'Équipe</label>
                <select id="res-size" name="size" required className="border-b border-white/20 pb-3 bg-transparent text-white text-lg focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none cursor-pointer">
                  <option className="bg-[#1c140d]">2 Personnes (Duo)</option>
                  <option className="bg-[#1c140d]">4 Personnes (Escouade)</option>
                  <option className="bg-[#1c140d]">6 Personnes ou plus (Raid)</option>
                </select>
              </div>
              <div className="flex flex-col gap-3">
                <label htmlFor="res-date" className="font-heading uppercase tracking-widest text-xs text-[#D4AF37]">Date de la Quête</label>
                <input required id="res-date" type="date" name="date" style={{ colorScheme: "dark" }} className="border-b border-white/20 pb-3 bg-transparent text-white text-lg focus:outline-none focus:border-[#D4AF37] transition-colors cursor-pointer" />
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-4">
              <label htmlFor="res-notes" className="font-heading uppercase tracking-widest text-xs text-[#D4AF37]">Allergies ou Demandes Spéciales</label>
              <textarea id="res-notes" name="notes" className="border-b border-white/20 pb-3 bg-transparent text-white text-lg focus:outline-none focus:border-[#D4AF37] transition-colors resize-none placeholder-white/30" rows={3} placeholder="Pas de potion rouge ?" />
            </div>

            {error && (
              <p role="alert" className="text-red-400 text-sm text-center border border-red-400/30 rounded-lg p-4">
                {error}
              </p>
            )}

            <div className="pt-8">
              <button type="submit" disabled={loading} className="w-full bg-[#D4AF37] text-black hover:bg-white hover:text-black py-5 font-heading text-lg tracking-widest uppercase transition-all duration-500 shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] disabled:opacity-50">
                {loading ? "Envoi du Corbeau..." : "Confirmer la Réservation"}
              </button>
            </div>
          </motion.form>
        )}
      </div>
    </div>
  );
}
