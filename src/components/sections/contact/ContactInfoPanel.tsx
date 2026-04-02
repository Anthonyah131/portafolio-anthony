import type { PersonalInfo } from '../../../types/portfolio';
import type { Translations } from '../../../i18n';

type ContactInfoPanelProps = {
  contactT: Translations['contact'];
  hireEmail: string;
  social: PersonalInfo['social'];
};

export function ContactInfoPanel({ contactT, hireEmail, social }: ContactInfoPanelProps) {
  return (
    <div>
      <div className="split-line-wrap mb-5">
        <span className="split-line font-label text-[0.68rem] uppercase tracking-[0.35em] text-secondary">
          {contactT.subtitle}
        </span>
      </div>

      <h2 className="mb-10 font-headline text-[2.2rem] leading-[0.95] text-surface italic font-bold sm:text-5xl lg:text-[3.75rem]">
        <div className="split-line-wrap">
          <span className="split-line" style={{ transitionDelay: '80ms' }}>
            {contactT.titleLine1}
          </span>
        </div>
        <div className="split-line-wrap">
          <span className="split-line" style={{ transitionDelay: '180ms' }}>
            <span className="text-primary">{contactT.titleLine2}</span>
          </span>
        </div>
      </h2>

      <div className="fade-up mb-10" style={{ transitionDelay: '250ms' }}>
        <span className="mb-2 block font-label text-[0.65rem] uppercase tracking-[0.25em] text-outline">
          {contactT.emailLabel}
        </span>
        <a
          href={`mailto:${hireEmail}`}
          className="border-b border-(--outline-var) pb-0.5 font-body text-[0.95rem] text-surface-muted transition-[color,border-color] duration-200 hover:border-primary hover:text-primary sm:text-[1.05rem]"
        >
          {hireEmail}
        </a>
      </div>

      <div className="fade-up" style={{ transitionDelay: '350ms' }}>
        <span className="mb-4 block font-label text-[0.65rem] uppercase tracking-[0.25em] text-outline">
          {contactT.socialsLabel}
        </span>
        <div className="flex flex-col gap-2.5">
          {Object.entries(social).map(([key, url]) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-label text-[0.8rem] font-medium capitalize text-surface-muted transition-colors duration-200 hover:text-primary"
            >
              <span className="block h-px w-5 shrink-0 bg-current" />
              {key}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
