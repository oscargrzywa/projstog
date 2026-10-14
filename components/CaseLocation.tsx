/**
 * Miejscowość klienta z pinezką — przy każdej realizacji widać, skąd jest
 * firma. Pinezka to ten sam znak, co obszar „Marketing i widoczność".
 */

const PIN =
  "M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21zM12 12.2a2.2 2.2 0 1 0 0-4.4a2.2 2.2 0 1 0 0 4.4z";

export function CaseLocation({
  location,
  className = "",
}: {
  location: string;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        focusable="false"
        className="h-[1.15em] w-[1.15em] flex-none text-voltage"
      >
        <path d={PIN} />
      </svg>
      {location}
    </span>
  );
}
