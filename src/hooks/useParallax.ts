import { useEffect } from 'react';

// Scroll parallax for decorative layers: mark an element with data-parallax="0.2"
// (positive drifts with the scroll, negative against it). Offsets go through the
// CSS `translate` property so they compose with any Tailwind `transform` classes.
// Progress is measured on the parent (the section), because reading the element's
// own rect after translating it would feed back into itself.
export function useParallax() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
    if (els.length === 0) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const mid = window.innerHeight / 2;
      for (const el of els) {
        const speed = Number(el.dataset.parallax) || 0.2;
        const rect = (el.parentElement ?? el).getBoundingClientRect();
        const offset = (mid - (rect.top + rect.height / 2)) * speed;
        el.style.translate = `0 ${offset.toFixed(1)}px`;
      }
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}
