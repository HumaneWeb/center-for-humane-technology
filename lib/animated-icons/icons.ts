import type p5 from 'p5';

/** Simple debounce: delays `fn` until `ms` after the last call. */
const debounce = (fn: () => void, ms: number) => {
  let id: ReturnType<typeof setTimeout> | undefined;
  return () => {
    if (id !== undefined) clearTimeout(id);
    id = setTimeout(fn, ms);
  };
};

/** Cached p5 module import — resolved once, reused by all icons. */
let _p5Promise: Promise<typeof import('p5')> | undefined;
const loadP5 = () => {
  if (!_p5Promise) _p5Promise = import('p5');
  return _p5Promise;
};

/** Returns true when the viewport is narrower than 768 px (typical mobile). */
const isMobileViewport = () =>
  typeof window !== 'undefined' && window.innerWidth < 768;

export type RenderRulesIconOptions = {
  /** Defaults to 8 (bigger = chunkier / faster). */
  step?: number;
  /** Defaults to `/rules.jpg` (must live in `public/`). */
  imageSrc?: string;
  /** Background color. Ignored if `transparentBackground` is true. Defaults to `[226, 249, 251]`. */
  backgroundRgb?: [number, number, number];
  /**
   * When true, clears the canvas to transparent (no solid fill).
   * There is no RGB triple that makes `background()` transparent — use this flag instead.
   */
  transparentBackground?: boolean;
  /** Fit factor. Defaults to 0.95 */
  scale?: number;
  /** How the image reveals over time. Defaults to `'random'`. */
  reveal?: 'random' | 'scanline';
  /** Cells to draw per frame when revealing. Defaults to 800. */
  cellsPerFrame?: number;
  /** Random seed for `'random'` reveal. Defaults to 42. */
  randomSeed?: number;
};

export type RenderRulesIconHandle = {
  p5: p5;
  destroy: () => void;
  /** Clears and restarts rendering from the top. */
  rerender: () => void;
};

export type RenderBrainIconOptions = {
  /** Defaults to 5 (bigger = chunkier / faster). */
  step?: number;
  /** Defaults to `/brain.jpg` (must live in `public/`). */
  imageSrc?: string;
  /** Background color. Ignored if `transparentBackground` is true. Defaults to `[240, 247, 247]`. */
  backgroundRgb?: [number, number, number];
  /** When true, clears the canvas to transparent (no solid fill). */
  transparentBackground?: boolean;
  /** Fit factor. Defaults to 0.95 */
  scale?: number;
  /**
   * When true, paints a BG-colored cell behind each drawn glyph/rect
   * (matches the original p5 sketch look).
   */
  paintBgCells?: boolean;
  /** How the image reveals over time. Defaults to `'random'`. */
  reveal?: 'random' | 'scanline';
  /** Cells to draw per frame when revealing. Defaults to 800. */
  cellsPerFrame?: number;
  /** Random seed for `'random'` reveal. Defaults to 42. */
  randomSeed?: number;
};

export type RenderBrainIconHandle = RenderRulesIconHandle;

export type RenderJusticeIconOptions = {
  /** Defaults to 6 (slightly denser than rules). */
  step?: number;
  /** Defaults to `/justice.png` (must live in `public/`). */
  imageSrc?: string;
  /** Background color. Ignored if `transparentBackground` is true. Defaults to `[236, 241, 243]`. */
  backgroundRgb?: [number, number, number];
  /** When true, clears the canvas to transparent (no solid fill). */
  transparentBackground?: boolean;
  /** Fit factor. Defaults to 0.95 */
  scale?: number;
  /** How the image reveals over time. Defaults to `'random'`. */
  reveal?: 'random' | 'scanline';
  /** Cells to draw per frame when revealing. Defaults to 900. */
  cellsPerFrame?: number;
  /** Random seed for `'random'` reveal. Defaults to 101. */
  randomSeed?: number;
};

export type RenderJusticeIconHandle = RenderRulesIconHandle;

export type RenderGlassIconOptions = {
  /** Defaults to 6 (similar density to justice). */
  step?: number;
  /** Defaults to `/glass.png` (must live in `public/`). */
  imageSrc?: string;
  /** Background color. Ignored if `transparentBackground` is true. Defaults to `[230, 242, 244]`. */
  backgroundRgb?: [number, number, number];
  /** When true, clears the canvas to transparent (no solid fill). */
  transparentBackground?: boolean;
  /** Fit factor. Defaults to 0.95 */
  scale?: number;
  /** How the image reveals over time. Defaults to `'random'`. */
  reveal?: 'random' | 'scanline';
  /** Cells to draw per frame when revealing. Defaults to 900. */
  cellsPerFrame?: number;
  /** Random seed for `'random'` reveal. Defaults to 73. */
  randomSeed?: number;
};

export type RenderGlassIconHandle = RenderRulesIconHandle;

export type RenderPieIconOptions = {
  /** Defaults to 6 (similar density to glass/justice). */
  step?: number;
  /** Defaults to `/pie.png` (must live in `public/`). */
  imageSrc?: string;
  /** Background color. Ignored if `transparentBackground` is true. Defaults to `[244, 238, 233]`. */
  backgroundRgb?: [number, number, number];
  /** When true, clears the canvas to transparent (no solid fill). */
  transparentBackground?: boolean;
  /** Fit factor. Defaults to 0.95 */
  scale?: number;
  /** How the image reveals over time. Defaults to `'random'`. */
  reveal?: 'random' | 'scanline';
  /** Cells to draw per frame when revealing. Defaults to 900. */
  cellsPerFrame?: number;
  /** Random seed for `'random'` reveal. Defaults to 137. */
  randomSeed?: number;
};

export type RenderPieIconHandle = RenderRulesIconHandle;

export type RenderRobotIconOptions = {
  /** Defaults to 3 (denser grid). */
  step?: number;
  /** Defaults to `/robot.gif` (must live in `public/`). */
  imageSrc?: string;
  /** Background color. Ignored if `transparentBackground` is true. Defaults to `[240, 247, 247]`. */
  backgroundRgb?: [number, number, number];
  /** Fit factor. Defaults to 0.95. */
  scale?: number;
  /** When true, clears the canvas instead of painting a solid background. */
  transparentBackground?: boolean;
};

export type RenderRobotIconHandle = RenderRulesIconHandle;

export type RenderMissileIconOptions = {
  /** Defaults to 2 (very dense grid). */
  step?: number;
  /** Defaults to `/missile2.gif` (must live in `public/`). */
  imageSrc?: string;
  /** Background color behind glyphs. Ignored if `transparentBackground` is true. Defaults to `[240, 247, 247]`. */
  backgroundRgb?: [number, number, number];
  /** Fit factor. Defaults to 1.1 to slightly crop edges like the sketch. */
  scale?: number;
  /** When true, clears the canvas instead of painting a solid background. */
  transparentBackground?: boolean;
};

export type RenderMissileIconHandle = RenderRulesIconHandle;

/**
 * Renders the "rules" icon into a given DOM element using a p5 instance.
 * Intended usage: call inside a React `useEffect` (client-side only) and cleanup on unmount.
 */
export const renderRulesIcon = (
  container: HTMLElement,
  opts: RenderRulesIconOptions = {},
): Promise<RenderRulesIconHandle> => {
  const STEP = opts.step ?? 8;
  const IMAGE_SRC = opts.imageSrc ?? '/rules.jpg';
  const BG = opts.backgroundRgb ?? [226, 249, 251];
  const TRANSPARENT_BG = opts.transparentBackground ?? false;
  const FIT = opts.scale ?? 0.95;
  const REVEAL = opts.reveal ?? 'random';
  const CELLS_PER_FRAME = opts.cellsPerFrame ?? (isMobileViewport() ? 300 : 800);
  const RANDOM_SEED = opts.randomSeed ?? 42;

  if (typeof window === 'undefined') {
    // SSR guard: this should never run on the server.
    return Promise.reject(new Error('renderRulesIcon must run in the browser'));
  }

  const sketch = (p: p5) => {
    const pp = p as unknown as p5 & {
      setup?: () => void;
      draw?: () => void;
      windowResized?: () => void;
      __rerender?: () => void;
      __disconnectResizeObserver?: () => void;
    };

    let img: p5.Image | undefined;
    let buf: p5.Graphics | undefined;

    let rendered = false;
    let renderY = 0;
    let cellIndex = 0;
    let cells: Array<[number, number]> = [];

    const PALETTE: Array<[number, number, number]> = [
      [30, 180, 100],
      [255, 140, 0],
      [255, 250, 241],
      [0, 200, 220],
    ];

    const CHARS = [
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
    ] as const;

    let sc = 1;
    let pw = 0;
    let cellSz = STEP;
    let cx = 0;
    let cy = 0;

    /**
     * "Object-fit: contain" for the image grid, with extra room so rects/text
     * (centered on each cell, size up to ~cellSz) are not clipped at the canvas edges.
     */
    const computeLayout = () => {
      if (!img || !buf) return;
      const w = Math.max(1, p.width);
      const h = Math.max(1, p.height);
      cx = w / 2;
      cy = h / 2;

      // Effective extent in image-space. We center each cell at x+STEP/2, so
      // the furthest centers are +/- (img/2) plus half a cell. Add extra for text overshoot.
      const padPx = STEP * 3;
      const effectiveW = img.width + STEP + padPx;
      const effectiveH = img.height + STEP + padPx;

      sc = Math.min(w / effectiveW, h / effectiveH) * FIT;
      pw = buf.width;
      cellSz = STEP * sc;
    };

    const applyCanvasSizeFromContainer = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      p.resizeCanvas(w, h);
      computeLayout();
      clearAndReset();
    };

    let resizeObserver: ResizeObserver | undefined;

    const clearAndReset = () => {
      rendered = false;
      renderY = 0;
      cellIndex = 0;
      if (TRANSPARENT_BG) {
        p.clear();
      } else {
        p.background(BG[0], BG[1], BG[2]);
      }
    };

    const shuffleCells = () => {
      // Fisher–Yates
      for (let i = cells.length - 1; i > 0; i--) {
        const j = Math.floor(p.random(i + 1));
        const tmp = cells[i];
        cells[i] = cells[j]!;
        cells[j] = tmp!;
      }
    };

    const initFromImage = () => {
      if (!img) return;
      buf = p.createGraphics(img.width, img.height);
      buf.pixelDensity(1);
      buf.image(img, 0, 0);
      buf.loadPixels();

      // Precompute drawable cells once for faster reveal.
      cells = [];
      pw = buf.width;
      for (let y = 0; y < img.height; y += STEP) {
        for (let x = 0; x < img.width; x += STEP) {
          const i = (y * pw + x) * 4;
          const a = buf.pixels[i + 3];
          if (a < 128) continue;
          const r = buf.pixels[i];
          const g = buf.pixels[i + 1];
          const b = buf.pixels[i + 2];
          const bright = (r + g + b) / 3;
          if (bright < 30) continue;
          cells.push([x, y]);
        }
      }

      p.randomSeed(RANDOM_SEED);
      if (REVEAL === 'random') shuffleCells();

      computeLayout();
      clearAndReset();
    };

    pp.setup = () => {
      // Make container/canvas naturally fill available space.
      // (If the container has no height because its parent has none, it will still be 0.)
      if (!container.style.position) container.style.position = 'relative';
      if (!container.style.width) container.style.width = '100%';
      if (!container.style.height) container.style.height = '100%';

      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));

      // Ensure pixel indexing matches `width * height * 4` (avoid retina density mismatch).
      p.pixelDensity(1);

      const renderer = p.createCanvas(w, h).parent(container);
      // Ensure the canvas element stretches to 100% of the container box.
      const canvas = renderer.elt as HTMLCanvasElement;
      canvas.style.display = 'block';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      p.textAlign(p.CENTER, p.CENTER);
      p.rectMode(p.CENTER);
      p.noiseSeed(42);

      resizeObserver = new ResizeObserver(debounce(() => {
        if (!container.isConnected) return;
        applyCanvasSizeFromContainer();
      }, 150));
      resizeObserver.observe(container);

      // p5 typings may treat `loadImage` as async; use callback form.
      p.loadImage(IMAGE_SRC, (loaded) => {
        img = loaded;
        initFromImage();
      });
      clearAndReset();
    };

    pp.windowResized = () => {
      applyCanvasSizeFromContainer();
    };

    const getCellColor = (bright: number, n: number) => {
      const stretched = p.constrain(p.map(bright, 100, 250, 0, 255), 0, 255);

      let cr: number, cg: number, cb: number;
      if (stretched < 60) {
        const m = stretched / 60;
        cr = p.lerp(20, PALETTE[0][0], m);
        cg = p.lerp(40, PALETTE[0][1], m);
        cb = p.lerp(60, PALETTE[0][2], m);
      } else if (stretched < 120) {
        const m = p.map(stretched, 60, 120, 0, 1);
        cr = p.lerp(PALETTE[0][0], PALETTE[1][0], m);
        cg = p.lerp(PALETTE[0][1], PALETTE[1][1], m);
        cb = p.lerp(PALETTE[0][2], PALETTE[1][2], m);
      } else if (stretched < 200) {
        const m = p.map(stretched, 120, 200, 0, 1);
        cr = p.lerp(PALETTE[1][0], PALETTE[1][0] * 1.1, m);
        cg = p.lerp(PALETTE[1][1], PALETTE[1][1] * 0.9, m);
        cb = p.lerp(PALETTE[1][2], PALETTE[1][2] * 0.8, m);
      } else {
        const m = p.map(stretched, 200, 255, 0, 1);
        cr = p.lerp(PALETTE[1][0], PALETTE[2][0], m);
        cg = p.lerp(PALETTE[1][1], PALETTE[2][1], m);
        cb = p.lerp(PALETTE[1][2], PALETTE[2][2], m);
      }

      const pal2 = PALETTE[Math.floor(n * PALETTE.length)];
      cr = p.lerp(cr, pal2[0], 0.12);
      cg = p.lerp(cg, pal2[1], 0.12);
      cb = p.lerp(cb, pal2[2], 0.12);

      return [cr, cg, cb, 255] as const;
    };

    const drawCell = (
      cr: number,
      cg: number,
      cb: number,
      alpha: number,
      dx: number,
      dy: number,
      sz: number,
      n: number,
    ) => {
      if (n < 0.35) {
        p.noStroke();
        p.fill(cr, cg, cb, alpha);
        p.textSize(sz * 1.1);
        p.text(CHARS[Math.floor(n * 100) % CHARS.length], dx, dy);
      } else if (n < 0.5) {
        p.noFill();
        p.stroke(cr, cg, cb, alpha);
        p.strokeWeight(0.8);
        p.rect(dx, dy, sz, sz);
      } else {
        p.noStroke();
        p.fill(cr, cg, cb, alpha);
        p.rect(dx, dy, sz, sz);
      }
    };

    pp.draw = () => {
      if (rendered || !img || !buf) return;

      const drawOne = (x: number, y: number) => {
        const i = (y * pw + x) * 4;
        const r = buf!.pixels[i];
        const g = buf!.pixels[i + 1];
        const b = buf!.pixels[i + 2];
        const a = buf!.pixels[i + 3];
        if (a < 128) return;
        const bright = (r + g + b) / 3;
        if (bright < 30) return;

        const n = p.noise(x * 0.05, y * 0.05);
        const [cr, cg, cb, alpha] = getCellColor(bright, n);
        const dx = cx + (x + STEP / 2 - img!.width / 2) * sc;
        const dy = cy + (y + STEP / 2 - img!.height / 2) * sc;
        const sz = cellSz * (0.8 + n * 0.2);
        drawCell(cr, cg, cb, alpha, dx, dy, sz, n);
      };

      if (REVEAL === 'scanline') {
        const rowsPerFrame = 100;
        const endY = Math.min(renderY + rowsPerFrame, img.height);
        for (let y = renderY; y < endY; y += STEP) {
          for (let x = 0; x < img.width; x += STEP) drawOne(x, y);
        }
        renderY = endY;
        if (renderY >= img.height) { rendered = true; p.noLoop(); }
        return;
      }

      const end = Math.min(cellIndex + CELLS_PER_FRAME, cells.length);
      for (let k = cellIndex; k < end; k++) {
        const c = cells[k]!;
        drawOne(c[0], c[1]);
      }
      cellIndex = end;
      if (cellIndex >= cells.length) { rendered = true; p.noLoop(); }
    };

    pp.__rerender = () => {
      computeLayout();
      clearAndReset();
      p.loop();
    };

    pp.__disconnectResizeObserver = () => {
      resizeObserver?.disconnect();
      resizeObserver = undefined;
    };
  };

  return loadP5().then((mod) => {
    const P5 = mod.default;
    const instance = new P5(sketch);
    return {
      p5: instance,
      destroy: () => {
        (
          instance as unknown as { __disconnectResizeObserver?: () => void }
        ).__disconnectResizeObserver?.();
        instance.remove();
      },
      rerender: () => {
        (instance as any).__rerender?.();
      },
    };
  });
};

/**
 * Renders the "brain" icon (public image → ascii/rect mosaic) into a given DOM element using a p5 instance.
 * Intended usage: call inside a React `useEffect` (client-side only) and cleanup on unmount.
 */
export const renderBrainIcon = (
  container: HTMLElement,
  opts: RenderBrainIconOptions = {},
): Promise<RenderBrainIconHandle> => {
  const STEP = opts.step ?? 5;
  const IMAGE_SRC = opts.imageSrc ?? '/brain.jpg';
  const BG = opts.backgroundRgb ?? [240, 247, 247];
  const TRANSPARENT_BG = opts.transparentBackground ?? false;
  const FIT = opts.scale ?? 0.95;
  const PAINT_BG_CELLS = opts.paintBgCells ?? true;
  const REVEAL = opts.reveal ?? 'random';
  const CELLS_PER_FRAME = opts.cellsPerFrame ?? (isMobileViewport() ? 300 : 800);
  const RANDOM_SEED = opts.randomSeed ?? 42;

  if (typeof window === 'undefined') {
    return Promise.reject(new Error('renderBrainIcon must run in the browser'));
  }

  const sketch = (p: p5) => {
    const pp = p as unknown as p5 & {
      setup?: () => void;
      draw?: () => void;
      windowResized?: () => void;
      __rerender?: () => void;
      __disconnectResizeObserver?: () => void;
    };

    let img: p5.Image | undefined;
    let buf: p5.Graphics | undefined;

    let rendered = false;
    let renderY = 0;
    let cellIndex = 0;
    let cells: Array<[number, number]> = [];

    const PALETTE: Array<[number, number, number]> = [
      [30, 180, 100],
      [255, 140, 0],
      [255, 250, 241],
      [0, 200, 220],
    ];

    const CHARS = [
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
    ] as const;

    let sc = 1;
    let pw = 0;
    let cellSz = STEP;
    let cx = 0;
    let cy = 0;

    const clearAndReset = () => {
      rendered = false;
      renderY = 0;
      cellIndex = 0;
      if (TRANSPARENT_BG) {
        p.clear();
      } else {
        p.background(BG[0], BG[1], BG[2]);
      }
    };

    const computeLayout = () => {
      if (!img || !buf) return;
      const w = Math.max(1, p.width);
      const h = Math.max(1, p.height);
      cx = w / 2;
      cy = h / 2;

      // Same "contain" logic as rules: include 1 cell + padding so glyphs don't clip.
      const padPx = STEP * 3;
      const effectiveW = img.width + STEP + padPx;
      const effectiveH = img.height + STEP + padPx;
      sc = Math.min(w / effectiveW, h / effectiveH) * FIT;

      pw = buf.width;
      cellSz = STEP * sc;
    };

    const applyCanvasSizeFromContainer = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      p.resizeCanvas(w, h);
      computeLayout();
      clearAndReset();
    };

    let resizeObserver: ResizeObserver | undefined;

    const initFromImage = () => {
      if (!img) return;
      buf = p.createGraphics(img.width, img.height);
      buf.pixelDensity(1);
      buf.image(img, 0, 0);
      buf.loadPixels();
      computeLayout();

      // Precompute drawable cells once for faster reveal.
      cells = [];
      pw = buf.width;
      for (let y = 0; y < img.height; y += STEP) {
        for (let x = 0; x < img.width; x += STEP) {
          const i = (y * pw + x) * 4;
          const a = buf.pixels[i + 3];
          if (a < 128) continue;
          const r = buf.pixels[i];
          const g = buf.pixels[i + 1];
          const b = buf.pixels[i + 2];
          const bright = (r + g + b) / 3;
          if (bright < 25) continue;
          cells.push([x, y]);
        }
      }

      p.randomSeed(RANDOM_SEED);
      if (REVEAL === 'random') {
        for (let i = cells.length - 1; i > 0; i--) {
          const j = Math.floor(p.random(i + 1));
          const tmp = cells[i];
          cells[i] = cells[j]!;
          cells[j] = tmp!;
        }
      }

      clearAndReset();
    };

    const getCellColor = (bright: number, n: number) => {
      const stretched = p.constrain(p.map(bright, 60, 250, 0, 255), 0, 255);
      let cr: number, cg: number, cb: number;
      if (stretched < 60) {
        const m = stretched / 60;
        cr = p.lerp(20, PALETTE[3][0], m);
        cg = p.lerp(40, PALETTE[3][1], m);
        cb = p.lerp(60, PALETTE[3][2], m);
      } else if (stretched < 120) {
        const m = p.map(stretched, 60, 120, 0, 1);
        cr = p.lerp(PALETTE[3][0], PALETTE[0][0], m);
        cg = p.lerp(PALETTE[3][1], PALETTE[0][1], m);
        cb = p.lerp(PALETTE[3][2], PALETTE[0][2], m);
      } else if (stretched < 200) {
        const m = p.map(stretched, 120, 200, 0, 1);
        cr = p.lerp(PALETTE[0][0], PALETTE[1][0], m);
        cg = p.lerp(PALETTE[0][1], PALETTE[1][1], m);
        cb = p.lerp(PALETTE[0][2], PALETTE[1][2], m);
      } else {
        const m = p.map(stretched, 200, 255, 0, 1);
        cr = p.lerp(PALETTE[1][0], PALETTE[2][0], m);
        cg = p.lerp(PALETTE[1][1], PALETTE[2][1], m);
        cb = p.lerp(PALETTE[1][2], PALETTE[2][2], m);
      }

      const pal2 = PALETTE[Math.floor(n * PALETTE.length)];
      cr = p.lerp(cr, pal2[0], 0.12);
      cg = p.lerp(cg, pal2[1], 0.12);
      cb = p.lerp(cb, pal2[2], 0.12);
      return [cr, cg, cb, 255] as const;
    };

    const drawCell = (
      cr: number,
      cg: number,
      cb: number,
      alpha: number,
      dx: number,
      dy: number,
      sz: number,
      n: number,
    ) => {
      if (n < 0.35) {
        p.noStroke();
        p.fill(cr, cg, cb, alpha);
        p.textSize(sz * 1.1);
        p.text(CHARS[Math.floor(n * 100) % CHARS.length], dx, dy);
      } else if (n < 0.5) {
        p.noFill();
        p.stroke(cr, cg, cb, alpha);
        p.strokeWeight(0.8);
        p.rect(dx, dy, sz, sz);
      } else {
        p.noStroke();
        p.fill(cr, cg, cb, alpha);
        p.rect(dx, dy, sz, sz);
      }
    };

    pp.setup = () => {
      if (!container.style.position) container.style.position = 'relative';
      if (!container.style.width) container.style.width = '100%';
      if (!container.style.height) container.style.height = '100%';

      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));

      p.pixelDensity(1);

      const renderer = p.createCanvas(w, h).parent(container);
      const canvas = renderer.elt as HTMLCanvasElement;
      canvas.style.display = 'block';
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      p.textAlign(p.CENTER, p.CENTER);
      p.rectMode(p.CENTER);
      p.noiseSeed(42);

      resizeObserver = new ResizeObserver(debounce(() => {
        if (!container.isConnected) return;
        applyCanvasSizeFromContainer();
      }, 150));
      resizeObserver.observe(container);

      p.loadImage(IMAGE_SRC, (loaded) => {
        img = loaded;
        initFromImage();
      });
      clearAndReset();
    };

    pp.windowResized = () => {
      applyCanvasSizeFromContainer();
    };

    pp.draw = () => {
      if (rendered || !img || !buf) return;

      const drawOne = (x: number, y: number) => {
        const i = (y * pw + x) * 4;
        const r = buf!.pixels[i];
        const g = buf!.pixels[i + 1];
        const b = buf!.pixels[i + 2];
        const a = buf!.pixels[i + 3];
        if (a < 128) return;
        const bright = (r + g + b) / 3;
        if (bright < 25) return;

        const n = p.noise(x * 0.05, y * 0.05);
        const [cr, cg, cb, alpha] = getCellColor(bright, n);

        const dx = cx + (x + STEP / 2 - img!.width / 2) * sc;
        const dy = cy + (y + STEP / 2 - img!.height / 2) * sc;

        if (!TRANSPARENT_BG && PAINT_BG_CELLS) {
          p.noStroke();
          p.fill(BG[0], BG[1], BG[2]);
          p.rect(dx, dy, cellSz, cellSz);
        }

        const sz = cellSz * (0.8 + n * 0.2);
        drawCell(cr, cg, cb, alpha, dx, dy, sz, n);
      };

      if (REVEAL === 'scanline') {
        const rowsPerFrame = 100;
        const endY = Math.min(renderY + rowsPerFrame, img.height);
        for (let y = renderY; y < endY; y += STEP) {
          for (let x = 0; x < img.width; x += STEP) drawOne(x, y);
        }
        renderY = endY;
        if (renderY >= img.height) { rendered = true; p.noLoop(); }
        return;
      }

      const end = Math.min(cellIndex + CELLS_PER_FRAME, cells.length);
      for (let k = cellIndex; k < end; k++) {
        const c = cells[k]!;
        drawOne(c[0], c[1]);
      }
      cellIndex = end;
      if (cellIndex >= cells.length) { rendered = true; p.noLoop(); }
    };

    pp.__rerender = () => {
      computeLayout();
      clearAndReset();
      p.loop();
    };

    pp.__disconnectResizeObserver = () => {
      resizeObserver?.disconnect();
      resizeObserver = undefined;
    };
  };

  return loadP5().then((mod) => {
    const P5 = mod.default;
    const instance = new P5(sketch);
    return {
      p5: instance,
      destroy: () => {
        (
          instance as unknown as { __disconnectResizeObserver?: () => void }
        ).__disconnectResizeObserver?.();
        instance.remove();
      },
      rerender: () => {
        (instance as any).__rerender?.();
      },
    };
  });
};

/**
 * Renders the "justice" icon from a static image, using a teal–orange–cream palette
 * similar to the provided reference. Supports the same reveal options as rules.
 */
export const renderJusticeIcon = (
  container: HTMLElement,
  opts: RenderJusticeIconOptions = {},
): Promise<RenderJusticeIconHandle> => {
  const STEP = opts.step ?? 6;
  const IMAGE_SRC = opts.imageSrc ?? '/justice.png';
  const BG = opts.backgroundRgb ?? [236, 241, 243];
  const TRANSPARENT_BG = opts.transparentBackground ?? false;
  const FIT = opts.scale ?? 0.95;
  const REVEAL = opts.reveal ?? 'random';
  const CELLS_PER_FRAME = opts.cellsPerFrame ?? (isMobileViewport() ? 350 : 900);
  const RANDOM_SEED = opts.randomSeed ?? 101;

  if (typeof window === 'undefined') {
    // SSR guard: this should never run on the server.
    return Promise.reject(new Error('renderJusticeIcon must run in the browser'));
  }

  const sketch = (p: p5) => {
    const pp = p as unknown as p5 & {
      setup?: () => void;
      draw?: () => void;
      windowResized?: () => void;
      __rerender?: () => void;
      __disconnectResizeObserver?: () => void;
    };

    let img: p5.Image | undefined;
    let buf: p5.Graphics | undefined;

    let rendered = false;
    let renderY = 0;
    let cellIndex = 0;
    let cells: Array<[number, number]> = [];

    // Palette tuned by eye from the reference:
    // deep teal shadows, warm orange mids, cream highlights, cool accent.
    const PALETTE: Array<[number, number, number]> = [
      [28, 140, 132], // deep teal
      [233, 163, 90], // warm orange
      [252, 246, 236], // cream
      [120, 204, 198], // aqua accent
    ];

    const CHARS = [
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
    ] as const;

    let sc = 1;
    let pw = 0;
    let cellSz = STEP;
    let cx = 0;
    let cy = 0;

    const computeLayout = () => {
      if (!img || !buf) return;
      const w = Math.max(1, p.width);
      const h = Math.max(1, p.height);
      cx = w / 2;
      cy = h / 2;

      const padPx = STEP * 3;
      const effectiveW = img.width + STEP + padPx;
      const effectiveH = img.height + STEP + padPx;
      sc = Math.min(w / effectiveW, h / effectiveH) * FIT;

      pw = buf.width;
      cellSz = STEP * sc;
    };

    const clearAndReset = () => {
      rendered = false;
      renderY = 0;
      cellIndex = 0;
      if (TRANSPARENT_BG) {
        p.clear();
      } else {
        p.background(BG[0], BG[1], BG[2]);
      }
    };

    const applyCanvasSizeFromContainer = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      p.resizeCanvas(w, h);
      computeLayout();
      clearAndReset();
    };

    let resizeObserver: ResizeObserver | undefined;

    const initFromImage = () => {
      if (!img) return;
      buf = p.createGraphics(img.width, img.height);
      buf.pixelDensity(1);
      buf.image(img, 0, 0);
      buf.loadPixels();

      // Precompute drawable cells once for faster reveal.
      cells = [];
      pw = buf.width;
      for (let y = 0; y < img.height; y += STEP) {
        for (let x = 0; x < img.width; x += STEP) {
          const i = (y * pw + x) * 4;
          const a = buf.pixels[i + 3];
          if (a < 128) continue;
          const r = buf.pixels[i];
          const g = buf.pixels[i + 1];
          const b = buf.pixels[i + 2];
          const bright = (r + g + b) / 3;
          if (bright < 35) continue;
          cells.push([x, y]);
        }
      }

      p.randomSeed(RANDOM_SEED);
      if (REVEAL === 'random') {
        for (let i = cells.length - 1; i > 0; i--) {
          const j = Math.floor(p.random(i + 1));
          const tmp = cells[i];
          cells[i] = cells[j]!;
          cells[j] = tmp!;
        }
      }

      computeLayout();
      clearAndReset();
    };

    const getCellColor = (bright: number, n: number) => {
      // Contrast stretch: shadows get more teal, mids orange, highlights cream.
      const stretched = p.constrain(p.map(bright, 80, 245, 0, 255), 0, 255);

      let cr: number, cg: number, cb: number;
      if (stretched < 70) {
        // Deep shadows: rich teal
        const m = stretched / 70;
        cr = p.lerp(10, PALETTE[0][0], m);
        cg = p.lerp(50, PALETTE[0][1], m);
        cb = p.lerp(60, PALETTE[0][2], m);
      } else if (stretched < 150) {
        // Mids: teal to warm orange
        const m = p.map(stretched, 70, 150, 0, 1);
        cr = p.lerp(PALETTE[0][0], PALETTE[1][0], m);
        cg = p.lerp(PALETTE[0][1], PALETTE[1][1], m);
        cb = p.lerp(PALETTE[0][2], PALETTE[1][2], m);
      } else if (stretched < 220) {
        // Upper mids: warm orange dominant
        const m = p.map(stretched, 150, 220, 0, 1);
        cr = p.lerp(PALETTE[1][0], PALETTE[1][0] * 1.08, m);
        cg = p.lerp(PALETTE[1][1], PALETTE[1][1] * 0.92, m);
        cb = p.lerp(PALETTE[1][2], PALETTE[1][2] * 0.9, m);
      } else {
        // Highlights: orange to cream
        const m = p.map(stretched, 220, 255, 0, 1);
        cr = p.lerp(PALETTE[1][0], PALETTE[2][0], m);
        cg = p.lerp(PALETTE[1][1], PALETTE[2][1], m);
        cb = p.lerp(PALETTE[1][2], PALETTE[2][2], m);
      }

      // Subtle aqua accent from noise
      const pal2 = PALETTE[3];
      const accentStrength = 0.12 + n * 0.06;
      cr = p.lerp(cr, pal2[0], accentStrength);
      cg = p.lerp(cg, pal2[1], accentStrength);
      cb = p.lerp(cb, pal2[2], accentStrength);

      return [cr, cg, cb, 255] as const;
    };

    const drawCell = (
      cr: number,
      cg: number,
      cb: number,
      alpha: number,
      dx: number,
      dy: number,
      sz: number,
      n: number,
    ) => {
      if (n < 0.3) {
        p.noStroke();
        p.fill(cr, cg, cb, alpha);
        p.textSize(sz * 1.1);
        p.text(CHARS[Math.floor(n * 100) % CHARS.length], dx, dy);
      } else if (n < 0.5) {
        p.noFill();
        p.stroke(cr, cg, cb, alpha);
        p.strokeWeight(0.8);
        p.rect(dx, dy, sz, sz);
      } else {
        p.noStroke();
        p.fill(cr, cg, cb, alpha);
        p.rect(dx, dy, sz, sz);
      }
    };

    pp.setup = () => {
      if (!container.style.position) container.style.position = 'relative';
      if (!container.style.width) container.style.width = '100%';
      if (!container.style.height) container.style.height = '100%';

      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));

      p.pixelDensity(1);

      const renderer = p.createCanvas(w, h).parent(container);
      const canvas = renderer.elt as HTMLCanvasElement;
      canvas.style.display = 'block';
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      p.textAlign(p.CENTER, p.CENTER);
      p.rectMode(p.CENTER);
      p.noiseSeed(42);

      resizeObserver = new ResizeObserver(debounce(() => {
        if (!container.isConnected) return;
        applyCanvasSizeFromContainer();
      }, 150));
      resizeObserver.observe(container);

      p.loadImage(IMAGE_SRC, (loaded) => {
        img = loaded;
        initFromImage();
      });
      clearAndReset();
    };

    pp.windowResized = () => {
      applyCanvasSizeFromContainer();
    };

    pp.draw = () => {
      if (!img || !buf) return;

      const drawOne = (x: number, y: number) => {
        const i = (y * pw + x) * 4;
        const r = buf!.pixels[i];
        const g = buf!.pixels[i + 1];
        const b = buf!.pixels[i + 2];
        const a = buf!.pixels[i + 3];
        if (a < 128) return;
        const bright = (r + g + b) / 3;
        if (bright < 35) return;

        const n = p.noise(x * 0.05, y * 0.05);
        const [cr, cg, cb, alpha] = getCellColor(bright, n);

        const dx = cx + (x + STEP / 2 - img!.width / 2) * sc;
        const dy = cy + (y + STEP / 2 - img!.height / 2) * sc;
        const sz = cellSz * (0.8 + n * 0.2);
        drawCell(cr, cg, cb, alpha, dx, dy, sz, n);
      };

      if (REVEAL === 'scanline') {
        const rowsPerFrame = 100;
        const endY = Math.min(renderY + rowsPerFrame, img.height);
        for (let y = renderY; y < endY; y += STEP) {
          for (let x = 0; x < img.width; x += STEP) drawOne(x, y);
        }
        renderY = endY;
        if (renderY >= img.height) { rendered = true; p.noLoop(); }
        return;
      }

      const end = Math.min(cellIndex + CELLS_PER_FRAME, cells.length);
      for (let k = cellIndex; k < end; k++) {
        const c = cells[k]!;
        drawOne(c[0], c[1]);
      }
      cellIndex = end;
      if (cellIndex >= cells.length) { rendered = true; p.noLoop(); }
    };

    pp.__rerender = () => {
      computeLayout();
      clearAndReset();
      p.loop();
    };

    pp.__disconnectResizeObserver = () => {
      resizeObserver?.disconnect();
      resizeObserver = undefined;
    };
  };

  return loadP5().then((mod) => {
    const P5 = mod.default;
    const instance = new P5(sketch);
    return {
      p5: instance,
      destroy: () => {
        (
          instance as unknown as { __disconnectResizeObserver?: () => void }
        ).__disconnectResizeObserver?.();
        instance.remove();
      },
      rerender: () => {
        (instance as any).__rerender?.();
      },
    };
  });
};

/**
 * Renders the "glass" icon from a static image, with a cooler teal–glass palette.
 * Same reveal mechanics as rules/justice.
 */
export const renderGlassIcon = (
  container: HTMLElement,
  opts: RenderGlassIconOptions = {},
): Promise<RenderGlassIconHandle> => {
  const STEP = opts.step ?? 6;
  const IMAGE_SRC = opts.imageSrc ?? '/glass.png';
  const BG = opts.backgroundRgb ?? [230, 242, 244];
  const TRANSPARENT_BG = opts.transparentBackground ?? false;
  const FIT = opts.scale ?? 0.95;
  const REVEAL = opts.reveal ?? 'random';
  const CELLS_PER_FRAME = opts.cellsPerFrame ?? (isMobileViewport() ? 350 : 900);
  const RANDOM_SEED = opts.randomSeed ?? 73;

  if (typeof window === 'undefined') {
    return Promise.reject(new Error('renderGlassIcon must run in the browser'));
  }

  const sketch = (p: p5) => {
    const pp = p as unknown as p5 & {
      setup?: () => void;
      draw?: () => void;
      windowResized?: () => void;
      __rerender?: () => void;
      __disconnectResizeObserver?: () => void;
    };

    let img: p5.Image | undefined;
    let buf: p5.Graphics | undefined;

    let rendered = false;
    let renderY = 0;
    let cellIndex = 0;
    let cells: Array<[number, number]> = [];

    // Cooler glassy palette: deep teal shadows, aqua mids, warm light accents, soft highlight.
    const PALETTE: Array<[number, number, number]> = [
      [8, 144, 110], // verde profundo      #08906E  → sombras oscuras
      [13, 184, 160], // cyan-verde vivo     #0DB8A0  → teal medio
      [58, 232, 200], // turquesa brillante  #3AE8C8  → medio-alto
      [26, 110, 168], // azul océano         #1A6EA8  → sombras frías
      [91, 184, 240], // azul cielo          #5BB8F0  → acento frío
      [200, 120, 32], // dorado oscuro       #C87820  → marco lupa oscuro
      [232, 160, 48], // naranja dorado      #E8A030  → marco lupa
      [240, 192, 96], // amarillo cálido     #F0C060  → highlights cálidos
      [232, 245, 240], // blanco verdoso      #E8F5F0  → highlight máximo
    ];

    const CHARS = [
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
    ] as const;

    let sc = 1;
    let pw = 0;
    let cellSz = STEP;
    let cx = 0;
    let cy = 0;

    const computeLayout = () => {
      if (!img || !buf) return;
      const w = Math.max(1, p.width);
      const h = Math.max(1, p.height);
      cx = w / 2;
      cy = h / 2;

      const padPx = STEP * 3;
      const effectiveW = img.width + STEP + padPx;
      const effectiveH = img.height + STEP + padPx;
      sc = Math.min(w / effectiveW, h / effectiveH) * FIT;

      pw = buf.width;
      cellSz = STEP * sc;
    };

    const clearAndReset = () => {
      rendered = false;
      renderY = 0;
      cellIndex = 0;
      if (TRANSPARENT_BG) {
        p.clear();
      } else {
        p.background(BG[0], BG[1], BG[2]);
      }
    };

    const applyCanvasSizeFromContainer = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      p.resizeCanvas(w, h);
      computeLayout();
      clearAndReset();
    };

    let resizeObserver: ResizeObserver | undefined;

    const initFromImage = () => {
      if (!img) return;
      buf = p.createGraphics(img.width, img.height);
      buf.pixelDensity(1);
      buf.image(img, 0, 0);
      buf.loadPixels();

      cells = [];
      pw = buf.width;
      for (let y = 0; y < img.height; y += STEP) {
        for (let x = 0; x < img.width; x += STEP) {
          const i = (y * pw + x) * 4;
          const a = buf.pixels[i + 3];
          if (a < 128) continue;
          const r = buf.pixels[i];
          const g = buf.pixels[i + 1];
          const b = buf.pixels[i + 2];
          const bright = (r + g + b) / 3;
          if (bright < 40) continue;
          cells.push([x, y]);
        }
      }

      p.randomSeed(RANDOM_SEED);
      if (REVEAL === 'random') {
        for (let i = cells.length - 1; i > 0; i--) {
          const j = Math.floor(p.random(i + 1));
          const tmp = cells[i];
          cells[i] = cells[j]!;
          cells[j] = tmp!;
        }
      }

      computeLayout();
      clearAndReset();
    };

    const getCellColor = (bright: number, n: number) => {
      const stretched = p.constrain(p.map(bright, 70, 245, 0, 255), 0, 255);

      // El ruido distingue zonas "globo" (teal/cyan) de zonas "lupa" (dorado)
      // n < 0.45  → familia fría (verdes/cyan/azul) = interior del globo
      // n >= 0.45 → familia cálida (dorados)        = marco de la lupa
      const isCold = n < 0.45;

      let cr: number, cg: number, cb: number;

      if (isCold) {
        // Rango frío: verde profundo → cyan-verde → turquesa → blanco verdoso
        if (stretched < 80) {
          const m = stretched / 80;
          cr = p.lerp(5, PALETTE[0][0], m);
          cg = p.lerp(50, PALETTE[0][1], m);
          cb = p.lerp(60, PALETTE[0][2], m);
        } else if (stretched < 150) {
          const m = p.map(stretched, 80, 150, 0, 1);
          cr = p.lerp(PALETTE[0][0], PALETTE[1][0], m);
          cg = p.lerp(PALETTE[0][1], PALETTE[1][1], m);
          cb = p.lerp(PALETTE[0][2], PALETTE[1][2], m);
        } else if (stretched < 210) {
          const m = p.map(stretched, 150, 210, 0, 1);
          // mezcla azul océano para dar variedad de tono
          const midR = p.lerp(PALETTE[1][0], PALETTE[3][0], 0.3);
          const midG = p.lerp(PALETTE[1][1], PALETTE[3][1], 0.3);
          const midB = p.lerp(PALETTE[1][2], PALETTE[3][2], 0.3);
          cr = p.lerp(midR, PALETTE[2][0], m);
          cg = p.lerp(midG, PALETTE[2][1], m);
          cb = p.lerp(midB, PALETTE[2][2], m);
        } else {
          const m = p.map(stretched, 210, 255, 0, 1);
          cr = p.lerp(PALETTE[2][0], PALETTE[8][0], m);
          cg = p.lerp(PALETTE[2][1], PALETTE[8][1], m);
          cb = p.lerp(PALETTE[2][2], PALETTE[8][2], m);
        }
      } else {
        // Rango cálido: dorado oscuro → naranja dorado → amarillo cálido → blanco verdoso
        if (stretched < 100) {
          const m = stretched / 100;
          cr = p.lerp(80, PALETTE[5][0], m);
          cg = p.lerp(50, PALETTE[5][1], m);
          cb = p.lerp(10, PALETTE[5][2], m);
        } else if (stretched < 180) {
          const m = p.map(stretched, 100, 180, 0, 1);
          cr = p.lerp(PALETTE[5][0], PALETTE[6][0], m);
          cg = p.lerp(PALETTE[5][1], PALETTE[6][1], m);
          cb = p.lerp(PALETTE[5][2], PALETTE[6][2], m);
        } else {
          const m = p.map(stretched, 180, 255, 0, 1);
          cr = p.lerp(PALETTE[6][0], PALETTE[7][0], m);
          cg = p.lerp(PALETTE[6][1], PALETTE[7][1], m);
          cb = p.lerp(PALETTE[6][2], PALETTE[7][2], m);
        }
      }

      // Shimmer: acento cyan sobre zonas frías, azul cielo sobre zonas cálidas
      const shimmer = 0.05 + 0.07 * n;
      const accent = isCold ? PALETTE[2] : PALETTE[4]; // turquesa o azul cielo
      cr = p.lerp(cr, accent[0], shimmer);
      cg = p.lerp(cg, accent[1], shimmer);
      cb = p.lerp(cb, accent[2], shimmer);

      return [cr, cg, cb, 255] as const;
    };

    const drawCell = (
      cr: number,
      cg: number,
      cb: number,
      alpha: number,
      dx: number,
      dy: number,
      sz: number,
      n: number,
    ) => {
      if (n < 0.3) {
        p.noStroke();
        p.fill(cr, cg, cb, alpha);
        p.textSize(sz * 1.05);
        p.text(CHARS[Math.floor(n * 100) % CHARS.length], dx, dy);
      } else if (n < 0.5) {
        p.noFill();
        p.stroke(cr, cg, cb, alpha);
        p.strokeWeight(0.7);
        p.rect(dx, dy, sz, sz);
      } else {
        p.noStroke();
        p.fill(cr, cg, cb, alpha);
        p.rect(dx, dy, sz, sz);
      }
    };

    pp.setup = () => {
      if (!container.style.position) container.style.position = 'relative';
      if (!container.style.width) container.style.width = '100%';
      if (!container.style.height) container.style.height = '100%';

      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));

      p.pixelDensity(1);

      const renderer = p.createCanvas(w, h).parent(container);
      const canvas = renderer.elt as HTMLCanvasElement;
      canvas.style.display = 'block';
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      p.textAlign(p.CENTER, p.CENTER);
      p.rectMode(p.CENTER);
      p.noiseSeed(42);

      resizeObserver = new ResizeObserver(debounce(() => {
        if (!container.isConnected) return;
        applyCanvasSizeFromContainer();
      }, 150));
      resizeObserver.observe(container);

      p.loadImage(IMAGE_SRC, (loaded) => {
        img = loaded;
        initFromImage();
      });
      clearAndReset();
    };

    pp.windowResized = () => {
      applyCanvasSizeFromContainer();
    };

    pp.draw = () => {
      if (!img || !buf) return;

      const drawOne = (x: number, y: number) => {
        const i = (y * pw + x) * 4;
        const r = buf!.pixels[i];
        const g = buf!.pixels[i + 1];
        const b = buf!.pixels[i + 2];
        const a = buf!.pixels[i + 3];
        if (a < 128) return;
        const bright = (r + g + b) / 3;
        if (bright < 40) return;

        const n = p.noise(x * 0.04, y * 0.04);
        const [cr, cg, cb, alpha] = getCellColor(bright, n);

        const dx = cx + (x + STEP / 2 - img!.width / 2) * sc;
        const dy = cy + (y + STEP / 2 - img!.height / 2) * sc;
        const sz = cellSz * (0.85 + n * 0.2);
        drawCell(cr, cg, cb, alpha, dx, dy, sz, n);
      };

      if (REVEAL === 'scanline') {
        const rowsPerFrame = 100;
        const endY = Math.min(renderY + rowsPerFrame, img.height);
        for (let y = renderY; y < endY; y += STEP) {
          for (let x = 0; x < img.width; x += STEP) drawOne(x, y);
        }
        renderY = endY;
        if (renderY >= img.height) { rendered = true; p.noLoop(); }
        return;
      }

      const end = Math.min(cellIndex + CELLS_PER_FRAME, cells.length);
      for (let k = cellIndex; k < end; k++) {
        const c = cells[k]!;
        drawOne(c[0], c[1]);
      }
      cellIndex = end;
      if (cellIndex >= cells.length) { rendered = true; p.noLoop(); }
    };

    pp.__rerender = () => {
      computeLayout();
      clearAndReset();
      p.loop();
    };

    pp.__disconnectResizeObserver = () => {
      resizeObserver?.disconnect();
      resizeObserver = undefined;
    };
  };

  return loadP5().then((mod) => {
    const P5 = mod.default;
    const instance = new P5(sketch);
    return {
      p5: instance,
      destroy: () => {
        (
          instance as unknown as { __disconnectResizeObserver?: () => void }
        ).__disconnectResizeObserver?.();
        instance.remove();
      },
      rerender: () => {
        (instance as any).__rerender?.();
      },
    };
  });
};

/**
 * Renders the "pie" icon from a static image, with a warm chart/segment palette.
 * Same reveal mechanics as rules/justice/glass.
 */
export const renderPieIcon = (
  container: HTMLElement,
  opts: RenderPieIconOptions = {},
): Promise<RenderPieIconHandle> => {
  const STEP = opts.step ?? 6;
  const IMAGE_SRC = opts.imageSrc ?? '/pie.png';
  const BG = opts.backgroundRgb ?? [244, 238, 233];
  const TRANSPARENT_BG = opts.transparentBackground ?? false;
  const FIT = opts.scale ?? 0.95;
  const REVEAL = opts.reveal ?? 'random';
  const CELLS_PER_FRAME = opts.cellsPerFrame ?? (isMobileViewport() ? 350 : 900);
  const RANDOM_SEED = opts.randomSeed ?? 137;

  if (typeof window === 'undefined') {
    return Promise.reject(new Error('renderPieIcon must run in the browser'));
  }

  const sketch = (p: p5) => {
    const pp = p as unknown as p5 & {
      setup?: () => void;
      draw?: () => void;
      windowResized?: () => void;
      __rerender?: () => void;
      __disconnectResizeObserver?: () => void;
    };

    let img: p5.Image | undefined;
    let buf: p5.Graphics | undefined;

    let rendered = false;
    let renderY = 0;
    let cellIndex = 0;
    let cells: Array<[number, number]> = [];

    // Warm chart palette: muted teal, warm orange, soft yellow, light cream.
    const PALETTE: Array<[number, number, number]> = [
      [53, 148, 139], // teal slice
      [228, 151, 79], // orange slice
      [243, 206, 110], // yellow slice
      [250, 245, 236], // cream highlight
    ];

    const CHARS = [
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
    ] as const;

    let sc = 1;
    let pw = 0;
    let cellSz = STEP;
    let cx = 0;
    let cy = 0;

    const computeLayout = () => {
      if (!img || !buf) return;
      const w = Math.max(1, p.width);
      const h = Math.max(1, p.height);
      cx = w / 2;
      cy = h / 2;

      const padPx = STEP * 3;
      const effectiveW = img.width + STEP + padPx;
      const effectiveH = img.height + STEP + padPx;
      sc = Math.min(w / effectiveW, h / effectiveH) * FIT;

      pw = buf.width;
      cellSz = STEP * sc;
    };

    const clearAndReset = () => {
      rendered = false;
      renderY = 0;
      cellIndex = 0;
      if (TRANSPARENT_BG) {
        p.clear();
      } else {
        p.background(BG[0], BG[1], BG[2]);
      }
    };

    const applyCanvasSizeFromContainer = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      p.resizeCanvas(w, h);
      computeLayout();
      clearAndReset();
    };

    let resizeObserver: ResizeObserver | undefined;

    const initFromImage = () => {
      if (!img) return;
      buf = p.createGraphics(img.width, img.height);
      buf.pixelDensity(1);
      buf.image(img, 0, 0);
      buf.loadPixels();

      cells = [];
      pw = buf.width;
      for (let y = 0; y < img.height; y += STEP) {
        for (let x = 0; x < img.width; x += STEP) {
          const i = (y * pw + x) * 4;
          const a = buf.pixels[i + 3];
          if (a < 128) continue;
          const r = buf.pixels[i];
          const g = buf.pixels[i + 1];
          const b = buf.pixels[i + 2];
          const bright = (r + g + b) / 3;
          if (bright < 35) continue;
          cells.push([x, y]);
        }
      }

      p.randomSeed(RANDOM_SEED);
      if (REVEAL === 'random') {
        for (let i = cells.length - 1; i > 0; i--) {
          const j = Math.floor(p.random(i + 1));
          const tmp = cells[i];
          cells[i] = cells[j]!;
          cells[j] = tmp!;
        }
      }

      computeLayout();
      clearAndReset();
    };

    const getCellColor = (bright: number, n: number) => {
      const stretched = p.constrain(p.map(bright, 70, 245, 0, 255), 0, 255);

      let cr: number, cg: number, cb: number;
      if (stretched < 80) {
        // Deeper teal for crust shadows
        const m = stretched / 80;
        cr = p.lerp(25, PALETTE[0][0], m);
        cg = p.lerp(80, PALETTE[0][1], m);
        cb = p.lerp(90, PALETTE[0][2], m);
      } else if (stretched < 150) {
        // Teal → orange for mid slices
        const m = p.map(stretched, 80, 150, 0, 1);
        cr = p.lerp(PALETTE[0][0], PALETTE[1][0], m);
        cg = p.lerp(PALETTE[0][1], PALETTE[1][1], m * 0.9);
        cb = p.lerp(PALETTE[0][2], PALETTE[1][2], m * 0.8);
      } else if (stretched < 210) {
        // Orange → yellow
        const m = p.map(stretched, 150, 210, 0, 1);
        cr = p.lerp(PALETTE[1][0], PALETTE[2][0], m);
        cg = p.lerp(PALETTE[1][1], PALETTE[2][1], m);
        cb = p.lerp(PALETTE[1][2], PALETTE[2][2], m);
      } else {
        // Yellow → cream highlight
        const m = p.map(stretched, 210, 255, 0, 1);
        cr = p.lerp(PALETTE[2][0], PALETTE[3][0], m);
        cg = p.lerp(PALETTE[2][1], PALETTE[3][1], m);
        cb = p.lerp(PALETTE[2][2], PALETTE[3][2], m);
      }

      // Very light teal tint to keep cohesion with other icons.
      const accent = PALETTE[0];
      const accentMix = 0.04 + 0.06 * n;
      cr = p.lerp(cr, accent[0], accentMix);
      cg = p.lerp(cg, accent[1], accentMix);
      cb = p.lerp(cb, accent[2], accentMix);

      return [cr, cg, cb, 255] as const;
    };

    const drawCell = (
      cr: number,
      cg: number,
      cb: number,
      alpha: number,
      dx: number,
      dy: number,
      sz: number,
      n: number,
    ) => {
      if (n < 0.28) {
        p.noStroke();
        p.fill(cr, cg, cb, alpha);
        p.textSize(sz * 1.02);
        p.text(CHARS[Math.floor(n * 100) % CHARS.length], dx, dy);
      } else if (n < 0.5) {
        p.noFill();
        p.stroke(cr, cg, cb, alpha);
        p.strokeWeight(0.7);
        p.rect(dx, dy, sz, sz);
      } else {
        p.noStroke();
        p.fill(cr, cg, cb, alpha);
        p.rect(dx, dy, sz, sz);
      }
    };

    pp.setup = () => {
      if (!container.style.position) container.style.position = 'relative';
      if (!container.style.width) container.style.width = '100%';
      if (!container.style.height) container.style.height = '100%';

      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));

      p.pixelDensity(1);

      const renderer = p.createCanvas(w, h).parent(container);
      const canvas = renderer.elt as HTMLCanvasElement;
      canvas.style.display = 'block';
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      p.textAlign(p.CENTER, p.CENTER);
      p.rectMode(p.CENTER);
      p.noiseSeed(42);

      resizeObserver = new ResizeObserver(debounce(() => {
        if (!container.isConnected) return;
        applyCanvasSizeFromContainer();
      }, 150));
      resizeObserver.observe(container);

      p.loadImage(IMAGE_SRC, (loaded) => {
        img = loaded;
        initFromImage();
      });
      clearAndReset();
    };

    pp.windowResized = () => {
      applyCanvasSizeFromContainer();
    };

    pp.draw = () => {
      if (!img || !buf) return;

      const drawOne = (x: number, y: number) => {
        const i = (y * pw + x) * 4;
        const r = buf!.pixels[i];
        const g = buf!.pixels[i + 1];
        const b = buf!.pixels[i + 2];
        const a = buf!.pixels[i + 3];
        if (a < 128) return;
        const bright = (r + g + b) / 3;
        if (bright < 35) return;

        const n = p.noise(x * 0.04, y * 0.04);
        const [cr, cg, cb, alpha] = getCellColor(bright, n);

        const dx = cx + (x + STEP / 2 - img!.width / 2) * sc;
        const dy = cy + (y + STEP / 2 - img!.height / 2) * sc;
        const sz = cellSz * (0.85 + n * 0.2);
        drawCell(cr, cg, cb, alpha, dx, dy, sz, n);
      };

      if (REVEAL === 'scanline') {
        const rowsPerFrame = 100;
        const endY = Math.min(renderY + rowsPerFrame, img.height);
        for (let y = renderY; y < endY; y += STEP) {
          for (let x = 0; x < img.width; x += STEP) drawOne(x, y);
        }
        renderY = endY;
        if (renderY >= img.height) { rendered = true; p.noLoop(); }
        return;
      }

      const end = Math.min(cellIndex + CELLS_PER_FRAME, cells.length);
      for (let k = cellIndex; k < end; k++) {
        const c = cells[k]!;
        drawOne(c[0], c[1]);
      }
      cellIndex = end;
      if (cellIndex >= cells.length) { rendered = true; p.noLoop(); }
    };

    pp.__rerender = () => {
      computeLayout();
      clearAndReset();
      p.loop();
    };

    pp.__disconnectResizeObserver = () => {
      resizeObserver?.disconnect();
      resizeObserver = undefined;
    };
  };

  return loadP5().then((mod) => {
    const P5 = mod.default;
    const instance = new P5(sketch);
    return {
      p5: instance,
      destroy: () => {
        (
          instance as unknown as { __disconnectResizeObserver?: () => void }
        ).__disconnectResizeObserver?.();
        instance.remove();
      },
      rerender: () => {
        (instance as any).__rerender?.();
      },
    };
  });
};

/**
 * Renders the "robot" icon from an animated GIF, applying a stylized mosaic effect.
 * This one is continuously animated (no reveal-by-cells), driven by the GIF frames.
 */
export const renderRobotIcon = (
  container: HTMLElement,
  opts: RenderRobotIconOptions = {},
): Promise<RenderRobotIconHandle> => {
  const STEP = opts.step ?? 5;
  const IMAGE_SRC = opts.imageSrc ?? '/robot.gif';
  const BG = opts.backgroundRgb ?? [240, 247, 247];
  const FIT = opts.scale ?? 0.95;
  const TRANSPARENT_BG = opts.transparentBackground ?? false;

  if (typeof window === 'undefined') {
    return Promise.reject(new Error('renderRobotIcon must run in the browser'));
  }

  const sketch = (p: p5) => {
    const pp = p as unknown as p5 & {
      setup?: () => void;
      draw?: () => void;
      windowResized?: () => void;
      __rerender?: () => void;
      __disconnectResizeObserver?: () => void;
    };

    let img: p5.Image | undefined;
    let buf: p5.Graphics | undefined;

    const PALETTE: Array<[number, number, number]> = [
      [56, 154, 116],
      [255, 169, 83],
      [255, 250, 241],
      [35, 30, 73],
    ];

    const CHARS = [
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
    ] as const;

    let sc = 1;
    let pw = 0;
    let cellSz = STEP;
    let cx = 0;
    let cy = 0;

    const computeLayout = () => {
      if (!img || !buf) return;
      const w = Math.max(1, p.width);
      const h = Math.max(1, p.height);
      cx = w / 2;
      cy = h / 2;

      const padPx = STEP * 3;
      const effectiveW = img.width + STEP + padPx;
      const effectiveH = img.height + STEP + padPx;
      sc = Math.min(w / effectiveW, h / effectiveH) * FIT;

      pw = buf.width;
      cellSz = STEP * sc;
    };

    const applyCanvasSizeFromContainer = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      p.resizeCanvas(w, h);
      computeLayout();
    };

    let resizeObserver: ResizeObserver | undefined;

    let bufferReady = false;

    const ensureBuffer = () => {
      if (!img || bufferReady) return;
      if (!buf) {
        buf = p.createGraphics(img.width, img.height);
        buf.pixelDensity(1);
      }
      buf.clear();
      buf.image(img, 0, 0);
      buf.loadPixels();
      pw = buf.width;
      bufferReady = true;
    };

    // Precompute drawable cells once after image loads (avoids per-frame pixel checks).
    let cells: Array<{ x: number; y: number; bright: number; n: number }> = [];

    const precomputeCells = () => {
      if (!img || !buf) return;
      cells = [];
      for (let x = 0; x < img.width; x += STEP) {
        for (let y = 0; y < img.height; y += STEP) {
          const i = (y * pw + x) * 4;
          const a = buf.pixels[i + 3];
          if (a < 128) continue;
          const r = buf.pixels[i];
          const g = buf.pixels[i + 1];
          const b = buf.pixels[i + 2];
          const bright = (r + g + b) / 3;
          if (bright < 70) continue;
          const n = p.noise(x * 0.05, y * 0.05);
          cells.push({ x, y, bright, n });
        }
      }
    };

    const getPaletteColor = (bright: number, n: number, t: number) => {
      let pal: [number, number, number];
      if (bright < 80) {
        const m = p.map(bright, 70, 80, 0, 1);
        pal = [
          p.lerp(PALETTE[3][0], PALETTE[1][0], m),
          p.lerp(PALETTE[3][1], PALETTE[1][1], m),
          p.lerp(PALETTE[3][2], PALETTE[1][2], m),
        ];
      } else if (bright < 130) {
        const m = p.map(bright, 80, 130, 0, 1);
        pal = [
          p.lerp(PALETTE[1][0], PALETTE[0][0], m * 0.4),
          p.lerp(PALETTE[1][1], PALETTE[0][1], m * 0.4),
          p.lerp(PALETTE[1][2], PALETTE[0][2], m * 0.4),
        ];
      } else if (bright < 180) {
        pal = PALETTE[1];
      } else if (bright < 220) {
        const m = p.map(bright, 180, 220, 0, 1);
        pal = [
          p.lerp(PALETTE[1][0], PALETTE[2][0], m),
          p.lerp(PALETTE[1][1], PALETTE[2][1], m),
          p.lerp(PALETTE[1][2], PALETTE[2][2], m),
        ];
      } else {
        pal = PALETTE[2];
      }

      const pal2 = PALETTE[Math.floor(n * PALETTE.length)];
      const cycle = (p.sin(t * 0.05 + n * 30) + 1) / 2;
      let cr = p.lerp(pal[0], pal2[0], cycle * 0.25);
      let cg = p.lerp(pal[1], pal2[1], cycle * 0.25);
      let cb = p.lerp(pal[2], pal2[2], cycle * 0.25);

      cr *= 0.85;
      cg *= 0.85;
      cb *= 0.85;

      return [cr, cg, cb] as const;
    };

    pp.setup = () => {
      if (!container.style.position) container.style.position = 'relative';
      if (!container.style.width) container.style.width = '100%';
      if (!container.style.height) container.style.height = '100%';

      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));

      p.pixelDensity(1);

      const renderer = p.createCanvas(w, h).parent(container);
      const canvas = renderer.elt as HTMLCanvasElement;
      canvas.style.display = 'block';
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      p.textAlign(p.CENTER, p.CENTER);
      p.rectMode(p.CENTER);
      p.noiseSeed(42);
      p.frameRate(12);

      resizeObserver = new ResizeObserver(debounce(() => {
        if (!container.isConnected) return;
        applyCanvasSizeFromContainer();
      }, 150));
      resizeObserver.observe(container);

      p.loadImage(IMAGE_SRC, (loaded) => {
        img = loaded;
        ensureBuffer();
        precomputeCells();
        computeLayout();
      });
    };

    pp.windowResized = () => {
      applyCanvasSizeFromContainer();
    };

    pp.draw = () => {
      if (!img || cells.length === 0) return;

      if (TRANSPARENT_BG) {
        p.clear();
      } else {
        p.background(BG[0], BG[1], BG[2]);
      }
      const t = p.frameCount;

      for (let k = 0; k < cells.length; k++) {
        const c = cells[k];
        const { x, y, bright, n } = c;
        const [cr, cg, cb] = getPaletteColor(bright, n, t);

        const wobbleX = p.sin(t * 0.02 + n * 20) * 0.5;
        const wobbleY = p.cos(t * 0.015 + n * 20) * 0.3;
        const dx = cx + (x - img.width / 2) * sc + wobbleX;
        const dy = cy + (y - img.height / 2) * sc + wobbleY;
        const sz = STEP * sc * (0.8 + n * 0.2);

        if (n < 0.25) {
          p.noStroke();
          p.fill(cr, cg, cb);
          p.textSize(sz * 1.1);
          p.text(CHARS[Math.floor(n * 100) % CHARS.length], dx, dy);
        } else if (n < 0.45) {
          p.noFill();
          p.stroke(cr, cg, cb);
          p.strokeWeight(0.8);
          p.rect(dx, dy, sz, sz);
        } else {
          p.noStroke();
          p.fill(cr, cg, cb);
          p.rect(dx, dy, sz, sz);
        }
      }
      p.noStroke();
    };

    pp.__rerender = () => {
      computeLayout();
    };

    pp.__disconnectResizeObserver = () => {
      resizeObserver?.disconnect();
      resizeObserver = undefined;
    };
  };

  return loadP5().then((mod) => {
    const P5 = mod.default;
    const instance = new P5(sketch);
    return {
      p5: instance,
      destroy: () => {
        (
          instance as unknown as { __disconnectResizeObserver?: () => void }
        ).__disconnectResizeObserver?.();
        instance.remove();
      },
      rerender: () => {
        (instance as any).__rerender?.();
      },
    };
  });
};

/**
 * Renders the "missile" icon from an animated GIF, using code-like glyphs and rects.
 * Continuously animated, driven by the GIF frames.
 */
export const renderMissileIcon = (
  container: HTMLElement,
  opts: RenderMissileIconOptions = {},
): Promise<RenderMissileIconHandle> => {
  const STEP = opts.step ?? 4;
  const IMAGE_SRC = opts.imageSrc ?? '/missile2.gif';
  const BG = opts.backgroundRgb ?? [240, 247, 247];
  const FIT = opts.scale ?? 1.1;
  const TRANSPARENT_BG = opts.transparentBackground ?? false;

  if (typeof window === 'undefined') {
    return Promise.reject(new Error('renderMissileIcon must run in the browser'));
  }

  const sketch = (p: p5) => {
    const pp = p as unknown as p5 & {
      setup?: () => void;
      draw?: () => void;
      windowResized?: () => void;
      __rerender?: () => void;
      __disconnectResizeObserver?: () => void;
    };

    let img: p5.Image | undefined;
    let buf: p5.Graphics | undefined;

    const PALETTE: Array<[number, number, number]> = [
      [232, 137, 42], // naranja principal  #E8892A
      [245, 168, 64], // naranja claro      #F5A840
      [61, 184, 122], // verde principal    #3DB87A
      [109, 212, 126], // verde claro        #6DD47E
      [42, 138, 80], // verde oscuro       #2A8A50
      [139, 168, 48], // verde amarillento  #8BA830
      [212, 192, 96], // amarillo apagado   #D4C060
    ];

    const CODE_CHARS = [
      '{',
      '}',
      '(',
      ')',
      '[',
      ']',
      '<',
      '>',
      '<<',
      '>>',
      '{{',
      '}}',
      ';',
      ':',
      '=',
      '!',
      '&',
      '|',
      '+',
      '-',
      '/',
      '*',
      '#',
      '@',
      '$',
      '%',
      '^',
      '~',
      '=>',
      '!=',
      '==',
      '&&',
      '||',
      '+=',
      '-=',
      '::',
      '...',
      '0',
      '1',
      '0',
      '1',
      '00',
      '01',
      '10',
      '11',
      'if',
      'fn',
      'do',
      'AI',
      'ml',
      'nn',
      'go',
      'run',
      'end',
      'var',
      'let',
      'def',
      'for',
      'int',
      'new',
      'nil',
      'err',
      'sys',
      'api',
      'get',
      'set',
      'log',
      '.',
      ',',
      '_',
      '\\',
      '`',
      '"',
      "'",
      '?',
      '¬',
      '÷',
      '±',
      '∞',
      '⟨',
      '⟩',
      '⌐',
      '⌊',
      '⌋',
      '⎡',
      '⎤',
      '█',
      '▓',
      '░',
      '◆',
      '◇',
      '●',
      '○',
      '▪',
      '□',
      '△',
      '▽',
    ] as const;

    let bgColor: [number, number, number] | null = null;

    let sc = 1;
    let pw = 0;
    let cx = 0;
    let cy = 0;

    const computeLayout = () => {
      if (!img || !buf) return;
      const w = Math.max(1, p.width);
      const h = Math.max(1, p.height);
      cx = w / 2;
      cy = h / 2;

      sc = Math.min(w / img.width, h / img.height) * FIT;
      pw = buf.width;
    };

    const applyCanvasSizeFromContainer = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      p.resizeCanvas(w, h);
      computeLayout();
    };

    let resizeObserver: ResizeObserver | undefined;

    let bufferReady = false;

    const ensureBuffer = () => {
      if (!img || bufferReady) return;
      if (!buf) {
        buf = p.createGraphics(img.width, img.height);
        buf.pixelDensity(1);
      }
      buf.clear();
      buf.image(img, 0, 0);
      buf.loadPixels();
      pw = buf.width;

      if (!bgColor && buf.pixels.length >= 3) {
        bgColor = [buf.pixels[0], buf.pixels[1], buf.pixels[2]];
      }
      bufferReady = true;
    };

    const isBackground = (r: number, g: number, b: number): boolean => {
      if (!bgColor) return false;
      const dr = Math.abs(r - bgColor[0]);
      const dg = Math.abs(g - bgColor[1]);
      const db = Math.abs(b - bgColor[2]);
      return dr + dg + db < 40;
    };

    // Precompute drawable cells once after image loads.
    let cells: Array<{ x: number; y: number; r: number; g: number; b: number; n: number }> = [];

    const precomputeCells = () => {
      if (!img || !buf) return;
      cells = [];
      for (let x = 0; x < img.width; x += STEP) {
        for (let y = 0; y < img.height; y += STEP) {
          const i = (y * pw + x) * 4;
          const a = buf.pixels[i + 3];
          if (a < 128) continue;
          const r = buf.pixels[i];
          const g = buf.pixels[i + 1];
          const b = buf.pixels[i + 2];
          if (isBackground(r, g, b)) continue;
          const n = p.noise(x * 0.05, y * 0.05);
          cells.push({ x, y, r, g, b, n });
        }
      }
    };

    const getCellColor = (r: number, g: number, b: number, n: number, t: number) => {
      const bright = (r + g + b) / 3;

      let pal: [number, number, number];

      if (bright < 80) {
        pal = PALETTE[4];
      } else if (bright < 130) {
        const m = p.map(bright, 80, 130, 0, 1);
        pal = [
          p.lerp(PALETTE[4][0], PALETTE[2][0], m),
          p.lerp(PALETTE[4][1], PALETTE[2][1], m),
          p.lerp(PALETTE[4][2], PALETTE[2][2], m),
        ];
      } else if (bright < 190) {
        const base = n > 0.5 ? PALETTE[0] : PALETTE[5];
        const m = p.map(bright, 130, 190, 0, 1);
        pal = [
          p.lerp(PALETTE[2][0], base[0], m),
          p.lerp(PALETTE[2][1], base[1], m),
          p.lerp(PALETTE[2][2], base[2], m),
        ];
      } else {
        const m = p.map(bright, 190, 255, 0, 1);
        pal = [
          p.lerp(PALETTE[0][0], PALETTE[1][0], m),
          p.lerp(PALETTE[0][1], PALETTE[1][1], m),
          p.lerp(PALETTE[0][2], PALETTE[1][2], m),
        ];
      }

      const accent = PALETTE[3];
      const accentMix = n > 0.6 ? p.constrain(p.map(bright, 80, 200, 0.1, 0.35), 0.1, 0.35) : 0;

      const cycle = (p.sin(t * 0.02 + n * 30) + 1) / 2;
      const imgMix = 0.35;

      let cr = p.lerp(pal[0], bright, imgMix + cycle * 0.08);
      let cg = p.lerp(pal[1], bright, imgMix + cycle * 0.08);
      let cb = p.lerp(pal[2], bright, imgMix + cycle * 0.08);

      cr = p.lerp(cr, accent[0], accentMix);
      cg = p.lerp(cg, accent[1], accentMix);
      cb = p.lerp(cb, accent[2], accentMix);

      const alpha = p.map(bright, 25, 220, 180, 255);
      return [cr, cg, cb, alpha] as const;
    };

    pp.setup = () => {
      if (!container.style.position) container.style.position = 'relative';
      if (!container.style.width) container.style.width = '100%';
      if (!container.style.height) container.style.height = '100%';

      const rect = container.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));

      p.pixelDensity(1);

      const renderer = p.createCanvas(w, h).parent(container);
      const canvas = renderer.elt as HTMLCanvasElement;
      canvas.style.display = 'block';
      canvas.style.width = '100%';
      canvas.style.height = '100%';

      p.textAlign(p.CENTER, p.CENTER);
      p.textFont('monospace');
      p.rectMode(p.CENTER);
      p.noiseSeed(42);
      p.frameRate(12);

      resizeObserver = new ResizeObserver(debounce(() => {
        if (!container.isConnected) return;
        applyCanvasSizeFromContainer();
      }, 150));
      resizeObserver.observe(container);

      p.loadImage(IMAGE_SRC, (loaded) => {
        img = loaded;
        ensureBuffer();
        precomputeCells();
        computeLayout();
      });
    };

    pp.windowResized = () => {
      applyCanvasSizeFromContainer();
    };

    pp.draw = () => {
      if (!img || cells.length === 0) return;

      if (TRANSPARENT_BG) {
        p.clear();
      } else {
        p.background(BG[0], BG[1], BG[2]);
      }

      const t = p.frameCount;

      for (let k = 0; k < cells.length; k++) {
        const c = cells[k];
        const { x, y, r, g, b, n } = c;
        const [cr, cg, cb, alpha] = getCellColor(r, g, b, n, t);

        const wobbleX = p.sin(t * 0.01 + n * 20) * 0.5;
        const wobbleY = p.cos(t * 0.008 + n * 20) * 0.3;
        const dx = cx + (x - img.width / 2) * sc + wobbleX;
        const dy = cy + (y - img.height / 2) * sc + wobbleY;
        const sz = STEP * sc * (0.8 + n * 0.2);

        if (n < 0.3) {
          const charIdx = Math.floor(n * 100 + t * 0.05) % CODE_CHARS.length;
          p.noStroke();
          p.fill(cr, cg, cb, alpha);
          p.textSize(sz * 1.1);
          p.text(CODE_CHARS[charIdx]!, dx, dy);
        } else if (n < 0.45) {
          p.noFill();
          p.stroke(cr, cg, cb, alpha);
          p.strokeWeight(0.8);
          p.rect(dx, dy, sz, sz);
        } else {
          p.noStroke();
          p.fill(cr, cg, cb, alpha);
          p.rect(dx, dy, sz, sz);
        }
      }
      p.noStroke();
    };

    pp.__rerender = () => {
      computeLayout();
    };

    pp.__disconnectResizeObserver = () => {
      resizeObserver?.disconnect();
      resizeObserver = undefined;
    };
  };

  return loadP5().then((mod) => {
    const P5 = mod.default;
    const instance = new P5(sketch);
    return {
      p5: instance,
      destroy: () => {
        (
          instance as unknown as { __disconnectResizeObserver?: () => void }
        ).__disconnectResizeObserver?.();
        instance.remove();
      },
      rerender: () => {
        (instance as any).__rerender?.();
      },
    };
  });
};
