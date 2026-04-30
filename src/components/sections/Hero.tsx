import { ArrowRight, Play } from "lucide-react";
import { createElement } from "react";
import { useUI } from "../ui-state";
import heroBatumi from "@/assets/hero-batumi.jpg";

const constructionAnimationSrc = `${import.meta.env.BASE_URL}city-building-construction.lottie`;

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

      <div className="relative z-10 container-x flex min-h-[100svh] flex-col justify-end pb-24 pt-32 md:pb-32">
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
  return (
    <div
      className="construction-lottie absolute right-[-24vw] top-[7vh] z-0 hidden aspect-[1080/869] w-[min(72vw,560px)] opacity-70 md:block lg:right-[-8vw] lg:top-[12vh] lg:w-[min(45vw,620px)] xl:right-[2vw] xl:w-[min(42vw,640px)]"
      aria-hidden="true"
    >
      {createElement("dotlottie-wc", {
        src: constructionAnimationSrc,
        autoplay: "true",
        loop: "true",
        speed: "0.85",
        "aria-hidden": "true",
        style: { display: "block", width: "100%", height: "100%" },
      })}
    </div>
  );
}
