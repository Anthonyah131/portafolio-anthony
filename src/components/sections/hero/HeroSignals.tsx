import { memo } from 'react';
import { BriefcaseBusiness, GraduationCap, MapPin } from 'lucide-react';

type HeroSignalsProps = {
  location: string;
  degree: string;
  experience: string;
};

function HeroSignalsBase({ location, degree, experience }: HeroSignalsProps) {
  const items = [
    { icon: MapPin, label: 'Based in', value: location },
    { icon: GraduationCap, label: 'Background', value: degree },
    { icon: BriefcaseBusiness, label: 'Latest role', value: experience },
  ];

  return (
    <div className="stagger grid grid-cols-1 gap-4 md:grid-cols-3">
      {items.map(({ icon: Icon, label, value }) => (
        <article
          key={label}
          className="p-4 flex items-start gap-4 rounded-2xl border border-[rgba(133,149,130,0.18)] bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.015)),rgba(19,19,19,0.78)] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]"
        >
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary/12 text-secondary" aria-hidden="true">
            <Icon size={16} strokeWidth={1.8} />
          </span>
          <div>
            <p className="mb-1 font-label text-xs uppercase tracking-widest text-outline">{label}</p>
            <p className="font-body text-sm font-semibold leading-snug text-surface">{value}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export const HeroSignals = memo(HeroSignalsBase);