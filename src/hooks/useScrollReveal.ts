import { useEffect } from 'react';

/**
 * Observes elements with .fade-up, .clip-reveal, .stagger, and
 * .split-line-wrap (targeting inner .split-line children).
 * Adds .is-visible when they enter the viewport.
 */
export function useScrollReveal() {
  useEffect(() => {
    const selectors = '.fade-up, .clip-reveal, .stagger, .split-line-wrap';

    const reveal = (el: HTMLElement) => {
      if (el.classList.contains('split-line-wrap')) {
        el.querySelectorAll<HTMLElement>('.split-line').forEach(line => {
          line.classList.add('is-visible');
        });
      } else {
        el.classList.add('is-visible');
      }
    };

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;

          reveal(entry.target as HTMLElement);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );

    const observed = new WeakSet<Element>();

    const observeTargets = (root: ParentNode = document) => {
      root.querySelectorAll(selectors).forEach(el => {
        if (observed.has(el)) return;
        observed.add(el);
        observer.observe(el);
      });
    };

    observeTargets(document);

    // Observe future DOM updates (e.g. tab content swapping) so reveal classes still apply.
    const mutationObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (!(node instanceof HTMLElement)) return;

          if (node.matches(selectors)) {
            observeTargets(node.parentElement ?? document);
          } else {
            observeTargets(node);
          }
        });
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);
}
