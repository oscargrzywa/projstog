/**
 * Schematyczna mapa „Mielec – Rzeszów" — Server Component, zero JS.
 *
 * Punkty są rzutowane z prawdziwych współrzędnych (rzut równoodległościowy:
 * różnica długości geograficznej × cos(50,2°), czyli środkowej szerokości
 * kadru). Jednostka układu to 1 km — pierścienie 25 i 50 km wokół Mielca
 * mają po prostu promień 25 i 50, a linia Mielec–Rzeszów wychodzi
 * ~49,6 km, tak jak w rzeczywistości.
 *
 * ⚠ Bez konturu województwa — zmyślony kształt byłby nieprawdą. Tło to
 * siatka kropek co 2 km. Cała grafika jest aria-hidden; treść niesie
 * podpis pod mapą (zwykły HTML).
 *
 * Etykiety są w HTML-u, nie w <text> — rozmiar pisma nie skaluje się
 * razem z mapą, więc na telefonie zostaje czytelny.
 *
 * Ruch (CSS, oś view() figury): pierścienie rozchodzą się od Mielca,
 * rysuje się linia do Rzeszowa, na końcu pojawia się odległość.
 */

import type { CSSProperties } from "react";

import "./page-kit.css";
import "./local-map.css";

type Side = "left" | "right" | "below";

type City = {
  name: string;
  lat: number;
  lon: number;
  /** Miasta działania — pulsujący punkt i współrzędne. Reszta jest „cicha". */
  main?: boolean;
  side: Side;
};

const MIELEC: City = { name: "Mielec", lat: 50.287, lon: 21.424, main: true, side: "left" };
const RZESZOW: City = { name: "Rzeszów", lat: 50.041, lon: 22.004, main: true, side: "below" };

const CITIES: City[] = [
  MIELEC,
  RZESZOW,
  { name: "Dębica", lat: 50.051, lon: 21.411, side: "left" },
  { name: "Tarnobrzeg", lat: 50.573, lon: 21.679, side: "right" },
  { name: "Kolbuszowa", lat: 50.244, lon: 21.776, side: "right" },
];

const KM_PER_DEG = 111.195;
const COS_LAT = Math.cos((50.2 * Math.PI) / 180);

/* Lewy górny róg kadru i jego wymiary w kilometrach. */
const LON0 = 21.05;
const LAT0 = 50.66;
const W = 78;
const H = 84;

const RINGS = [25, 50];

function project(lat: number, lon: number) {
  return {
    x: (lon - LON0) * COS_LAT * KM_PER_DEG,
    y: (LAT0 - lat) * KM_PER_DEG,
  };
}

/** Pozycja w procentach kadru — dla elementów HTML nad SVG. */
function at(x: number, y: number): CSSProperties {
  return { left: `${((x / W) * 100).toFixed(2)}%`, top: `${((y / H) * 100).toFixed(2)}%` };
}

/** 50.287 → „50°17′" */
function dm(value: number) {
  const deg = Math.floor(value);
  const min = Math.round((value - deg) * 60);
  return `${deg}°${String(min).padStart(2, "0")}′`;
}

export function LocalMap({
  distance,
  caption,
  className = "",
}: {
  /** Podpis przy linii, np. „ok. 50 km". */
  distance: string;
  /** Tekst pod mapą — jedyna treść figury widoczna dla czytnika ekranu. */
  caption: string;
  className?: string;
}) {
  const mielec = project(MIELEC.lat, MIELEC.lon);
  const rzeszow = project(RZESZOW.lat, RZESZOW.lon);

  const route = `M${mielec.x.toFixed(2)} ${mielec.y.toFixed(2)}L${rzeszow.x.toFixed(2)} ${rzeszow.y.toFixed(2)}`;

  /* Podpis odległości: na 68% linii (środek wypada akurat na pierścieniu
     25 km), odsunięty 3,4 km pod nią, obrócony wzdłuż kierunku
     Mielec → Rzeszów. */
  const dx = rzeszow.x - mielec.x;
  const dy = rzeszow.y - mielec.y;
  const angle = Math.atan2(dy, dx);
  const mid = {
    x: mielec.x + dx * 0.68 - Math.sin(angle) * 3.4,
    y: mielec.y + dy * 0.68 + Math.cos(angle) * 3.4,
  };

  /* Etykiety pierścieni: 25 km nad Mielcem, 50 km w prawym górnym łuku. */
  const ringLabels = [
    { km: 25, x: mielec.x, y: mielec.y - 25 },
    {
      km: 50,
      x: mielec.x + 50 * Math.cos((-38 * Math.PI) / 180),
      y: mielec.y + 50 * Math.sin((-38 * Math.PI) / 180),
    },
  ];

  return (
    <figure
      className={`lmap ${className}`}
      style={
        {
          "--mx": `${((mielec.x / W) * 100).toFixed(2)}%`,
          "--my": `${((mielec.y / H) * 100).toFixed(2)}%`,
        } as CSSProperties
      }
    >
      <div
        className="lmap__canvas"
        aria-hidden="true"
        style={{ aspectRatio: `${W} / ${H}` }}
      >
        <div className="lmap__grid" />

        <svg viewBox={`0 0 ${W} ${H}`} className="lmap__svg">
          {RINGS.map((km, index) => (
            <circle
              key={km}
              cx={mielec.x}
              cy={mielec.y}
              r={km}
              className={`lmap__ring lmap__ring--${index}`}
            />
          ))}

          {/* Ślad trasy (stały, przerywany) i linia, która się po nim
              rysuje — z szerszą, przygaszoną kopią jako poświatą. */}
          <path d={route} className="lmap__track" />
          <path d={route} pathLength={1} className="lmap__line lmap__line--glow" />
          <path d={route} pathLength={1} className="lmap__line" />
        </svg>

        {ringLabels.map((ring) => (
          <span
            key={ring.km}
            className="lmap__ring-label"
            style={at(ring.x, ring.y)}
          >
            {ring.km} km
          </span>
        ))}

        <span
          className="lmap__distance"
          style={
            {
              ...at(mid.x, mid.y),
              "--angle": `${((angle * 180) / Math.PI).toFixed(1)}deg`,
            } as CSSProperties
          }
        >
          {distance}
        </span>

        {CITIES.map((city) => {
          const point = project(city.lat, city.lon);
          return (
            <div
              key={city.name}
              className={`lmap__city ${city.main ? "lmap__city--main" : ""} ${
                city === RZESZOW ? "lmap__city--end" : ""
              }`}
              data-side={city.side}
              style={at(point.x, point.y)}
            >
              <span className="lmap__pin" />
              <span className="lmap__label">
                <span className="lmap__name">{city.name}</span>
                {city.main && (
                  <span className="lmap__coords">
                    {dm(city.lat)} N
                    <br />
                    {dm(city.lon)} E
                  </span>
                )}
              </span>
            </div>
          );
        })}

        {/* Północ u góry — mapa nie jest obrócona. */}
        <span className="lmap__north">
          <svg viewBox="0 0 10 14">
            <path d="M5 1L9 13L5 10L1 13Z" />
          </svg>
          N
        </span>
      </div>

      <figcaption className="lmap__caption">
        <span className="lmap__legend" aria-hidden="true" />
        {caption}
      </figcaption>
    </figure>
  );
}
