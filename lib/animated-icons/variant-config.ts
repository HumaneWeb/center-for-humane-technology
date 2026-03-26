import type { ImageVariant } from '@/lib/utils/path-forward.utils';

export type VariantConfig = {
  bg: string;
  palette: Array<[number, number, number]>;
  chars: string[];
  step: number;
  batch: number;
  growStep: number;
  jitter: number;
  mode: 'glyph' | 'strokeRect' | 'solidRect' | 'mixed' | 'lines';
};

export const DEFAULT_SPEED_MULTIPLIER = 3;
export const DEFAULT_LOOP_ANIMATION = false;

const COMMON_CHARS = [
  '■',
  '□',
  '▪',
  '◼',
  '○',
  '◎',
  '△',
  '◇',
  '/',
  '\\',
  '[',
  ']',
  '+',
  '×',
  '#',
  'Z',
  'X',
];

export const VARIANT_CONFIG: Record<ImageVariant, VariantConfig> = {
  glass: {
    bg: 'transparent',
    palette: [
      [0, 145, 155],
      [104, 238, 234],
      [185, 161, 254],
      [255, 156, 95],
    ],
    chars: COMMON_CHARS,
    step: 7,
    batch: 24,
    growStep: 0.18,
    jitter: 0.08,
    mode: 'mixed',
  },
  rules: {
    bg: 'transparent',
    palette: [
      [0, 145, 155],
      [0, 90, 120],
      [104, 238, 234],
      [255, 250, 241],
    ],
    chars: ['§', '¶', '■', '□', '+', '×', '#', '/', '\\', '[', ']'],
    step: 6,
    batch: 28,
    growStep: 0.2,
    jitter: 0.05,
    mode: 'glyph',
  },
  hooks: {
    bg: 'transparent',
    palette: [
      [214, 117, 58],
      [255, 156, 95],
      [0, 145, 155],
      [255, 250, 241],
    ],
    chars: ['J', 'S', '{', '}', '(', ')', '<', '>', '/', '\\', '+', '×'],
    step: 8,
    batch: 18,
    growStep: 0.17,
    jitter: 0.06,
    mode: 'lines',
  },
  'hand-brain': {
    bg: 'transparent',
    palette: [
      [30, 180, 100],
      [255, 140, 0],
      [255, 250, 241],
      [0, 200, 220],
    ],
    chars: ['◎', '○', '◼', '▪', '△', '◇', 'Z', 'X'],
    step: 7,
    batch: 22,
    growStep: 0.19,
    jitter: 0.1,
    mode: 'mixed',
  },
  justice: {
    bg: 'transparent',
    palette: [
      [214, 117, 58],
      [0, 145, 155],
      [30, 20, 60],
      [255, 250, 241],
    ],
    chars: ['⚖', 'I', 'V', 'X', '■', '□', '△', '◇'],
    step: 8,
    batch: 16,
    growStep: 0.2,
    jitter: 0.03,
    mode: 'strokeRect',
  },
  missile: {
    bg: 'transparent',
    palette: [
      [30, 20, 60],
      [255, 156, 95],
      [0, 145, 155],
      [255, 250, 241],
    ],
    chars: ['>', '»', '→', '×', '#', '/', '\\'],
    step: 6,
    batch: 34,
    growStep: 0.22,
    jitter: 0.04,
    mode: 'solidRect',
  },
  'hand-chart': {
    bg: 'transparent',
    palette: [
      [0, 145, 155],
      [104, 238, 234],
      [214, 117, 58],
      [255, 250, 241],
    ],
    chars: ['▁', '▂', '▃', '▄', '▅', '▆', '▇', '█', '+', '×'],
    step: 7,
    batch: 20,
    growStep: 0.2,
    jitter: 0.07,
    mode: 'glyph',
  },
};
