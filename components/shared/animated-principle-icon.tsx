'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { ImageVariant } from '@/lib/utils/path-forward.utils';
import { createPrincipleSketch } from '@/lib/animated-icons/sketch';
import { DEFAULT_LOOP_ANIMATION } from '@/lib/animated-icons/variant-config';

type AnimatedPrincipleIconProps = {
  variant: ImageVariant;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
  paused?: boolean;
  loop?: boolean;
};

export function AnimatedPrincipleIcon({
  variant,
  className,
  style,
  alt,
  paused = false,
  loop = DEFAULT_LOOP_ANIMATION,
}: AnimatedPrincipleIconProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const p5Ref = useRef<unknown | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);
  const [mounted, setMounted] = useState(false);

  const assetUrl = useMemo(() => `/${variant}.png`, [variant]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!hostRef.current) return;

    let cancelled = false;

    async function boot() {
      const mod = await import('p5');
      if (cancelled) return;

      const P5 = mod.default;

      // Destroy previous instance on variant changes
      if (
        p5Ref.current &&
        typeof (p5Ref.current as { remove?: () => void }).remove === 'function'
      ) {
        (p5Ref.current as { remove: () => void }).remove();
      }

      const sketch = createPrincipleSketch(variant, assetUrl, { loop });
      const instance = new P5(sketch, hostRef.current!);
      p5Ref.current = instance;

      const setSize = (w: number, h: number) => {
        const fn = (instance as unknown as { __setSize?: (ww: number, hh: number) => void })
          .__setSize;
        fn?.(w, h);
      };

      roRef.current?.disconnect();
      roRef.current = new ResizeObserver((entries) => {
        const rect = entries[0]?.contentRect;
        if (!rect) return;
        setSize(rect.width, rect.height);
      });
      roRef.current.observe(hostRef.current!);

      const rect = hostRef.current!.getBoundingClientRect();
      setSize(rect.width, rect.height);
    }

    void boot();

    return () => {
      cancelled = true;
    };
  }, [mounted, variant, assetUrl, loop]);

  useEffect(() => {
    const inst = p5Ref.current as null | { noLoop?: () => void; loop?: () => void };
    if (!inst) return;
    if (paused) inst.noLoop?.();
    else inst.loop?.();
  }, [paused]);

  useEffect(() => {
    return () => {
      roRef.current?.disconnect();
      roRef.current = null;
      const inst = p5Ref.current as null | { remove?: () => void };
      inst?.remove?.();
      p5Ref.current = null;
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className={className}
      style={style}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
    />
  );
}
