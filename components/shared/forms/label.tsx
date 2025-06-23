import { cn } from '@/lib/utils/css.utils';
import React from 'react';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn('text-sm leading-none font-medium text-gray-900', className)}
    {...props}
  />
));

export default Label;
