"use client";

/**
 * Formularz kontaktowy — JEDYNY komponent kliencki z treścią na tej stronie.
 *
 * „use client" jest tu uzasadnione: formularz trzyma stan pól, waliduje je
 * w przeglądarce i pokazuje status wysyłki bez przeładowania. Cała reszta
 * strony kontaktu (dane teleadresowe, JSON-LD, treść) renderuje się
 * serwerowo i jest indeksowalna.
 *
 * ⚠ CLS: miejsce na komunikat statusu jest zarezerwowane na stałe
 * (`min-h-*` na kontenerze), więc pojawienie się komunikatu nie przesuwa
 * przycisku ani reszty strony.
 *
 * ⚠ `noValidate` na formularzu jest celowe. Bez tego przeglądarka blokuje
 * wysyłkę własnym dymkiem, zanim `onSubmit` w ogóle się wykona — a ten
 * dymek bywa w języku systemu, nie strony. Atrybuty `required`,
 * `type="email"` i `autoComplete` zostają: niosą semantykę dla czytników
 * ekranu i dla autouzupełniania, a komunikaty pokazujemy własne, spójne
 * językowo i powiązane z polami przez `aria-describedby`.
 *
 * ⚠ Walidacja po stronie klienta to WYŁĄCZNIE wygoda użytkownika.
 * Prawdziwą walidacją jest ta w `app/api/contact/route.ts`.
 */

import Link from "next/link";
import { useId, useRef, useState } from "react";

import {
  CONTACT_FORM_COPY,
  FIELD_LIMITS,
  HONEYPOT_FIELD,
  SERVICE_VALUES,
  type ServiceValue,
} from "@/content/pages/contact";
import { publicPath, type Locale } from "@/lib/routes";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

type FieldName = "name" | "phone" | "email" | "service" | "consent";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Cyfry w numerze telefonu — ignoruje spacje, myślniki i nawiasy. */
function digitCount(value: string): number {
  return (value.match(/\d/g) ?? []).length;
}

export function ContactForm({ locale }: { locale: Locale }) {
  const t = CONTACT_FORM_COPY[locale];
  const uid = useId();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState<ServiceValue | "">("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  /* Pułapka na boty — wartość MUSI zostać pusta. */
  const honeypot = useRef<HTMLInputElement>(null);

  const sending = status.kind === "sending";
  const sent = status.kind === "success";

  function validate(): Errors {
    const next: Errors = {};

    if (name.trim().length < FIELD_LIMITS.name.min) {
      next.name = t.fields.name.error;
    }
    if (digitCount(phone) < FIELD_LIMITS.phone.min) {
      next.phone = t.fields.phone.error;
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      next.email = t.fields.email.error;
    }
    if (!SERVICE_VALUES.includes(service as ServiceValue)) {
      next.service = t.fields.service.error;
    }
    if (!consent) {
      next.consent = t.consent.error;
    }

    return next;
  }

  /**
   * Reakcja na edycję pola.
   *
   * 1. Czyści błąd tego pola — komunikat nie wisi, gdy użytkownik już poprawia.
   * 2. Gasi zamknięty status (sukces/błąd), żeby po wysłanym zapytaniu dało się
   *    napisać kolejne bez przeładowania strony.
   */
  function handleEdit(field: FieldName) {
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
    setStatus((prev) =>
      prev.kind === "success" || prev.kind === "error" ? { kind: "idle" } : prev
    );
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending) return;

    const found = validate();
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setStatus({ kind: "error", message: t.status.validationError });
      return;
    }

    setStatus({ kind: "sending" });

    let response: Response;
    try {
      response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          service,
          message: message.trim(),
          consent,
          locale,
          [HONEYPOT_FIELD]: honeypot.current?.value ?? "",
        }),
      });
    } catch {
      /* Sieć padła albo żądanie nie wyszło poza przeglądarkę. */
      setStatus({ kind: "error", message: t.status.networkError });
      return;
    }

    if (response.ok) {
      setStatus({ kind: "success", message: t.status.success });
      setName("");
      setPhone("");
      setEmail("");
      setService("");
      setMessage("");
      setConsent(false);
      return;
    }

    /* Konkretny komunikat zależny od tego, co odrzucił serwer. */
    if (response.status === 400 || response.status === 422) {
      setStatus({ kind: "error", message: t.status.validationError });
    } else if (response.status === 429) {
      setStatus({ kind: "error", message: t.status.rateLimited });
    } else if (response.status >= 500) {
      setStatus({ kind: "error", message: t.status.serverError });
    } else {
      setStatus({ kind: "error", message: t.status.fallback });
    }
  }

  const field =
    "w-full rounded-md border border-hairline bg-basalt px-3.5 py-3 text-base text-bone " +
    "placeholder:text-lichen placeholder:opacity-60 transition-colors " +
    "hover:border-signal focus:border-signal focus:outline-none " +
    "disabled:opacity-60";

  const labelClass = "block text-sm font-medium text-bone";
  const hintClass = "text-xs text-lichen";
  const errorClass = "mt-1.5 block text-xs text-voltage";

  function errorIdFor(f: FieldName) {
    return `${uid}-${f}-error`;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-xl">
      <fieldset disabled={sending} className="min-w-0 border-0 p-0">
        <legend className="sr-only">{t.legend}</legend>

        {/* ---------------------------------------------------- honeypot */}
        {/* Ukryte przed człowiekiem i przed czytnikiem ekranu, widoczne dla
            bota wypełniającego wszystkie pola formularza. Nie używamy
            `type="hidden"` — proste boty pomijają takie pola. */}
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        >
          <label htmlFor={`${uid}-hp`}>Nazwa firmy (nie wypełniaj)</label>
          <input
            ref={honeypot}
            id={`${uid}-hp`}
            name={HONEYPOT_FIELD}
            type="text"
            tabIndex={-1}
            autoComplete="off"
            defaultValue=""
          />
        </div>

        <div className="grid gap-5">
          {/* -------------------------------------------------- imię */}
          <div>
            <label htmlFor={`${uid}-name`} className={labelClass}>
              {t.fields.name.label}{" "}
              <span className={hintClass}>({t.required})</span>
            </label>
            <input
              id={`${uid}-name`}
              name="name"
              type="text"
              required
              autoComplete="name"
              maxLength={FIELD_LIMITS.name.max}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                handleEdit("name");
              }}
              placeholder={t.fields.name.placeholder}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? errorIdFor("name") : undefined}
              className={`mt-2 ${field}`}
            />
            {errors.name && (
              <span id={errorIdFor("name")} className={errorClass}>
                {errors.name}
              </span>
            )}
          </div>

          {/* ------------------------------------------ telefon + e-mail */}
          {/* Jedna kolumna do 640px — czytelne także na 360px. */}
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor={`${uid}-phone`} className={labelClass}>
                {t.fields.phone.label}{" "}
                <span className={hintClass}>({t.required})</span>
              </label>
              <input
                id={`${uid}-phone`}
                name="phone"
                type="tel"
                required
                inputMode="tel"
                autoComplete="tel"
                maxLength={FIELD_LIMITS.phone.max}
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  handleEdit("phone");
                }}
                placeholder={t.fields.phone.placeholder}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={
                  errors.phone ? errorIdFor("phone") : undefined
                }
                className={`mt-2 ${field}`}
              />
              {errors.phone && (
                <span id={errorIdFor("phone")} className={errorClass}>
                  {errors.phone}
                </span>
              )}
            </div>

            <div>
              <label htmlFor={`${uid}-email`} className={labelClass}>
                {t.fields.email.label}{" "}
                <span className={hintClass}>({t.required})</span>
              </label>
              <input
                id={`${uid}-email`}
                name="email"
                type="email"
                required
                inputMode="email"
                autoComplete="email"
                maxLength={FIELD_LIMITS.email.max}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  handleEdit("email");
                }}
                placeholder={t.fields.email.placeholder}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? errorIdFor("email") : undefined
                }
                className={`mt-2 ${field}`}
              />
              {errors.email && (
                <span id={errorIdFor("email")} className={errorClass}>
                  {errors.email}
                </span>
              )}
            </div>
          </div>

          {/* ------------------------------------------------- usługa */}
          <div>
            <label htmlFor={`${uid}-service`} className={labelClass}>
              {t.fields.service.label}{" "}
              <span className={hintClass}>({t.required})</span>
            </label>
            <div className="relative mt-2">
              <select
                id={`${uid}-service`}
                name="service"
                required
                value={service}
                onChange={(e) => {
                  setService(e.target.value as ServiceValue);
                  handleEdit("service");
                }}
                aria-invalid={Boolean(errors.service)}
                aria-describedby={
                  errors.service ? errorIdFor("service") : undefined
                }
                className={`${field} appearance-none pr-11`}
              >
                <option value="" disabled>
                  {t.fields.service.placeholder}
                </option>
                {SERVICE_VALUES.map((value) => (
                  <option key={value} value={value}>
                    {t.serviceOptions[value]}
                  </option>
                ))}
              </select>
              {/* Strzałka jako element, nie tło w data-URI — kolor z tokenu. */}
              <svg
                viewBox="0 0 12 8"
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-1/2 h-2 w-3 -translate-y-1/2 text-lichen"
              >
                <path
                  d="M1 1L6 7L11 1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            {errors.service && (
              <span id={errorIdFor("service")} className={errorClass}>
                {errors.service}
              </span>
            )}
          </div>

          {/* --------------------------------------------- wiadomość */}
          <div>
            <label htmlFor={`${uid}-message`} className={labelClass}>
              {t.fields.message.label}{" "}
              <span className={hintClass}>({t.optional})</span>
            </label>
            <textarea
              id={`${uid}-message`}
              name="message"
              rows={5}
              maxLength={FIELD_LIMITS.message.max}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.fields.message.placeholder}
              aria-describedby={`${uid}-message-hint`}
              className={`mt-2 ${field} resize-y leading-relaxed`}
            />
            <span
              id={`${uid}-message-hint`}
              className={`mt-1.5 block ${hintClass}`}
            >
              {t.fields.message.hint}
            </span>
          </div>

          {/* ------------------------------------------------ zgoda RODO */}
          <div>
            <div className="flex gap-3">
              <input
                id={`${uid}-consent`}
                name="consent"
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  handleEdit("consent");
                }}
                aria-invalid={Boolean(errors.consent)}
                aria-describedby={
                  errors.consent ? errorIdFor("consent") : undefined
                }
                className="mt-1 h-4 w-4 shrink-0 accent-signal"
              />
              <label
                htmlFor={`${uid}-consent`}
                className="text-xs leading-relaxed text-lichen"
              >
                {t.consent.before}
                {/*
                  ⚠ Link MUSI prowadzić do polityki prywatności.
                  W starej wersji strony wskazywał na kotwicę `#kontakt`,
                  czyli zgoda odsyłała donikąd. Adres bierzemy z `publicPath`,
                  żeby wersja angielska trafiała na `/en/privacy-policy`.
                */}
                <Link
                  href={publicPath(locale, ["polityka-prywatnosci"])}
                  className="text-voltage underline underline-offset-4"
                >
                  {t.consent.linkText}
                </Link>
                {t.consent.after}
              </label>
            </div>
            {errors.consent && (
              <span id={errorIdFor("consent")} className={errorClass}>
                {errors.consent}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={sending}
            className="rounded-md bg-signal px-5 py-3 text-sm font-medium text-bone transition-colors hover:bg-voltage hover:text-obsydian disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-signal disabled:hover:text-bone"
          >
            {sending ? t.submitting : t.submit}
          </button>
        </div>
      </fieldset>

      {/*
        Miejsce na komunikat jest zarezerwowane od pierwszego renderu —
        pojawienie się tekstu nie przesuwa niczego poniżej (CLS = 0).
        `aria-live="polite"` ogłasza zmianę statusu czytnikowi ekranu.
      */}
      <div
        role="status"
        aria-live="polite"
        className="mt-4 flex min-h-[4.25rem] items-start"
      >
        {sent && (
          <p className="w-full rounded-md border border-signal bg-basalt px-4 py-3 text-sm leading-relaxed text-bone">
            {status.message}
          </p>
        )}
        {status.kind === "error" && (
          <p className="w-full rounded-md border border-hairline bg-basalt px-4 py-3 text-sm leading-relaxed text-voltage">
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
