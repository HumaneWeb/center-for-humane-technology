'use client';

import { cn } from '@/lib/utils/css.utils';
import { motion } from 'motion/react';
import type * as React from 'react';

interface FadeInProps extends React.ComponentPropsWithoutRef<typeof motion.div> {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function FadeIn({ children, className, delay = 0.25, duration = 1, ...props }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      // animate={{ opacity: 1, y: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: duration, delay: delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
