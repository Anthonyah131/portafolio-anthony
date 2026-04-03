import { memo } from 'react';
import { useTranslation } from '../../context/LanguageContext';
import type { Locale } from '../../i18n';

const LOCALES: { code: Locale; label: string; ariaLabel: string }[] = [
  { code: 'en', label: 'EN', ariaLabel: 'Switch to English' },
  { code: 'es', label: 'ES', ariaLabel: 'Cambiar a Español' },
];

function LanguageSwitcherBase() {
  const { locale, setLocale } = useTranslation();

  return (
    <nav
      aria-label="Language switcher"
      style={{
        position: 'fixed',
        top: '1.25rem',
        right: '1.75rem',
        zIndex: 50,
        display: 'flex',
        gap: '2px',
        padding: '3px',
        borderRadius: '999px',
        border: '1px solid rgba(133,149,130,0.22)',
        background: 'rgba(10,12,10,0.72)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        boxShadow: '0 2px 16px rgba(0,0,0,0.35)',
      }}
    >
      {LOCALES.map(({ code, label, ariaLabel }) => {
        const isActive = locale === code;
        return (
          <button
            key={code}
            onClick={() => setLocale(code)}
            aria-pressed={isActive}
            aria-label={ariaLabel}
            disabled={isActive}
            style={{
              fontFamily: 'var(--font-label)',
              fontSize: '0.6rem',
              fontWeight: 700,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding: '0.35rem 0.85rem',
              borderRadius: '999px',
              border: 'none',
              cursor: isActive ? 'default' : 'pointer',
              background: isActive
                ? 'var(--primary)'
                : 'transparent',
              color: isActive ? '#002a0d' : 'var(--outline)',
              transition: 'background 200ms ease, color 200ms ease, opacity 200ms ease',
              lineHeight: 1,
              outline: 'none',
            }}
            onMouseEnter={e => {
              if (isActive) return;
              (e.currentTarget as HTMLElement).style.color = 'var(--surface)';
            }}
            onMouseLeave={e => {
              if (isActive) return;
              (e.currentTarget as HTMLElement).style.color = 'var(--outline)';
            }}
          >
            {label}
          </button>
        );
      })}
    </nav>
  );
}

export const LanguageSwitcher = memo(LanguageSwitcherBase);
