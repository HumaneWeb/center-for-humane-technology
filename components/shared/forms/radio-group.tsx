import { cn } from '@/lib/utils/css.utils';
import React from 'react';

interface RadioGroupContextType {
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
}

const RadioGroupContext = React.createContext<RadioGroupContextType>({});

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, name, ...props }, ref) => {
    return (
      <RadioGroupContext.Provider value={{ value, onValueChange, name }}>
        <div className={cn('grid gap-2', className)} {...props} ref={ref} role="radiogroup" />
      </RadioGroupContext.Provider>
    );
  },
);

export interface RadioGroupItemProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value: string;
}

export const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, ...props }, ref) => {
    const context = React.useContext(RadioGroupContext);

    return (
      <div className="relative flex">
        <input
          ref={ref}
          type="radio"
          value={value}
          checked={context.value === value}
          onChange={(e) => context.onValueChange?.(e.target.value)}
          name={context.name}
          className={cn(
            'accent-primary-blue peer h-6 w-6 focus:ring-blue-500 focus:ring-offset-2',
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
