"use client";

/**
 * Status „na żywo" przy telefonie — mała wyspa kliencka.
 *
 * Liczy czas w strefie Europe/Warsaw (niezależnie od strefy odwiedzającego)
 * i mówi wprost: odbieram teraz albo kiedy oddzwonię — dziś później, jutro
 * czy w poniedziałek. Święta ustawowe w Polsce też są dniami wolnymi.
 *
 * ⚠ Bez hydration mismatch: `useSyncExternalStore` z serwerowym snapshotem
 * `null`. Serwer i pierwsza klatka hydratacji renderują wariant neutralny
 * (godziny pracy, bez godziny bieżącej), a React od razu po hydratacji
 * przerenderowuje komponent z czasem z przeglądarki.
 */

import { useSyncExternalStore, type CSSProperties } from "react";

import type { LiveStatusCopy } from "@/content/pages/contact";

const ZONE = "Europe/Warsaw";
const DAY_MS = 86_400_000;

const FORMAT = new Intl.DateTimeFormat("en-GB", {
  timeZone: ZONE,
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

/* --- Zegar jako zewnętrzny magazyn ---------------------------------------
   Snapshot to tekst „rrrr-m-d hh:mm" — zmienia się raz na minutę, więc
   komponent nie renderuje się co tick, a porównanie wartości jest tanie. */

let cached: string | null = null;

function readClock(): string {
  const parts = Object.fromEntries(
    FORMAT.formatToParts(new Date()).map((part) => [part.type, part.value])
  );
  return `${parts.year}-${parts.month}-${parts.day} ${parts.hour}:${parts.minute}`;
}

function getSnapshot() {
  if (cached === null) cached = readClock();
  return cached;
}

function getServerSnapshot() {
  return null;
}

function subscribe(onChange: () => void) {
  const tick = () => {
    const next = readClock();
    if (next === cached) return;
    cached = next;
    onChange();
  };

  /* Od razu — snapshot z poprzedniej wizyty na stronie mógł się zestarzeć. */
  tick();
  const id = window.setInterval(tick, 15_000);
  document.addEventListener("visibilitychange", tick);
  return () => {
    window.clearInterval(id);
    document.removeEventListener("visibilitychange", tick);
  };
}

/* --- Kalendarz -----------------------------------------------------------
   Daty jako północ UTC danego dnia w Polsce — czysta arytmetyka dni,
   bez przesunięć strefowych. */

/** Wielkanoc (algorytm Meeusa/Jonesa/Butchera) — dla świąt ruchomych. */
function easter(year: number): number {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return Date.UTC(year, month - 1, day);
}

/** Święta ustawowo wolne, które mogą wypaść w dzień roboczy. Wigilia
    jest wolna od 2025 r. */
const FIXED_HOLIDAYS = ["1-1", "1-6", "5-1", "5-3", "8-15", "11-1", "11-11", "12-24", "12-25", "12-26"];

function isHoliday(date: number): boolean {
  const day = new Date(date);
  const key = `${day.getUTCMonth() + 1}-${day.getUTCDate()}`;
  if (FIXED_HOLIDAYS.includes(key)) return true;

  const sunday = easter(day.getUTCFullYear());
  /* Poniedziałek Wielkanocny i Boże Ciało (60 dni po Wielkanocy). */
  return date === sunday + DAY_MS || date === sunday + 60 * DAY_MS;
}

function isWorkingDay(date: number): boolean {
  const weekday = new Date(date).getUTCDay();
  return weekday >= 1 && weekday <= 5 && !isHoliday(date);
}

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

/** „09:00" → „9:00" — tak się to czyta po polsku i po angielsku. */
function display(time: string): string {
  return time.replace(/^0/, "");
}

type Status =
  | { kind: "neutral" }
  | { kind: "open"; now: number; clock: string; workday: true }
  | { kind: "closed"; now: number; clock: string; workday: boolean; day: string };

function resolve(
  snapshot: string | null,
  opens: number,
  closes: number,
  copy: LiveStatusCopy
): Status {
  if (!snapshot) return { kind: "neutral" };

  const [date, clock] = snapshot.split(" ");
  const [y, mo, d] = date.split("-").map(Number);
  const [hh, mm] = clock.split(":").map(Number);
  const today = Date.UTC(y, mo - 1, d);
  const now = hh * 60 + mm;
  const workday = isWorkingDay(today);

  if (workday && now >= opens && now < closes) {
    return { kind: "open", now, clock, workday };
  }

  if (workday && now < opens) {
    return { kind: "closed", now, clock, workday, day: copy.today };
  }

  /* Najbliższy dzień roboczy — najdłuższa przerwa w Polsce (Wigilia +
     święta + weekend) to kilka dni, 14 to bezpieczny zapas. */
  for (let offset = 1; offset <= 14; offset++) {
    const next = today + offset * DAY_MS;
    if (!isWorkingDay(next)) continue;
    const day =
      offset === 1 ? copy.tomorrow : copy.weekdays[new Date(next).getUTCDay()];
    return { kind: "closed", now, clock, workday, day };
  }

  return { kind: "closed", now, clock, workday, day: copy.tomorrow };
}

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "");
}

const percent = (minutes: number) => `${((minutes / 1440) * 100).toFixed(2)}%`;

export function LiveStatus({
  copy,
  opens,
  closes,
}: {
  copy: LiveStatusCopy;
  /** Godziny z `SITE.hours`, format „09:00". */
  opens: string;
  closes: string;
}) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const start = toMinutes(opens);
  const end = toMinutes(closes);
  const status = resolve(snapshot, start, end, copy);
  const values = { opens: display(opens), closes: display(closes) };

  let title = copy.neutralTitle;
  let detail = fill(copy.neutralDetail, values);
  if (status.kind === "open") {
    title = copy.openTitle;
    detail = fill(copy.openDetail, values);
  } else if (status.kind === "closed") {
    title = copy.closedTitle;
    detail = fill(copy.closedDetail, { ...values, day: status.day });
  }

  return (
    <div className="live-status" data-state={status.kind}>
      <p className="live-status__head">
        <span
          aria-hidden="true"
          className={
            status.kind === "open"
              ? "live-dot live-status__dot"
              : "live-status__dot live-status__dot--idle"
          }
        />
        <span className="live-status__title">{title}</span>
        {status.kind !== "neutral" && (
          <span aria-hidden="true" className="live-status__clock tabular">
            {status.clock}
          </span>
        )}
      </p>
      <p className="live-status__detail">{detail}</p>

      {/* Doba 0–24 h: okno godzin pracy i wskazówka „teraz" (tylko po
          hydratacji — serwer nie wie, która jest godzina). */}
      <div
        aria-hidden="true"
        className="live-status__day"
        data-off={status.kind !== "neutral" && !status.workday ? "" : undefined}
      >
        <span
          className="live-status__window"
          style={{ left: percent(start), width: percent(end - start) }}
        />
        {status.kind !== "neutral" && (
          <span
            className="live-status__needle"
            style={{ "--at": percent(status.now) } as CSSProperties}
          />
        )}
        <span className="live-status__tick" style={{ left: percent(start) }}>
          {values.opens}
        </span>
        <span className="live-status__tick" style={{ left: percent(end) }}>
          {values.closes}
        </span>
      </div>
    </div>
  );
}
