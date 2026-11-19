import { NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

// Limites en mémoire, best-effort (par instance, comme pour la connexion admin) :
// par IP, et plafond global par jour pour borner les envois depuis le domaine d'expédition.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_IP = 3;
const MAX_PER_DAY = 100;
const attempts = new Map<string, { count: number; first: number }>();
let day = { key: "", count: 0 };

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const today = new Date(now).toISOString().slice(0, 10);
  if (day.key !== today) day = { key: today, count: 0 };
  if (day.count >= MAX_PER_DAY) return true;
  const entry = attempts.get(ip);
  if (!entry || now - entry.first > WINDOW_MS) {
    if (attempts.size > 5000) attempts.clear();
    attempts.set(ip, { count: 1, first: now });
    day.count += 1;
    return false;
  }
  entry.count += 1;
  if (entry.count > MAX_PER_IP) return true;
  day.count += 1;
  return false;
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Trop de demandes. Réessayez plus tard." }, { status: 429 });
    }

    const body = await req.json();
    const { name, email, size, date, notes, website } = body;

    // Champ piège : invisible pour un humain, rempli par les robots. Réponse factice, aucun envoi.
    if (typeof website === "string" && website.trim() !== "") {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !date) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
    }

    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    const safeName = escapeHtml(String(name).slice(0, 200));
    const safeSize = escapeHtml(String(size || '').slice(0, 100));
    const safeDate = escapeHtml(String(date).slice(0, 20));
    const safeNotes = notes ? escapeHtml(String(notes).slice(0, 500)) : '';

    const resend = new Resend(process.env.RESEND_API_KEY || 'placeholder');
    const senderEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    await resend.emails.send({
      from: `Les 400 Geeks <${senderEmail}>`,
      to: [email],
      subject: "Votre Quête est confirmée - Les 400 Geeks",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0705; color: #fff; padding: 40px; border-radius: 10px; border: 1px solid #D4AF37;">
          <h1 style="color: #D4AF37; text-align: center; text-transform: uppercase; letter-spacing: 2px;">Quête Acceptée !</h1>
          <p style="font-size: 18px;">Salutations, <strong>${safeName}</strong>.</p>
          <p style="font-size: 16px; color: #ccc;">Votre table à l'Auberge des 400 Geeks est officiellement réservée.</p>

          <div style="background-color: #1c140d; padding: 20px; border-left: 4px solid #D4AF37; margin: 30px 0;">
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 16px; color: #eee;">
              <li style="margin-bottom: 10px;">🛡️ <strong>Taille de l'équipe :</strong> ${safeSize}</li>
              <li style="margin-bottom: 10px;">📅 <strong>Date de la quête :</strong> ${safeDate}</li>
              ${safeNotes ? `<li>📜 <strong>Demandes spéciales :</strong> ${safeNotes}</li>` : ""}
            </ul>
          </div>

          <p style="font-size: 16px; color: #ccc; text-align: center;">Préparez vos potions et affûtez vos lames. Nous vous attendons pour une aventure épique.</p>
          <p style="text-align: center; color: #D4AF37; font-size: 14px; margin-top: 40px; letter-spacing: 1px;">- La Guilde des 400 Geeks -</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Erreur lors de l'envoi de l'e-mail" }, { status: 500 });
  }
}
