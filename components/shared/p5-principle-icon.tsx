'use client';

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ImageVariant } from '@/lib/utils/path-forward.utils';
import type {
  RenderBrainIconHandle,
  RenderBrainIconOptions,
  RenderGlassIconHandle,
  RenderGlassIconOptions,
  RenderMissileIconHandle,
  RenderMissileIconOptions,
  RenderJusticeIconHandle,
  RenderJusticeIconOptions,
  RenderRobotIconHandle,
  RenderRobotIconOptions,
  RenderRulesIconHandle,
  RenderRulesIconOptions,
  RenderPieIconOptions,
} from '@/lib/animated-icons/icons';
import {
  renderBrainIcon,
  renderGlassIcon,
  renderJusticeIcon,
  renderMissileIcon,
  renderPieIcon,
  renderRobotIcon,
  renderRulesIcon,
} from '@/lib/animated-icons/icons';
import {
  isOffscreenSupported,
  renderIconOffscreen,
  type OffscreenIconHandle,
} from '@/lib/animated-icons/offscreen-renderer';

type P5PrincipleIconProps = {
  variant?: ImageVariant;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
  /** Boot only after it enters viewport. Defaults to true. */
  bootOnViewport?: boolean;
  /** Delay before booting (helps when parent has fade-in). Defaults to 150ms. */
  bootDelayMs?: number;
  /**
   * Optionally override the image src. By default we use `/${variant}.jpg`.
   * Must live in `public/`.
   */
  imageSrc?: string;
  /** For advanced tuning per renderer. */
  rulesOptions?: Omit<RenderRulesIconOptions, 'imageSrc'>;
  brainOptions?: Omit<RenderBrainIconOptions, 'imageSrc'>;
  robotOptions?: Omit<RenderRobotIconOptions, 'imageSrc'>;
  missileOptions?: Omit<RenderMissileIconOptions, 'imageSrc'>;
  glassOptions?: Omit<RenderGlassIconOptions, 'imageSrc'>;
  justiceOptions?: Omit<RenderJusticeIconOptions, 'imageSrc'>;
  pieOptions?: Omit<RenderPieIconOptions, 'imageSrc'>;
};

/** Unified handle that works for both p5 and offscreen renderers. */
type IconHandle = {
  pause: () => void;
  resume: () => void;
  destroy: () => void;
};

/** Resolve the image source for a given variant. */
function resolveImageSrc(variant: ImageVariant, imageSrc?: string): string {
  if (imageSrc) return imageSrc;
  if (variant === 'glass' || variant === 'justice' || variant === 'pie' || variant === 'missile' || variant === 'robot') {
    return `/${variant}.jpg`;
  }
  return `/${variant}.png`;
}

/** Get the variant-specific options object. */
function getVariantOptions(
  variant: ImageVariant,
  props: P5PrincipleIconProps,
): Record<string, any> | undefined {
  switch (variant) {
    case 'rules': return props.rulesOptions;
    case 'brain': return props.brainOptions;
    case 'robot': return props.robotOptions;
    case 'missile': return props.missileOptions;
    case 'glass': return props.glassOptions;
    case 'justice': return props.justiceOptions;
    case 'pie': return props.pieOptions;
    default: return undefined;
  }
}

// Check once at module level (avoids per-render checks).
// TODO: enable once the worker bundling is verified in dev + prod.
// Set to `true` to test the OffscreenCanvas path.
const ENABLE_OFFSCREEN = false;
let _offscreenOk: boolean | null = null;
function canUseOffscreen(): boolean {
  if (!ENABLE_OFFSCREEN) return false;
  if (_offscreenOk == null) _offscreenOk = isOffscreenSupported();
  return _offscreenOk;
}

export function P5PrincipleIcon(props: P5PrincipleIconProps) {
  const {
    variant,
    className,
    style,
    alt,
    bootOnViewport = true,
    bootDelayMs = 150,
    imageSrc,
    rulesOptions,
    brainOptions,
    pieOptions,
    robotOptions,
    missileOptions,
    glassOptions,
    justiceOptions,
  } = props;

  const hostRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const handleRef = useRef<IconHandle | null>(null);
  const bootTokenRef = useRef(0);
  const ioRef = useRef<IntersectionObserver | null>(null);
  const bootTimerRef = useRef<number | null>(null);
  const hasBootedRef = useRef(false);
  const resizeObsRef = useRef<ResizeObserver | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldBoot, setShouldBoot] = useState(!bootOnViewport);

  const resolvedSrc = useMemo(() => {
    if (!variant) return undefined;
    return resolveImageSrc(variant, imageSrc);
  }, [variant, imageSrc]);

  const hostCallbackRef = useCallback(
    (node: HTMLDivElement | null) => {
      hostRef.current = node;
      ioRef.current?.disconnect();
      ioRef.current = null;
      if (!node || !bootOnViewport) return;

      ioRef.current = new IntersectionObserver(
        ([entry]) => {
          if (!entry) return;
          // Consider visible only when a decent portion of the icon is on screen.
          const visible = entry.isIntersecting && entry.intersectionRatio >= 0.4;
          setIsVisible(visible);
          if (visible) {
            setShouldBoot(true);
            // We only need the first "real" visibility to boot + handle pause/resume.
            // After that, we can stop observing to avoid flaky early triggers.
            if (ioRef.current && node) {
              ioRef.current.unobserve(node);
            }
          }
        },
        {
          // No positive rootMargin so it does NOT trigger before entering viewport.
          rootMargin: '0px',
          // Require at least ~40% of the element to be visible.
          threshold: [0.4, 0.6, 0.9],
        },
      );
      ioRef.current.observe(node);
    },
    [bootOnViewport],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      ioRef.current?.disconnect();
      ioRef.current = null;
      resizeObsRef.current?.disconnect();
      resizeObsRef.current = null;
      if (bootTimerRef.current != null) {
        window.clearTimeout(bootTimerRef.current);
        bootTimerRef.current = null;
      }
      handleRef.current?.destroy();
      handleRef.current = null;
    };
  }, []);

  // Boot once (optionally delayed) after first visibility.
  useEffect(() => {
    const host = hostRef.current;
    if (!host || !variant || !resolvedSrc) return;
    if (!shouldBoot || hasBootedRef.current) return;

    hasBootedRef.current = true;
    const token = ++bootTokenRef.current;

    if (bootTimerRef.current != null) window.clearTimeout(bootTimerRef.current);
    bootTimerRef.current = window.setTimeout(() => {
      const liveHost = hostRef.current;
      if (!liveHost) return;

      // Cleanup previous instance
      handleRef.current?.destroy();
      handleRef.current = null;
      resizeObsRef.current?.disconnect();
      resizeObsRef.current = null;

      const opts = getVariantOptions(variant, props) ?? {};

      // ── Try OffscreenCanvas path ──────────────────────────────────────
      if (canUseOffscreen()) {
        // Create a <canvas> element inside the host div
        const canvas = document.createElement('canvas');
        canvas.style.display = 'block';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        // Remove any previous canvas
        if (canvasRef.current?.parentElement === liveHost) {
          liveHost.removeChild(canvasRef.current);
        }
        liveHost.appendChild(canvas);
        canvasRef.current = canvas;

        const offHandle = renderIconOffscreen(canvas, variant, resolvedSrc, opts);
        if (offHandle) {
          // Debounced resize
          let resizeTimer: ReturnType<typeof setTimeout> | undefined;
          const ro = new ResizeObserver(() => {
            if (!liveHost.isConnected) return;
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
              const r = liveHost.getBoundingClientRect();
              offHandle.resize(Math.max(1, Math.round(r.width)), Math.max(1, Math.round(r.height)));
            }, 150);
          });
          ro.observe(liveHost);
          resizeObsRef.current = ro;

          handleRef.current = {
            pause: () => offHandle.pause(),
            resume: () => offHandle.resume(),
            destroy: () => {
              offHandle.destroy();
              ro.disconnect();
              if (canvas.parentElement) canvas.parentElement.removeChild(canvas);
            },
          };

          // Respect current visibility
          if (bootOnViewport && !isVisible) offHandle.pause();
          return;
        }
        // If offscreen failed (e.g. transferControlToOffscreen threw), remove canvas and fall through to p5
        if (canvas.parentElement) canvas.parentElement.removeChild(canvas);
      }

      // ── Fallback: p5 path ─────────────────────────────────────────────
      const boot =
        variant === 'brain'
          ? renderBrainIcon(liveHost, { imageSrc: resolvedSrc, ...brainOptions })
          : variant === 'justice'
            ? renderJusticeIcon(liveHost, { imageSrc: resolvedSrc, ...justiceOptions })
            : variant === 'glass'
              ? renderGlassIcon(liveHost, { imageSrc: resolvedSrc, ...glassOptions })
              : variant === 'robot'
                ? renderRobotIcon(liveHost, { imageSrc: resolvedSrc, ...robotOptions })
                : variant === 'missile'
                  ? renderMissileIcon(liveHost, { imageSrc: resolvedSrc, ...missileOptions })
                  : variant === 'pie'
                    ? renderPieIcon(liveHost, { imageSrc: resolvedSrc, ...pieOptions })
                    : renderRulesIcon(liveHost, { imageSrc: resolvedSrc, ...rulesOptions });

      void boot.then((h) => {
        if (bootTokenRef.current !== token) {
          h.destroy();
          return;
        }
        handleRef.current = {
          pause: () => (h.p5 as any)?.noLoop?.(),
          resume: () => (h.p5 as any)?.loop?.(),
          destroy: () => h.destroy(),
        };
        if (bootOnViewport && !isVisible) (h.p5 as any)?.noLoop?.();
      });
    }, Math.max(0, bootDelayMs));

    return () => {
      if (bootTimerRef.current != null) {
        window.clearTimeout(bootTimerRef.current);
        bootTimerRef.current = null;
      }
    };
  }, [
    shouldBoot,
    bootDelayMs,
    variant,
    resolvedSrc,
    rulesOptions,
    brainOptions,
    robotOptions,
    missileOptions,
    glassOptions,
    bootOnViewport,
    isVisible,
  ]);

  // Pause/resume on visibility changes (doesn't re-boot).
  useEffect(() => {
    if (!bootOnViewport) return;
    const h = handleRef.current;
    if (!h) return;
    if (!isVisible) h.pause();
    else h.resume();
  }, [bootOnViewport, isVisible]);

  // If variant changes, allow a new boot.
  useEffect(() => {
    hasBootedRef.current = false;
    setShouldBoot(!bootOnViewport);
    bootTokenRef.current += 1;
  }, [variant, resolvedSrc, bootOnViewport]);

  if (!variant) return null;

  return (
    <div
      ref={hostCallbackRef}
      className={className}
      style={style}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
    />
  );
}
