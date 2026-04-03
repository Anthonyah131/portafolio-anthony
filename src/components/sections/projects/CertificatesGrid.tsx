import { memo } from 'react';
import { getCertificates } from '../../../data/certificates';
import type { Certificate } from '../../../types/portfolio';
import { useTranslation } from '../../../context/LanguageContext';

function CertificateCardBase({ cert }: { cert: Certificate }) {
  return (
    <a
      href={cert.link ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col gap-3 border-l-2 border-transparent bg-(--bg-card) p-7 transition-[background,border-left-color,transform] duration-300 hover:border-l-primary hover:bg-(--bg-mid) hover:-translate-y-0.5"
    >
      <span className="font-label text-[0.6rem] uppercase tracking-[0.25em] text-secondary">{cert.issuer}</span>
      <span className="font-headline text-base font-semibold italic leading-[1.2] text-surface">{cert.title}</span>
      <span className="mt-auto font-label text-[0.65rem] tracking-widest text-outline">{cert.date}</span>
    </a>
  );
}

const CertificateCard = memo(CertificateCardBase);

function CertificatesGridBase() {
  const { locale } = useTranslation();
  const certificates = getCertificates(locale);

  return (
    <div className="stagger grid grid-cols-1 gap-px border border-(--outline-var) bg-(--outline-var) md:grid-cols-2 xl:grid-cols-3">
      {certificates.map(cert => (
        <CertificateCard key={cert.id} cert={cert} />
      ))}
    </div>
  );
}

export const CertificatesGrid = memo(CertificatesGridBase);
