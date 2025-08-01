'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'motion/react';
import { cn } from '@/lib/utils/css.utils';
import { FadeIn } from '../shared/fade-in';

type Props = {
  title: string;
  items: {
    id: string;
    value: string;
    label: string;
  }[];
  variant?: 'default' | 'landing' | 'landing-teal';
  extraClassnames?: string;
};

function AnimatedValue({
  value,
  variant,
}: {
  value: string;
  variant?: 'default' | 'landing' | 'landing-teal';
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    // margin: '-100px',
  });

  const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
  const numericValue = match ? Number.parseFloat(match[1]) : 0;
  const textValue = match ? match[2] : value;

  const count = useMotionValue(0);

  const smoothRounded = useTransform(count, (latest) => {
    let step;
    if (numericValue >= 1000) {
      step = Math.max(10, Math.floor(numericValue / 100));
    } else if (numericValue >= 100) {
      step = Math.max(2, Math.floor(numericValue / 50));
    } else {
      step = 1;
    }

    return Math.floor(latest / step) * step;
  });

  useEffect(() => {
    if (isInView && numericValue > 0) {
      const controls = animate(count, numericValue, {
        duration: 1.8,
        ease: [0.25, 0.1, 0.25, 0.9],
        delay: 0.1,
      });

      return controls.stop;
    }
  }, [isInView, numericValue, count]);

  if (!match || numericValue === 0) {
    return (
      <span
        ref={ref}
        className={cn(
          'mb:text-[71px] font-sans text-5xl leading-[78%] font-bold text-[#93F2EF]',
          variant === 'landing-teal' && 'text-[#FFEFE5]',
        )}
      >
        {value}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className={cn(
        'mb:text-[71px] w-fit font-sans text-5xl leading-[78%] font-bold text-[#93F2EF]',
        variant === 'landing-teal' && 'text-[#FFEFE5]',
      )}
    >
      <motion.span>{smoothRounded}</motion.span>
      {textValue && <span>{textValue}</span>}
    </span>
  );
}

export default function StatsBlock({ title, items, variant = 'default', extraClassnames }: Props) {
  return (
    <section
      className={cn(
        'bg-primary-blue mb:mb-32 mb:pt-14 mb:pb-20 mt-20 py-8',
        variant === 'landing' && 'bg-landing-stats mt-10 mb-0 w-full',
        variant === 'landing-teal' && 'bg-primary-teal mb:mb-0 mt-10 mb-10 w-full',
        extraClassnames,
      )}
    >
      <div
        className={cn(
          'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
          (variant === 'landing' || variant === 'landing-teal') && 'lg:px-16',
        )}
      >
        {title && (
          <FadeIn>
            <h3
              className={cn(
                'text-primary-cream mb:text-2xl mb:leading-130 mb:mb-14 mb-10 font-sans text-xl leading-120 font-semibold',
                (variant === 'landing' || variant === 'landing-teal') &&
                  'tracking-025 mb:mb-20 mb-10 text-center leading-110 font-medium',
              )}
            >
              {title}
            </h3>
          </FadeIn>
        )}

        <FadeIn
          className={cn(
            'mb:grid mb:gap-20 flex grid-cols-3 flex-col items-center justify-center gap-10',
            (variant === 'landing' || variant === 'landing-teal') &&
              'mb:flex mb:flex-row flex-wrap items-center justify-center',
          )}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                'flex w-fit items-center gap-2.5',
                (variant === 'landing' || variant === 'landing-teal') &&
                  'mb:flex-row flex-col items-center',
              )}
            >
              <h4>
                <AnimatedValue value={item.value} variant={variant} />
              </h4>
              <h6
                className={cn(
                  'text-primary-cream mb:text-xl mb:leading-110 mb:max-w-[140px] font-sans text-[18px] leading-110 font-semibold',
                  variant === 'landing' && 'mb:max-w-24 max-w-full leading-120',
                )}
              >
                {item.label}
              </h6>
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
