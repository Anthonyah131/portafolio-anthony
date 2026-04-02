import { useEffect, useRef, useState, useCallback } from 'react';
import { getLenis, useLenis } from '../hooks/useLenis';
import { useScrollReveal } from '../hooks/useScrollReveal';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';

export default function App() {
  useLenis();
  useScrollReveal();

  const projectsContentRef = useRef<HTMLDivElement>(null);
  const contactContentRef  = useRef<HTMLDivElement>(null);
  const projectsStickyRef  = useRef<HTMLDivElement>(null);
  const contactRef         = useRef<HTMLDivElement>(null);

  const [stickyTop,     setStickyTop]     = useState(0);
  const [wrapperHeight, setWrapperHeight] = useState<number | undefined>(undefined);

  const compute = useCallback(() => {
    const proj    = projectsContentRef.current;
    const contact = contactContentRef.current;
    if (!proj) return;

    const ph = proj.offsetHeight;
    const ch = contact?.offsetHeight ?? window.innerHeight;
    const vh = window.innerHeight;

    /*
      Wrapper = projectsHeight + contactHeight
        → Projects sticky activates when bottom of Projects fills the viewport
        → sticky stays active until Contact has fully entered the viewport
          (the wrapper ends exactly when Contact's top reaches viewport top)

      stickyTop = -(ph - vh)
        → stick when we've scrolled (ph - vh) px into the element
        → i.e., when the last viewport-height of Projects is showing
    */
    setStickyTop(ph > vh ? -(ph - vh) : 0);
    setWrapperHeight(ph + ch);
  }, []);

  // Measure on mount + whenever Projects or Contact resize (e.g. tab switch)
  useEffect(() => {
    compute();

    const ro = new ResizeObserver(compute);
    if (projectsContentRef.current) ro.observe(projectsContentRef.current);
    if (contactContentRef.current)  ro.observe(contactContentRef.current);
    window.addEventListener('resize', compute);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', compute);
    };
  }, [compute]);

  // Scale-down Projects as Contact slides over it
  useEffect(() => {
    const handleScroll = () => {
      const sticky  = projectsStickyRef.current;
      const contact = contactRef.current;
      if (!sticky || !contact) return;

      const contactTop = contact.getBoundingClientRect().top;
      const vh = window.innerHeight;

      const progress = Math.max(0, Math.min(1, 1 - contactTop / vh));
      sticky.style.transform = `scale(${1 - progress * 0.06})`;
      sticky.style.opacity   = String(1 - progress * 0.45);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;

      const target = document.getElementById(hash);
      if (!target) return;

      const top = target.getBoundingClientRect().top + window.scrollY;
      const lenis = getLenis();

      if (lenis) {
        lenis.scrollTo(top, { immediate: true });
        return;
      }

      window.scrollTo({ top, behavior: 'auto' });
    };

    const rafId = requestAnimationFrame(() => requestAnimationFrame(scrollToHash));
    window.addEventListener('hashchange', scrollToHash);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('hashchange', scrollToHash);
    };
  }, [wrapperHeight]);

  return (
    <>
      <div id="three-bg" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />

      <div id="content" style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <AboutSection />
        <SkillsSection />

        {/*
          Single wrapper that owns both Projects (sticky) and Contact (absolute bottom).
          Height = projectsHeight + contactHeight ensures Projects stays frozen
          for exactly as long as it takes Contact to fully slide over it.
        */}
        <div style={{ position: 'relative', height: wrapperHeight ?? 'auto' }}>

          {/* Projects — sticky, freezes at bottom of its content */}
          <div
            ref={projectsStickyRef}
            style={{
              position: wrapperHeight ? 'sticky' : 'relative',
              top: stickyTop,
              zIndex: 1,
              transformOrigin: 'center bottom',
              willChange: 'transform, opacity',
            }}
          >
            <div ref={projectsContentRef}>
              <ProjectsSection />
            </div>
          </div>

          {/* Contact — anchored to wrapper bottom, slides up as wrapper scrolls */}
          <div
            ref={contactRef}
            style={{
              position: wrapperHeight ? 'absolute' : 'relative',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 2,
              boxShadow: '0 -32px 80px rgba(0,0,0,0.85)',
            }}
          >
            <div ref={contactContentRef}>
              <ContactSection />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
