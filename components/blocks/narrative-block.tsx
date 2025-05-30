import { FragmentOf, readFragment } from '@/lib/cms/graphql';
import { NarrativeBlockFragment } from '@/lib/cms/query';
import CustomImage from '../shared/custom-image';
import CtaList from '../shared/cta-list';

type Props = FragmentOf<typeof NarrativeBlockFragment>;

export default function NarrativeBlock(data: Props) {
  const { title, introduction, ctas, image } = readFragment(NarrativeBlockFragment, data);

  return (
    <section className="pb-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-15 lg:grid-cols-2">
          {image && (
            <div>
              <CustomImage {...image} />
            </div>
          )}

          <div>
            <h2 className="text-primary-navy tracking-049 mb-8 font-sans text-5xl leading-110 font-semibold">
              {title}
            </h2>
            <div>
              {introduction && (
                <div
                  className="text-primary-navy mb-8 font-sans text-xl leading-140 [&>p]:mb-4"
                  dangerouslySetInnerHTML={{ __html: introduction }}
                />
              )}
              {ctas && <CtaList items={ctas} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
