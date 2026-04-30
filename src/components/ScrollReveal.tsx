import { Children, type ReactNode, useLayoutEffect, useRef } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
};

const STAGGER_MS = 110;
const MAX_DELAY_MS = 990;

function isElement(node: Element | null): node is HTMLElement {
  return node instanceof HTMLElement;
}

function getContainer(root: HTMLElement) {
  return root.querySelector<HTMLElement>("section > .container-x") ?? root;
}

function collectRevealTargets(root: HTMLElement) {
  const container = getContainer(root);
  const directChildren = Array.from(container.children).filter(isElement);
  const targets: HTMLElement[] = [];

  directChildren.forEach((child) => {
    const childElements = Array.from(child.children).filter(isElement);
    const shouldRevealChildren =
      childElements.length > 1 &&
      (child.classList.contains("grid") ||
        child.classList.contains("flex") ||
        child.classList.contains("space-y-12"));

    if (shouldRevealChildren) {
      targets.push(...childElements);
      return;
    }

    targets.push(child);
  });

  const nestedTargets = Array.from(
    container.querySelectorAll<HTMLElement>(
      "article, form, .data-panel, .glass, [data-reveal-item]",
    ),
  );

  nestedTargets.forEach((target) => {
    if (!targets.includes(target)) targets.push(target);
  });

  return targets.filter((target) => !target.closest("[data-reveal-skip='true']"));
}

function armMedia(root: HTMLElement) {
  root.querySelectorAll<HTMLImageElement>("img").forEach((image) => {
    const frame = image.parentElement;
    if (frame && frame !== root) {
      frame.setAttribute("data-reveal-media", "true");
    } else {
      image.setAttribute("data-reveal-media", "true");
    }
  });
}

export function ScrollReveal({ children, className = "" }: ScrollRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const childCount = Children.count(children);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = collectRevealTargets(root);
    armMedia(root);

    targets.forEach((target, index) => {
      target.setAttribute("data-reveal", "true");
      target.setAttribute("data-reveal-state", "hidden");
      target.style.setProperty("--reveal-delay", `${Math.min(index * STAGGER_MS, MAX_DELAY_MS)}ms`);
    });

    const supportsIntersectionObserver =
      typeof window !== "undefined" && typeof window.IntersectionObserver === "function";

    if (!supportsIntersectionObserver) {
      targets.forEach((target) => target.setAttribute("data-reveal-state", "visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.setAttribute("data-reveal-state", "visible");
          observer.unobserve(target);
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.16,
      },
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, [childCount]);

  return (
    <div ref={rootRef} data-reveal-root="armed" className={className || undefined}>
      {children}
    </div>
  );
}
