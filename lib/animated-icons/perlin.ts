/**
 * p5.js-compatible Perlin noise — standalone, no DOM dependency.
 * Safe to use in Web Workers.
 */

const PERLIN_YWRAPB = 4;
const PERLIN_YWRAP = 1 << PERLIN_YWRAPB;
const PERLIN_SIZE = 4095;
const OCTAVES = 4;
const FALLOFF = 0.5;

let _perlin: Float64Array | null = null;

const sc = (i: number) => 0.5 * (1 - Math.cos(i * Math.PI));

export function noiseSeed(seed: number): void {
  const m = 4294967296,
    a = 1664525,
    c = 1013904223;
  let z = seed >>> 0;
  _perlin = new Float64Array(PERLIN_SIZE + 1);
  for (let i = 0; i <= PERLIN_SIZE; i++) {
    z = (a * z + c) % m;
    _perlin[i] = z / m;
  }
}

export function noise(x: number, y: number = 0): number {
  if (!_perlin) noiseSeed(0);
  const p = _perlin!;
  if (x < 0) x = -x;
  if (y < 0) y = -y;
  let xi = Math.floor(x),
    yi = Math.floor(y);
  let xf = x - xi,
    yf = y - yi;
  let r = 0,
    ampl = 0.5;
  for (let o = 0; o < OCTAVES; o++) {
    const of_ = xi + (yi << PERLIN_YWRAPB);
    const rxf = sc(xf),
      ryf = sc(yf);
    let n1 = p[of_ & PERLIN_SIZE];
    n1 += rxf * (p[(of_ + 1) & PERLIN_SIZE] - n1);
    let n2 = p[(of_ + PERLIN_YWRAP) & PERLIN_SIZE];
    n2 += rxf * (p[(of_ + PERLIN_YWRAP + 1) & PERLIN_SIZE] - n2);
    n1 += ryf * (n2 - n1);
    r += n1 * ampl;
    ampl *= FALLOFF;
    xi <<= 1;
    xf *= 2;
    yi <<= 1;
    yf *= 2;
    if (xf >= 1) {
      xi++;
      xf--;
    }
    if (yf >= 1) {
      yi++;
      yf--;
    }
  }
  return r;
}

/** p5-compatible seeded random (LCG). Returns a function that yields ints in [0, max). */
export function seededRandom(seed: number): (max: number) => number {
  const m = 4294967296,
    a = 1664525,
    c = 1013904223;
  let z = seed >>> 0;
  return (max) => {
    z = (a * z + c) % m;
    return Math.floor((z / m) * max);
  };
}
