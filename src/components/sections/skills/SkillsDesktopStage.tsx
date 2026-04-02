import { memo } from 'react';
import type { SkillCategory } from '../../../types/portfolio';
import { SkillIconToken } from './SkillIconToken';
import { getSkillsLayout, SKILLS_CATEGORY_SPACING, SKILLS_CATEGORY_ORIGIN_X } from './skills.constants';

type SkillsDesktopStageProps = {
  categories: SkillCategory[];
  progress: number;
  reduceMotion: boolean;
  stageTranslateX: number;
  stageWidth: number;
  maxSkillCount: number;
};

function SkillsDesktopStageBase({
  categories,
  progress,
  reduceMotion,
  stageTranslateX,
  stageWidth,
  maxSkillCount,
}: SkillsDesktopStageProps) {
  return (
    <div className="relative z-1 flex-1 overflow-hidden">
      <div
        className="relative h-full will-change-transform"
        style={{
          width: `${stageWidth}px`,
          transform: `translateX(${stageTranslateX}px)`,
          transition: reduceMotion ? 'none' : 'transform 160ms linear',
        }}
      >
        {categories.map((category, categoryIndex) => {
          const layout = getSkillsLayout(categoryIndex);
          const leftBase = categoryIndex * SKILLS_CATEGORY_SPACING + SKILLS_CATEGORY_ORIGIN_X;
          const categoryOffset = -progress * (16 + categoryIndex * 8);

          return (
            <div
              key={category.category}
              className="fade-up absolute grid gap-3"
              style={{
                transitionDelay: `${Math.min(categoryIndex * 90, 450)}ms`,
                top: `${layout.top}px`,
                left: `${leftBase + categoryOffset}px`,
                width: `${layout.width}px`,
              }}
            >
              <span className="font-label text-[0.58rem] uppercase tracking-[0.3em] text-secondary">{category.category}</span>

              <div
                className="stagger grid gap-2.5"
                style={{
                  gridTemplateColumns: `repeat(${Math.min(layout.columnCount, Math.max(2, category.skills.length))}, minmax(0, 1fr))`,
                }}
              >
                {category.skills.map(skill => (
                  <SkillIconToken
                    key={`${category.category}-${skill.name}`}
                    icon={skill.icon}
                    name={skill.name}
                    scale={2 + (maxSkillCount - category.skills.length) * 0.015}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const SkillsDesktopStage = memo(SkillsDesktopStageBase);