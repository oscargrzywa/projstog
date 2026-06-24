import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, phone, email, service, other, message } = await req.json();

  const serviceLabel = service === "Inne" && other ? `Inne — ${other}` : service;

  const { error } = await resend.emails.send({
    from: "Formularz PROJSTOG <onboarding@resend.dev>",
    to: "oscar.grzywa@gmail.com",
    replyTo: email,
    subject: `Nowe zapytanie: ${serviceLabel} — ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;color:#111">
        <h2 style="margin:0 0 20px;color:#1B9D17">Nowe zapytanie z projstog.pl</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:8px 0;color:#666;width:120px">Imię i nazwisko</td><td style="padding:8px 0;font-weight:600">${name}</td></tr>
          <tr><td style="padding:8px 0;color:#666">Telefon</td><td style="padding:8px 0;font-weight:600">${phone}</td></tr>
          <tr><td style="padding:8px 0;color:#666">E-mail</td><td style="padding:8px 0;font-weight:600">${email}</td></tr>
          <tr><td style="padding:8px 0;color:#666">Usługa</td><td style="padding:8px 0;font-weight:600">${serviceLabel}</td></tr>
          ${message ? `<tr><td style="padding:8px 0;color:#666;vertical-align:top">Wiadomość</td><td style="padding:8px 0">${message}</td></tr>` : ""}
        </table>
        <p style="margin-top:24px;font-size:12px;color:#999">Możesz odpisać bezpośrednio na tego maila — odpowiedź trafi do ${email}</p>
      </div>
    `,
  });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ ok: true });
}
