// @ts-nocheck
import DonateBlock from '@/components/blocks/donate-block';
import NewsletterBlock, { SubstackNewsletterWidget } from '@/components/blocks/newsletter-block';
import BasicHero from '@/components/layout/basic-hero';
import Cta from '@/components/shared/cta';
import SubstackFeed from '@/components/shared/substack-feed';
import { executeQuery } from '@/lib/cms/executeQuery';
import { SubstackQuery } from '@/lib/cms/query';

export default async function SubstackPage() {
  const { configuration } = await executeQuery(SubstackQuery);

  return (
    <>
      <BasicHero title="Substack">
        <div className="w-[515px]">
          <h4 className="mb-3.5 font-sans text-xl leading-120 font-semibold text-[#262626]">
            Stay up to date
          </h4>
          <SubstackNewsletterWidget />
        </div>
      </BasicHero>

      <div className="mx-auto max-w-7xl px-4 pt-17 sm:px-6 lg:px-8">
        <h4 className="text-primary-navy font-sans text-[29px] leading-130 font-semibold">
          Latest
        </h4>
        <SubstackFeed>
          <Cta
            label="Explore more articles"
            link={{
              // @ts-expect-error
              externalUrl: 'https://centerforhumanetechnology.substack.com/',
            }}
            extraClass="mt-25"
          />
        </SubstackFeed>
      </div>

      <NewsletterBlock
        // @ts-expect-error
        title={configuration?.newsletterTitle}
        introduction={configuration?.newsletterIntroduction}
      />
      <DonateBlock
        // @ts-expect-error
        title={configuration?.donateTitle}
        cta={configuration?.donateCta}
        image={configuration?.donateImage}
      />
    </>
  );
}
