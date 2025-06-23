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
        'px-10 py-9',
        backgroundColor === 'blue' && 'bg-primary-blue',
        backgroundColor === 'light-purple' && 'bg-[#F3F0FF]',
        backgroundColor === 'white' && 'bg-neutral-white',
        variant === 'with-container-color' && 'max-w-[950px] p-10',
      )}
    >
      <div
        className={cn(
          'font-sans text-2xl leading-130 font-semibold',
          backgroundColor === 'blue' && 'text-neutral-white',
          backgroundColor === 'light-purple' && 'text-primary-blue',
          variant === 'with-container-color' && 'tracking-039 mb-3.5 text-[39px] leading-110',
        )}
        dangerouslySetInnerHTML={{ __html: title }}
      />

      {content && (
        <div
          className={cn(
            'mt-5 font-sans text-xl leading-140 font-medium',
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
