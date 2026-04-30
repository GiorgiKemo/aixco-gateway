import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { useI18n, LANGS } from "@/i18n/I18nProvider";
import { useUI } from "@/components/ui-state";

const NAV = [
  { key: "nav.home", to: "/", hash: "" },
  { key: "nav.about", compactKey: "nav.aboutShort", to: "/", hash: "#about" },
  { key: "nav.dubai", to: "/", hash: "#dubai" },
  { key: "nav.batumi", to: "/", hash: "#batumi" },
  { key: "nav.participate", compactKey: "nav.participateShort", to: "/", hash: "#participate" },
  { key: "nav.how", compactKey: "nav.howShort", to: "/", hash: "#how" },
  { key: "nav.team", to: "/", hash: "#team" },
  { key: "nav.partners", to: "/", hash: "#partners" },
  { key: "nav.insights", to: "/insights", hash: "" },
  { key: "nav.faqs", to: "/", hash: "#faqs" },
  { key: "nav.contact", to: "/", hash: "#contact" },
];

const DESKTOP_NAV = [
  NAV[0],
  { key: "nav.projects", children: [NAV[2], NAV[3]] },
  { key: "nav.participateShort", to: "/", hash: "#participate" },
  { key: "nav.company", children: [NAV[1], NAV[6], NAV[7]] },
  { key: "nav.resources", children: [NAV[5], NAV[8], NAV[9]] },
  NAV[10],
];

type NavItem = (typeof NAV)[number];
type DesktopItem = NavItem | { key: string; children: NavItem[] };

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

  const isItemActive = (item: NavItem) => (item.hash ? active === item.hash : location.pathname === item.to);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled || open ? "bg-background/85 backdrop-blur-xl border-b border-border/60" : "bg-transparent"}`}>
      <div className="container-x flex h-16 items-center gap-3 sm:gap-5 md:h-20">
        <Logo className="shrink-0" />

        <nav aria-label="Primary" className="hidden min-w-0 flex-1 items-center justify-center gap-1 xl:flex">
          {DESKTOP_NAV.map((item: DesktopItem) => {
            if ("children" in item) {
              const groupActive = item.children.some(isItemActive);
              return (
                <div key={item.key} className="group relative">
                  <button
                    type="button"
                    aria-haspopup="menu"
                    className={`inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-sm px-3 text-[12px] font-medium leading-none tracking-[0.08em] transition-colors ${groupActive ? "text-primary" : "text-foreground/75 hover:text-foreground"}`}
                  >
                    {t(item.key)}
                    <ChevronDown className="h-3 w-3 opacity-70 transition-transform group-hover:rotate-180 group-focus-within:rotate-180" />
                  </button>
                  <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 rounded-sm border border-border bg-popover/95 p-1.5 opacity-0 shadow-elegant backdrop-blur-xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="absolute -top-3 left-0 h-3 w-full" aria-hidden />
                    {item.children.map((child) => (
                      <Link
                        key={child.key}
                        to={`${child.to}${child.hash}`}
                        className={`block whitespace-nowrap rounded-sm px-3 py-2.5 text-sm leading-none transition-colors ${isItemActive(child) ? "bg-primary/10 text-primary" : "text-foreground/80 hover:bg-muted hover:text-foreground"}`}
                      >
                        {t(child.compactKey ?? child.key)}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            const isActive = isItemActive(item);
            return (
              <Link
                key={item.key}
                to={`${item.to}${item.hash}`}
                className={`inline-flex h-9 items-center whitespace-nowrap rounded-sm px-3 text-[12px] font-medium leading-none tracking-[0.08em] transition-colors ${isActive ? "text-primary" : "text-foreground/75 hover:text-foreground"}`}
              >
                {t(item.compactKey ?? item.key)}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-1.5 md:gap-2.5">
          {/* Language switcher */}
          <div className="relative hidden sm:block">
            <button
              type="button"
              onClick={() => setLangOpen((v) => !v)}
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label="Change language"
              className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-sm border border-border/60 px-2 text-[11px] uppercase tracking-widest text-foreground/80 transition hover:border-primary/50 hover:text-foreground sm:px-2.5"
            >
              <Globe className="h-3.5 w-3.5" />
              {LANGS.find((l) => l.code === lang)?.native}
              <ChevronDown className="hidden h-3 w-3 opacity-70 sm:block" />
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

          <button onClick={openLogin} className="hidden h-9 whitespace-nowrap px-2.5 text-[13px] leading-none tracking-wide text-foreground/80 transition-colors hover:text-foreground lg:inline-flex lg:items-center">
            {t("cta.login")}
          </button>
          <button onClick={openRegister} className="hidden h-9 whitespace-nowrap btn-ghost-gold !px-4 !py-0 text-[12px] md:inline-flex">
            {t("cta.register")}
          </button>
          <Link to="/#participate" className="hidden h-9 whitespace-nowrap btn-gold !px-4 !py-0 text-[12px] 2xl:inline-flex">
            {t("cta.start")}
          </Link>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm border border-border/60 text-foreground hover:border-primary/50 sm:h-10 sm:w-10 xl:hidden"
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
                className="truncate rounded-sm border-b border-border/40 px-3 py-3 text-base leading-none text-foreground/85 hover:bg-muted hover:text-foreground"
              >
                {t(item.compactKey ?? item.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <button onClick={openLogin} className="btn-ghost-gold">{t("cta.login")}</button>
            <button onClick={openRegister} className="btn-gold">{t("cta.register")}</button>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 sm:hidden">
            {LANGS.map((l) => (
              <button
                key={l.code}
                type="button"
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={`rounded-sm border px-3 py-2 text-[11px] uppercase tracking-widest transition-colors ${l.code === lang ? "border-primary bg-primary/10 text-primary" : "border-border/60 text-foreground/75 hover:border-primary/50 hover:text-foreground"}`}
              >
                {l.native}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
