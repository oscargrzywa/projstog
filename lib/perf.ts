/* Poziom wydajności urządzenia: pełny albo „lite".

   Kilka efektów strony jest drogich (shader WebGL i soczewka w hero,
   inercyjne przewijanie, dym przy przejściu). Na mocnym sprzęcie idą
   płynnie, na słabym razem zjadają klatki. Zamiast zgadywać po modelu
   urządzenia, mierzymy płynność na żywo: przy wyraźnych zacięciach cała
   strona przechodzi w tryb „lite" — efekty stają albo znikają, a
   przewijanie wraca do natywnego (wątek kompozytora, zawsze płynne).

   Zasady:
   - start w trybie pełnym, chyba że sesja już raz zeszła do lite albo
     sprzęt jest wprost słaby (≤ 2 rdzenie / ≤ 2 GB pamięci),
   - pomiar w krótkich oknach (po załadowaniu i przy przewijaniu) — pętla
     rAF żyje tylko w trakcie okna, poza nim nic nie kosztuje,
   - decyzja jednokierunkowa i zapamiętana w sessionStorage, żeby efekty
     nie „mrugały" tam i z powrotem,
   - dla CSS: `html[data-perf="lite"]`; dla wysp klienckich:
     `useSyncExternalStore(subscribePerf, isLite, isLiteServer)`. */

const STORAGE_KEY = "projstog:perf";

// Okno pomiaru: ~1.5 s przy 60 Hz, twardy limit czasu dla wolnych ekranów.
const WINDOW_FRAMES = 90;
const WINDOW_MAX_MS = 4000;
const MIN_FRAMES = 30;
// Klatka dłuższa niż 25 ms to spadek poniżej 40 kl./s — to już widać.
const SLOW_FRAME_MS = 25;
// Przerwa dłuższa niż ta to nie płynność, tylko np. przełączenie karty.
const GAP_MS = 250;
// Ile okien najwyżej w jednej wizycie i odstęp między oknami przy scrollu.
const MAX_WINDOWS = 24;
const SCROLL_COOLDOWN_MS = 3000;

type Listener = () => void;

const listeners = new Set<Listener>();
let lite = false;
let initialized = false;
let monitoring = false;
let sampling = false;
let windows = 0;
let strikes = 0;
let lastWindowEnd = 0;

function weakHardware() {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return (nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) <= 2;
}

// Stan początkowy — czytany synchronicznie, bez dotykania DOM-u
// (wywołuje go getSnapshot w trakcie renderu).
function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  let stored = false;
  try {
    stored = sessionStorage.getItem(STORAGE_KEY) === "lite";
  } catch {}
  lite = stored || weakHardware();
}

function setLite() {
  if (lite) return;
  lite = true;
  document.documentElement.dataset.perf = "lite";
  try {
    sessionStorage.setItem(STORAGE_KEY, "lite");
  } catch {}
  window.removeEventListener("scroll", onScroll);
  listeners.forEach((listener) => listener());
}

function judge(deltas: number[]) {
  const sorted = [...deltas].sort((a, b) => a - b);
  const median = sorted[sorted.length >> 1];
  const slow = deltas.filter((d) => d > SLOW_FRAME_MS).length / deltas.length;

  // Stale ≤ 30 kl./s — nie ma czego potwierdzać.
  if (median > 34) return setLite();

  // Co piąta klatka zgubiona to już widoczne szarpanie.
  const bad = median > 22 || slow > 0.2;
  strikes = bad ? strikes + 1 : 0;
  // Jedno złe okno może być przypadkiem (GC, ładowanie obrazka) —
  // potwierdzamy od razu drugim.
  if (strikes >= 2) setLite();
  else if (bad) sample();
}

function sample() {
  if (lite || sampling || document.hidden || windows >= MAX_WINDOWS) return;
  sampling = true;
  windows++;
  const deltas: number[] = [];
  const startedAt = performance.now();
  let prev = 0;

  const finish = (complete: boolean) => {
    sampling = false;
    lastWindowEnd = performance.now();
    if (complete && deltas.length >= MIN_FRAMES) judge(deltas);
  };

  const tick = (now: number) => {
    // Karta schowana w trakcie okna — pomiar się nie liczy.
    if (document.hidden) return finish(false);
    if (prev) {
      const d = now - prev;
      if (d < GAP_MS) deltas.push(d);
    }
    prev = now;
    if (deltas.length >= WINDOW_FRAMES || now - startedAt > WINDOW_MAX_MS) {
      return finish(true);
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

// Zacięcia najbardziej bolą przy przewijaniu — tam też mierzymy.
function onScroll() {
  if (!sampling && performance.now() - lastWindowEnd > SCROLL_COOLDOWN_MS) sample();
}

function startMonitor() {
  if (monitoring) return;
  monitoring = true;
  if (lite) {
    document.documentElement.dataset.perf = "lite";
    return;
  }
  // Pierwsze okno po załadowaniu i hydratacji — wtedy w hero działa
  // najwięcej naraz, a długie klatki samego ładowania już minęły.
  const first = () => window.setTimeout(sample, 1200);
  if (document.readyState === "complete") first();
  else window.addEventListener("load", first, { once: true });
  window.addEventListener("scroll", onScroll, { passive: true });
}

/** Subskrypcja zmiany poziomu; przy pierwszej startuje pomiar. */
export function subscribePerf(listener: Listener) {
  init();
  startMonitor();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function isLite() {
  init();
  return lite;
}

/** Serwer renderuje wersję pełną — tryb ustala dopiero przeglądarka. */
export const isLiteServer = () => false;

/** Twardy sygnał z komponentu (np. WebGL tylko programowy) — od razu lite. */
export function markLite() {
  init();
  startMonitor();
  setLite();
}
