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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, size, date, notes } = body;

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
    const data = await resend.emails.send({
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

    return NextResponse.json({ success: true, data });
  } catch (_error) {
    return NextResponse.json({ error: "Erreur lors de l'envoi de l'e-mail" }, { status: 500 });
  }
}
