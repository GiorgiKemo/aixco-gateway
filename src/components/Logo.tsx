import { Link } from "react-router-dom";

export function Logo({ className = "" }: { className?: string }) {
  const logoSrc = `${import.meta.env.BASE_URL}aixco-logo-black.png`;

  return (
    <Link to="/" aria-label="AIXCO Global home" className={`inline-flex items-center ${className}`}>
      <img
        src={logoSrc}
        alt="AIXCO Global"
        width={3584}
        height={747}
        className="h-7 w-auto sm:h-8 md:h-9"
        draggable={false}
      />
    </Link>
  );
}
