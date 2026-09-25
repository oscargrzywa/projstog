/**
 * Obsługa formularza kontaktowego.
 *
 * ⚠ ZASADA: nie ufamy klientowi w żadnym punkcie.
 * Walidacja w `components/ContactForm.tsx` służy wyłącznie wygodzie
 * użytkownika. Każde żądanie może przyjść z curla, więc wszystko jest
 * sprawdzane jeszcze raz tutaj.
 *
 * ⚠ Klucz API jest czytany DOPIERO w handlerze, nie na poziomie modułu.
 * Stary kod tworzył klienta Resend przy imporcie — to wywala build,
 * gdy zmiennej nie ma w środowisku budowania.
 *
 * ⚠ Do konsoli nie trafiają pełne dane osobowe. Logujemy powód odrzucenia
 * i identyfikator błędu, nigdy treści wiadomości, nazwiska czy adresu.
 */

import { NextResponse } from "next/server";
import { Resend } from "resend";

import { SITE } from "@/content/site";
import {
  FIELD_LIMITS,
  HONEYPOT_FIELD,
  SERVICE_EMAIL_LABELS,
  isServiceValue,
  type ServiceValue,
} from "@/content/pages/contact";

/* Formularz nie może być prerenderowany ani cache'owany. */
export const dynamic = "force-dynamic";

/** Adres nadawcy. ⚠ Wymaga domeny zweryfikowanej w Resend. */
const FROM =
  process.env.CONTACT_FROM_EMAIL ?? "Formularz PROJSTOG <onboarding@resend.dev>";

/** Odbiorca zapytań. Domyślnie adres firmowy z `content/site.ts`. */
const TO = process.env.CONTACT_TO_EMAIL ?? SITE.email;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type ErrorCode =
  | "invalid_json"
  | "invalid_payload"
  | "missing_api_key"
  | "send_failed";

function fail(status: number, code: ErrorCode, field?: string) {
  return NextResponse.json({ ok: false, error: code, field }, { status });
}

/** Ucina i normalizuje wartość tekstową z nieznanego wejścia. */
function asText(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

/** Liczba cyfr — telefon walidujemy po cyfrach, nie po długości napisu. */
function digitCount(value: string): number {
  return (value.match(/\d/g) ?? []).length;
}

/**
 * Escapowanie na potrzeby HTML-a maila.
 *
 * ⚠ Stary endpoint wstawiał dane użytkownika do szablonu bez escapowania —
 * wystarczyło wpisać znacznik w wiadomość, żeby zepsuć albo podmienić treść
 * maila trafiającego do skrzynki właściciela.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type Payload = {
  name: string;
  phone: string;
  email: string;
  service: ServiceValue;
  message: string;
  locale: string;
};

export async function POST(request: Request) {
  /* ------------------------------------------------------------- wejście */
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return fail(400, "invalid_json");
  }

  if (typeof raw !== "object" || raw === null) {
    return fail(400, "invalid_payload");
  }

  const body = raw as Record<string, unknown>;

  /* ----------------------------------------------------------- honeypot */
  /* Pole ukryte przed człowiekiem. Wypełnione = bot.
     Odpowiadamy 200 i nic nie wysyłamy — bot nie dostaje sygnału,
     że pułapka zadziałała, więc nie próbuje jej obejść. */
  const trap = body[HONEYPOT_FIELD];
  if (typeof trap === "string" && trap.trim().length > 0) {
    console.warn("[contact] odrzucono: wypełniony honeypot");
    return NextResponse.json({ ok: true });
  }

  /* ---------------------------------------------------------- walidacja */
  const name = asText(body.name, FIELD_LIMITS.name.max);
  const phone = asText(body.phone, FIELD_LIMITS.phone.max);
  const email = asText(body.email, FIELD_LIMITS.email.max);
  const message = asText(body.message, FIELD_LIMITS.message.max);
  const locale = body.locale === "en" ? "en" : "pl";

  if (name.length < FIELD_LIMITS.name.min) {
    console.warn("[contact] odrzucono: nieprawidłowe pole „name”");
    return fail(422, "invalid_payload", "name");
  }
  if (digitCount(phone) < FIELD_LIMITS.phone.min) {
    console.warn("[contact] odrzucono: nieprawidłowe pole „phone”");
    return fail(422, "invalid_payload", "phone");
  }
  if (email.length < FIELD_LIMITS.email.min || !EMAIL_PATTERN.test(email)) {
    console.warn("[contact] odrzucono: nieprawidłowe pole „email”");
    return fail(422, "invalid_payload", "email");
  }
  if (!isServiceValue(body.service)) {
    console.warn("[contact] odrzucono: nieprawidłowe pole „service”");
    return fail(422, "invalid_payload", "service");
  }
  if (body.consent !== true) {
    console.warn("[contact] odrzucono: brak zgody RODO");
    return fail(422, "invalid_payload", "consent");
  }
  /* Długość wiadomości sprawdzamy na surowym wejściu, nie po przycięciu —
     inaczej `asText` po cichu przepuściłby wypociny bota na 100 kB. */
  if (
    typeof body.message === "string" &&
    body.message.length > FIELD_LIMITS.message.max
  ) {
    console.warn("[contact] odrzucono: wiadomość przekracza limit długości");
    return fail(422, "invalid_payload", "message");
  }

  const payload: Payload = {
    name,
    phone,
    email,
    service: body.service,
    message,
    locale,
  };

  /* ------------------------------------------------------------- klucz */
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    /* ⚠ Nie rzucamy wyjątku przy imporcie modułu — brak klucza ma być
       czytelnym błędem 500 w runtime, a nie wywróconym buildem. */
    console.error(
      "[contact] brak zmiennej środowiskowej RESEND_API_KEY — wiadomość nie została wysłana"
    );
    return fail(500, "missing_api_key");
  }

  /* -------------------------------------------------------------- mail */
  const serviceLabel = SERVICE_EMAIL_LABELS[payload.service];
  const safe = {
    name: escapeHtml(payload.name),
    phone: escapeHtml(payload.phone),
    email: escapeHtml(payload.email),
    service: escapeHtml(serviceLabel),
    message: escapeHtml(payload.message).replace(/\n/g, "<br />"),
  };

  const rows: [string, string][] = [
    ["Imię i nazwisko", safe.name],
    ["Telefon", safe.phone],
    ["E-mail", safe.email],
    ["Usługa", safe.service],
    ["Język formularza", payload.locale.toUpperCase()],
  ];

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px;line-height:1.6">
      <h2 style="margin:0 0 20px">Nowe zapytanie z ${SITE.url}</h2>
      <table style="width:100%;border-collapse:collapse">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:6px 12px 6px 0;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:6px 0;font-weight:600">${value}</td></tr>`
          )
          .join("")}
        ${
          safe.message
            ? `<tr><td style="padding:6px 12px 6px 0;vertical-align:top">Wiadomość</td><td style="padding:6px 0">${safe.message}</td></tr>`
            : ""
        }
      </table>
      <p style="margin-top:24px;font-size:12px">
        Odpowiedz na tego maila, a wiadomość trafi wprost do nadawcy.
      </p>
    </div>
  `;

  /* Wersja tekstowa — dla klientów pocztowych bez HTML i dla filtrów spamu. */
  const text = [
    `Nowe zapytanie z ${SITE.url}`,
    "",
    `Imię i nazwisko: ${payload.name}`,
    `Telefon: ${payload.phone}`,
    `E-mail: ${payload.email}`,
    `Usługa: ${serviceLabel}`,
    `Język formularza: ${payload.locale.toUpperCase()}`,
    payload.message ? `\nWiadomość:\n${payload.message}` : "",
  ].join("\n");

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: payload.email,
      subject: `Zapytanie: ${serviceLabel} — ${payload.name}`,
      html,
      text,
    });

    if (error) {
      /* Logujemy komunikat dostawcy, nie treść zapytania. */
      console.error("[contact] Resend odrzucił wysyłkę:", error.name, error.message);
      return fail(502, "send_failed");
    }
  } catch (cause) {
    console.error(
      "[contact] wyjątek przy wysyłce:",
      cause instanceof Error ? cause.message : "nieznany błąd"
    );
    return fail(502, "send_failed");
  }

  return NextResponse.json({ ok: true });
}

/** Inne metody nie mają tu czego szukać. */
export async function GET() {
  return NextResponse.json(
    { ok: false, error: "method_not_allowed" },
    { status: 405, headers: { Allow: "POST" } }
  );
}
