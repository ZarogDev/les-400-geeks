"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(password: string) {
  const validPassword = process.env.ADMIN_PASSWORD;

  if (password === validPassword) {
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 semaine
      path: '/',
    });

    redirect('/admin');
  } else {
    return { error: "Mot de passe incorrect. Le grimoire reste fermé." };
  }
}
