import { memo } from 'react';
import type { SkillCategory } from '../../../types/portfolio';
import { SkillIconToken } from './SkillIconToken';

type SkillsMobileGridProps = {
  categories: SkillCategory[];
};

function SkillsMobileGridBase({ categories }: SkillsMobileGridProps) {
  return (
    <div className="stagger grid gap-4 px-4 pb-6 pt-5">
      {categories.map(category => (
        <section key={category.category} className="grid gap-3 border border-white/10 bg-[rgba(19,19,19,0.75)] p-3.5">
          <span className="font-label text-[0.58rem] uppercase tracking-[0.24em] text-secondary">{category.category}</span>

          <div className="stagger grid grid-cols-4 gap-2.5">
            {category.skills.map(skill => (
              <SkillIconToken key={`${category.category}-${skill.name}`} icon={skill.icon} name={skill.name} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export const SkillsMobileGrid = memo(SkillsMobileGridBase);