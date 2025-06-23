import { cn } from '@/lib/utils/css.utils';
import React from 'react';

const CheckIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="10" viewBox="0 0 13 10" fill="none">
    <g clipPath="url(#clip0_4302_1965)">
      <path
        d="M4.59554 9.26985L0.623319 5.39585C0.384675 5.16311 0.384675 4.78574 0.623319 4.55298L1.48754 3.7101C1.72618 3.47733 2.11314 3.47733 2.35179 3.7101L5.02767 6.31979L10.7591 0.730099C10.9978 0.497356 11.3847 0.497356 11.6234 0.730099L12.4876 1.57297C12.7262 1.80572 12.7262 2.18308 12.4876 2.41585L5.45979 9.26988C5.22112 9.50262 4.83419 9.50262 4.59554 9.26985V9.26985Z"
        fill="white"
      />
    </g>
    <defs>
      <clipPath id="clip0_4302_1965">
        <rect
          width="12.2222"
          height="8.88889"
          fill="white"
          transform="translate(0.444336 0.555542)"
        />
      </clipPath>
    </defs>
  </svg>
);

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  onCheckedChange?: (checked: boolean | 'indeterminate') => void;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, onCheckedChange, checked, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current!);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onCheckedChange?.(e.target.checked);
      props.onChange?.(e);
    };

    const handleDivClick = (e: React.MouseEvent) => {
      e.preventDefault();
      if (props.disabled) return;

      inputRef.current?.click();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        if (!props.disabled) {
          inputRef.current?.click();
        }
      }
    };

    return (
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          className="sr-only"
          ref={inputRef}
          checked={checked}
          onChange={handleChange}
          {...props}
        />
        <div
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded-sm border border-gray-300 bg-white transition-colors',
            'focus-within:ring-primary-blue focus-within:ring-2 focus-within:ring-offset-2',
            checked && 'border-primary-blue bg-primary-blue text-white',
            className,
          )}
          onClick={handleDivClick}
          onKeyDown={handleKeyDown}
          tabIndex={props.disabled ? -1 : 0}
          role="checkbox"
          aria-checked={checked}
          aria-disabled={props.disabled}
        >
          {checked && <CheckIcon className="h-3 w-3" />}
        </div>
      </label>
    );
  },
);
