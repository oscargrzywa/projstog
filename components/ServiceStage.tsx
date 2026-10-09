/**
 * Makieta usług jednej kategorii — Server Component, czysta dekoracja
 * (`aria-hidden` nakłada rodzic: wyspa ServiceScrolly albo kopia nad
 * opisem usługi na telefonie).
 *
 * Jedno okno, w nim po jednej warstwie na usługę. Warstwę wybiera SLUG
 * usługi, nie jej pozycja na liście — zmiana kolejności w services.ts nie
 * rozjedzie obrazka z opisem, a usługa bez własnej warstwy dostaje
 * neutralny szkic. Widoczna jest warstwa, której `data-ly` równa się
 * `data-s` przodka (reguły w service-stage.css).
 *
 * Każda warstwa w stanie bazowym pokazuje „gotowy obraz" — ruch w pętli
 * istnieje tylko przy `prefers-reduced-motion: no-preference`.
 * Kolory wyłącznie z tokenów, teksty z `OFFER_CATEGORY_PAGE[lang].stage`.
 */

import type { CSSProperties, ReactNode } from "react";

import type { OfferStageCopy } from "@/content/pages/offer";
import type { ServiceCategory } from "@/lib/cms";

import "./service-stage.css";

type Copy = OfferStageCopy;

/* Indeks wejścia (stagger) i szerokość paska-szkicu jako zmienne CSS. */
const k = (i: number) => ({ "--k": i }) as CSSProperties;
const at = (left: string, top: string) => ({ left, top }) as CSSProperties;

/* ------------------------------------------------------------- ikony */

const PATHS = {
  check: "M5 12.5l4.2 4.2L19 7",
  plus: "M12 6v12M6 12h12",
  bag: "M6 8h12l-1 12H7L6 8zM9 8V6.5a3 3 0 0 1 6 0V8",
  search: "M11 5a6 6 0 1 0 0 12a6 6 0 1 0 0-12zM20 20l-4.6-4.6",
  pin: "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21zM12 12.2a2.2 2.2 0 1 0 0-4.4a2.2 2.2 0 1 0 0 4.4z",
  star: "M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z",
  phone:
    "M6.6 3.5h3l1.5 4-2 1.3a10.5 10.5 0 0 0 6.1 6.1l1.3-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4.6 5.7a2 2 0 0 1 2-2.2z",
  route: "M12 2.8l9.2 9.2-9.2 9.2L2.8 12zM9 14.5v-3.5h6M12.5 8.5l2.5 2.5-2.5 2.5",
  globe:
    "M12 3a9 9 0 1 0 0 18a9 9 0 1 0 0-18zM3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z",
  heart: "M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z",
  comment: "M4.5 5.5h15v10h-8l-4.5 3.5v-3.5h-2.5z",
  send: "M20.5 3.5L10 14M20.5 3.5l-6.7 17-3.8-6.5-6.5-3.8z",
  lock: "M6.5 10.5h11v9.5h-11zM8.8 10.5V8a3.2 3.2 0 0 1 6.4 0v2.5",
  refresh: "M19.5 12a7.5 7.5 0 1 1-2.2-5.3M19.5 4v4h-4",
  cloud:
    "M7 18.5a4.5 4.5 0 0 1-.6-9 6 6 0 0 1 11.4 1.6 3.7 3.7 0 0 1-.3 7.4zM12 16v-6M9.5 12.5L12 10l2.5 2.5",
  sparkle:
    "M12 3.5l1.9 5.1 5.1 1.9-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.9zM18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8z",
  mail: "M3.5 6h17v12h-17zM3.5 7l8.5 6.5L20.5 7",
  calendar: "M4.5 6h15v14h-15zM4.5 10h15M8.5 3.5v4M15.5 3.5v4",
  sheet: "M4 5h16v14H4zM4 10h16M4 14.5h16M10 5v14",
  form: "M6 3.5h8.5L18 7v13.5H6zM9 11h6M9 14.5h6M9 8h3",
  bell: "M6.5 16.5v-5a5.5 5.5 0 0 1 11 0v5l1.5 2h-14zM10 20.5a2 2 0 0 0 4 0",
  moon: "M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z",
  image:
    "M3.5 5.5h17v13h-17zM3.5 15.5l5-5 4 4 3-3 5 5M15.5 8.6a1.1 1.1 0 1 0 0 2.2a1.1 1.1 0 1 0 0-2.2z",
  user: "M12 12a4 4 0 1 0 0-8a4 4 0 1 0 0 8zM4.5 20.5a7.5 7.5 0 0 1 15 0",
  pointer: "M5.5 3.5l13 6.2-5.6 1.9-2.4 5.9z",
} as const;

type IconName = keyof typeof PATHS;

function Icon({
  name,
  fill = false,
  className = "",
}: {
  name: IconName;
  fill?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`stg-ic${fill ? " stg-ic--fill" : ""} ${className}`}
      focusable="false"
    >
      <path d={PATHS[name]} />
    </svg>
  );
}

/** Pasek-szkic tekstu. `v`: h — nagłówek, dim — przygaszony, sig — akcent. */
function Sk({
  w,
  v,
  className = "",
}: {
  w?: string;
  v?: "h" | "dim" | "sig";
  className?: string;
}) {
  return (
    <span
      className={`stg-sk${v ? ` stg-sk--${v}` : ""} ${className}`}
      style={w ? ({ "--w": w } as CSSProperties) : undefined}
    />
  );
}

/* ================================================== strony i sklepy */

/** One page: jedna długa strona, która sama się przewija — hero, atuty, formularz. */
function WebOnePage({ c }: { c: Copy }) {
  return (
    <div className="w1">
      <div className="w1__page">
        <div className="w1__nav stg-in" style={k(0)}>
          <span className="stg-logo" />
          <Sk w="18%" v="dim" />
          <span className="stg-pb stg-pb--ghost">{c.web.call}</span>
        </div>
        <div className="w1__hero stg-in" style={k(1)}>
          <Sk v="h" w="84%" />
          <Sk v="h" w="58%" />
          <Sk w="70%" v="dim" />
          <span className="stg-pb stg-pb--v w1__cta">
            <Icon name="phone" />
            {c.web.call}
          </span>
        </div>
        <div className="w1__feats stg-in" style={k(2)}>
          {[0, 1, 2].map((i) => (
            <div key={i} className="stg-bx w1__feat">
              <span className="w1__dot" />
              <Sk w="72%" />
              <Sk w="92%" v="dim" />
            </div>
          ))}
        </div>
        <div className="w1__band">
          <span className="stg-img w1__img" />
          <div>
            <Sk v="h" w="76%" />
            <Sk w="94%" v="dim" />
            <Sk w="80%" v="dim" />
          </div>
        </div>
        <div className="stg-bx w1__form">
          <Sk v="h" w="46%" />
          <span className="w1__field" />
          <span className="w1__field" />
          <span className="stg-pb">{c.web.send}</span>
        </div>
      </div>
      <span className="w1__thumb" />
    </div>
  );
}

/** Strona firmowa: stos podstron — znak „stóg" — który przetasowuje się w pętli. */
function WebCompany({ c }: { c: Copy }) {
  return (
    <div className="w2">
      {c.web.pages.slice(0, 4).map((label, i) => (
        <div key={label} className="w2__page" style={k(i)}>
          <div className="w2__head">
            <span className="stg-logo" />
            <span className="w2__tab">{label}</span>
            <Sk w="22%" v="dim" className="w2__nav" />
          </div>
          <span className={`stg-img w2__img${i % 2 ? " w2__img--alt" : ""}`} />
          <Sk v="h" w={i % 2 ? "48%" : "64%"} />
          <Sk w="88%" v="dim" />
          <div className="w2__cards">
            <span className="stg-bx" />
            <span className="stg-bx" />
            <span className="stg-bx" />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Sklep: kursor dodaje produkt, licznik koszyka podskakuje, wjeżdża koszyk z BLIK-iem. */
function WebShop({ c }: { c: Copy }) {
  return (
    <div className="w3">
      <div className="w3__top stg-in" style={k(0)}>
        <span className="stg-logo" />
        <Sk w="24%" v="dim" />
        <span className="w3__cart">
          <Icon name="bag" />
          <span className="w3__badge">1</span>
        </span>
      </div>
      <div className="w3__grid stg-in" style={k(1)}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="stg-bx w3__item">
            <span className="stg-img w3__img" />
            <Sk w="74%" />
            <div className="w3__buy">
              <Sk v="sig" w="38%" />
              <span className={`w3__plus${i === 0 ? " w3__plus--hit" : ""}`}>
                <Icon name="plus" />
                {i === 0 && (
                  <span className="w3__pointer">
                    <Icon name="pointer" fill />
                  </span>
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="w3__drawer">
        <span className="stg-t w3__title">{c.web.cart}</span>
        <div className="w3__line">
          <span className="stg-img" />
          <span>
            <Sk w="82%" />
            <Sk w="40%" v="dim" />
          </span>
        </div>
        <div className="w3__line w3__line--new">
          <span className="stg-img" />
          <span>
            <Sk w="70%" />
            <Sk w="36%" v="dim" />
          </span>
        </div>
        <span className="w3__rule" />
        <div className="w3__total">
          <Sk w="30%" v="dim" />
          <Sk w="28%" v="h" />
        </div>
        <span className="stg-pb stg-pb--v w3__pay">BLIK</span>
      </div>
    </div>
  );
}

/** Blog: wyróżniony wpis i lista, na którą co chwilę wskakuje nowy artykuł. */
function WebBlog({ c }: { c: Copy }) {
  return (
    <div className="w4">
      <div className="w4__top stg-in" style={k(0)}>
        <span className="stg-logo" />
        <Sk w="20%" v="dim" />
        <Icon name="search" />
      </div>
      <div className="w4__cols">
        <div className="w4__feat stg-in" style={k(1)}>
          <span className="stg-img w4__img" />
          <span className="w4__chip" />
          <Sk v="h" w="92%" />
          <Sk v="h" w="62%" />
          <Sk w="86%" v="dim" />
        </div>
        <div className="w4__list stg-in" style={k(2)}>
          <div className="w4__track">
            <div className="w4__post w4__post--new">
              <span className="stg-img" />
              <span className="w4__lines">
                <span className="w4__badge">{c.web.newPost}</span>
                <Sk w="88%" />
              </span>
            </div>
            {[0, 1, 2].map((i) => (
              <div key={i} className="w4__post">
                <span className="stg-img" />
                <span className="w4__lines">
                  <Sk w="36%" v="sig" />
                  <Sk w="90%" />
                  <Sk w="58%" v="dim" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================= sztuczna inteligencja */

/** Automatyzacja: formularz → AI → arkusz, skrzynka, kalendarz. Impuls biegnie po łączach. */
function AiFlow({ c }: { c: Copy }) {
  const outputs: { icon: IconName; label: string; top: string }[] = [
    { icon: "sheet", label: c.ai.sheet, top: "19.4%" },
    { icon: "mail", label: c.ai.inbox, top: "50%" },
    { icon: "calendar", label: c.ai.calendar, top: "80.6%" },
  ];

  return (
    <div className="a1">
      {/* viewBox = proporcje okna makiety (100 × 72), więc współrzędne
          łączy zgadzają się z węzłami pozycjonowanymi w procentach. */}
      <svg className="a1__wires" viewBox="0 0 100 72" focusable="false">
        {[
          "M26 36H37",
          "M51 36C60 36 60 14 69 14",
          "M51 36H69",
          "M51 36C60 36 60 58 69 58",
        ].map((d, i) => (
          <g key={d}>
            <path className="a1__wire" d={d} />
            <path
              className={`a1__flow${i ? " a1__flow--out" : ""}`}
              d={d}
              pathLength={100}
            />
          </g>
        ))}
      </svg>

      <span className="a1__switch stg-in" style={k(0)}>
        <i />
      </span>

      <span className="a1__node a1__node--src stg-in" style={{ ...at("15%", "50%"), ...k(1) }}>
        <Icon name="form" />
        <span>{c.ai.form}</span>
      </span>
      <span className="a1__node a1__node--ai stg-in" style={{ ...at("44%", "50%"), ...k(2) }}>
        <Icon name="sparkle" />
        <span>AI</span>
      </span>
      {outputs.map((out, i) => (
        <span
          key={out.label}
          className="a1__node a1__node--out stg-in"
          style={{ ...at("80%", out.top), ...k(3 + i) }}
        >
          <Icon name={out.icon} />
          <span>{out.label}</span>
          <span className="a1__check">
            <Icon name="check" />
          </span>
        </span>
      ))}
    </div>
  );
}

/** Chatbot: pytanie klienta w nocy, odpowiedź, na końcu karta zostawienia kontaktu. */
function AiChat({ c }: { c: Copy }) {
  return (
    <div className="a2">
      <div className="a2__head stg-in" style={k(0)}>
        <span className="a2__avatar">
          <Icon name="sparkle" />
        </span>
        <span className="a2__who">
          <span className="stg-t">{c.ai.assistant}</span>
          <span className="a2__dot" />
        </span>
        <Icon name="moon" className="a2__moon" />
      </div>
      <div className="a2__log">
        <div className="a2__msg a2__msg--in a2__m0">
          <Sk />
          <Sk w="62%" />
        </div>
        <div className="a2__msg a2__msg--bot a2__m1">
          <span className="a2__typing">
            <i />
            <i />
            <i />
          </span>
          <span className="a2__body">
            <Sk />
            <Sk w="56%" />
          </span>
        </div>
        <div className="a2__msg a2__msg--in a2__m2">
          <Sk w="80%" />
        </div>
        <div className="a2__msg a2__msg--bot a2__m3">
          <span className="a2__typing">
            <i />
            <i />
            <i />
          </span>
          <span className="a2__body">
            <Sk w="78%" />
            <span className="a2__field">
              <Icon name="mail" />
              <Sk w="58%" v="dim" />
            </span>
            <span className="a2__field">
              <Icon name="phone" />
              <Sk w="46%" v="dim" />
            </span>
          </span>
        </div>
      </div>
      <div className="a2__compose stg-in" style={k(1)}>
        <Sk w="54%" v="dim" />
        <Icon name="send" />
      </div>
    </div>
  );
}

/** CRM: zapytanie przechodzi przez lejek, po drodze przypomnienie o kontakcie. */
function AiCrm({ c }: { c: Copy }) {
  return (
    <div className="a3">
      <div className="a3__top stg-in" style={k(0)}>
        <span className="a3__search">
          <Icon name="search" />
          <Sk w="46%" v="dim" />
        </span>
        <span className="a3__add">
          <Icon name="plus" />
        </span>
      </div>
      <div className="a3__board stg-in" style={k(1)}>
        {c.ai.pipeline.slice(0, 3).map((label) => (
          <div key={label} className="a3__col">
            <span className="a3__colhead">
              <span className="stg-t">{label}</span>
            </span>
            <span className="stg-bx a3__card">
              <Sk w="72%" />
              <Sk w="44%" v="dim" />
            </span>
            <span className="stg-bx a3__card">
              <Sk w="56%" />
              <Sk w="36%" v="dim" />
            </span>
          </div>
        ))}
        <span className="stg-bx a3__mover">
          <Sk w="68%" />
          <Sk w="40%" v="dim" />
          <span className="a3__check">
            <Icon name="check" />
          </span>
        </span>
      </div>
      <span className="a3__toast">
        <Icon name="bell" />
        <Sk w="62%" />
      </span>
    </div>
  );
}

/** Aplikacja: ten sam kalkulator na komputerze i telefonie, suwak rusza się w obu naraz. */
function AiApp({ c }: { c: Copy }) {
  const calc = (
    <div className="a4__main">
      <span className="a4__title">{c.ai.quote}</span>
      <Sk w="46%" v="dim" />
      <span className="a4__slider">
        <span className="a4__fill" />
        <span className="a4__knob" />
      </span>
      <Sk w="38%" v="dim" />
      <span className="a4__opts">
        <span />
        <span className="a4__opt--on" />
        <span />
      </span>
      <span className="a4__checks">
        <span className="a4__tick a4__tick--on" />
        <Sk w="54%" />
        <span className="a4__tick" />
        <Sk w="40%" v="dim" />
      </span>
      <span className="a4__result">
        <Sk w="42%" v="dim" />
        <span className="a4__total">
          <i />
        </span>
      </span>
      <span className="stg-pb stg-pb--v a4__go" />
    </div>
  );

  return (
    <div className="a4">
      <div className="a4__desk stg-in" style={k(0)}>
        <div className="a4__side">
          <span className="stg-logo" />
          <Sk w="80%" />
          <Sk w="64%" v="dim" />
          <Sk w="72%" v="dim" />
          <Sk w="54%" v="dim" />
        </div>
        {calc}
      </div>
      <div className="a4__phone stg-in" style={k(1)}>
        <span className="a4__notch" />
        {calc}
      </div>
    </div>
  );
}

/* ================================================ marketing i widoczność */

/** Wizytówka Google: wpisane zapytanie, pinezka na mapie i karta firmy. */
function MkGoogle({ c }: { c: Copy }) {
  const icons: IconName[] = ["route", "phone", "globe"];

  return (
    <div className="m1">
      <div className="m1__map">
        <svg viewBox="0 0 100 72" focusable="false" className="m1__roads">
          <rect className="m1__park" x="70" y="40" width="20" height="14" rx="2" />
          <rect className="m1__block" x="4" y="44" width="14" height="10" rx="1.5" />
          <rect className="m1__block" x="30" y="6" width="16" height="9" rx="1.5" />
          <path className="m1__road" d="M-5 34C20 30 34 38 52 28S84 14 105 18" />
          <path className="m1__road" d="M24 -5C27 16 20 36 28 77" />
          <path className="m1__road m1__road--minor" d="M62 -5C60 14 68 34 63 77" />
          <path className="m1__road m1__road--minor" d="M-5 20H40C48 20 50 16 58 16H105" />
          <path className="m1__road m1__road--minor" d="M-5 56H40C50 56 56 50 66 50H105" />
        </svg>
        <span className="m1__pin m1__pin--dim" style={at("16%", "40%")}>
          <Icon name="pin" />
        </span>
        <span className="m1__pin m1__pin--dim" style={at("74%", "40%")}>
          <Icon name="pin" />
        </span>
        <span className="m1__pin m1__pin--dim" style={at("88%", "29%")}>
          <Icon name="pin" />
        </span>
        <span className="m1__pin m1__pin--you" style={at("46%", "54%")}>
          <span className="m1__ring" />
          <Icon name="pin" fill />
        </span>
      </div>

      <div className="m1__search">
        <Icon name="search" />
        <span className="m1__q">
          <span className="m1__qt">{c.marketing.query}</span>
          <i className="m1__caret" />
        </span>
      </div>

      <div className="m1__card stg-in" style={k(1)}>
        <div className="m1__row">
          <span className="m1__name">{c.marketing.business}</span>
          <span className="m1__stars">
            {[0, 1, 2, 3, 4].map((i) => (
              <Icon key={i} name="star" fill />
            ))}
          </span>
        </div>
        <div className="m1__meta">
          <span className="m1__open">{c.marketing.open}</span>
          <Sk w="34%" v="dim" />
        </div>
        <div className="m1__acts">
          {c.marketing.actions.slice(0, 3).map((label, i) => (
            <span key={label} className="m1__act">
              <Icon name={icons[i]} />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Social media: post ze zdjęciem z realizacji i miesięczny plan publikacji. */
function MkSocial({ c }: { c: Copy }) {
  const planned = [2, 4, 8, 13, 15, 19, 24, 26];

  return (
    <div className="m2">
      <div className="m2__post stg-in" style={k(0)}>
        <div className="m2__head">
          <span className="m2__avatar" />
          <span className="m2__who">
            <span className="stg-t">{c.marketing.business}</span>
            <Sk w="44%" v="dim" />
          </span>
        </div>
        <span className="stg-img m2__img">
          <Icon name="image" />
        </span>
        <div className="m2__acts">
          <span className="m2__heart">
            <Icon name="heart" fill />
          </span>
          <Icon name="comment" />
          <Icon name="send" />
        </div>
        <Sk w="92%" />
        <Sk w="60%" v="dim" />
      </div>
      <div className="m2__plan stg-in" style={k(1)}>
        <span className="m2__planhead">
          <Icon name="calendar" />
          <Sk w="54%" v="dim" />
        </span>
        <span className="m2__days">
          {Array.from({ length: 28 }, (_, day) => {
            const slot = planned.indexOf(day);
            return (
              <span
                key={day}
                className={slot >= 0 ? "m2__day--post" : undefined}
                style={slot >= 0 ? k(slot) : undefined}
              />
            );
          })}
        </span>
        {/* Kolejka: następne posty czekające na akceptację. */}
        {[0, 1].map((i) => (
          <span key={i} className="m2__next">
            <span className="stg-img" />
            <span>
              <Sk w={i ? "62%" : "80%"} />
              <Sk w="44%" v="dim" />
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Copywriting: ogólnik zostaje skreślony, w jego miejsce wpisuje się zdanie o kliencie. */
function MkCopy({ c }: { c: Copy }) {
  return (
    <div className="m3">
      <div className="m3__doc stg-in" style={k(0)}>
        <div className="m3__tools">
          <span />
          <span />
          <span />
          <Sk w="20%" v="dim" />
        </div>
        <span className="m3__before">
          <span className="m3__beforetext">{c.marketing.before}</span>
          <i className="m3__strike" />
        </span>
        <span className="m3__after">
          <span className="m3__aftertext">{c.marketing.after}</span>
          <i className="m3__caret" />
        </span>
        <span className="m3__body">
          <Sk />
          <Sk w="94%" />
          <Sk w="86%" />
          <Sk w="58%" v="dim" />
        </span>
      </div>
      <span className="m3__note stg-in" style={k(2)}>
        <Icon name="check" />
        <Sk w="76%" />
        <Sk w="52%" v="dim" />
      </span>
    </div>
  );
}

/* ===================================================== opieka i wsparcie */

/** Panel statusu: strona działa, SSL ważny, kopia się robi, aktualizacje przechodzą. */
function CareStatus({ c }: { c: Copy }) {
  return (
    <div className="c1">
      <div className="c1__head stg-in" style={k(0)}>
        <span className="c1__live" />
        <span className="stg-t c1__domain">{c.web.domain}</span>
        <span className="c1__badge">OK</span>
      </div>
      <div className="stg-bx c1__uptime stg-in" style={k(1)}>
        <span className="stg-t">{c.care.online}</span>
        <span className="c1__bars">
          <span className="c1__track">
            {Array.from({ length: 40 }, (_, i) => (
              <i key={i} />
            ))}
          </span>
        </span>
      </div>
      <div className="stg-bx c1__row stg-in" style={k(2)}>
        <Icon name="lock" />
        <span className="stg-t">{c.care.ssl}</span>
        <span className="c1__ok">
          <Icon name="check" />
        </span>
      </div>
      <div className="stg-bx c1__row stg-in" style={k(3)}>
        <Icon name="globe" />
        <span className="stg-t">{c.care.domain}</span>
        <span className="c1__ok">
          <Icon name="check" />
        </span>
      </div>
      <div className="stg-bx c1__row stg-in" style={k(4)}>
        <Icon name="cloud" />
        <span className="stg-t">{c.care.backup}</span>
        <span className="c1__prog">
          <i />
        </span>
        <span className="c1__ok c1__ok--backup">
          <Icon name="check" />
        </span>
      </div>
      <div className="stg-bx c1__row stg-in" style={k(5)}>
        <Icon name="refresh" className="c1__spin" />
        <span className="stg-t">{c.care.updates}</span>
        <span className="c1__ok c1__ok--update">
          <Icon name="check" />
        </span>
      </div>
    </div>
  );
}

/** Wsparcie: prośba o zmianę, odpowiedź, poprawka widoczna od razu na stronie. */
function CareSupport({ c }: { c: Copy }) {
  return (
    <div className="c2">
      <div className="c2__head stg-in" style={k(0)}>
        <span className="c2__avatar">
          <Icon name="user" />
        </span>
        <Sk w="26%" />
        <span className="c2__ch">
          <Icon name="mail" />
          <Icon name="phone" />
        </span>
      </div>
      <div className="c2__log">
        <span className="c2__msg c2__msg--in">
          <span className="stg-t">{c.care.request}</span>
        </span>
        <span className="c2__msg c2__msg--out">
          <span className="c2__typing">
            <i />
            <i />
            <i />
          </span>
          <span className="c2__body">
            <Sk />
            <Sk w="58%" />
          </span>
        </span>
      </div>
      <div className="stg-bx c2__site stg-in" style={k(1)}>
        <span className="stg-logo" />
        <span className="c2__lines">
          <Sk v="h" w="52%" />
          <span className="c2__swap">
            <Sk w="72%" v="dim" className="c2__old" />
            <Sk w="72%" v="sig" className="c2__new" />
          </span>
          <Sk w="84%" v="dim" />
          <Sk w="60%" v="dim" />
        </span>
        <span className="stg-img c2__img" />
        <span className="c2__done">
          <Icon name="check" />
          {c.care.done}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ rejestr */

/** Usługa spoza rejestru — neutralny szkic, żeby makieta nigdy nie była pusta. */
function Generic() {
  return (
    <div className="g0">
      <Sk v="h" w="62%" />
      <Sk w="90%" v="dim" />
      <Sk w="74%" v="dim" />
      <div className="g0__grid">
        <span className="stg-bx" />
        <span className="stg-bx" />
        <span className="stg-bx" />
      </div>
    </div>
  );
}

const LAYERS: Record<string, (c: Copy) => ReactNode> = {
  "strona-one-page": (c) => <WebOnePage c={c} />,
  "strona-firmowa": (c) => <WebCompany c={c} />,
  "sklep-internetowy": (c) => <WebShop c={c} />,
  "blog-i-platforma-tresci": (c) => <WebBlog c={c} />,
  "automatyzacje-ai": (c) => <AiFlow c={c} />,
  "chatboty-ai": (c) => <AiChat c={c} />,
  "systemy-crm": (c) => <AiCrm c={c} />,
  "aplikacje-na-zamowienie": (c) => <AiApp c={c} />,
  "google-moja-firma": (c) => <MkGoogle c={c} />,
  "social-media": (c) => <MkSocial c={c} />,
  copywriting: (c) => <MkCopy c={c} />,
  "hosting-i-administracja": (c) => <CareStatus c={c} />,
  "wsparcie-techniczne": (c) => <CareSupport c={c} />,
};

/** Adres w pasku okna: dla stron — URL podstrony, dla reszty nazwa usługi.
    Strona firmowa zostaje przy samej domenie — jej stos przetasowuje
    podstrony, więc stała ścieżka rozjeżdżałaby się z kartą z przodu. */
const WEB_PATHS: Record<string, keyof Copy["web"]["paths"]> = {
  "sklep-internetowy": "shop",
  "blog-i-platforma-tresci": "blog",
};

export function ServiceStage({
  category,
  copy,
  only,
}: {
  category: ServiceCategory;
  copy: Copy;
  /** Tylko jedna warstwa — statyczna kopia nad opisem usługi (telefon, tablet). */
  only?: number;
}) {
  const web = category.slug === "strony-i-sklepy";
  const shown = category.services
    .map((service, index) => ({ service, index }))
    .filter(({ index }) => only === undefined || only === index);

  return (
    <div className={`stg stg--${category.slug}`}>
      <div className="stg__bar">
        <span className="stg__dots">
          <span />
          <span />
          <span />
        </span>
        <span className="stg__pill">
          {web && <Icon name="lock" />}
          <span className="stg__pilltext">
            {shown.map(({ service, index }) => {
              const path = WEB_PATHS[service.slug];
              return (
                <span key={service.slug} data-ly={index}>
                  {web ? `${copy.web.domain}${path ? copy.web.paths[path] : ""}` : service.title}
                </span>
              );
            })}
          </span>
        </span>
      </div>

      <div className="stg__view">
        {shown.map(({ service, index }) => (
          <div key={service.slug} className="stg-layer" data-ly={index}>
            {(LAYERS[service.slug] ?? Generic)(copy)}
          </div>
        ))}
      </div>
    </div>
  );
}
