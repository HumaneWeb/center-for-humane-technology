/// <reference lib="webworker" />
import { noise, noiseSeed, seededRandom } from './perlin';

// ── Math helpers ────────────────────────────────────────────────────────────
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const map = (v: number, a1: number, b1: number, a2: number, b2: number) =>
  a2 + ((v - a1) / (b1 - a1)) * (b2 - a2);
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

// ── Types ───────────────────────────────────────────────────────────────────
type RGB = [number, number, number];
type RGBA = [number, number, number, number];

interface Cell {
  x: number;
  y: number;
  r: number;
  g: number;
  b: number;
  n: number;
}

interface Instance {
  id: number;
  canvas: OffscreenCanvas;
  ctx: OffscreenCanvasRenderingContext2D;
  variant: string;
  // image data
  imgW: number;
  imgH: number;
  cells: Cell[];
  // layout
  sc: number;
  cx: number;
  cy: number;
  cellSz: number;
  step: number;
  fit: number;
  // animation
  frameCount: number;
  cellIdx: number;
  done: boolean;
  paused: boolean;
  frameInterval: number;
  timerId: number | null;
  // options
  transparent: boolean;
  bg: RGB;
  animated: boolean;
  cellsPerFrame: number;
  palette: RGB[];
  chars: string[];
  font: string;
  textN: number;
  strokeN: number;
  brightMin: number;
  wobble: [number, number, number, number] | null; // xFreq, yFreq, xAmp, yAmp
  paintBgCells: boolean;
  bgColor: RGB | null; // detected background (missile)
  getColor: (cell: Cell, t: number, inst: Instance) => RGBA;
}

// ── Active instances ────────────────────────────────────────────────────────
const instances = new Map<number, Instance>();
let tickTimer: number | null = null;

function startTick() {
  if (tickTimer != null) return;
  tickTimer = self.setInterval(tick, 8) as unknown as number; // ~120 Hz poll
}

function stopTick() {
  if (tickTimer == null) return;
  self.clearInterval(tickTimer);
  tickTimer = null;
}

function tick() {
  const now = performance.now();
  let anyActive = false;
  for (const inst of instances.values()) {
    if (inst.paused || inst.done) continue;
    anyActive = true;
    const elapsed = now - (inst as any)._lastTick;
    if (elapsed < inst.frameInterval) continue;
    (inst as any)._lastTick = now;
    renderFrame(inst);
  }
  if (!anyActive) stopTick();
}

// ── Shared chars ────────────────────────────────────────────────────────────
const STANDARD_CHARS = ['■','□','▪','◼','○','◎','△','◇','/','\\','[',']','+','×','#','Z','X'];

const CODE_CHARS = [
  '{','}','(',')','[',']','<','>','<<','>>','{{','}}',';',':','=','!','&','|','+','-','/','*',
  '#','@','$','%','^','~','=>','!=','==','&&','||','+=','-=','::','...','0','1','0','1','00',
  '01','10','11','if','fn','do','AI','ml','nn','go','run','end','var','let','def','for','int',
  'new','nil','err','sys','api','get','set','log','.',',','_','\\','`','"',"'",'?','¬','÷',
  '±','∞','⟨','⟩','⌐','⌊','⌋','⎡','⎤','█','▓','░','◆','◇','●','○','▪','□','△','▽',
];

// ── Palettes ────────────────────────────────────────────────────────────────
const PALETTES: Record<string, RGB[]> = {
  rules:   [[30,180,100],[255,140,0],[255,250,241],[0,200,220]],
  brain:   [[30,180,100],[255,140,0],[255,250,241],[0,200,220]],
  justice: [[28,140,132],[233,163,90],[252,246,236],[120,204,198]],
  glass:   [[8,144,110],[13,184,160],[58,232,200],[26,110,168],[91,184,240],[200,120,32],[232,160,48],[240,192,96],[232,245,240]],
  pie:     [[53,148,139],[228,151,79],[243,206,110],[250,245,236]],
  robot:   [[56,154,116],[255,169,83],[255,250,241],[35,30,73]],
  missile: [[232,137,42],[245,168,64],[61,184,122],[109,212,126],[42,138,80],[139,168,48],[212,192,96]],
};

// ── Per-variant color functions ─────────────────────────────────────────────
function rulesColor(c: Cell, _t: number, inst: Instance): RGBA {
  const P = inst.palette;
  const bright = (c.r + c.g + c.b) / 3;
  const s = clamp(map(bright, 100, 250, 0, 255), 0, 255);
  let cr: number, cg: number, cb: number;
  if (s < 60) { const m = s/60; cr=lerp(20,P[0][0],m); cg=lerp(40,P[0][1],m); cb=lerp(60,P[0][2],m); }
  else if (s < 120) { const m=map(s,60,120,0,1); cr=lerp(P[0][0],P[1][0],m); cg=lerp(P[0][1],P[1][1],m); cb=lerp(P[0][2],P[1][2],m); }
  else if (s < 200) { const m=map(s,120,200,0,1); cr=lerp(P[1][0],P[1][0]*1.1,m); cg=lerp(P[1][1],P[1][1]*0.9,m); cb=lerp(P[1][2],P[1][2]*0.8,m); }
  else { const m=map(s,200,255,0,1); cr=lerp(P[1][0],P[2][0],m); cg=lerp(P[1][1],P[2][1],m); cb=lerp(P[1][2],P[2][2],m); }
  const p2=P[Math.floor(c.n*P.length)]; cr=lerp(cr,p2[0],0.12); cg=lerp(cg,p2[1],0.12); cb=lerp(cb,p2[2],0.12);
  return [cr,cg,cb,255];
}

function brainColor(c: Cell, _t: number, inst: Instance): RGBA {
  const P = inst.palette;
  const bright = (c.r + c.g + c.b) / 3;
  const s = clamp(map(bright, 60, 250, 0, 255), 0, 255);
  let cr: number, cg: number, cb: number;
  if (s < 60) { const m=s/60; cr=lerp(20,P[3][0],m); cg=lerp(40,P[3][1],m); cb=lerp(60,P[3][2],m); }
  else if (s < 120) { const m=map(s,60,120,0,1); cr=lerp(P[3][0],P[0][0],m); cg=lerp(P[3][1],P[0][1],m); cb=lerp(P[3][2],P[0][2],m); }
  else if (s < 200) { const m=map(s,120,200,0,1); cr=lerp(P[0][0],P[1][0],m); cg=lerp(P[0][1],P[1][1],m); cb=lerp(P[0][2],P[1][2],m); }
  else { const m=map(s,200,255,0,1); cr=lerp(P[1][0],P[2][0],m); cg=lerp(P[1][1],P[2][1],m); cb=lerp(P[1][2],P[2][2],m); }
  const p2=P[Math.floor(c.n*P.length)]; cr=lerp(cr,p2[0],0.12); cg=lerp(cg,p2[1],0.12); cb=lerp(cb,p2[2],0.12);
  return [cr,cg,cb,255];
}

function justiceColor(c: Cell, _t: number, inst: Instance): RGBA {
  const P = inst.palette;
  const bright = (c.r + c.g + c.b) / 3;
  const s = clamp(map(bright, 80, 245, 0, 255), 0, 255);
  let cr: number, cg: number, cb: number;
  if (s < 70) { const m=s/70; cr=lerp(10,P[0][0],m); cg=lerp(50,P[0][1],m); cb=lerp(60,P[0][2],m); }
  else if (s < 150) { const m=map(s,70,150,0,1); cr=lerp(P[0][0],P[1][0],m); cg=lerp(P[0][1],P[1][1],m); cb=lerp(P[0][2],P[1][2],m); }
  else if (s < 220) { const m=map(s,150,220,0,1); cr=lerp(P[1][0],P[1][0]*1.08,m); cg=lerp(P[1][1],P[1][1]*0.92,m); cb=lerp(P[1][2],P[1][2]*0.9,m); }
  else { const m=map(s,220,255,0,1); cr=lerp(P[1][0],P[2][0],m); cg=lerp(P[1][1],P[2][1],m); cb=lerp(P[1][2],P[2][2],m); }
  const a=P[3]; const st=0.12+c.n*0.06; cr=lerp(cr,a[0],st); cg=lerp(cg,a[1],st); cb=lerp(cb,a[2],st);
  return [cr,cg,cb,255];
}

function glassColor(c: Cell, _t: number, inst: Instance): RGBA {
  const P = inst.palette;
  const bright = (c.r + c.g + c.b) / 3;
  const s = clamp(map(bright, 70, 245, 0, 255), 0, 255);
  const isCold = c.n < 0.45;
  let cr: number, cg: number, cb: number;
  if (isCold) {
    if (s < 80) { const m=s/80; cr=lerp(5,P[0][0],m); cg=lerp(50,P[0][1],m); cb=lerp(60,P[0][2],m); }
    else if (s < 150) { const m=map(s,80,150,0,1); cr=lerp(P[0][0],P[1][0],m); cg=lerp(P[0][1],P[1][1],m); cb=lerp(P[0][2],P[1][2],m); }
    else if (s < 210) {
      const m=map(s,150,210,0,1);
      const mr=lerp(P[1][0],P[3][0],0.3), mg=lerp(P[1][1],P[3][1],0.3), mb=lerp(P[1][2],P[3][2],0.3);
      cr=lerp(mr,P[2][0],m); cg=lerp(mg,P[2][1],m); cb=lerp(mb,P[2][2],m);
    } else { const m=map(s,210,255,0,1); cr=lerp(P[2][0],P[8][0],m); cg=lerp(P[2][1],P[8][1],m); cb=lerp(P[2][2],P[8][2],m); }
  } else {
    if (s < 100) { const m=s/100; cr=lerp(80,P[5][0],m); cg=lerp(50,P[5][1],m); cb=lerp(10,P[5][2],m); }
    else if (s < 180) { const m=map(s,100,180,0,1); cr=lerp(P[5][0],P[6][0],m); cg=lerp(P[5][1],P[6][1],m); cb=lerp(P[5][2],P[6][2],m); }
    else { const m=map(s,180,255,0,1); cr=lerp(P[6][0],P[7][0],m); cg=lerp(P[6][1],P[7][1],m); cb=lerp(P[6][2],P[7][2],m); }
  }
  const sh=0.05+0.07*c.n; const ac=isCold?P[2]:P[4];
  cr=lerp(cr,ac[0],sh); cg=lerp(cg,ac[1],sh); cb=lerp(cb,ac[2],sh);
  return [cr,cg,cb,255];
}

function pieColor(c: Cell, _t: number, inst: Instance): RGBA {
  const P = inst.palette;
  const bright = (c.r + c.g + c.b) / 3;
  const s = clamp(map(bright, 70, 245, 0, 255), 0, 255);
  let cr: number, cg: number, cb: number;
  if (s < 80) { const m=s/80; cr=lerp(25,P[0][0],m); cg=lerp(80,P[0][1],m); cb=lerp(90,P[0][2],m); }
  else if (s < 150) { const m=map(s,80,150,0,1); cr=lerp(P[0][0],P[1][0],m); cg=lerp(P[0][1],P[1][1],m*0.9); cb=lerp(P[0][2],P[1][2],m*0.8); }
  else if (s < 210) { const m=map(s,150,210,0,1); cr=lerp(P[1][0],P[2][0],m); cg=lerp(P[1][1],P[2][1],m); cb=lerp(P[1][2],P[2][2],m); }
  else { const m=map(s,210,255,0,1); cr=lerp(P[2][0],P[3][0],m); cg=lerp(P[2][1],P[3][1],m); cb=lerp(P[2][2],P[3][2],m); }
  const ac=P[0]; const am=0.04+0.06*c.n;
  cr=lerp(cr,ac[0],am); cg=lerp(cg,ac[1],am); cb=lerp(cb,ac[2],am);
  return [cr,cg,cb,255];
}

function robotColor(c: Cell, t: number, inst: Instance): RGBA {
  const P = inst.palette;
  const bright = (c.r + c.g + c.b) / 3;
  let pal: RGB;
  if (bright < 80) { const m=map(bright,70,80,0,1); pal=[lerp(P[3][0],P[1][0],m),lerp(P[3][1],P[1][1],m),lerp(P[3][2],P[1][2],m)]; }
  else if (bright < 130) { const m=map(bright,80,130,0,1); pal=[lerp(P[1][0],P[0][0],m*0.4),lerp(P[1][1],P[0][1],m*0.4),lerp(P[1][2],P[0][2],m*0.4)]; }
  else if (bright < 180) { pal=P[1]; }
  else if (bright < 220) { const m=map(bright,180,220,0,1); pal=[lerp(P[1][0],P[2][0],m),lerp(P[1][1],P[2][1],m),lerp(P[1][2],P[2][2],m)]; }
  else { pal=P[2]; }
  const p2=P[Math.floor(c.n*P.length)]; const cy=(Math.sin(t*0.05+c.n*30)+1)/2;
  let cr=lerp(pal[0],p2[0],cy*0.25), cg=lerp(pal[1],p2[1],cy*0.25), cb=lerp(pal[2],p2[2],cy*0.25);
  cr*=0.85; cg*=0.85; cb*=0.85;
  return [cr,cg,cb,255];
}

function missileColor(c: Cell, t: number, inst: Instance): RGBA {
  const P = inst.palette;
  const bright = (c.r + c.g + c.b) / 3;
  let pal: RGB;
  if (bright < 80) { pal=P[4]; }
  else if (bright < 130) { const m=map(bright,80,130,0,1); pal=[lerp(P[4][0],P[2][0],m),lerp(P[4][1],P[2][1],m),lerp(P[4][2],P[2][2],m)]; }
  else if (bright < 190) { const base=c.n>0.5?P[0]:P[5]; const m=map(bright,130,190,0,1); pal=[lerp(P[2][0],base[0],m),lerp(P[2][1],base[1],m),lerp(P[2][2],base[2],m)]; }
  else { const m=map(bright,190,255,0,1); pal=[lerp(P[0][0],P[1][0],m),lerp(P[0][1],P[1][1],m),lerp(P[0][2],P[1][2],m)]; }
  const accent=P[3]; const am=c.n>0.6?clamp(map(bright,80,200,0.1,0.35),0.1,0.35):0;
  const cy=(Math.sin(t*0.02+c.n*30)+1)/2; const im=0.35;
  let cr=lerp(pal[0],bright,im+cy*0.08), cg=lerp(pal[1],bright,im+cy*0.08), cb=lerp(pal[2],bright,im+cy*0.08);
  cr=lerp(cr,accent[0],am); cg=lerp(cg,accent[1],am); cb=lerp(cb,accent[2],am);
  const alpha=map(bright,25,220,180,255);
  return [cr,cg,cb,alpha];
}

const COLOR_FNS: Record<string, (c: Cell, t: number, inst: Instance) => RGBA> = {
  rules: rulesColor, brain: brainColor, justice: justiceColor,
  glass: glassColor, pie: pieColor, robot: robotColor, missile: missileColor,
};

// ── Variant defaults ────────────────────────────────────────────────────────
interface VariantDefaults {
  step: number; fit: number; brightMin: number; textN: number; strokeN: number;
  animated: boolean; fps: number; wobble: [number,number,number,number] | null;
  cellsPerFrame: number; seed: number; font: string; paintBgCells: boolean; detectBg: boolean;
}

const DEFAULTS: Record<string, VariantDefaults> = {
  rules:   { step:8, fit:0.95, brightMin:30, textN:0.35, strokeN:0.5, animated:false, fps:60, wobble:null, cellsPerFrame:800, seed:42, font:'sans-serif', paintBgCells:false, detectBg:false },
  brain:   { step:5, fit:0.95, brightMin:25, textN:0.35, strokeN:0.5, animated:false, fps:60, wobble:null, cellsPerFrame:800, seed:42, font:'sans-serif', paintBgCells:true,  detectBg:false },
  justice: { step:6, fit:0.95, brightMin:35, textN:0.30, strokeN:0.5, animated:false, fps:60, wobble:null, cellsPerFrame:900, seed:101, font:'sans-serif', paintBgCells:false, detectBg:false },
  glass:   { step:6, fit:0.95, brightMin:35, textN:0.30, strokeN:0.5, animated:false, fps:60, wobble:null, cellsPerFrame:900, seed:73, font:'sans-serif', paintBgCells:false, detectBg:false },
  pie:     { step:6, fit:0.95, brightMin:35, textN:0.30, strokeN:0.5, animated:false, fps:60, wobble:null, cellsPerFrame:900, seed:137, font:'sans-serif', paintBgCells:false, detectBg:false },
  robot:   { step:5, fit:0.95, brightMin:70, textN:0.25, strokeN:0.45, animated:true, fps:12, wobble:[0.02,0.015,0.5,0.3], cellsPerFrame:0, seed:0, font:'sans-serif', paintBgCells:false, detectBg:false },
  missile: { step:4, fit:1.1,  brightMin:0,  textN:0.30, strokeN:0.45, animated:true, fps:12, wobble:[0.01,0.008,0.5,0.3], cellsPerFrame:0, seed:0, font:'monospace',  paintBgCells:false, detectBg:true  },
};

// ── Instance creation ───────────────────────────────────────────────────────
async function createInstance(
  id: number,
  canvas: OffscreenCanvas,
  variant: string,
  imageSrc: string,
  width: number,
  height: number,
  opts: Record<string, any>,
): Promise<Instance> {
  const def = DEFAULTS[variant];
  if (!def) throw new Error(`Unknown variant: ${variant}`);

  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const step = opts.step ?? def.step;
  const isMobile = width < 400; // heuristic
  const cellsPerFrame = opts.cellsPerFrame ?? (def.animated ? 0 : (isMobile ? Math.round(def.cellsPerFrame * 0.4) : def.cellsPerFrame));

  const inst: Instance = {
    id, canvas, ctx, variant,
    imgW: 0, imgH: 0, cells: [],
    sc: 1, cx: 0, cy: 0, cellSz: step,
    step, fit: opts.scale ?? def.fit,
    frameCount: 0, cellIdx: 0, done: false, paused: false,
    frameInterval: 1000 / (def.animated ? def.fps : 60),
    timerId: null,
    transparent: opts.transparentBackground ?? false,
    bg: opts.backgroundRgb ?? [240, 247, 247],
    animated: def.animated,
    cellsPerFrame,
    palette: PALETTES[variant],
    chars: variant === 'missile' ? CODE_CHARS : STANDARD_CHARS,
    font: def.font,
    textN: def.textN, strokeN: def.strokeN,
    brightMin: def.brightMin,
    wobble: def.wobble ?? null,
    paintBgCells: !opts.transparentBackground && (opts.paintBgCells ?? def.paintBgCells),
    bgColor: null,
    getColor: COLOR_FNS[variant],
  };

  // Load image
  const resp = await fetch(imageSrc);
  const blob = await resp.blob();
  const bitmap = await createImageBitmap(blob);

  // Read pixels
  const tmp = new OffscreenCanvas(bitmap.width, bitmap.height);
  const tmpCtx = tmp.getContext('2d')!;
  tmpCtx.drawImage(bitmap, 0, 0);
  const imgData = tmpCtx.getImageData(0, 0, bitmap.width, bitmap.height);
  const pixels = imgData.data;
  bitmap.close();

  inst.imgW = imgData.width;
  inst.imgH = imgData.height;

  // Detect background color (missile)
  if (def.detectBg && pixels.length >= 4) {
    inst.bgColor = [pixels[0], pixels[1], pixels[2]];
  }

  // Init noise with seed 42 (matching p5 setup)
  noiseSeed(42);

  // Precompute cells
  const pw = imgData.width;
  const cells: Cell[] = [];
  for (let y = 0; y < imgData.height; y += step) {
    for (let x = 0; x < imgData.width; x += step) {
      const i = (y * pw + x) * 4;
      const a = pixels[i + 3];
      if (a < 128) continue;
      const r = pixels[i], g = pixels[i + 1], b = pixels[i + 2];
      const bright = (r + g + b) / 3;
      if (bright < def.brightMin) continue;
      // missile: skip background
      if (inst.bgColor) {
        const dr = Math.abs(r - inst.bgColor[0]);
        const dg = Math.abs(g - inst.bgColor[1]);
        const db = Math.abs(b - inst.bgColor[2]);
        if (dr + dg + db < 40) continue;
      }
      const n = noise(x * 0.05, y * 0.05);
      cells.push({ x, y, r, g, b, n });
    }
  }

  // Shuffle for random reveal (static icons)
  if (!def.animated) {
    const reveal = opts.reveal ?? 'random';
    if (reveal === 'random') {
      const rnd = seededRandom(def.seed);
      for (let i = cells.length - 1; i > 0; i--) {
        const j = rnd(i + 1);
        const tmp = cells[i]; cells[i] = cells[j]; cells[j] = tmp;
      }
    }
  }

  inst.cells = cells;
  computeLayout(inst);
  clearCanvas(inst);

  (inst as any)._lastTick = performance.now();

  return inst;
}

// ── Layout ──────────────────────────────────────────────────────────────────
function computeLayout(inst: Instance) {
  const w = inst.canvas.width, h = inst.canvas.height;
  inst.cx = w / 2;
  inst.cy = h / 2;
  const pad = inst.step * 3;
  const ew = inst.imgW + inst.step + pad;
  const eh = inst.imgH + inst.step + pad;
  inst.sc = Math.min(w / ew, h / eh) * inst.fit;
  inst.cellSz = inst.step * inst.sc;
}

function clearCanvas(inst: Instance) {
  const { ctx, canvas, transparent, bg } = inst;
  if (transparent) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  } else {
    ctx.fillStyle = `rgb(${bg[0]},${bg[1]},${bg[2]})`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

// ── Drawing ─────────────────────────────────────────────────────────────────
function drawCell(inst: Instance, cell: Cell, t: number) {
  const { ctx, step, sc, cx, cy, imgW, imgH, cellSz, wobble, font } = inst;
  const [cr, cg, cb, alpha] = inst.getColor(cell, t, inst);

  let dx: number, dy: number;
  if (wobble) {
    dx = cx + (cell.x - imgW / 2) * sc + Math.sin(t * wobble[0] + cell.n * 20) * wobble[2];
    dy = cy + (cell.y - imgH / 2) * sc + Math.cos(t * wobble[1] + cell.n * 20) * wobble[3];
  } else {
    dx = cx + (cell.x + step / 2 - imgW / 2) * sc;
    dy = cy + (cell.y + step / 2 - imgH / 2) * sc;
  }

  const sz = cellSz * (0.8 + cell.n * 0.2);
  const rgba = `rgba(${cr | 0},${cg | 0},${cb | 0},${(alpha / 255).toFixed(3)})`;

  // Paint background cell (brain variant)
  if (inst.paintBgCells) {
    ctx.fillStyle = `rgb(${inst.bg[0]},${inst.bg[1]},${inst.bg[2]})`;
    ctx.fillRect(dx - cellSz / 2, dy - cellSz / 2, cellSz, cellSz);
  }

  if (cell.n < inst.textN) {
    ctx.fillStyle = rgba;
    ctx.font = `${sz * 1.1}px ${font}`;
    let charIdx: number;
    if (inst.variant === 'missile') {
      charIdx = Math.floor(cell.n * 100 + t * 0.05) % inst.chars.length;
    } else {
      charIdx = Math.floor(cell.n * 100) % inst.chars.length;
    }
    ctx.fillText(inst.chars[charIdx], dx, dy);
  } else if (cell.n < inst.strokeN) {
    ctx.strokeStyle = rgba;
    ctx.lineWidth = 0.8;
    ctx.strokeRect(dx - sz / 2, dy - sz / 2, sz, sz);
  } else {
    ctx.fillStyle = rgba;
    ctx.fillRect(dx - sz / 2, dy - sz / 2, sz, sz);
  }
}

function renderFrame(inst: Instance) {
  inst.frameCount++;
  const t = inst.frameCount;

  if (inst.animated) {
    // Animated: redraw all cells every frame
    clearCanvas(inst);
    for (let k = 0; k < inst.cells.length; k++) {
      drawCell(inst, inst.cells[k], t);
    }
  } else {
    // Static: progressive reveal
    if (inst.done) return;
    const end = Math.min(inst.cellIdx + inst.cellsPerFrame, inst.cells.length);
    for (let k = inst.cellIdx; k < end; k++) {
      drawCell(inst, inst.cells[k], t);
    }
    inst.cellIdx = end;
    if (inst.cellIdx >= inst.cells.length) {
      inst.done = true;
      self.postMessage({ type: 'done', id: inst.id });
    }
  }
}

// ── Message handler ─────────────────────────────────────────────────────────
self.onmessage = async (e: MessageEvent) => {
  const msg = e.data;
  switch (msg.type) {
    case 'init': {
      try {
        const inst = await createInstance(
          msg.id, msg.canvas, msg.variant, msg.imageSrc,
          msg.width, msg.height, msg.options ?? {},
        );
        instances.set(msg.id, inst);
        startTick();
        self.postMessage({ type: 'ready', id: msg.id });
      } catch (err) {
        self.postMessage({ type: 'error', id: msg.id, error: String(err) });
      }
      break;
    }
    case 'resize': {
      const inst = instances.get(msg.id);
      if (!inst) break;
      inst.canvas.width = msg.width;
      inst.canvas.height = msg.height;
      computeLayout(inst);
      // Re-render: for static icons, replay from scratch; for animated, next frame handles it
      if (!inst.animated) {
        inst.cellIdx = 0;
        inst.done = false;
        clearCanvas(inst);
        startTick();
      }
      break;
    }
    case 'pause': {
      const inst = instances.get(msg.id);
      if (inst) inst.paused = true;
      break;
    }
    case 'resume': {
      const inst = instances.get(msg.id);
      if (inst) { inst.paused = false; startTick(); }
      break;
    }
    case 'destroy': {
      const inst = instances.get(msg.id);
      if (inst) {
        inst.paused = true;
        inst.cells = [];
        instances.delete(msg.id);
      }
      if (instances.size === 0) stopTick();
      break;
    }
  }
};
