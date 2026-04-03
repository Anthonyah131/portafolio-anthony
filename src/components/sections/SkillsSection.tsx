import { useMemo, useRef } from 'react';
import { SkillsDesktopStage } from './skills/SkillsDesktopStage';
import { SkillsHeader } from './skills/SkillsHeader';
import { SkillsMobileGrid } from './skills/SkillsMobileGrid';
import {
  getSkillsContentMaxRight,
  getSkillsStageWidth,
  SKILLS_STAGE_END_RIGHT_GAP,
  SKILLS_STAGE_START_MIN_X,
  SKILLS_STAGE_START_RATIO,
} from './skills/skills.constants';
import { skillCategories } from '../../data/skills';
import { useSkillsScrollProgress } from '../../hooks/useSkillsScrollProgress';
import { useSkillsViewport } from '../../hooks/useSkillsViewport';

export default function SkillsSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { isMobile, reduceMotion, viewportWidth } = useSkillsViewport();
  const progress = useSkillsScrollProgress(wrapperRef, isMobile);

  const maxSkillCount = useMemo(() => Math.max(...skillCategories.map(category => category.skills.length)), []);
  const stageWidth = useMemo(() => getSkillsStageWidth(skillCategories.length), []);
  const contentMaxRight = useMemo(() => getSkillsContentMaxRight(skillCategories.length), []);

  const stageStartX = Math.max(SKILLS_STAGE_START_MIN_X, Math.round(viewportWidth * SKILLS_STAGE_START_RATIO));
  const stageEndX = Math.min(-120, viewportWidth - contentMaxRight - SKILLS_STAGE_END_RIGHT_GAP);
  const normalizedStartX = Math.max(stageStartX, stageEndX + 220);
  const stageTranslateX = isMobile ? 0 : normalizedStartX + (stageEndX - normalizedStartX) * progress;
  const warmOverlayOpacity = isMobile ? 0.08 : progress * 0.2;

  return (
    <section
      ref={wrapperRef}
      id="skills"
      className="relative"
      style={{ height: isMobile ? 'auto' : '220vh', minHeight: isMobile ? 'auto' : '100svh' }}
    >
      <div
        className="flex flex-col overflow-hidden bg-low"
        style={{
          position: isMobile ? 'relative' : 'sticky',
          top: 0,
          height: isMobile ? 'auto' : '100svh',
          backgroundImage:
            'radial-gradient(circle at 16% 20%, rgba(67,254,109,0.08), transparent 38%), radial-gradient(circle at 84% 72%, rgba(255,183,135,0.12), transparent 42%), linear-gradient(135deg, rgba(133,149,130,0.12) 1px, transparent 1px)',
          backgroundSize: 'auto, auto, 24px 24px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'linear-gradient(118deg, rgba(255,183,135,0.34), rgba(255,183,135,0.08) 42%, transparent 72%)',
            opacity: warmOverlayOpacity,
            transition: reduceMotion ? 'none' : 'opacity 180ms linear',
            zIndex: 0,
          }}
        />

        <SkillsHeader isMobile={isMobile} progress={progress} reduceMotion={reduceMotion} />

        <div className="h-px shrink-0 bg-(--outline-var) opacity-40" />

        {isMobile ? (
          <SkillsMobileGrid categories={skillCategories} />
        ) : (
          <SkillsDesktopStage
            categories={skillCategories}
            progress={progress}
            reduceMotion={reduceMotion}
            stageTranslateX={stageTranslateX}
            stageWidth={stageWidth}
            maxSkillCount={maxSkillCount}
          />
        )}
      </div>
    </section>
  );
}

