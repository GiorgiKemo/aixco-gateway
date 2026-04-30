/**
 * @vitest-environment jsdom
 */
import { render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { ScrollReveal } from "./ScrollReveal";

const originalIntersectionObserver = window.IntersectionObserver;

afterEach(() => {
  Object.defineProperty(window, "IntersectionObserver", {
    configurable: true,
    writable: true,
    value: originalIntersectionObserver,
  });
});

describe("ScrollReveal", () => {
  it("arms reveal targets and makes them visible without IntersectionObserver", async () => {
    Object.defineProperty(window, "IntersectionObserver", {
      configurable: true,
      writable: true,
      value: undefined,
    });

    const { container } = render(
      <ScrollReveal>
        <section>
          <div className="container-x">
            <div>
              <h2>Section title</h2>
              <p>Section copy</p>
            </div>
            <div className="grid">
              <article>First card</article>
              <article>Second card</article>
            </div>
          </div>
        </section>
      </ScrollReveal>,
    );

    expect(container.querySelector('[data-reveal-root="armed"]')).not.toBeNull();

    await waitFor(() => {
      const targets = Array.from(container.querySelectorAll('[data-reveal="true"]'));
      expect(targets.length).toBeGreaterThanOrEqual(3);
      expect(targets.every((target) => target.getAttribute("data-reveal-state") === "visible")).toBe(true);
    });
  });
});
