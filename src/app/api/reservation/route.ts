import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, size, date, notes } = body;

    // Validation basique
    if (!name || !email || !date) {
      return NextResponse.json({ error: "Champs obligatoires manquants" }, { status: 400 });
    }

    // Envoi de l'e-mail avec Resend
    // Note : onboarding@resend.dev permet de tester gratuitement sans domaine vérifié
    const data = await resend.emails.send({
      from: "Les 400 Geeks <onboarding@resend.dev>",
      to: [email], // En production, on peut aussi l'envoyer au restaurant (ex: contact@zarogdev.fr)
      subject: "Votre Quête est confirmée - Les 400 Geeks",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background-color: #0a0705; color: #fff; padding: 40px; border-radius: 10px; border: 1px solid #D4AF37;">
          <h1 style="color: #D4AF37; text-align: center; text-transform: uppercase; letter-spacing: 2px;">Quête Acceptée !</h1>
          <p style="font-size: 18px;">Salutations, <strong>${name}</strong>.</p>
          <p style="font-size: 16px; color: #ccc;">Votre table à l'Auberge des 400 Geeks est officiellement réservée.</p>
          
          <div style="background-color: #1c140d; padding: 20px; border-left: 4px solid #D4AF37; margin: 30px 0;">
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 16px; color: #eee;">
              <li style="margin-bottom: 10px;">🛡️ <strong>Taille de l'équipe :</strong> ${size}</li>
              <li style="margin-bottom: 10px;">📅 <strong>Date de la quête :</strong> ${date}</li>
              ${notes ? `<li>📜 <strong>Demandes spéciales :</strong> ${notes}</li>` : ""}
            </ul>
          </div>
          
          <p style="font-size: 16px; color: #ccc; text-align: center;">Préparez vos potions et affûtez vos lames. Nous vous attendons pour une aventure épique.</p>
          <p style="text-align: center; color: #D4AF37; font-size: 14px; margin-top: 40px; letter-spacing: 1px;">- La Guilde des 400 Geeks -</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: "Erreur lors de l'envoi de l'e-mail" }, { status: 500 });
  }
}
