import type p5 from 'p5';
import type { ImageVariant } from '@/lib/utils/path-forward.utils';
import { DEFAULT_SPEED_MULTIPLIER, VARIANT_CONFIG } from './variant-config';

export type PrincipleSketchOptions = {
  loop: boolean;
};

type Cell = {
  x: number;
  y: number;
  sz: number;
  n: number;
  r: number;
  g: number;
  b: number;
  scale: number;
  seed: number;
};

function fract(x: number) {
  return x - Math.floor(x);
}

function hash(x: number, y: number) {
  return fract(Math.abs(Math.sin(x * 127.1 + y * 311.7) * 43758.5453));
}

function noise2(x: number, y: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = fract(x);
  const fy = fract(y);
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash(ix, iy);
  const b = hash(ix + 1, iy);
  const c = hash(ix, iy + 1);
  const d = hash(ix + 1, iy + 1);
  return a + (b - a) * ux + (c - a) * uy + (d - b - c + a) * ux * uy;
}

function clamp(v: number, a: number, b: number) {
  return Math.max(a, Math.min(b, v));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function mapR(v: number, a: number, b: number, c: number, d: number) {
  return c + (d - c) * ((v - a) / (b - a));
}

function pickPaletteColor(palette: Array<[number, number, number]>, t: number) {
  const idx = Math.floor(clamp(t, 0, 0.999999) * palette.length);
  return palette[idx]!;
}

function getColor(bright: number, x: number, y: number, palette: Array<[number, number, number]>) {
  const s = clamp(mapR(bright, 100, 250, 0, 255), 0, 255);

  let cr: number;
  let cg: number;
  let cb: number;

  const p0 = palette[0] ?? [20, 40, 60];
  const p1 = palette[1] ?? [255, 140, 0];
  const p2 = palette[2] ?? [255, 250, 241];

  if (s < 60) {
    const m = s / 60;
    cr = lerp(20, p0[0], m);
    cg = lerp(40, p0[1], m);
    cb = lerp(60, p0[2], m);
  } else if (s < 120) {
    const m = mapR(s, 60, 120, 0, 1);
    cr = lerp(p0[0], p1[0], m);
    cg = lerp(p0[1], p1[1], m);
    cb = lerp(p0[2], p1[2], m);
  } else if (s < 200) {
    const m = mapR(s, 120, 200, 0, 1);
    cr = lerp(p1[0], p1[0] * 1.1, m);
    cg = lerp(p1[1], p1[1] * 0.9, m);
    cb = lerp(p1[2], p1[2] * 0.8, m);
  } else {
    const m = mapR(s, 200, 255, 0, 1);
    cr = lerp(p1[0], p2[0], m);
    cg = lerp(p1[1], p2[1], m);
    cb = lerp(p1[2], p2[2], m);
  }

  const n2 = noise2(x * 0.05, y * 0.05);
  const pMix = pickPaletteColor(palette, n2);
  return [lerp(cr, pMix[0], 0.12), lerp(cg, pMix[1], 0.12), lerp(cb, pMix[2], 0.12)] as const;
}

function fitContain(srcW: number, srcH: number, dstW: number, dstH: number, pad = 0.95) {
  const sc = Math.min(dstW / srcW, dstH / srcH) * pad;
  const ox = (dstW - srcW * sc) / 2;
  const oy = (dstH - srcH * sc) / 2;
  return { sc, ox, oy };
}

export function createPrincipleSketch(
  variant: ImageVariant,
  assetUrl: string,
  options: PrincipleSketchOptions,
) {
  const cfg = VARIANT_CONFIG[variant];

  return (p: p5) => {
    let img: p5.Image | null = null;
    let cells: Cell[] = [];
    let rendered = 0;
    let ready = false;
    let setupDone = false;
    let phase: 'in' | 'out' = 'in';

    let targetW = 0;
    let targetH = 0;

    function clearBg() {
      if (cfg.bg === 'transparent') p.clear();
      else p.background(cfg.bg);
    }

    function rebuild() {
      if (!img || targetW <= 0 || targetH <= 0) return;

      const step = cfg.step;
      const g = p.createGraphics(img.width, img.height);
      g.pixelDensity(1);
      g.image(img, 0, 0, img.width, img.height);
      g.loadPixels();

      const { sc, ox, oy } = fitContain(img.width, img.height, targetW, targetH, 0.92);
      const csz = step * sc;

      const nextCells: Cell[] = [];
      for (let y = 0; y < img.height; y += step) {
        for (let x = 0; x < img.width; x += step) {
          const idx = 4 * (y * img.width + x);
          const r = g.pixels[idx] ?? 0;
          const gg = g.pixels[idx + 1] ?? 0;
          const b = g.pixels[idx + 2] ?? 0;
          const a = g.pixels[idx + 3] ?? 0;
          if (a < 128) continue;
          const bright = (r + gg + b) / 3;
          if (bright < 30) continue;

          const n = noise2(x * 0.05, y * 0.05);
          const [cr, cg, cb] = getColor(bright, x, y, cfg.palette);

          nextCells.push({
            x: ox + x * sc,
            y: oy + y * sc,
            sz: csz * (0.8 + n * 0.2),
            n,
            r: cr,
            g: cg,
            b: cb,
            scale: 0,
            seed: noise2(x * 0.11, y * 0.11),
          });
        }
      }

      // Shuffle for a more “reveal” look
      for (let i = nextCells.length - 1; i > 0; i--) {
        const j = Math.floor(p.random(i + 1));
        const tmp = nextCells[i]!;
        nextCells[i] = nextCells[j]!;
        nextCells[j] = tmp;
      }

      cells = nextCells;
      rendered = 0;
      phase = 'in';
      clearBg();
      p.loop();
    }

    function drawCell(c: Cell) {
      const sz = c.sz * c.scale;
      const alpha = clamp(c.scale, 0, 1);
      const jitter = (c.seed - 0.5) * cfg.jitter * sz;
      const x = c.x + jitter;
      const y = c.y - jitter;

      const rr = Math.floor(c.r);
      const gg = Math.floor(c.g);
      const bb = Math.floor(c.b);

      const mode = cfg.mode;
      const n = c.n;

      if (mode === 'glyph' || (mode === 'mixed' && n < 0.38)) {
        p.noStroke();
        p.fill(rr, gg, bb, 255 * alpha);
        p.textAlign(p.CENTER, p.CENTER);
        p.textFont('monospace');
        p.textSize(sz * 1.12);
        const ch = cfg.chars[Math.floor(n * 100) % cfg.chars.length] ?? '■';
        p.text(ch, x, y);
        return;
      }

      if (mode === 'strokeRect' || (mode === 'mixed' && n < 0.56)) {
        p.noFill();
        p.stroke(rr, gg, bb, 255 * alpha);
        p.strokeWeight(0.9);
        p.rectMode(p.CENTER);
        p.square(x, y, sz);
        return;
      }

      if (mode === 'lines') {
        p.noFill();
        p.stroke(rr, gg, bb, 255 * alpha);
        p.strokeWeight(1);
        const ang = (n * Math.PI * 2) % (Math.PI * 2);
        const dx = Math.cos(ang) * (sz * 0.65);
        const dy = Math.sin(ang) * (sz * 0.65);
        p.line(x - dx, y - dy, x + dx, y + dy);
        if (c.seed > 0.65) {
          p.line(x - dy * 0.6, y + dx * 0.6, x + dy * 0.6, y - dx * 0.6);
        }
        return;
      }

      // solidRect (or mixed fallback)
      p.noStroke();
      p.fill(rr, gg, bb, 255 * alpha);
      p.rectMode(p.CENTER);
      p.square(x, y, sz);
    }

    p.setup = () => {
      p.pixelDensity(1);
      p.createCanvas(10, 10);
      p.noSmooth();
      clearBg();
      setupDone = true;

      if (targetW > 0 && targetH > 0) {
        p.resizeCanvas(targetW, targetH);
        clearBg();
        ready = true;
      }

      p.loadImage(
        assetUrl,
        (loaded) => {
          img = loaded;
          rebuild();
        },
        () => {
          img = null;
          cells = [];
          p.noLoop();
        },
      );
    };

    p.draw = () => {
      if (!img) return;
      if (!ready) return;
      if (cells.length === 0) {
        p.noLoop();
        return;
      }

      const batch = Math.max(1, Math.round(cfg.batch * DEFAULT_SPEED_MULTIPLIER));
      const grow = cfg.growStep * DEFAULT_SPEED_MULTIPLIER;

      if (!options.loop) {
        const end = Math.min(rendered + batch, cells.length);
        for (let i = rendered; i < end; i++) {
          cells[i]!.scale = Math.max(0.01, cells[i]!.scale);
        }
        rendered = end;

        const tail = Math.max(0, rendered - batch * 12);
        for (let i = tail; i < rendered; i++) {
          const c = cells[i]!;
          if (c.scale < 1) {
            c.scale = Math.min(1, c.scale + grow);
            drawCell(c);
          }
        }

        if (rendered >= cells.length) {
          let done = true;
          for (const c of cells) {
            if (c.scale < 1) {
              c.scale = Math.min(1, c.scale + grow);
              drawCell(c);
              done = false;
            }
          }
          if (done) p.noLoop();
        }
        return;
      }

      // Loop mode: we redraw each frame so we can also “unpaint”
      clearBg();

      if (phase === 'in') {
        const end = Math.min(rendered + batch, cells.length);
        for (let i = rendered; i < end; i++) cells[i]!.scale = Math.max(0.01, cells[i]!.scale);
        rendered = end;

        for (let i = 0; i < rendered; i++) {
          const c = cells[i]!;
          if (c.scale < 1) c.scale = Math.min(1, c.scale + grow);
          drawCell(c);
        }

        if (rendered >= cells.length) {
          let allFull = true;
          for (const c of cells) {
            if (c.scale < 1) {
              allFull = false;
              break;
            }
          }
          if (allFull) phase = 'out';
        }
        return;
      }

      // phase === 'out'
      const start = Math.max(0, rendered - batch);
      for (let i = start; i < rendered; i++) {
        const c = cells[i]!;
        c.scale = Math.max(0, c.scale - grow);
      }
      rendered = Math.max(0, rendered - batch);

      let anyVisible = false;
      for (const c of cells) {
        if (c.scale > 0) {
          anyVisible = true;
          drawCell(c);
        }
      }

      if (!anyVisible) {
        // restart
        for (const c of cells) c.scale = 0;
        rendered = 0;
        phase = 'in';
      }
    };

    (p as unknown as { __setSize?: (w: number, h: number) => void }).__setSize = (w, h) => {
      const ww = Math.max(1, Math.floor(w));
      const hh = Math.max(1, Math.floor(h));
      if (ww === targetW && hh === targetH) return;

      targetW = ww;
      targetH = hh;
      if (!setupDone) return;

      p.resizeCanvas(targetW, targetH);
      clearBg();
      ready = true;
      rebuild();
    };
  };
}
