import DepthAreaCard from '../shared/depth-area-card';
import { FragmentOf, readFragment } from '@/lib/cms/graphql';
import { DepthAreasBlockFragment } from '@/lib/cms/query';

type Props = FragmentOf<typeof DepthAreasBlockFragment>;

export default function DepthAreasBlock(data: Props) {
  const { title, introduction, items } = readFragment(DepthAreasBlockFragment, data);

  return (
    <section className="mb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[1fr_2fr] items-start gap-15">
          <div>
            <h2 className="text-primary-navy mb-1.5 font-sans text-5xl leading-130 font-semibold">
              {title}
            </h2>
            {introduction && (
              <div
                className="text-primary-navy font-sans text-xl leading-140 [&>p]:mb-4"
                dangerouslySetInnerHTML={{ __html: introduction }}
              />
            )}
          </div>

          <div className="flex flex-col gap-11">
            {items.map((item) => (
              <DepthAreaCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
