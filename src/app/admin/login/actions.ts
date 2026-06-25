"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { timingSafeEqual } from "crypto";

const SESSION_KEY = 'les-400-geeks-admin-session';

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
