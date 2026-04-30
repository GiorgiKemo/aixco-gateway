import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { useI18n, LANGS } from "@/i18n/I18nProvider";
import { useUI } from "@/components/ui-state";

const NAV = [
  { key: "nav.home", to: "/", hash: "" },
  { key: "nav.about", to: "/", hash: "#about" },
  { key: "nav.dubai", to: "/", hash: "#dubai" },
  { key: "nav.batumi", to: "/", hash: "#batumi" },
  { key: "nav.participate", to: "/", hash: "#participate" },
  { key: "nav.how", to: "/", hash: "#how" },
  { key: "nav.team", to: "/", hash: "#team" },
  { key: "nav.partners", to: "/", hash: "#partners" },
  { key: "nav.insights", to: "/insights", hash: "" },
  { key: "nav.faqs", to: "/", hash: "#faqs" },
  { key: "nav.contact", to: "/", hash: "#contact" },
];

export function Nav() {
  const { t, lang, setLang } = useI18n();
  const { openLogin, openRegister } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // active section
      if (location.pathname !== "/") return;
      const sections = ["about", "dubai", "batumi", "participate", "how", "team", "partners", "faqs", "contact"];
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) current = `#${id}`;
        }
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  useEffect(() => { setOpen(false); }, [location.pathname, location.hash]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? "bg-background/85 backdrop-blur-xl border-b border-border/60" : "bg-transparent"}`}>
      <div className="container-x flex h-16 items-center justify-between md:h-20">
        <Logo />

        <nav aria-label="Primary" className="hidden xl:flex items-center gap-7">
          {NAV.map((item) => {
            const isActive = item.hash ? active === item.hash : location.pathname === item.to;
            const href = `${item.to}${item.hash}`;
            return (
              <Link
                key={item.key}
                to={href}
                className={`text-[13px] tracking-wide transition-colors ${isActive ? "text-primary" : "text-foreground/80 hover:text-foreground"}`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Language switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label="Change language"
              className="inline-flex items-center gap-1.5 rounded-sm border border-border/60 px-2.5 py-1.5 text-[11px] uppercase tracking-widest text-foreground/80 hover:text-foreground hover:border-primary/50 transition"
            >
              <Globe className="h-3.5 w-3.5" />
              {LANGS.find((l) => l.code === lang)?.native}
              <ChevronDown className="h-3 w-3 opacity-70" />
            </button>
            {langOpen && (
              <ul role="listbox" className="absolute right-0 mt-2 w-44 rounded-sm border border-border bg-popover p-1 shadow-elegant animate-scale-in">
                {LANGS.map((l) => (
                  <li key={l.code}>
                    <button
                      role="option"
                      aria-selected={l.code === lang}
                      onClick={() => { setLang(l.code); setLangOpen(false); }}
                      className={`flex w-full items-center justify-between rounded-sm px-3 py-2 text-sm transition-colors ${l.code === lang ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
                    >
                      <span>{l.label}</span>
                      <span className="text-[10px] uppercase tracking-widest opacity-70">{l.native}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button onClick={openLogin} className="hidden md:inline-flex text-[13px] tracking-wide text-foreground/80 hover:text-foreground px-3 py-2 transition-colors">
            {t("cta.login")}
          </button>
          <button onClick={openRegister} className="hidden md:inline-flex btn-ghost-gold !py-2 !px-4 text-[12px]">
            {t("cta.register")}
          </button>
          <Link to="/#participate" className="hidden lg:inline-flex btn-gold !py-2 !px-4 text-[12px]">
            {t("cta.start")}
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="xl:hidden inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border/60 text-foreground hover:border-primary/50"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`xl:hidden overflow-hidden transition-[max-height] duration-500 ${open ? "max-h-[80vh]" : "max-h-0"}`}>
        <div className="container-x pb-6 pt-2">
          <nav aria-label="Mobile" className="grid gap-1">
            {NAV.map((item) => (
              <Link
                key={item.key}
                to={`${item.to}${item.hash}`}
                className="rounded-sm px-3 py-3 text-base text-foreground/85 hover:bg-muted hover:text-foreground border-b border-border/40"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button onClick={openLogin} className="btn-ghost-gold">{t("cta.login")}</button>
            <button onClick={openRegister} className="btn-gold">{t("cta.register")}</button>
          </div>
        </div>
      </div>
    </header>
  );
}
