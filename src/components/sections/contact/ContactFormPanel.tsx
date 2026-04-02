import type { FormEvent, RefObject } from 'react';
import type { Translations } from '../../../i18n';
import type { ContactStatus } from '../../../hooks/useContactForm';

type ContactFormPanelProps = {
  contactT: Translations['contact'];
  formRef: RefObject<HTMLFormElement>;
  status: ContactStatus;
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
};

const baseInputClass =
  'w-full border-0 border-b border-(--outline-var) bg-transparent py-3.5 font-body text-[0.95rem] text-surface outline-none transition-colors duration-200 placeholder:text-outline focus:border-primary';

export function ContactFormPanel({ contactT, formRef, status, onSubmit }: ContactFormPanelProps) {
  return (
    <div className="fade-up" style={{ transitionDelay: '150ms' }}>
      <form ref={formRef} onSubmit={onSubmit} className="flex flex-col gap-10">
        <input type="hidden" name="time" value={new Date().toISOString()} />

        <div>
          <label className="mb-2 block font-label text-[0.6rem] uppercase tracking-[0.25em] text-outline">
            {contactT.nameLabel}
          </label>
          <input name="from_name" type="text" required placeholder={contactT.namePlaceholder} className={baseInputClass} />
        </div>

        <div>
          <label className="mb-2 block font-label text-[0.6rem] uppercase tracking-[0.25em] text-outline">
            {contactT.emailFieldLabel}
          </label>
          <input name="email" type="email" required placeholder={contactT.emailPlaceholder} className={baseInputClass} />
        </div>

        <div>
          <label className="mb-2 block font-label text-[0.6rem] uppercase tracking-[0.25em] text-outline">
            {contactT.subjectLabel}
          </label>
          <input name="name" type="text" required placeholder={contactT.subjectPlaceholder} className={baseInputClass} />
        </div>

        <div>
          <label className="mb-2 block font-label text-[0.6rem] uppercase tracking-[0.25em] text-outline">
            {contactT.messageLabel}
          </label>
          <textarea
            name="message"
            required
            rows={5}
            placeholder={contactT.messagePlaceholder}
            className={`${baseInputClass} block resize-none`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center gap-2 bg-primary px-10 py-3.5 font-label text-[0.72rem] font-semibold uppercase tracking-[0.15em] text-[#003010] transition-[background-color,box-shadow,opacity] duration-200 hover:bg-(--primary-dim) hover:shadow-[0_0_30px_rgba(67,254,109,0.35)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === 'sending' ? contactT.sending : contactT.send}
          </button>

          {status === 'sent' && (
            <span className="font-label text-[0.7rem] tracking-widest text-primary">{contactT.sent}</span>
          )}
          {status === 'error' && (
            <span className="font-label text-[0.7rem] tracking-widest text-secondary">{contactT.error}</span>
          )}
          {status === 'not-configured' && (
            <span className="font-label text-[0.7rem] tracking-widest text-secondary">{contactT.notConfigured}</span>
          )}
        </div>
      </form>
    </div>
  );
}
