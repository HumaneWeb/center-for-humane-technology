import { ResultOf } from '@/lib/cms/graphql';
import { CTAFragment } from '@/lib/cms/query';
import type { Optional } from '@/lib/utils/types';
import CustomLink from './custom-link';

export type CtaProps = Optional<
  ResultOf<typeof CTAFragment> & {
    extraClass?: string;
  }
>;

export default function Cta({ label, extraClass, link }: CtaProps) {
  return (
    <CustomLink
      // @ts-expect-error
      content={link}
      extraClass={`bg-secondary-light-teal text-primary-navy hover:bg-primary-blue hover:text-neutral-white tracking-02 inline-block rounded-md px-5 py-4 text-xl leading-120 font-semibold transition-colors ${extraClass} `}
    >
      {label}
    </CustomLink>
  );
}
