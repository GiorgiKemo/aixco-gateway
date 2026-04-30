import { useState } from "react";
import { batumiBenefits, batumiProperties } from "@/data/site";
import queens from "@/assets/batumi-queens.jpg";
import serenade from "@/assets/batumi-serenade.jpg";
import { MapPin } from "lucide-react";

const imageMap: Record<string, string> = {
  "batumi-queens": queens,
  "batumi-serenade": serenade,
};

export function Batumi() {
  const [selected, setSelected] = useState(batumiProperties[0].id);
  const property = batumiProperties.find((p) => p.id === selected)!;

  return (
    <section id="batumi" className="relative py-28 md:py-36 scroll-mt-24">
      <div className="container-x">
        <div className="grid lg:grid-cols-12 gap-12 mb-16">
          <div className="lg:col-span-7">
            <p className="eyebrow">Batumi · Georgia</p>
            <h2 className="heading-section mt-5">
              The Black Sea's most <span className="text-gold italic">tax-efficient</span> coastal market.
            </h2>
            <p className="mt-6 text-foreground/80 leading-relaxed max-w-2xl">
              Batumi combines real tourism cash flow with one of the friendliest ownership regimes in Europe:
              full foreign ownership, capital gains exemption after two years, and rental tax of just 1% up to €180,000 of annual revenue.
            </p>
          </div>
          <div className="lg:col-span-5 grid grid-cols-3 gap-px bg-border/60 rounded-sm overflow-hidden self-start">
            {[
              { v: "€1.4k", l: "/m² prime" },
              { v: "76%", l: "occupancy" },
              { v: "+€78", l: "ADR" },
            ].map((s) => (
              <div key={s.l} className="bg-background p-5 text-center">
                <p className="font-display text-2xl text-gold">{s.v}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-px bg-border/60 rounded-sm overflow-hidden mb-16">
          {batumiBenefits.map((b) => (
            <div key={b.label} className="bg-background p-5">
              <p className="font-display text-3xl text-gold leading-none">{b.stat}</p>
              <p className="mt-2 text-[11px] uppercase tracking-widest text-foreground/85">{b.label}</p>
              <p className="mt-1 text-[10px] text-muted-foreground leading-snug">{b.note}</p>
            </div>
          ))}
        </div>

        {/* Property selector */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">Featured properties</p>
            <h3 className="font-display text-3xl mb-6">Queens or Serenade.</h3>
            <div className="space-y-3">
              {batumiProperties.map((p) => {
                const active = p.id === selected;
                return (
                  <button
                    key={p.id}
                    onClick={() => setSelected(p.id)}
                    className={`w-full text-left rounded-sm border p-5 transition-all ${active ? "border-primary bg-primary/5" : "border-border/60 hover:border-primary/40"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-display text-2xl">{p.name}</p>
                        <p className="text-xs text-muted-foreground mt-1 inline-flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {p.location}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">From</p>
                        <p className="font-display text-xl text-gold">{p.priceFrom}</p>
                      </div>
                    </div>
                    {active && <p className="mt-4 text-sm text-foreground/80 leading-relaxed">{p.description}</p>}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-sm border border-border/60 aspect-[4/5] md:aspect-[5/4]">
              <img
                key={property.id}
                src={imageMap[property.image]}
                alt={`${property.name} in ${property.location}`}
                loading="lazy"
                width={1280}
                height={896}
                className="h-full w-full object-cover animate-fade-in"
              />
              <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 bg-gradient-to-t from-background via-background/70 to-transparent">
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-primary">{property.delivery}</p>
                    <p className="font-display text-3xl mt-1">{property.name}</p>
                  </div>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Net yield</p>
                      <p className="font-display text-2xl text-gold">{property.yield}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-muted-foreground">From</p>
                      <p className="font-display text-2xl">{property.priceFrom}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
