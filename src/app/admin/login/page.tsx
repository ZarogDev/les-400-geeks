"use client";

import { useState } from "react";
import Image from "next/image";
import { loginAction } from "./actions";
import { motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const result = await loginAction(password);
    
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
    // Si succès, la redirection est gérée par le Server Action
  };

  return (
    <div className="flex min-h-screen bg-[#0a0705] font-sans">
      
      {/* Panneau Gauche : Image */}
      <div className="hidden lg:block lg:w-1/2 relative bg-black overflow-hidden shadow-[20px_0_50px_rgba(0,0,0,0.5)] z-20">
        <div className="absolute inset-0 bg-gradient-to-l from-[#0a0705] via-transparent to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(10,7,5,0.6)_100%)] z-10 pointer-events-none" />
        
        <Image 
          src="/images/login-bg.png" 
          alt="Gastronomie Geek"
          fill
          className="object-cover opacity-80"
          priority
        />
        
        <div className="absolute bottom-12 left-12 z-20 text-left">
          <p className="font-heading text-3xl text-white/90 drop-shadow-lg">Les 400 Geeks</p>
          <p className="font-sans text-[#D4AF37] tracking-[0.3em] uppercase text-xs mt-2 drop-shadow-md">Dashboard Administrateur</p>
        </div>
      </div>

      {/* Panneau Droit : Formulaire */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 md:px-24 xl:px-32 relative z-10">
        
        {/* Retour au site */}
        <Link href="/" className="absolute top-8 right-8 text-white/50 hover:text-[#D4AF37] transition-colors flex items-center gap-2 text-sm uppercase tracking-widest">
          Retour à l'accueil <ArrowRight size={16} />
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full"
        >
          
          <h1 className="font-heading text-4xl md:text-5xl text-white mb-12">Accès Restreint</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="admin-password" className="block text-sm uppercase tracking-widest text-white/50 mb-3">
                Mot de passe administrateur
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all placeholder:text-white/20 text-lg tracking-widest"
                  placeholder="••••••••••••"
                  autoFocus
                />
              </div>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-red-400 text-sm mt-3 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block"></span>
                  {error}
                </motion.p>
              )}
            </div>

            <button 
              type="submit" 
              disabled={loading || !password}
              className="w-full bg-[#D4AF37] hover:bg-[#b5952f] text-[#0a0705] font-bold uppercase tracking-widest py-4 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed group mt-8"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  Déverrouiller <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
      
    </div>
  );
}
