import type { ImageVariant } from '@/lib/utils/path-forward.utils';

export type PrincipleImageSize = { width: string; height: string };

/**
 * Canonical sizes for principle *detail* icons.
 * These values were previously defined inline in `path-forward-layout.tsx`.
 */
export const PRINCIPLE_DETAIL_VARIANT_SIZES: Record<ImageVariant, PrincipleImageSize> = {
  glass: { width: '289px', height: '281px' },
  rules: { width: '203px', height: '269px' },
  brain: { width: '325px', height: '190px' },
  robot: { width: '243px', height: '325px' },
  justice: { width: '299px', height: '313px' },
  missile: { width: '378px', height: '222px' },
  pie: { width: '371px', height: '273px' },
};

/**
 * Detail sizes indexed by principle number (1-based) as used in the layout.
 */
export const PRINCIPLE_DETAIL_IMAGE_SIZES: Record<
  number,
  { width: string; height: string; variant: ImageVariant }
> = {
  1: { ...PRINCIPLE_DETAIL_VARIANT_SIZES.glass, variant: 'glass' },
  2: { ...PRINCIPLE_DETAIL_VARIANT_SIZES.rules, variant: 'rules' },
  3: { ...PRINCIPLE_DETAIL_VARIANT_SIZES.brain, variant: 'brain' },
  4: { ...PRINCIPLE_DETAIL_VARIANT_SIZES.robot, variant: 'robot' },
  5: { ...PRINCIPLE_DETAIL_VARIANT_SIZES.justice, variant: 'justice' },
  6: { ...PRINCIPLE_DETAIL_VARIANT_SIZES.missile, variant: 'missile' },
  7: { ...PRINCIPLE_DETAIL_VARIANT_SIZES.pie, variant: 'pie' },
};

