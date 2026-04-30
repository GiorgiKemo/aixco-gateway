import { ArrowRight, Play } from "lucide-react";
import { useUI } from "../ui-state";
import heroBatumi from "@/assets/hero-batumi.jpg";

export function Hero() {
  const { openRegister } = useUI();
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden">
      {/* Video background with poster fallback */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay muted loop playsInline preload="metadata"
        poster={heroBatumi}
        aria-hidden="true"
      >
        <source src="https://cdn.coverr.co/videos/coverr-aerial-view-of-dubai-marina-7474/1080p.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-hero" aria-hidden />
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_50%,transparent_0%,hsl(var(--background))_100%)]" aria-hidden />
      <ConstructionAnimation />

      <div className="relative container-x flex min-h-[100svh] flex-col justify-end pb-24 pt-32 md:pb-32">
        <div className="max-w-4xl">
          <p className="eyebrow reveal">AIXCO Global · Vienna · Dubai · Batumi</p>
          <h1 className="heading-display mt-6 reveal reveal-delay-1">
            Quality Real Estate
            <br />
            <span className="text-gold italic font-light">Participation</span>
            <span className="text-foreground">.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base md:text-lg text-foreground/80 leading-relaxed reveal reveal-delay-2">
            Selected real-estate projects in Dubai and Batumi, structured to institutional
            standards and opened to qualified individuals from <span className="text-primary">€1,000</span>.
            One platform. Two routes. Sixteen years of execution.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4 reveal reveal-delay-3">
            <button onClick={openRegister} className="btn-gold group">
              Register
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a href="#dubai" className="btn-ghost-gold group">
              <Play className="h-4 w-4" />
              Explore Opportunities
            </a>
          </div>
        </div>

        {/* Marquee of trust signals */}
        <div className="mt-16 flex flex-wrap items-end gap-x-12 gap-y-6 reveal reveal-delay-4">
          {[
            { k: "Founded", v: "2009" },
            { k: "Capital raised", v: "$4.2B" },
            { k: "Trusted clients", v: "5,000+" },
            { k: "Avg. return", v: "4.2×" },
          ].map((s) => (
            <div key={s.k} className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{s.k}</span>
              <span className="font-display text-2xl text-foreground mt-1">{s.v}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
        <span>Scroll</span>
        <span className="h-8 w-px bg-gradient-to-b from-primary/80 to-transparent" />
      </div>
    </section>
  );
}

function ConstructionAnimation() {
  const floors = [302, 267, 232, 197, 162, 127];
  const windowColumns = [236, 278, 320, 362, 404];

  return (
    <div
      className="construction-visual absolute right-[-26vw] top-[8vh] z-0 w-[min(112vw,620px)] opacity-70 sm:right-[-14vw] md:right-[-4vw] md:opacity-80 lg:right-[4vw] lg:top-[13vh] lg:w-[min(48vw,640px)] lg:opacity-95"
      aria-hidden="true"
    >
      <svg viewBox="0 0 620 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="constructionGold" x1="220" y1="92" x2="452" y2="380" gradientUnits="userSpaceOnUse">
            <stop stopColor="hsl(var(--primary-glow))" stopOpacity="0.95" />
            <stop offset="1" stopColor="hsl(var(--primary-deep))" stopOpacity="0.78" />
          </linearGradient>
          <linearGradient id="constructionGlass" x1="236" y1="124" x2="430" y2="344" gradientUnits="userSpaceOnUse">
            <stop stopColor="white" stopOpacity="0.82" />
            <stop offset="1" stopColor="hsl(var(--surface-glass))" stopOpacity="0.28" />
          </linearGradient>
          <filter id="constructionBlur" x="120" y="40" width="420" height="390" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="16" />
          </filter>
        </defs>

        <ellipse cx="330" cy="372" rx="210" ry="42" fill="hsl(var(--primary) / 0.14)" filter="url(#constructionBlur)" />
        <path className="construction-ground" d="M128 382H512" />

        <g className="construction-crane">
          <path d="M490 92V366" />
          <path d="M346 92H562" />
          <path d="M490 92L430 142" />
          <path d="M490 92L540 142" />
          <path d="M462 124H518" />
          <rect x="542" y="78" width="42" height="26" rx="3" />
          <rect x="464" y="356" width="56" height="16" rx="2" />
        </g>

        <g className="construction-hook">
          <path d="M386 92V162" />
          <path d="M374 176C374 168 380 162 386 162C392 162 398 168 398 176C398 184 392 190 386 190" />
          <g className="construction-load">
            <rect x="348" y="202" width="76" height="20" rx="3" />
            <path d="M348 202L386 176L424 202" />
          </g>
        </g>

        <g className="construction-core">
          <rect x="224" y="106" width="214" height="258" rx="10" fill="url(#constructionGlass)" />
          <path d="M250 106V364M292 106V364M334 106V364M376 106V364M418 106V364" />
        </g>

        {floors.map((y, floorIndex) => (
          <g key={y} transform={`translate(0 ${y})`}>
            <g className="construction-floor" style={{ animationDelay: `${0.18 + floorIndex * 0.22}s` }}>
              <rect x="204" y="0" width="254" height="31" rx="4" fill="hsl(var(--surface-glass) / 0.72)" />
              <rect x="212" y="2" width="238" height="4" rx="2" fill="url(#constructionGold)" />
              {windowColumns.map((x, columnIndex) => (
                <rect
                  key={`${y}-${x}`}
                  className="construction-window"
                  x={x}
                  y="10"
                  width="18"
                  height="12"
                  rx="2"
                  style={{ animationDelay: `${floorIndex * 0.18 + columnIndex * 0.11}s` }}
                />
              ))}
            </g>
          </g>
        ))}

        <g className="construction-roof">
          <path d="M204 118H458" />
          <path d="M224 98H438" />
          <path d="M244 82H418" />
        </g>
      </svg>
    </div>
  );
}
