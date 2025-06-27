// @ts-nocheck
import React from 'react';
import { cn } from '@/lib/utils/css.utils';
import type { CustomImageProps } from '../shared/custom-image';
import Cta from '../shared/cta';
import type { CustomLinkProps } from '../shared/custom-link';

type Props = {
  title: string | null;
  preTitle?: string | null;
  introduction?: string | null;
  cta?: CustomLinkProps | null;
  backCta?: string | null;
  backgroundImage?: CustomImageProps | null;
  variant?: 'default' | 'purple' | 'white' | 'dark' | 'blue';
  children?: React.ReactElement;
};

const variantClasses: Record<NonNullable<Props['variant']>, string> = {
  default: 'bg-secondary-light-purple/20',
  purple: 'bg-[linear-gradient(261deg,_#A68FF4_0%,_#49419D_100%)]',
  white: 'bg-neutral-white pt-40 pb-15',
  dark: 'pt-40 pb-15',
  blue: 'bg-basic-hero-blue',
};

export default function BasicHero({
  title,
  preTitle,
  introduction,
  cta,
  backCta,
  backgroundImage,
  variant = 'default',
  children,
}: Props) {
  return (
    <section
      id="basic-hero"
      className={cn('mb:pt-52 mb:pb-14 bg-cover bg-no-repeat pt-35 pb-8', variantClasses[variant])}
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage.url})` : undefined }}
    >
      <div className="mb:flex-row mb:items-center mx-auto flex max-w-7xl flex-col justify-between gap-5 px-4 sm:px-6 lg:px-8">
        <div>
          {backCta && (
            <div className="w-fit">
              <Cta
                {...backCta}
                icon="back"
                variant="underline"
                extraClass={cn(
                  'mb-12',
                  variant === 'white' && 'text-neutral-white',
                  variant === 'dark' && 'text-primary-blue',
                )}
              />
            </div>
          )}
          {preTitle && (
            <h2 className="text-secondary-light-purple mb:text-xl mb:leading-135 mb:tracking-[1px] mb:mb-5 mb-2 font-sans text-[15px] leading-120 font-semibold tracking-[0.9px] uppercase">
              {preTitle}
            </h2>
          )}
          <h1
            className={cn(
              'text-primary-navy tracking-061 mb:text-6xl font-sans text-[31px] leading-110 font-semibold',
              variant === 'purple' && 'text-primary-cream',
              variant === 'white' && 'tracking-049 text-neutral-white text-[49px] leading-110',
              variant === 'dark' && 'text-primary-navy tracking-049 text-[49px] leading-110',
              variant === 'blue' && 'text-primary-cream',
            )}
          >
            {title}
          </h1>
          {introduction && (
            <div
              className={cn(
                'mt-6 font-sans text-[25px] leading-140',
                variant === 'white' && 'text-primary-cream',
                variant === 'dark' && 'text-neutral-white',
              )}
              dangerouslySetInnerHTML={{ __html: introduction }}
            />
          )}
          {cta && (
            <div className="mt-11 w-fit">
              <Cta {...cta} />
            </div>
          )}
        </div>

        {children && children}
      </div>
    </section>
  );
}
