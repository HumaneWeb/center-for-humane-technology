import { cn } from '@/lib/utils/css.utils';
import React from 'react';

type Props = {
  title: string;
  preTitle: string | null;
  variant?: 'default' | 'purple';
  children?: React.ReactElement;
};

const variantClasses: Record<NonNullable<Props['variant']>, string> = {
  default: 'bg-secondary-light-purple/20',
  purple: 'bg-[linear-gradient(261deg,_#A68FF4_0%,_#49419D_100%)]',
};

export default function BasicHero({ title, preTitle, variant = 'default', children }: Props) {
  return (
    <section id="basic-hero" className={cn(variantClasses[variant], 'pt-32 pb-14')}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div>
          {preTitle && (
            <h2 className="text-secondary-light-purple mb-5 font-sans text-xl leading-135 font-semibold tracking-[1px] uppercase">
              {preTitle}
            </h2>
          )}
          <h1
            className={cn(
              variant === 'purple' ? 'text-primary-cream' : 'text-primary-navy',
              'tracking-061 font-sans text-6xl leading-110 font-semibold',
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
