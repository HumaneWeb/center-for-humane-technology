import { cn } from '@/lib/utils/css.utils';

type Props = {
  title: string;
  content: string;
  backgroundColor: 'blue' | 'light-purple';
};

export default function HighlightedBlock({ title, content, backgroundColor }: Props) {
  return (
    <div
      className={cn(
        'px-10 py-9',
        backgroundColor === 'blue' && 'bg-primary-blue',
        backgroundColor === 'light-purple' && 'bg-[#F3F0FF]',
      )}
    >
      <div
        className={cn(
          'font-sans text-2xl leading-130 font-semibold',
          backgroundColor === 'blue' && 'text-neutral-white',
          backgroundColor === 'light-purple' && 'text-primary-blue',
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
    </div>
  );
}
