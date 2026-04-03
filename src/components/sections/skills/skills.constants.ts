export type CategoryLayout = {
  top: number;
  width: number;
  columnCount: number;
};

const CATEGORY_LAYOUTS: CategoryLayout[] = [
  { top: 56, width: 260, columnCount: 3 },
  { top: 340, width: 330, columnCount: 4 },
  { top: 120, width: 295, columnCount: 3 },
  { top: 386, width: 245, columnCount: 3 },
  { top: 82, width: 330, columnCount: 4 },
  { top: 332, width: 280, columnCount: 3 },
];

export const SKILLS_STAGE_START_RATIO = 0.52;
export const SKILLS_STAGE_START_MIN_X = 560;
export const SKILLS_STAGE_END_RIGHT_GAP = 36;
export const SKILLS_STAGE_MIN_WIDTH = 1900;
export const SKILLS_STAGE_PER_CATEGORY_WIDTH = 340;
export const SKILLS_STAGE_EXTRA_WIDTH = 180;

/** Horizontal distance (px) between each category block's left edge. Increase to spread them apart, decrease to pack them closer. */
export const SKILLS_CATEGORY_SPACING = 320;
/** Left offset (px) from the stage origin to the first category block. */
export const SKILLS_CATEGORY_ORIGIN_X = 44;

export function getSkillsLayout(index: number): CategoryLayout {
  return CATEGORY_LAYOUTS[index % CATEGORY_LAYOUTS.length];
}

export function getSkillsStageWidth(categoryCount: number): number {
  return Math.max(SKILLS_STAGE_MIN_WIDTH, categoryCount * SKILLS_STAGE_PER_CATEGORY_WIDTH) + SKILLS_STAGE_EXTRA_WIDTH;
}

export function getSkillsContentMaxRight(categoryCount: number): number {
  let maxRight = 0;

  for (let index = 0; index < categoryCount; index += 1) {
    const layout = getSkillsLayout(index);
    const leftBase = index * SKILLS_CATEGORY_SPACING + SKILLS_CATEGORY_ORIGIN_X;
    const categoryOffsetAtEnd = -(16 + index * 8);
    const rightEdge = leftBase + categoryOffsetAtEnd + layout.width;

    maxRight = Math.max(maxRight, rightEdge);
  }

  return maxRight;
}