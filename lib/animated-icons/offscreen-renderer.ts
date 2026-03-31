/**
 * Main-thread API for rendering icons in a Web Worker via OffscreenCanvas.
 * Falls back gracefully — call `isOffscreenSupported()` before using.
 */

export function isOffscreenSupported(): boolean {
  return (
    typeof OffscreenCanvas !== 'undefined' &&
    typeof HTMLCanvasElement.prototype.transferControlToOffscreen === 'function'
  );
}

// ── Shared worker singleton ─────────────────────────────────────────────────
let _worker: Worker | null = null;
let _nextId = 1;
const _callbacks = new Map<number, { onDone?: () => void; onError?: (err: string) => void }>();

function getWorker(): Worker {
  if (!_worker) {
    _worker = new Worker(new URL('./icon-worker.ts', import.meta.url));
    _worker.onmessage = (e: MessageEvent) => {
      const { type, id, error } = e.data;
      const cbs = _callbacks.get(id);
      if (!cbs) return;
      if (type === 'done') cbs.onDone?.();
      if (type === 'error') cbs.onError?.(error);
    };
  }
  return _worker;
}

// ── Public API ──────────────────────────────────────────────────────────────
export type OffscreenIconHandle = {
  resize: (w: number, h: number) => void;
  pause: () => void;
  resume: () => void;
  destroy: () => void;
};

/**
 * Renders an icon variant into `canvasEl` using an OffscreenCanvas in a worker.
 * Returns null if the canvas can't be transferred (e.g. already transferred).
 */
export function renderIconOffscreen(
  canvasEl: HTMLCanvasElement,
  variant: string,
  imageSrc: string,
  options?: Record<string, any>,
  callbacks?: { onDone?: () => void; onError?: (err: string) => void },
): OffscreenIconHandle | null {
  try {
    const offscreen = canvasEl.transferControlToOffscreen();
    const worker = getWorker();
    const id = _nextId++;

    if (callbacks) _callbacks.set(id, callbacks);

    const rect = canvasEl.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));

    worker.postMessage(
      { type: 'init', id, variant, imageSrc, width: w, height: h, options: options ?? {} },
      [offscreen],
    );

    return {
      resize(w: number, h: number) {
        worker.postMessage({ type: 'resize', id, width: w, height: h });
      },
      pause() {
        worker.postMessage({ type: 'pause', id });
      },
      resume() {
        worker.postMessage({ type: 'resume', id });
      },
      destroy() {
        worker.postMessage({ type: 'destroy', id });
        _callbacks.delete(id);
      },
    };
  } catch {
    return null;
  }
}
