import Cta from '../shared/cta';
import { FragmentOf, readFragment } from '@/lib/cms/graphql';
import { CampaignBlockFragment } from '@/lib/cms/query';
import CustomImage from '../shared/custom-image';

type Props = FragmentOf<typeof CampaignBlockFragment>;

export default function CampaignBlock(data: Props) {
  const { title, introduction, cta, image } = readFragment(CampaignBlockFragment, data);

  return (
    <section className="mx-auto mt-24 mb-36 max-w-[1400px] px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl bg-[#007981]">
        <div className="grid grid-cols-1 items-center gap-15 lg:grid-cols-2">
          <div className="pl-12">
            <h2 className="text-neutral-white tracking-049 mb-10 font-sans text-5xl leading-110 font-semibold">
              {title}
            </h2>
            <div>
              {introduction && (
                <div
                  className="text-neutral-white mb-10 font-sans text-xl leading-140 [&>p]:mb-4"
                  dangerouslySetInnerHTML={{
                    __html: introduction,
                  }}
                />
              )}
              {/* @ts-expect-error */}
              {cta && <Cta {...cta} />}
            </div>
          </div>

          <div className="aspect-square">
            <CustomImage {...image} extraClass="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
