import React from 'react';
import { cn } from '@/lib/utils/css.utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'focus:ring-primary-blue flex h-10 w-full rounded-[5px] border border-[#A8ADB6] bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:border-transparent focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

export default Input;
