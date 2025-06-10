import { FragmentOf, readFragment } from '@/lib/cms/graphql';
import { SubstackManualFeedFragment } from '@/lib/cms/query';
import SubstackCard from '../shared/substack-card';
import Cta from '../shared/cta';
import { cn } from '@/lib/utils/css.utils';

type Props = FragmentOf<typeof SubstackManualFeedFragment>;

export default function SubstackManualFeed(data: Props) {
  const { title, introduction, cta, variant, backgroundColor, items } = readFragment(
    SubstackManualFeedFragment,
    data,
  );

  return (
    <section
      className={cn(
        'py-10',
        backgroundColor === 'light-purple'
          ? 'bg-secondary-light-purple/20'
          : 'bg-primary-teal/[0.06] text-primary-navy text-xl',
      )}
    >
      <div className="mx-auto max-w-7xl px-4 py-36 sm:px-6 lg:px-8">
        <h1 className="tracking-039 mb-14 font-sans text-5xl leading-110 font-semibold">{title}</h1>

        {introduction && (
          <div
            dangerouslySetInnerHTML={{ __html: introduction }}
            className="text-primary-navy mb-12 max-w-[840px] font-sans leading-140 [&>p]:mb-4 [&>p>strong]:text-2xl [&>p>strong]:font-medium"
          />
        )}

        <div
          className={cn(
            'grid',
            variant === 'minimal' && 'flex snap-x snap-mandatory gap-6 overflow-x-scroll pb-5',
            variant === 'default' && 'grid-cols-2 gap-x-32',
          )}
        >
          {items.map((item) => (
            // @ts-expect-error
            <SubstackCard {...item} key={item.id} />
          ))}
        </div>
        {cta && <Cta {...cta} extraClass="mt-16" />}
      </div>
    </section>
  );
}
