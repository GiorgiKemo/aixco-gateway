import { Link } from "react-router-dom";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" aria-label="AIXCO Global home" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span aria-hidden className="relative flex h-8 w-8 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-gradient-gold opacity-90" />
        <span className="absolute inset-[2px] rounded-full bg-background" />
        <span className="relative font-display text-[15px] leading-none text-primary">A</span>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg tracking-wide text-foreground">AIXCO</span>
        <span className="text-[9px] uppercase tracking-[0.32em] text-muted-foreground">Global</span>
      </span>
    </Link>
  );
}
