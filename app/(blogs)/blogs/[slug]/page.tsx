import DonateBlock from '@/components/blocks/donate-block';
import BasicHero from '@/components/layout/basic-hero';
import CustomStructuredText from '@/components/shared/custom-structured-text';
import { executeQuery } from '@/lib/cms/executeQuery';
import { BlogDetailPageQuery } from '@/lib/cms/query';
import type { PageSlug } from '@/lib/utils/types';

export default async function BlogDetailPagePage({ params }: PageSlug) {
  const { slug } = await params;
  const { page, configuration } = await executeQuery(BlogDetailPageQuery, { variables: { slug } });

  return (
    <>
      <BasicHero title={page?.title} variant="white" />
      <div className="mx-auto mt-35 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[1fr_3fr] pb-50">
          <div className="sticky top-20 self-start">
            <ul className="text-primary-teal flex flex-col gap-7 font-sans text-xl leading-130 font-semibold">
              <li>
                Link short
                <ul className="pt-5 pl-5">
                  <li>Link longer example</li>
                </ul>
              </li>
              <li>Link medium</li>
              <li>Link short</li> <li>Link medium</li>
            </ul>
          </div>

          <div>
            <CustomStructuredText data={page?.content} />
          </div>
        </div>
      </div>
      <DonateBlock
        title={configuration?.donateTitle}
        cta={configuration?.donateCta}
        image={configuration?.donateImage}
      />
    </>
  );
}
