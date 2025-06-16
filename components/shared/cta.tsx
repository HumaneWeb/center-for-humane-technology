import { ResultOf } from '@/lib/cms/graphql';
import { CTAFragment } from '@/lib/cms/query';
import type { Optional } from '@/lib/utils/types';
import CustomLink from './custom-link';
import { cn } from '@/lib/utils/css.utils';

export type CtaProps = Optional<
  ResultOf<typeof CTAFragment> & {
    extraClass?: string;
    children?: React.ReactNode;
    variant?: 'default' | 'minimal' | 'underline';
  }
>;

export default function Cta({
  label,
  helperLabel,
  extraClass,
  link,
  children,
  variant = 'default',
}: CtaProps) {
  return (
    <CustomLink
      // @ts-expect-error
      content={link}
      extraClass={cn(
        `bg-secondary-light-teal text-primary-navy hover:bg-primary-blue hover:text-neutral-white tracking-02 inline-block rounded-md px-5 py-4 text-xl leading-120 font-semibold transition-all duration-200 ease-in group`,
        variant === 'minimal' &&
          'p-0 bg-transparent text-primary-teal hover:bg-transparent hover:text-primary-navy',
        variant === 'underline' &&
          ' p-0 bg-transparent text-primary-teal hover:bg-transparent hover:text-primary-navy',
        extraClass,
      )}
    >
      <span className="flex flex-col">
        <span className={cn(variant === 'underline' && 'font-medium underline')}>{label}</span>
        {helperLabel && (
          <span className="text-primary-navy pointer-none: font-sans text-[16px] leading-140 font-normal">
            {helperLabel}
          </span>
        )}
      </span>
      {children && children}
    </CustomLink>
  );
}
