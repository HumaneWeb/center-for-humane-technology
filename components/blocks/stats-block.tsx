'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate, useInView } from 'motion/react';
import { cn } from '@/lib/utils/css.utils';

type Props = {
  title: string;
  items: {
    id: string;
    value: string;
    label: string;
  }[];
  variant?: 'default' | 'landing';
};

function AnimatedValue({ value, variant }: { value: string; variant?: 'default' | 'landing' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

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
      <span ref={ref} className="font-sans text-[71px] leading-[78%] font-bold text-[#93F2EF]">
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className="w-fit font-sans text-[71px] leading-[78%] font-bold text-[#93F2EF]">
      <motion.span>{smoothRounded}</motion.span>
      {textValue && <span>{textValue}</span>}
    </span>
  );
}

export default function StatsBlock({ title, items, variant = 'default' }: Props) {
  return (
    <section
      className={cn(
        'bg-primary-blue mt-20 mb-32 pt-14 pb-20',
        variant === 'landing' && 'bg-landing-stats mb-0 w-full',
      )}
    >
      <div
        className={cn(
          'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
          variant === 'landing' && 'lg:px-16',
        )}
      >
        <h3
          className={cn(
            'text-primary-cream mb-14 font-sans text-2xl leading-130 font-semibold',
            variant === 'landing' && 'tracking-025 mb-20 text-center leading-110 font-medium',
          )}
        >
          {title}
        </h3>

        <div
          className={cn(
            'grid grid-cols-3 gap-20',
            variant === 'landing' && 'flex items-center justify-between',
          )}
        >
          {items.map((item) => (
            <div key={item.id} className="flex w-fit items-end gap-2.5">
              <h4>
                <AnimatedValue value={item.value} />
              </h4>
              <h6
                className={cn(
                  'text-primary-cream max-w-24 font-sans text-xl leading-110 font-semibold',
                  variant === 'landing' && 'leading-120',
                )}
              >
                {item.label}
              </h6>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
