import { cn } from '@/lib/utils/css.utils';
import React from 'react';

type Props = {
  title: string;
  preTitle: string | null;
  variant?: 'default' | 'purple' | 'white';
  children?: React.ReactElement;
};

const variantClasses: Record<NonNullable<Props['variant']>, string> = {
  default: 'bg-secondary-light-purple/20',
  purple: 'bg-[linear-gradient(261deg,_#A68FF4_0%,_#49419D_100%)]',
  white: 'bg-neutral-white pt-45 pb-10',
};

export default function BasicHero({ title, preTitle, variant = 'default', children }: Props) {
  return (
    <section id="basic-hero" className={cn('pt-52 pb-14', variantClasses[variant])}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div>
          {preTitle && (
            <h2 className="text-secondary-light-purple mb-5 font-sans text-xl leading-135 font-semibold tracking-[1px] uppercase">
              {preTitle}
            </h2>
          )}
          <h1
            className={cn(
              'text-primary-navy tracking-061 font-sans text-6xl leading-110 font-semibold',
              variant === 'purple' && 'text-primary-cream',
              variant === 'white' && 'tracking-049 text-[49px] leading-110',
            )}
          >
            {title}
          </h1>
        </div>

        {children && children}
      </div>
    </section>
  );
}
