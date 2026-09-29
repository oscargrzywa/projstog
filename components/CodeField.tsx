"use client";

/* Kod pisany na żywo — tło hero zamiast siatki.
   Kanwa 2D, nie DOM: tekst kodu nie może trafić do HTML-a (treść dla Google).
   Kilka bloków pisze się znak po znaku w ludzkim tempie, z karetką;
   po zapełnieniu blok stoi chwilę, wygasa i zaczyna kolejny snippet.
   Zasady:
   - czytelność H1 ponad wszystko: bone ~13% krycia, voltage maks. 35%,
     do tego maska — najmocniej po prawej i u góry, słabo za nagłówkiem,
   - kolory z tokenów CSS, żadnych hexów w kodzie rysującym,
   - maks. 30 kl./s, DPR maks. 2, pętla stoi poza ekranem i w ukrytej karcie,
   - reduced motion → jedna statyczna klatka, bez karetki,
   - mobile → 1–2 bloki i jeszcze słabsze krycie. */

import { useEffect, useRef } from "react";

// --- treść ------------------------------------------------------------------
// Prawdziwa robota, nie ozdobnik: to, co faktycznie powstaje przy stronach.
// Bez sekretów — klucze wyłącznie przez process.env.
const SNIPPETS: readonly (readonly string[])[] = [
  [
    "// app/[lang]/oferta/page.tsx",
    'import type { Metadata } from "next";',
    'import { getDictionary } from "@/content/dictionary";',
    "",
    "export async function generateMetadata({",
    "  params,",
    '}: PageProps<"/[lang]/oferta">): Promise<Metadata> {',
    "  const { lang } = await params;",
    "  const t = await getDictionary(lang);",
    "  return {",
    "    title: t.offer.title,",
    "    description: t.offer.lead,",
    "    alternates: {",
    '      canonical: publicPath(lang, ["oferta"]),',
    '      languages: { pl: "/oferta", en: "/en/offer" },',
    "    },",
    "  };",
    "}",
    "",
    "export default async function OfferPage({ params }) {",
    "  const { lang } = await params;",
    "  return <OfferHero lang={lang} />;",
    "}",
  ],
  [
    '<script type="application/ld+json">',
    "{",
    '  "@context": "https://schema.org",',
    '  "@type": "LocalBusiness",',
    '  "name": "PROJSTOG",',
    '  "url": "https://projstog.pl",',
    '  "telephone": "+48 730 771 568",',
    '  "email": "biuro@projstog.pl",',
    '  "address": {',
    '    "@type": "PostalAddress",',
    '    "addressLocality": "Mielec",',
    '    "postalCode": "39-300",',
    '    "addressRegion": "podkarpackie",',
    '    "addressCountry": "PL"',
    "  },",
    '  "areaServed": ["Mielec", "Dębica", "Tarnów"]',
    "}",
    "</script>",
  ],
  [
    "// app/sitemap.ts",
    'import type { MetadataRoute } from "next";',
    'import { SERVICES } from "@/content/services";',
    "",
    "export default function sitemap(): MetadataRoute.Sitemap {",
    '  const base = "https://projstog.pl";',
    '  const pages = ["", "/oferta", "/realizacje", "/blog"];',
    "  return [",
    "    ...pages.map((path) => ({ url: base + path })),",
    "    ...SERVICES.map((s) => ({",
    "      url: `${base}/oferta/${s.slug}`,",
    "      lastModified: s.updatedAt,",
    "    })),",
    "  ];",
    "}",
  ],
  [
    "$ cat workflows/lead-intake.json",
    "{",
    '  "name": "lead-intake",',
    '  "nodes": [',
    '    { "type": "n8n-nodes-base.webhook",',
    '      "parameters": { "path": "kontakt",',
    '                      "httpMethod": "POST" } },',
    '    { "type": "@n8n/n8n-nodes-langchain.openAi",',
    '      "parameters": { "operation": "message" } },',
    '    { "type": "n8n-nodes-base.if",',
    '      "parameters": { "score": ">= 7" } },',
    '    { "type": "n8n-nodes-base.emailSend",',
    '      "parameters": { "toEmail": "biuro@projstog.pl" } }',
    "  ],",
    '  "connections": {',
    '    "Webhook": { "main": [["OpenAI"]] },',
    '    "OpenAI": { "main": [["Score"]] }',
    "  }",
    "}",
  ],
  [
    "// lib/leads/qualify.ts",
    'import OpenAI from "openai";',
    "",
    "const client = new OpenAI({",
    "  apiKey: process.env.OPENAI_API_KEY,",
    "});",
    "",
    "export async function qualifyLead(message: string) {",
    "  const res = await client.responses.create({",
    '    model: "gpt-4.1-mini",',
    '    instructions: "Oceń zapytanie 1-10. Zwróć JSON.",',
    "    input: message,",
    '    text: { format: { type: "json_object" } },',
    "  });",
    "  const { score, service } = JSON.parse(res.output_text);",
    "  if (score >= 7) await notifyOwner({ score, service });",
    "  return { score, service };",
    "}",
  ],
  [
    "/* app/globals.css */",
    "@theme {",
    "  --color-obsidian: #060807;",
    "  --color-signal: #1b9d17;",
    "  --color-voltage: #34e12e;",
    "  --color-bone: #ece7dd;",
    "  --radius-card: 16px;",
    "  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);",
    "}",
    "",
    ".hero-title {",
    "  font-size: clamp(3rem, 9vw, 8.5rem);",
    "  letter-spacing: -0.045em;",
    "  line-height: 0.92;",
    "}",
  ],
  [
    "$ npm run build",
    "> next build",
    "",
    "   Next.js 16.3.6",
    "   Creating an optimized production build ...",
    " ✓ Compiled successfully",
    " ✓ Linting and checking validity of types",
    " ✓ Generating static pages",
    "",
    "Route (app)",
    "┌ ○ /",
    "├ ● /[lang]/oferta/[kategoria]",
    "├ ● /[lang]/realizacje/[slug]",
    "├ ● /[lang]/blog/[slug]",
    "├ ○ /sitemap.xml",
    "└ ○ /robots.txt",
    "",
    "$ git push origin main",
  ],
  [
    "// app/robots.ts",
    'import type { MetadataRoute } from "next";',
    "",
    "export default function robots(): MetadataRoute.Robots {",
    "  return {",
    '    rules: [{ userAgent: "*", allow: "/" }],',
    '    sitemap: "https://projstog.pl/sitemap.xml",',
    '    host: "https://projstog.pl",',
    "  };",
    "}",
  ],
];

// --- tokenizacja (prosta, pod kolor — nie parser) -----------------------------
// 0 zwykły · 1 słowo kluczowe · 2 string · 3 komentarz · 4 „ok" z terminala
type Kind = 0 | 1 | 2 | 3 | 4;
type Seg = { text: string; kind: Kind; start: number };
type Line = { text: string; segs: Seg[]; indent: number };

const KEYWORDS = new Set([
  "import",
  "export",
  "from",
  "const",
  "let",
  "async",
  "await",
  "return",
  "function",
  "default",
  "type",
  "new",
  "if",
  "true",
  "false",
]);

function tokenize(src: string): Line {
  const segs: Seg[] = [];
  const indent = src.length - src.trimStart().length;
  let buf = "";
  let bufStart = 0;
  const flush = () => {
    if (buf) segs.push({ text: buf, kind: 0, start: bufStart });
    buf = "";
  };
  const plain = (text: string, at: number) => {
    if (!buf) bufStart = at;
    buf += text;
  };

  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    if (
      src.startsWith("//", i) ||
      src.startsWith("/*", i) ||
      (i === indent && ch === "*")
    ) {
      flush();
      segs.push({ text: src.slice(i), kind: 3, start: i });
      break;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      flush();
      const close = src.indexOf(ch, i + 1);
      const end = close === -1 ? src.length : close + 1;
      segs.push({ text: src.slice(i, end), kind: 2, start: i });
      i = end;
      continue;
    }
    if (ch === "✓" || (i === indent && ch === "$")) {
      flush();
      segs.push({ text: ch, kind: ch === "$" ? 1 : 4, start: i });
      i++;
      continue;
    }
    if (/[A-Za-z_]/.test(ch) && (i === 0 || !/[\w$@.-]/.test(src[i - 1]))) {
      const word = /^[A-Za-z_]\w*/.exec(src.slice(i))?.[0] ?? ch;
      if (KEYWORDS.has(word)) {
        flush();
        segs.push({ text: word, kind: 1, start: i });
      } else plain(word, i);
      i += word.length;
      continue;
    }
    plain(ch, i);
    i++;
  }
  flush();
  return { text: src, segs, indent };
}

// Tokenizujemy leniwie, dopiero w przeglądarce — SSR nie ma tu nic do roboty.
let TOKENS: Line[][] | null = null;
const tokens = () => (TOKENS ??= SNIPPETS.map((s) => s.map(tokenize)));

// --- stałe wyglądu ---------------------------------------------------------------
const FPS = 30;
const FONT_FAMILY =
  'ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace';
// Jeden blok po prawej, więc może być wyraźny — nagłówek stoi po lewej,
// a na styku i tak przygasza go „dziura" w masce.
const ALPHA_DESKTOP = 0.3; // bone — bazowe krycie tekstu
const ALPHA_MOBILE = 0.16;
const VOLTAGE_MAX = 0.6; // sufit dla akcentów (karetka, podświetlenie)
// Mnożnik krycia per rodzaj tokenu, względem bazowego.
const KIND_ALPHA: Record<Kind, number> = { 0: 1, 1: 1.9, 2: 0.8, 3: 0.55, 4: 1.5 };
const FADE_S = 1.4;
const CONTAINER = 1152; // max-w-6xl sekcji hero

type Phase = "idle" | "type" | "hold" | "fade";
type Block = {
  x: number;
  y: number;
  baseY: number;
  cols: number;
  rows: number;
  snippet: number;
  lines: Line[];
  line: number;
  col: number;
  cps: number;
  wait: number;
  scroll: number;
  scrollTo: number;
  phase: Phase;
  timer: number;
  alpha: number;
  drift: number;
  sinceKey: number; // czas od ostatniego znaku — karetka mruga dopiero w bezczynności
};

const rand = (a: number, b: number) => a + Math.random() * (b - a);
const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

// Dowolny kolor CSS → „rgb(r, g, b)", przez piksel 2D.
function readToken(name: string): string | null {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  if (!value) return null;
  const c = document.createElement("canvas");
  c.width = c.height = 1;
  const ctx = c.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;
  ctx.fillStyle = value;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return `rgb(${r}, ${g}, ${b})`;
}

export function CodeField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Bez tokenu bone nie zgadujemy koloru — wtedy po prostu nic.
    const bone = readToken("--color-bone");
    if (!bone) return;
    const signal = readToken("--color-signal") ?? bone;
    const voltage = readToken("--color-voltage") ?? signal;
    const KIND_COLOR: Record<Kind, string> = {
      0: bone,
      1: signal,
      2: voltage,
      3: bone,
      4: voltage,
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lines = tokens();

    // --- stan -------------------------------------------------------------------
    let W = 0;
    let H = 0;
    let dpr = 1;
    let mobile = false;
    let fontSize = 12.5;
    let lh = 20;
    let charW = 7.5;
    let base = ALPHA_DESKTOP;
    let blocks: Block[] = [];
    const mask = document.createElement("canvas");

    let highlight: { b: number; line: number; t: number } | null = null;
    let nextHighlight = rand(2, 4);
    let glitch: { b: number; line: number; dx: number; frames: number } | null =
      null;
    let nextGlitch = rand(4, 9);
    let clock = 0;

    // --- maska: gdzie kod wolno widać -----------------------------------------
    // Niska rozdzielczość (1/4) — to same gradienty, skalowanie ich nie psuje.
    const buildMask = () => {
      const mw = Math.max(1, Math.ceil(W / 4));
      const mh = Math.max(1, Math.ceil(H / 4));
      mask.width = mw;
      mask.height = mh;
      const m = mask.getContext("2d");
      if (!m) return;
      m.setTransform(mw / W, 0, 0, mh / H, 0, 0);
      m.globalCompositeOperation = "source-over";
      const white = (a: number) => `rgba(255, 255, 255, ${a})`;
      const fx = (x: number) => clamp(x / W, 0, 1);

      const cont = Math.min(W, CONTAINER);
      const left = (W - cont) / 2 + 20;

      // Poziomo: słabo za lewą kolumną tekstu, pełnia po prawej.
      if (mobile) {
        m.fillStyle = white(1);
      } else {
        const gx = m.createLinearGradient(0, 0, W, 0);
        gx.addColorStop(0, white(left > 80 ? 0.55 : 0.22));
        gx.addColorStop(fx(left), white(0.22));
        gx.addColorStop(fx(left + cont * 0.5), white(0.32));
        gx.addColorStop(fx(left + cont * 0.82), white(1));
        gx.addColorStop(1, white(1));
        m.fillStyle = gx;
      }
      m.fillRect(0, 0, W, H);

      // Pionowo: najmocniej u góry, do zera przy dolnej krawędzi.
      m.globalCompositeOperation = "destination-in";
      const gy = m.createLinearGradient(0, 0, 0, H);
      gy.addColorStop(0, white(0.55));
      gy.addColorStop(0.07, white(1));
      gy.addColorStop(0.45, white(0.85));
      gy.addColorStop(0.8, white(0.3));
      gy.addColorStop(1, white(0));
      m.fillStyle = gy;
      m.fillRect(0, 0, W, H);

      // Eliptyczna „dziura" za nagłówkiem.
      m.globalCompositeOperation = "destination-out";
      const cx = mobile ? W * 0.45 : left + cont * 0.32;
      const cy = H * 0.5;
      const rx = mobile ? W * 0.7 : cont * 0.48;
      const ry = H * (mobile ? 0.28 : 0.3);
      const hole = mobile ? 0.45 : 0.5;
      m.translate(cx, cy);
      m.scale(rx / ry, 1);
      const rg = m.createRadialGradient(0, 0, 0, 0, 0, ry);
      rg.addColorStop(0, white(hole));
      rg.addColorStop(0.55, white(hole * 0.7));
      rg.addColorStop(1, white(0));
      m.fillStyle = rg;
      m.fillRect(-ry, -ry, ry * 2, ry * 2);
      m.setTransform(1, 0, 0, 1, 0, 0);
      m.globalCompositeOperation = "source-over";
    };

    // --- bloki ----------------------------------------------------------------
    const pickSnippet = (except: number) => {
      const used = new Set(blocks.map((b) => b.snippet));
      const free = lines
        .map((_, i) => i)
        .filter((i) => !used.has(i) && i !== except);
      const pool = free.length ? free : lines.map((_, i) => i);
      return pool[Math.floor(Math.random() * pool.length)];
    };

    const startSnippet = (b: Block) => {
      b.snippet = pickSnippet(b.snippet);
      b.lines = lines[b.snippet];
      b.line = 0;
      b.col = 0;
      b.scroll = b.scrollTo = 0;
      b.phase = "idle";
      b.timer = rand(0.4, 1.6);
      b.alpha = 1;
      b.drift = 0;
      b.wait = 0;
      b.sinceKey = 9;
      b.cps = rand(25, 60);
      b.y = clamp(b.baseY + rand(-2, 2) * lh, lh, H - (b.rows + 1) * lh);
    };

    // Stan „po wszystkim": snippet wypisany do końca, przewinięty do dołu.
    const finish = (b: Block) => {
      b.line = b.lines.length;
      b.col = 0;
      b.scroll = b.scrollTo = Math.max(0, b.lines.length - b.rows);
      b.phase = "hold";
      b.timer = rand(2, 5);
    };

    const layout = () => {
      // Jeden edytor, prawa strona kontenera — tam, gdzie hero ma powietrze.
      const cont = Math.min(W, CONTAINER);
      const left = (W - cont) / 2 + 20;
      blocks = [];
      {
        const zoneX = mobile ? 16 : Math.max(left + cont * 0.52, 16);
        const zoneW = mobile ? W - 32 : W - zoneX - Math.max(24, (W - cont) / 2);
        const cols = clamp(Math.floor(zoneW / charW), 20, 64);
        const rows = clamp(Math.floor((H * 0.7) / lh), 10, 34);
        const top = 0.12;
        const b: Block = {
          x: zoneX,
          y: 0,
          baseY: H * top,
          cols,
          rows,
          snippet: -1,
          lines: [],
          line: 0,
          col: 0,
          cps: 40,
          wait: 0,
          scroll: 0,
          scrollTo: 0,
          phase: "idle",
          timer: 0,
          alpha: 1,
          drift: 0,
          sinceKey: 9,
        };
        blocks.push(b);
        startSnippet(b);
        if (reduce.matches) {
          finish(b);
        } else if (Math.random() < 0.7) {
          // Start „w trakcie" pisania, nie od pustego ekranu.
          b.phase = "type";
          b.line = Math.floor(rand(0.15, 0.7) * b.lines.length);
          b.scroll = b.scrollTo = Math.max(0, b.line - b.rows + 1);
        }
      }
      highlight = null;
      glitch = null;
    };

    // --- pisanie ----------------------------------------------------------------
    const charDelay = (b: Block, ch: string) => {
      let d = (1 / b.cps) * rand(0.55, 1.45);
      if (Math.random() < 0.035) d += rand(0.18, 0.7); // zawahanie
      if (";,{(".includes(ch)) d += rand(0.03, 0.12);
      return d;
    };

    const step = (b: Block) => {
      const ln = b.lines[b.line];
      if (!ln) {
        b.phase = "hold";
        b.timer = rand(2.5, 5);
        return;
      }
      const len = Math.min(ln.text.length, b.cols);
      // Wcięcie wstawia „edytor" od razu — człowiek go nie wystukuje.
      if (b.col === 0 && ln.indent > 0) b.col = Math.min(ln.indent, len);
      if (b.col < len) {
        b.col++;
        b.sinceKey = 0;
        b.wait += charDelay(b, ln.text[b.col - 1]);
        return;
      }
      b.line++;
      b.col = 0;
      b.wait += len === 0 ? rand(0.05, 0.15) : rand(0.08, 0.32);
      if (b.line - b.scrollTo >= b.rows) b.scrollTo = b.line - b.rows + 1;
      if (b.line >= b.lines.length) {
        b.phase = "hold";
        b.timer = rand(2.5, 5);
      }
    };

    const update = (dt: number) => {
      clock += dt;
      for (const b of blocks) {
        b.sinceKey += dt;
        if (b.phase === "idle") {
          b.timer -= dt;
          if (b.timer <= 0) b.phase = "type";
        } else if (b.phase === "type") {
          b.wait -= dt;
          let guard = 0;
          while (b.wait <= 0 && b.phase === "type" && guard++ < 12) step(b);
        } else if (b.phase === "hold") {
          b.timer -= dt;
          if (b.timer <= 0) {
            b.phase = "fade";
            b.timer = FADE_S;
          }
        } else {
          b.timer -= dt;
          b.alpha = Math.max(0, b.timer / FADE_S);
          b.drift += dt * 14;
          if (b.timer <= 0) startSnippet(b);
        }
        b.scroll += (b.scrollTo - b.scroll) * (1 - Math.exp(-dt * 7));
      }

      // Podświetlenie linii — jak zaznaczenie w terminalu.
      if (highlight) {
        highlight.t += dt;
        if (highlight.t > 1.2) highlight = null;
      } else if ((nextHighlight -= dt) <= 0) {
        nextHighlight = rand(2.5, 5.5);
        const bi = Math.floor(Math.random() * blocks.length);
        const b = blocks[bi];
        if (b && (b.phase === "type" || b.phase === "hold")) {
          const from = Math.ceil(b.scroll);
          const to = Math.min(b.line, b.lines.length) - 1;
          const cand: number[] = [];
          for (let li = from; li <= to; li++)
            if (b.lines[li]?.text.trim()) cand.push(li);
          if (cand.length)
            highlight = {
              b: bi,
              line: cand[Math.floor(Math.random() * cand.length)],
              t: 0,
            };
        }
      }

      // Glitch: rzadko, 2 klatki przesunięcia o 2–4px.
      if (glitch) {
        if (--glitch.frames <= 0) glitch = null;
      } else if ((nextGlitch -= dt) <= 0) {
        nextGlitch = rand(4, 9);
        const bi = Math.floor(Math.random() * blocks.length);
        const b = blocks[bi];
        if (b && b.line > 0)
          glitch = {
            b: bi,
            line: Math.floor(rand(b.scroll, b.line)),
            dx: (Math.random() < 0.5 ? -1 : 1) * rand(2, 4),
            frames: 2,
          };
      }
    };

    // --- rysowanie --------------------------------------------------------------
    const draw = (caret: boolean) => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const pad = (lh - fontSize) / 2;
      const vmax = VOLTAGE_MAX * (mobile ? 0.65 : 1);

      blocks.forEach((b, bi) => {
        if (b.alpha <= 0) return;
        const first = Math.max(0, Math.floor(b.scroll));
        const last = Math.min(b.lines.length - 1, b.line);
        for (let li = first; li <= last; li++) {
          const r = li - b.scroll;
          if (r <= -1 || r >= b.rows) continue;
          const ln = b.lines[li];
          const typed =
            li < b.line ? Math.min(ln.text.length, b.cols) : b.col;
          if (typed <= 0) continue;
          // Linia uciekająca za górną krawędź bloku wygasa, nie jest ucinana.
          const fade = r < 0 ? 1 + r : 1;
          const x =
            b.x + (glitch && glitch.b === bi && glitch.line === li ? glitch.dx : 0);
          const y = b.y + r * lh - b.drift;
          const a = base * fade * b.alpha;

          for (const s of ln.segs) {
            if (s.start >= typed) break;
            ctx.fillStyle = KIND_COLOR[s.kind];
            ctx.globalAlpha = Math.min(vmax, a * KIND_ALPHA[s.kind]);
            ctx.fillText(
              s.text.slice(0, typed - s.start),
              x + s.start * charW,
              y + pad,
            );
          }

          if (highlight && highlight.b === bi && highlight.line === li) {
            // Szybki błysk, powolne gaśnięcie.
            const t = highlight.t / 1.2;
            const env = t < 0.12 ? t / 0.12 : Math.pow(1 - (t - 0.12) / 0.88, 2);
            ctx.fillStyle = voltage;
            ctx.globalAlpha = env * 0.05 * b.alpha * fade;
            ctx.fillRect(x - 4, y, typed * charW + 8, lh);
            ctx.globalAlpha = env * vmax * b.alpha * fade;
            ctx.fillText(ln.text.slice(0, typed), x, y + pad);
          }
        }

        // Karetka: pełna w trakcie pisania, mruga w bezczynności.
        if (caret && b.phase !== "fade") {
          const r = b.line - b.scroll;
          const on = b.sinceKey < 0.45 || clock % 1.06 < 0.53;
          if (on && r > -0.5 && r < b.rows) {
            ctx.fillStyle = voltage;
            ctx.globalAlpha = vmax * b.alpha;
            ctx.fillRect(
              b.x + b.col * charW,
              b.y + r * lh + lh * 0.18,
              Math.max(2, charW * 0.62),
              lh * 0.64,
            );
          }
        }
      });

      // Maska na końcu: zostaje tylko to, co maska przepuszcza.
      ctx.globalCompositeOperation = "destination-in";
      ctx.globalAlpha = 1;
      ctx.drawImage(mask, 0, 0, W, H);
      ctx.globalCompositeOperation = "source-over";
    };

    // --- rozmiar ----------------------------------------------------------------
    // clientWidth, nie getBoundingClientRect — rodzic może mieć transform
    // (parallax), a liczy się rozmiar w układzie, nie po transformacji.
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (!w || !h) return;
      W = w;
      H = h;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      mobile = W < 768;
      fontSize = mobile ? 12 : 12.5;
      lh = Math.round(fontSize * 1.6);
      base = mobile ? ALPHA_MOBILE : ALPHA_DESKTOP;
      // Zmiana rozmiaru kanwy zeruje stan kontekstu — font od nowa.
      ctx.font = `${fontSize}px ${FONT_FAMILY}`;
      ctx.textBaseline = "top";
      charW = ctx.measureText("0").width || fontSize * 0.6;
      buildMask();
      layout();
      draw(!reduce.matches);
    };

    // --- pętla ------------------------------------------------------------------
    let frame = 0;
    let running = false;
    let visible = true;
    let last = 0;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      const elapsed = last ? now - last : 1000 / FPS;
      if (elapsed < 1000 / FPS - 2) return;
      last = now;
      update(Math.min(elapsed, 100) / 1000);
      draw(true);
    };

    const start = () => {
      if (running || reduce.matches || !visible || document.hidden || !W)
        return;
      running = true;
      last = 0;
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frame);
    };
    const sync = () => {
      stop();
      start();
    };
    // Zmiana preferencji ruchu: przebudowa bloków (pełne ↔ w trakcie).
    const onReduce = () => {
      stop();
      if (W) {
        layout();
        draw(!reduce.matches);
      }
      start();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(canvas);

    let debounce = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(debounce);
      debounce = window.setTimeout(() => {
        if (canvas.clientWidth === W && canvas.clientHeight === H) return;
        resize();
        sync();
      }, 150);
    });
    ro.observe(canvas);

    resize();
    canvas.style.opacity = "1";
    sync();

    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", onReduce);

    return () => {
      stop();
      window.clearTimeout(debounce);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", onReduce);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        pointerEvents: "none",
        display: "block",
        opacity: 0,
        transition: "opacity 1.2s var(--ease-out-expo)",
      }}
    />
  );
}
