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

export function P5PrincipleIcon({
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
}: P5PrincipleIconProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const handleRef = useRef<
    | RenderRulesIconHandle
    | RenderBrainIconHandle
    | RenderGlassIconHandle
    | RenderRobotIconHandle
    | RenderJusticeIconHandle
    | RenderMissileIconHandle
    | null
  >(null);
  const bootTokenRef = useRef(0);
  const ioRef = useRef<IntersectionObserver | null>(null);
  const bootTimerRef = useRef<number | null>(null);
  const hasBootedRef = useRef(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldBoot, setShouldBoot] = useState(!bootOnViewport);

  const resolvedSrc = useMemo(() => {
    if (!variant) return undefined;
    if (imageSrc) return imageSrc;

    // missile/robot use animated GIFs; others use PNG.
    // if (variant === 'missile' || variant === 'robot') {
    //   return `/${variant}.gif`;
    // }

    if (variant === 'glass' || variant === 'justice' || variant === 'pie' || variant === 'missile' || variant === 'robot') {
      return `/${variant}.jpg`;
    }

    return `/${variant}.png`;
  }, [variant, imageSrc]);

  const hostCallbackRef = useCallback(
    (node: HTMLDivElement | null) => {
      hostRef.current = node;
      ioRef.current?.disconnect();
      ioRef.current = null;
      if (!node || !bootOnViewport) return;

      ioRef.current = new IntersectionObserver(
        ([entry]) => {
          const visible = !!entry?.isIntersecting;
          setIsVisible(visible);
          if (visible) setShouldBoot(true);
        },
        { rootMargin: '200px' },
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
      // If something changed while we were waiting, bail out.
      const liveHost = hostRef.current;
      if (!liveHost) return;

      // Cleanup any previous instance before creating a new one.
      handleRef.current?.destroy();
      handleRef.current = null;

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
        // If a newer boot started, destroy immediately.
        if (bootTokenRef.current !== token) {
          h.destroy();
          return;
        }
        handleRef.current = h;
        // Respect current visibility right away.
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
    const inst = handleRef.current?.p5 as null | { noLoop?: () => void; loop?: () => void };
    if (!inst) return;
    if (!isVisible) inst.noLoop?.();
    else inst.loop?.();
  }, [bootOnViewport, isVisible]);

  // If variant changes, allow a new boot.
  useEffect(() => {
    hasBootedRef.current = false;
    setShouldBoot(!bootOnViewport);
    // Invalidate any in-flight boot.
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

