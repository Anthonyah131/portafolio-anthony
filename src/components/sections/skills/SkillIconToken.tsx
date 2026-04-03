import { memo } from "react";

type SkillIconTokenProps = {
  icon: string;
  name: string;
  scale?: number;
};

const ICON_VARIANTS: Record<string, string> = {
  blender: "blender-original",
  threejs: "threejs-original",
};

function SkillIconTokenBase({ icon, name, scale = 1 }: SkillIconTokenProps) {
  const iconClass = ICON_VARIANTS[icon]
    ? `devicon-${ICON_VARIANTS[icon]}`
    : `devicon-${icon}-plain`;

  return (
    <div
      className="group relative grid aspect-square w-full place-items-center"
      title={name}
      aria-label={name}
    >
      <span
        className="pointer-events-none absolute -top-2 left-1/2 z-20 -translate-x-1/2 -translate-y-1 rounded-full border border-[rgba(255,183,135,0.35)] bg-[rgba(17,17,17,0.95)] px-2 py-0.5 font-label text-[0.58rem] uppercase tracking-[0.18em] text-secondary opacity-0 transition-all duration-200 group-hover:-translate-y-2 group-hover:opacity-100"
        aria-hidden="true"
      >
        {name}
      </span>

      <i
        className={iconClass}
        aria-hidden="true"
        style={{
          fontSize: `calc(1.65rem * ${scale})`,
          color: "var(--primary)",
          filter: "drop-shadow(0 5px 12px rgba(67,254,109,0.25))",
        }}
      />
    </div>
  );
}

export const SkillIconToken = memo(SkillIconTokenBase);
