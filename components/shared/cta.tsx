import { ResultOf } from '@/lib/cms/graphql';
import { CTAFragment } from '@/lib/cms/query';
import type { Optional } from '@/lib/utils/types';
import CustomLink from './custom-link';
import { cn } from '@/lib/utils/css.utils';

export type CtaProps = Optional<
  ResultOf<typeof CTAFragment> & {
    extraClass?: string;
    children?: React.ReactNode;
  }
>;

export default function Cta({ label, extraClass, link, children }: CtaProps) {
  return (
    <CustomLink
      // @ts-expect-error
      content={link}
      extraClass={cn(
        `bg-secondary-light-teal text-primary-navy hover:bg-primary-blue hover:text-neutral-white tracking-02 inline-block rounded-md px-5 py-4 text-xl leading-120 font-semibold transition-colors`,
        extraClass,
      )}
    >
      {label}
      {children && children}
    </CustomLink>
  );
}
