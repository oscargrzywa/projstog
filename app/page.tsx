import { Nav } from "./components/Nav";
import { ContactForm } from "./components/ContactForm";

// ── Logo ──────────────────────────────────────────────────────────────────────
function ProjstogLogo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.2)}
      viewBox="0 0 40 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={true}
    >
      <path d="M20 2L33 14H7L20 2Z" fill="#34E12E" />
      <rect x="7" y="16" width="26" height="9" rx="1" fill="#34E12E" opacity="0.85" />
      <rect x="4" y="27" width="32" height="9" rx="1" fill="#34E12E" opacity="0.65" />
      <rect x="1" y="38" width="38" height="9" rx="1" fill="#34E12E" opacity="0.45" />
    </svg>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const S = { width: 26, height: 26, fill: "none", stroke: "#34E12E", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true as const };

const IconGlobe   = () => <svg {...S} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const IconCart    = () => <svg {...S} viewBox="0 0 24 24"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>;
const IconTrend   = () => <svg {...S} viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>;
const IconWand    = () => <svg {...S} viewBox="0 0 24 24"><line x1="4" y1="20" x2="20" y2="4"/><path d="m14 4 4 4M4 14l4 4M10 6l2-2M16 12l2-2M6 10l-2 2M12 16l-2 2"/></svg>;
const IconBolt    = () => <svg {...S} viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const IconTarget  = () => <svg {...S} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
const IconSupport = () => <svg {...S} viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const IconMail    = () => <svg {...{ ...S, width: 22, height: 22 }} viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const IconCheck   = () => <svg {...{ ...S, width: 16, height: 16, strokeWidth: 2.5 }} viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>;

// ── Helpers ───────────────────────────────────────────────────────────────────
function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <p
        style={{
          fontSize: 11,
          fontWeight: 700,
          color: "#34E12E",
          letterSpacing: 3,
          textTransform: "uppercase",
          margin: "0 0 12px",
        }}
      >
        {label}
      </p>
      <h2
        style={{
          fontFamily: "var(--font-geist-mono)",
          fontSize: "clamp(1.8rem,4vw,2.6rem)",
          fontWeight: 700,
          color: "#ECE7DD",
          lineHeight: 1.2,
          margin: 0,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

function IconBox({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 52,
        height: 52,
        borderRadius: 12,
        background: "rgba(52,225,46,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const SERVICES = [
  { Icon: IconGlobe, title: "Strony wizytówkowe", desc: "Szybkie, nowoczesne strony firmowe z myślą o konwersji. Pierwsze wrażenie w internecie ma ogromne znaczenie.", tags: ["SEO-ready", "Mobile-first", "CMS"] },
  { Icon: IconCart,  title: "Sklepy e-commerce",  desc: "Sklepy internetowe, które sprzedają. Intuicyjny UX, szybkie ładowanie i integracje z systemami płatności.", tags: ["WooCommerce", "Shopify", "Custom"] },
  { Icon: IconTrend, title: "Pozycjonowanie SEO", desc: "Organiczny ruch z Google to najlepsza inwestycja. Budujemy widoczność Twojej strony na długie lata.", tags: ["Audyt SEO", "Treści", "Linki"] },
  { Icon: IconWand,  title: "Redesign stron",     desc: "Stara strona traci klientów? Odświeżamy wizerunek, poprawiamy wydajność i zwiększamy konwersję.", tags: ["UI/UX", "Performance", "Migracja"] },
] as const;

const PROCESS = [
  { step: "01", title: "Konsultacja",      desc: "Bezpłatna rozmowa — poznajemy Twój biznes, branżę i cele. To fundament dobrego projektu." },
  { step: "02", title: "Projekt graficzny", desc: "Tworzymy makietę i projekt UX/UI. Iterujemy, aż będziesz w pełni zadowolony." },
  { step: "03", title: "Realizacja",        desc: "Budujemy stronę według zatwierdzonego projektu. Kod czysty, szybki i skalowalny." },
  { step: "04", title: "Wdrożenie",         desc: "Launch, testy na urządzeniach, szkolenie z CMS i opieka techniczna po starcie." },
] as const;

const WHY = [
  { Icon: IconBolt,    title: "Szybka realizacja",    desc: "Strona gotowa w 2–4 tygodnie od zatwierdzenia projektu. Szanujemy Twój czas i dotrzymujemy terminów." },
  { Icon: IconTarget,  title: "Orientacja na wyniki", desc: "Każda decyzja projektowa służy konwersji. Nie robimy sztuki dla sztuki — robimy strony, które zarabiają." },
  { Icon: IconSupport, title: "Wsparcie po starcie",  desc: "Nie znikamy po wdrożeniu. Oferujemy stałą opiekę techniczną i aktualizacje w przystępnej cenie." },
] as const;

const PORTFOLIO = [
  { name: "Kancelaria Malinowski & Wspólnicy", cat: "Strona firmowa",        bg: "#0d1f1a" },
  { name: "UrbanFit Store",                    cat: "Sklep e-commerce",      bg: "#0d1a1f" },
  { name: "Studio Architektoniczne Kurek",     cat: "Portfolio & Wizytówka", bg: "#1a0d1f" },
] as const;

const OWNER_POINTS = [
  "Każdy projekt traktuję jak własny biznes — zależy mi na Twoich wynikach, nie tylko dostarczeniu kodu.",
  "Pracuję bezpośrednio z klientem — bez pośredników, agencyjnych narzutów i głuchych telefonów.",
  "Łączę estetykę z funkcjonalnością: piękna strona, która ładuje się 5 sekund, nie sprzedaje — moja tak.",
] as const;

const STATS: [string, string][] = [
  ["50+",  "Projektów"],
  ["100%", "Zadowolonych klientów"],
  ["24h",  "Wycena w ciągu"],
];

const FOOTER_LINKS: [string, string][] = [
  ["Usługi",    "#uslugi"],
  ["Portfolio", "#portfolio"],
  ["Kontakt",   "#kontakt"],
];

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div style={{ background: "#060807", color: "#ECE7DD", overflowX: "hidden" }}>
      <Nav />

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          paddingTop: 72,
        }}
      >
        {/* Grid background */}
        <div
          aria-hidden={true}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(52,225,46,0.035) 1px,transparent 1px),linear-gradient(90deg,rgba(52,225,46,0.035) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
            pointerEvents: "none",
          }}
        />
        {/* Green glow */}
        <div
          aria-hidden={true}
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 800,
            height: 800,
            background: "radial-gradient(circle,rgba(52,225,46,0.07) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="hero-content"
          style={{
            position: "relative",
            textAlign: "center",
            padding: "80px 24px 60px",
            maxWidth: 820,
            width: "100%",
          }}
        >
          {/* Logo with glow */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 36 }}>
            <div style={{ filter: "drop-shadow(0 0 52px rgba(52,225,46,0.4))" }}>
              <ProjstogLogo size={86} />
            </div>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-geist-mono)",
              fontWeight: 800,
              fontSize: "clamp(2.4rem,6vw,4.8rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              margin: "0 0 22px",
            }}
          >
            Strony,{" "}
            <span
              style={{
                background: "linear-gradient(135deg,#1B9D17 0%,#34E12E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              które zarabiają
            </span>
          </h1>

          <p
            style={{
              fontSize: "clamp(1rem,2vw,1.15rem)",
              color: "#6b8068",
              lineHeight: 1.8,
              margin: "0 auto 44px",
              maxWidth: 540,
            }}
          >
            Tworzymy profesjonalne strony internetowe i sklepy e-commerce, które realnie
            napędzają sprzedaż Twojego biznesu. Bez teorii — tylko wyniki.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href="#kontakt"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "linear-gradient(135deg,#1B9D17,#34E12E)",
                color: "#060807",
                fontWeight: 700,
                fontSize: 15,
                padding: "14px 32px",
                borderRadius: 10,
                textDecoration: "none",
                boxShadow: "0 8px 32px rgba(52,225,46,0.28)",
              }}
            >
              Zamów stronę <span aria-hidden={true}>→</span>
            </a>
            <a
              href="#portfolio"
              style={{
                display: "inline-flex",
                alignItems: "center",
                border: "1px solid rgba(52,225,46,0.35)",
                color: "#34E12E",
                fontWeight: 600,
                fontSize: 15,
                padding: "14px 32px",
                borderRadius: 10,
                textDecoration: "none",
              }}
            >
              Zobacz portfolio
            </a>
          </div>

          {/* Stats */}
          <div className="hero-stats" style={{ display: "flex", gap: 56, justifyContent: "center", marginTop: 80, flexWrap: "wrap" }}>
            {STATS.map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "2rem",
                    fontWeight: 800,
                    color: "#34E12E",
                    lineHeight: 1,
                  }}
                >
                  {v}
                </div>
                <div style={{ fontSize: 12, color: "#4a6347", marginTop: 6, letterSpacing: 0.5 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="uslugi" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader label="Nasze usługi" title="Co tworzymy?" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
              gap: 24,
              marginTop: 64,
            }}
          >
            {SERVICES.map(({ Icon, title, desc, tags }) => (
              <div key={title} className="service-card" style={{ padding: "32px 28px", borderRadius: 16 }}>
                <IconBox>
                  <Icon />
                </IconBox>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#ECE7DD", margin: "0 0 12px" }}>{title}</h3>
                <p style={{ fontSize: 14, color: "#6b8068", lineHeight: 1.75, margin: "0 0 20px" }}>{desc}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        padding: "4px 10px",
                        borderRadius: 100,
                        background: "rgba(52,225,46,0.07)",
                        color: "#34E12E",
                        letterSpacing: 0.5,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="proces" style={{ padding: "100px 24px", background: "#070c07" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader label="Nasz proces" title="Jak działamy?" />
          <div
            className="process-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 32,
              marginTop: 64,
            }}
          >
            {PROCESS.map(({ step, title, desc }, i) => (
              <div key={step} style={{ position: "relative" }}>
                <div
                  style={{
                    fontFamily: "var(--font-geist-mono)",
                    fontSize: "3rem",
                    fontWeight: 800,
                    color: "rgba(52,225,46,0.07)",
                    lineHeight: 1,
                    margin: "0 0 16px",
                  }}
                >
                  {step}
                </div>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#34E12E",
                    marginBottom: 16,
                    boxShadow: "0 0 10px rgba(52,225,46,0.5)",
                  }}
                />
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#ECE7DD", margin: "0 0 10px" }}>{title}</h3>
                <p style={{ fontSize: 14, color: "#6b8068", lineHeight: 1.75, margin: 0 }}>{desc}</p>
                {i < 3 && (
                  <div
                    className="process-connector"
                    style={{
                      position: "absolute",
                      top: 88,
                      right: -18,
                      fontSize: 22,
                      color: "rgba(52,225,46,0.2)",
                      lineHeight: 1,
                      userSelect: "none",
                    }}
                    aria-hidden={true}
                  >
                    ›
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader label="Dlaczego my?" title="Wybierz PROJSTOG" />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
              gap: 28,
              marginTop: 64,
            }}
          >
            {WHY.map(({ Icon, title, desc }) => (
              <div key={title} className="why-card" style={{ padding: "36px 32px", borderRadius: 16 }}>
                <IconBox>
                  <Icon />
                </IconBox>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#ECE7DD", margin: "0 0 12px" }}>{title}</h3>
                <p style={{ fontSize: 15, color: "#6b8068", lineHeight: 1.75, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="portfolio" style={{ padding: "100px 24px", background: "#070c07" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SectionHeader label="Nasze realizacje" title="Portfolio" />
          <div
            className="portfolio-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))",
              gap: 24,
              marginTop: 64,
            }}
          >
            {PORTFOLIO.map(({ name, cat, bg }) => (
              <div
                key={name}
                className="portfolio-card"
                style={{ borderRadius: 16, overflow: "hidden", background: bg }}
              >
                <div
                  style={{
                    height: 200,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                  }}
                >
                  <div style={{ filter: "drop-shadow(0 0 20px rgba(52,225,46,0.25))" }}>
                    <ProjstogLogo size={44} />
                  </div>
                  <span
                    style={{
                      fontFamily: "var(--font-geist-mono)",
                      fontSize: 9,
                      color: "#34E12E",
                      letterSpacing: 3,
                      opacity: 0.6,
                    }}
                  >
                    PROJSTOG DESIGN
                  </span>
                </div>
                <div style={{ padding: "20px 24px 28px" }}>
                  <div
                    style={{
                      fontSize: 10,
                      color: "#34E12E",
                      fontWeight: 700,
                      letterSpacing: 2,
                      marginBottom: 8,
                      textTransform: "uppercase",
                    }}
                  >
                    {cat}
                  </div>
                  <div style={{ fontSize: 17, fontWeight: 700, color: "#ECE7DD" }}>{name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT OWNER ── */}
      <section id="wlasciciel" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <SectionHeader label="O właścicielu" title="Poznaj twórcę PROJSTOG" />

          <div
            className="owner-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr",
              gap: 72,
              marginTop: 72,
              alignItems: "start",
            }}
          >
            {/* Avatar */}
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 160,
                  height: 160,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg,#1B9D17,#34E12E)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-geist-mono)",
                  fontWeight: 800,
                  fontSize: 52,
                  color: "#060807",
                  margin: "0 auto",
                  boxShadow: "0 0 60px rgba(52,225,46,0.22)",
                }}
                aria-label="Oscar Grzywa"
              >
                OG
              </div>
              <div style={{ marginTop: 24 }}>
                <div style={{ fontWeight: 700, fontSize: 18, color: "#ECE7DD" }}>Oscar Grzywa</div>
                <div style={{ fontSize: 13, color: "#34E12E", marginTop: 4, fontWeight: 600 }}>
                  Założyciel &amp; CEO
                </div>
              </div>
              <a
                href="mailto:oscar.grzywa@gmail.com"
                style={{
                  display: "inline-block",
                  marginTop: 20,
                  padding: "9px 18px",
                  borderRadius: 8,
                  border: "1px solid rgba(52,225,46,0.3)",
                  color: "#34E12E",
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                Napisz do mnie
              </a>
            </div>

            {/* Bio */}
            <div>
              <h3
                style={{ fontSize: 22, fontWeight: 700, color: "#ECE7DD", margin: "0 0 20px", lineHeight: 1.4 }}
              >
                Pasja do stron, które napędzają biznes
              </h3>
              <p style={{ fontSize: 15, color: "#6b8068", lineHeight: 1.85, margin: "0 0 16px" }}>
                Jestem <strong style={{ color: "#ECE7DD" }}>Oscar Grzywa</strong> — web developer i twórca
                PROJSTOG. Pomagam firmom budować silną obecność w internecie poprzez strony, które wyglądają
                profesjonalnie i{" "}
                <strong style={{ color: "#ECE7DD" }}>realnie przekładają się na wyniki sprzedaży</strong>.
              </p>
              <p style={{ fontSize: 15, color: "#6b8068", lineHeight: 1.85, margin: "0 0 32px" }}>
                PROJSTOG powstało z prostej obserwacji: wiele firm traci klientów przez słabą lub przestarzałą
                stronę internetową. Moją misją jest to zmieniać — jedno wdrożenie na raz.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {OWNER_POINTS.map((txt, i) => (
                  <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ flexShrink: 0, marginTop: 2 }}>
                      <IconCheck />
                    </div>
                    <p style={{ fontSize: 14, color: "#6b8068", lineHeight: 1.75, margin: 0 }}>{txt}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="kontakt" style={{ padding: "100px 24px", background: "#070c07" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <SectionHeader label="Skontaktuj się" title="Zaczynamy od rozmowy" />
          <div
            className="contact-grid"
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, marginTop: 72 }}
          >
            {/* Info */}
            <div>
              <p style={{ fontSize: 15, color: "#6b8068", lineHeight: 1.85, margin: "0 0 40px" }}>
                Napisz do mnie —{" "}
                <strong style={{ color: "#ECE7DD" }}>pierwsza konsultacja jest bezpłatna</strong>. Opisz
                swój projekt, a wycenę przygotuję w ciągu 24 godzin.
              </p>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "rgba(52,225,46,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <IconMail />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "#6b8068",
                      marginBottom: 4,
                      textTransform: "uppercase",
                      letterSpacing: 1,
                      fontWeight: 600,
                    }}
                  >
                    Email
                  </div>
                  <a
                    href="mailto:oscar.grzywa@gmail.com"
                    style={{ color: "#34E12E", textDecoration: "none", fontSize: 15, fontWeight: 500 }}
                  >
                    oscar.grzywa@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "44px 24px", borderTop: "1px solid rgba(52,225,46,0.06)" }}>
        <div
          className="footer-inner"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ProjstogLogo size={26} />
            <span
              style={{
                fontFamily: "var(--font-geist-mono)",
                fontWeight: 800,
                fontSize: 15,
                color: "#ECE7DD",
                letterSpacing: 3,
              }}
            >
              PROJSTOG
            </span>
          </div>
          <p style={{ fontSize: 13, color: "#3d5e3a", margin: 0 }}>
            Strony, które zarabiają &middot; &copy; {new Date().getFullYear()} Oscar Grzywa
          </p>
          <nav aria-label="Stopka" style={{ display: "flex", gap: 24 }}>
            {FOOTER_LINKS.map(([l, h]) => (
              <a key={l} href={h} style={{ fontSize: 13, color: "#3d5e3a", textDecoration: "none" }}>
                {l}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
