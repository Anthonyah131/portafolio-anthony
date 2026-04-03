import { useEffect, useRef, useState, useCallback } from 'react';
import { getLenis, useLenis } from '../hooks/useLenis';
import { useScrollReveal } from '../hooks/useScrollReveal';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
import { LanguageProvider } from '../context/LanguageContext';
import { useTranslation } from '../context/LanguageContext';
import { LanguageSwitcher } from './ui/LanguageSwitcher';

function PortfolioContent() {
  useLenis();
  useScrollReveal();
  const { locale } = useTranslation();

  const projectsContentRef = useRef<HTMLDivElement>(null);
  const contactContentRef  = useRef<HTMLDivElement>(null);
  const projectsStickyRef  = useRef<HTMLDivElement>(null);
  const contactRef         = useRef<HTMLDivElement>(null);

  const [stickyTop,     setStickyTop]     = useState(0);
  const [wrapperHeight, setWrapperHeight] = useState<number | undefined>(undefined);
  const [activeSection, setActiveSection] = useState('hero');

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
  }, []);

  useEffect(() => {
    const sectionIds = ['hero', 'about', 'skills', 'projects', 'contact'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element instanceof HTMLElement);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        root: null,
        rootMargin: '-35% 0px -52% 0px',
        threshold: [0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [wrapperHeight]);

  const sectionLinks = [
    { id: 'hero', label: locale === 'es' ? 'Inicio' : 'Home' },
    { id: 'about', label: locale === 'es' ? 'Sobre Mi' : 'About' },
    { id: 'skills', label: locale === 'es' ? 'Skills' : 'Skills' },
    { id: 'projects', label: locale === 'es' ? 'Proyectos' : 'Projects' },
    { id: 'contact', label: locale === 'es' ? 'Contacto' : 'Contact' },
  ];

  return (
    <>
      <LanguageSwitcher />

      <a
        href="/"
        aria-label={locale === 'es' ? 'Volver al inicio' : 'Back to home'}
          className="fixed left-6 top-5 z-70 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[rgba(133,149,130,0.28)] bg-[rgba(10,12,10,0.78)] font-label text-[0.62rem] font-bold uppercase tracking-[0.2em] text-surface shadow-[0_10px_26px_rgba(0,0,0,0.34)] backdrop-blur-[10px] transition-[transform,border-color,color,box-shadow] duration-200 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-[0_12px_30px_rgba(67,254,109,0.2)]"
      >
        AAH
      </a>

      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-24">
        <div className="group relative h-full w-full">
          <div className="pointer-events-auto h-8 w-full" aria-hidden="true" />
          <nav
            aria-label={locale === 'es' ? 'Navegacion de secciones' : 'Section navigation'}
            className="pointer-events-auto absolute left-1/2 top-2 flex -translate-x-1/2 -translate-y-2 items-center gap-1 rounded-full border border-[rgba(133,149,130,0.22)] bg-[rgba(10,12,10,0.82)] p-1 opacity-0 shadow-[0_10px_24px_rgba(0,0,0,0.3)] backdrop-blur-[14px] transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100"
          >
            {sectionLinks.map((section) => {
              const isActive = activeSection === section.id;
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-current={isActive ? 'true' : undefined}
                  className={`rounded-full px-3 py-1.5 font-label text-[0.56rem] uppercase tracking-[0.14em] transition-colors ${
                    isActive
                      ? 'bg-primary text-[#002a0d]'
                      : 'text-outline hover:text-surface'
                  }`}
                >
                  {section.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

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

export default function App() {
  return (
    <LanguageProvider>
      <PortfolioContent />
    </LanguageProvider>
  );
}
