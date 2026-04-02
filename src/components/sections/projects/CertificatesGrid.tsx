import { memo } from 'react';
import { certificates } from '../../../data/certificates';

function CertificateCardBase({ cert }: { cert: (typeof certificates)[number] }) {
  return (
    <a
      href={cert.link ?? '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="certificate-card"
    >
      <span className="certificate-card-issuer">{cert.issuer}</span>
      <span className="certificate-card-title">{cert.title}</span>
      <span className="certificate-card-date">{cert.date}</span>
    </a>
  );
}

const CertificateCard = memo(CertificateCardBase);

function CertificatesGridBase() {
  return (
    <div className="stagger certificates-grid">
      {certificates.map(cert => (
        <CertificateCard key={cert.id} cert={cert} />
      ))}
    </div>
  );
}

export const CertificatesGrid = memo(CertificatesGridBase);
