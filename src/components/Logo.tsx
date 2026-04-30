import { Link } from "react-router-dom";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" aria-label="AIXCO Global home" className={`inline-flex items-center ${className}`}>
      <img
        src="/aixco-logo-black.png"
        alt="AIXCO Global"
        width={3584}
        height={747}
        className="h-8 w-auto md:h-9"
        draggable={false}
      />
    </Link>
  );
}
