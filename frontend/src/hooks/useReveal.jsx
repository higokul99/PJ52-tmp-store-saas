import { useEffect } from 'react';

export default function useReveal(selector = '.reveal', options = { threshold: 0.12 }) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(selector));
    if (!('IntersectionObserver' in window) || els.length === 0) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, options);

    els.forEach(el => io.observe(el));

    return () => io.disconnect();
  }, [selector, options]);
}
