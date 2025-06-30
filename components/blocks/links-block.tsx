import { cn } from '@/lib/utils/css.utils';
import type { CtaProps } from '../shared/cta';
import CtaList from '../shared/cta-list';

type Props = {
  title: string;
  ctas: CtaProps[];
  variant?: 'default' | 'small';
  extraClassname?: string;
};

export default function LinksBlock({ title, ctas, extraClassname, variant = 'default' }: Props) {
  return (
    <section
      className={cn(
        'bg-neutral-white mb:pt-20 mb:pb-30 py-8',
        variant === 'small' && 'mb:pt-0 mb:pb-0 py-0',
        extraClassname,
      )}
    >
      <div
        className={cn(
          'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
          variant === 'small' && 'px-0 sm:px-0 lg:px-0',
        )}
      >
        <h3
          className={cn(
            'tracking-049 text-primary-navy mb:text-5xl mb:leading-110 mb:mb-[70px] mb-5 font-sans text-[29px] leading-120 font-semibold',
            variant === 'small' &&
              'mb:text-[29px] mb:leading-130 text-primary-blue mb:mb-[33px] mb-3 text-[23px]',
          )}
        >
          {title}
        </h3>

        <div>
          <CtaList items={ctas} variant="underline" extraClassnames="flex-col items-start gap-6" />
        </div>
      </div>
    </section>
  );
}
