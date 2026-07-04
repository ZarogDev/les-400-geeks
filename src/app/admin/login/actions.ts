"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { timingSafeEqual } from "crypto";

const SESSION_KEY = 'les-400-geeks-admin-session';

// Rate limiting best-effort en mémoire (protège contre le brute-force sur ADMIN_PASSWORD).
// Limite : par instance de process (non partagé multi-instances serverless), mais réduit
// fortement les attaques automatisées simples. Voir escalade sécurité pour une solution
// distribuée (ex: Upstash) si le trafic multi-instance devient un problème réel.
const LOGIN_ATTEMPT_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_ATTEMPT_MAX = 5;
const loginAttempts = new Map<string, { count: number; firstAttempt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = loginAttempts.get(ip);
  if (!entry || now - entry.firstAttempt > LOGIN_ATTEMPT_WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, firstAttempt: now });
    return false;
  }
  entry.count += 1;
  return entry.count > LOGIN_ATTEMPT_MAX;
}

function safeCompare(a: string, b: string): boolean {
  const maxLen = Math.max(a.length, b.length, 1);
  const bufA = Buffer.alloc(maxLen, 0);
  const bufB = Buffer.alloc(maxLen, 0);
  Buffer.from(a).copy(bufA, 0, 0, Math.min(a.length, maxLen));
  Buffer.from(b).copy(bufB, 0, 0, Math.min(b.length, maxLen));
  return timingSafeEqual(bufA, bufB) && a.length === b.length;
}

async function computeSessionToken(password: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(password), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(SESSION_KEY));
  return Array.from(new Uint8Array(sig)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function loginAction(password: string) {
  const headerStore = await headers();
  const ip = headerStore.get('x-forwarded-for')?.split(',')[0].trim() || headerStore.get('x-real-ip') || 'unknown';

  if (isRateLimited(ip)) {
    return { error: "Trop de tentatives. Réessayez plus tard." };
  }

  const validPassword = process.env.ADMIN_PASSWORD;
  if (!validPassword) return { error: "Configuration serveur incorrecte." };

  if (!safeCompare(password, validPassword)) {
    return { error: "Mot de passe incorrect. Le grimoire reste fermé." };
  }

  const sessionToken = await computeSessionToken(validPassword);
  const cookieStore = await cookies();
  cookieStore.set('admin_session', sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  });

  redirect('/admin');
}
