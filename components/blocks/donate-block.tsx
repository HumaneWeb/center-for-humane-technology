import { FragmentOf, readFragment } from '@/lib/cms/graphql';
import { DonateBlockFragment } from '@/lib/cms/query';
import Cta from '../shared/cta';
import CustomImage from '../shared/custom-image';

type Props = FragmentOf<typeof DonateBlockFragment>;

export default function DonateBlock(data: Props) {
  const { title, cta, image } = readFragment(DonateBlockFragment, data);

  return (
    <section
      className="bg-primary-navy bg-contain bg-right bg-no-repeat py-10"
      style={{ backgroundImage: 'url(/donate-bg.png)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-15 lg:grid-cols-2">
          <div>
            <h2 className="text-neutral-white mb-5 font-sans text-3xl leading-140 font-semibold">
              {title}
            </h2>
            {cta && <Cta {...cta} />}
          </div>

          {image && (
            <div className="flex justify-end">
              <CustomImage {...image} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
