import { cn } from '@/lib/utils/css.utils';
import Cta, { CtaProps } from '../shared/cta';

type Props = {
  title: string;
  variant: 'dark-blue' | 'teal';
  cta: CtaProps;
};

export default function LandingHighlightCtaBlock({ title, cta, variant }: Props) {
  return (
    <div
      className={cn(
        'mb:grid-cols-[2fr_1fr] mb:px-[73px] mb:py-[59px] mb:gap-36 mt-10 mb-15 grid gap-5 bg-[#1B2343] p-8',
        variant === 'teal' && 'bg-primary-teal',
      )}
    >
      {title && (
        <h3
          className={cn(
            'text-neutral-white mb:text-[29px] mb:leading-130 font-sans text-[23px] leading-120 font-semibold',
          )}
        >
          {title}
        </h3>
      )}
      {cta && (
        <div>
          <Cta {...cta} />
        </div>
      )}
    </div>
  );
}
