import { getPersonal } from '../../data/personal';
import { useTranslation } from '../../context/LanguageContext';
import { ContactFooter } from './contact/ContactFooter';
import { ContactFormPanel } from './contact/ContactFormPanel';
import { ContactInfoPanel } from './contact/ContactInfoPanel';
import { useContactForm } from '../../hooks/useContactForm';

export default function ContactSection() {
  const { t, locale } = useTranslation();
  const personal = getPersonal(locale);
  const { formRef, handleSubmit, status } = useContactForm();

  return (
    <section
      id="contact"
      className="relative flex min-h-svh items-center rounded-t-2xl bg-(--bg) px-6 py-16 md:px-12 lg:py-20 xl:px-24 xl:py-24"
    >
      <div className="section-inner mx-auto grid w-full max-w-[1180px] gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-24">
        <ContactInfoPanel
          contactT={t.contact}
          hireEmail={personal.hireEmail}
          social={personal.social}
        />

        <ContactFormPanel
          contactT={t.contact}
          formRef={formRef}
          status={status}
          onSubmit={handleSubmit}
        />
      </div>
      <ContactFooter />
    </section>
  );
}

