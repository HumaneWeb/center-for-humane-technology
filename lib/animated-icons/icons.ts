import type p5 from 'p5';

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
  const CELLS_PER_FRAME = opts.cellsPerFrame ?? 800;
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

      resizeObserver = new ResizeObserver(() => {
        if (!container.isConnected) return;
        applyCanvasSizeFromContainer();
      });
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
        if (renderY >= img.height) rendered = true;
        return;
      }

      const end = Math.min(cellIndex + CELLS_PER_FRAME, cells.length);
      for (let k = cellIndex; k < end; k++) {
        const c = cells[k]!;
        drawOne(c[0], c[1]);
      }
      cellIndex = end;
      if (cellIndex >= cells.length) rendered = true;
    };

    pp.__rerender = () => {
      computeLayout();
      clearAndReset();
    };

    pp.__disconnectResizeObserver = () => {
      resizeObserver?.disconnect();
      resizeObserver = undefined;
    };
  };

  return import('p5').then((mod) => {
    const P5 = mod.default;
    const instance = new P5(sketch);
    return {
      p5: instance,
      destroy: () => {
        (instance as unknown as { __disconnectResizeObserver?: () => void }).__disconnectResizeObserver?.();
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
  const CELLS_PER_FRAME = opts.cellsPerFrame ?? 800;
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

      resizeObserver = new ResizeObserver(() => {
        if (!container.isConnected) return;
        applyCanvasSizeFromContainer();
      });
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
        if (renderY >= img.height) rendered = true;
        return;
      }

      const end = Math.min(cellIndex + CELLS_PER_FRAME, cells.length);
      for (let k = cellIndex; k < end; k++) {
        const c = cells[k]!;
        drawOne(c[0], c[1]);
      }
      cellIndex = end;
      if (cellIndex >= cells.length) rendered = true;
    };

    pp.__rerender = () => {
      computeLayout();
      clearAndReset();
    };

    pp.__disconnectResizeObserver = () => {
      resizeObserver?.disconnect();
      resizeObserver = undefined;
    };
  };

  return import('p5').then((mod) => {
    const P5 = mod.default;
    const instance = new P5(sketch);
    return {
      p5: instance,
      destroy: () => {
        (instance as unknown as { __disconnectResizeObserver?: () => void }).__disconnectResizeObserver?.();
        instance.remove();
      },
      rerender: () => {
        (instance as any).__rerender?.();
      },
    };
  });
};
