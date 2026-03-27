'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import type { ImageVariant } from '@/lib/utils/path-forward.utils';
import { ENABLE_ANIMATED_PRINCIPLE_ICONS } from '@/lib/animated-icons/flags';

const Animated = dynamic(
  () => import('@/components/shared/animated-principle-icon').then((m) => m.AnimatedPrincipleIcon),
  { ssr: false },
);

type PrincipleIconProps = {
  variant?: ImageVariant;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  summarySrc?: string;
  detailSrc?: string;
  kind: 'summary' | 'detail';
};

export function PrincipleIcon({
  variant,
  alt,
  className,
  style,
  summarySrc,
  detailSrc,
  kind,
}: PrincipleIconProps) {
  const staticSrc = kind === 'detail' ? detailSrc : summarySrc;

  if (!ENABLE_ANIMATED_PRINCIPLE_ICONS || !variant) {
    return staticSrc ? <img src={staticSrc} alt={alt} className={className} style={style} /> : null;
  }

  return <Animated variant={variant} alt={alt} className={className} style={style} />;
}

