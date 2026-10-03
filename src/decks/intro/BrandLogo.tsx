import "./brand.css";

export function BrandLogo({
  brand,
  className = "",
}: {
  brand: "spacexai" | "ailabs";
  className?: string;
}) {
  const label = brand === "spacexai" ? "SpaceXAI" : "AI Labs";
  return (
    <span className={`meetup-logo meetup-logo--${brand} ${className}`}>
      <img
        className="meetup-logo-light"
        src={`/brand/${brand}-light.svg`}
        alt={label}
        draggable={false}
      />
      {brand === "ailabs" && (
        <img
          className="meetup-logo-dark"
          src="/brand/ailabs-dark.svg"
          alt={label}
          draggable={false}
        />
      )}
    </span>
  );
}
