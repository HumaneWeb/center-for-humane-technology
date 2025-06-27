import { cn } from '@/lib/utils/css.utils';
import Cta, { CtaProps } from '../shared/cta';

type Props = {
  title: string;
  content: string;
  backgroundColor: 'blue' | 'light-purple' | 'white';
  variant: 'default' | 'with-container-color';
  cta?: CtaProps;
};

export default function HighlightedBlock({ title, content, backgroundColor, variant, cta }: Props) {
  return (
    <div
      className={cn(
        'mb:px-10 mb:py-9 px-5 py-8',
        backgroundColor === 'blue' && 'bg-primary-blue',
        backgroundColor === 'light-purple' && 'bg-[#F3F0FF]',
        backgroundColor === 'white' && 'bg-neutral-white',
        variant === 'with-container-color' && 'mb:p-10 max-w-[950px]',
      )}
    >
      <div
        className={cn(
          'font-sans text-2xl leading-130 font-semibold',
          backgroundColor === 'blue' && 'text-neutral-white',
          backgroundColor === 'light-purple' && 'text-primary-blue',
          variant === 'with-container-color' &&
            'tracking-039 mb:text-[39px] mb:leading-110 mb-3.5 text-[26px] leading-120',
        )}
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {content && (
        <div
          className={cn(
            'mb:text-xl mt-5 font-sans text-[18px] leading-140 font-normal',
            backgroundColor === 'blue' && 'text-neutral-white',
            backgroundColor === 'light-purple' && 'text-primary-blue',
          )}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      {cta && (
        <div className="mt-9">
          <Cta {...cta} />
        </div>
      )}
    </div>
  );
}
