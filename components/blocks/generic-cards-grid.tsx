import GenericCard from '../shared/generic-card';
import Cta from '../shared/cta';
import { cn } from '@/lib/utils/css.utils';

type Props = {
  title: string;
  introduction: string;
  variant: 'default' | 'minimal';
  backgroundColor: string;
  cta: any;
  items: any[];
};

export default function GenericCardsGrid({
  title,
  introduction,
  cta,
  variant,
  backgroundColor,
  items,
}: Props) {
  if (variant === 'minimal') {
    return (
      <div className="bg-neutral-white my-20 overflow-x-hidden">
        <section
          className={cn(
            'mb-2.5 pt-20 pb-24',
            backgroundColor === 'light-purple'
              ? 'bg-secondary-light-purple/20'
              : 'bg-primary-teal/[0.06] text-primary-navy text-xl',
          )}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="tracking-039 text-primary-blue mb-14 font-sans text-[39px] leading-110 font-semibold">
              {title}
            </h1>

            {introduction && (
              <div
                dangerouslySetInnerHTML={{ __html: introduction }}
                className="text-primary-navy mb-12 max-w-[840px] font-sans leading-140 [&>p]:mb-4 [&>p>strong]:text-2xl [&>p>strong]:font-medium"
              />
            )}
          </div>

          <div className="overflow-x-auto">
            <div className={cn('flex snap-x snap-mandatory gap-6 overflow-x-visible pb-5')}>
              <div className="flex-shrink-0" style={{ width: 'max(0px, calc(50vw - 640px))' }} />

              {items.map((item) => (
                <GenericCard {...item} key={item.id} />
              ))}
            </div>
          </div>
          {cta && (
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Cta {...cta} extraClass="mt-16" />
            </div>
          )}
        </section>
      </div>
    );
  }

  return (
    <div className="bg-neutral-white overflow-x-hidden">
      <section
        className={cn(
          'mb-2.5 pt-12 pb-24',
          backgroundColor === 'light-purple'
            ? 'bg-secondary-light-purple/20'
            : 'bg-primary-teal/[0.06] text-primary-navy text-xl',
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="tracking-039 text-primary-blue mb-14 font-sans text-[39px] leading-110 font-semibold">
            {title}
          </h1>

          {introduction && (
            <div
              dangerouslySetInnerHTML={{ __html: introduction }}
              className="text-primary-navy mb-12 max-w-[840px] font-sans leading-140 [&>p]:mb-4 [&>p>strong]:text-2xl [&>p>strong]:font-medium"
            />
          )}

          <div className={cn('grid', variant === 'default' && 'grid-cols-2 gap-x-32')}>
            {items.map((item) => (
              <GenericCard {...item} key={item.id} />
            ))}
          </div>

          {cta && <Cta {...cta} extraClass="mt-16" />}
        </div>
      </section>
    </div>
  );
}
