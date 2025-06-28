// @ts-nocheck
import DonateBlock from '@/components/blocks/donate-block';
import NewsletterBlock, { SubstackNewsletterWidget } from '@/components/blocks/newsletter-block';
import BasicHero from '@/components/layout/basic-hero';
import Cta from '@/components/shared/cta';
import RSSFeedReader from '@/components/shared/rss-feed-reader';
import SubstackFeed, { BlogFeed } from '@/components/shared/substack-feed';
import { executeQuery } from '@/lib/cms/executeQuery';
import { SubstackQuery } from '@/lib/cms/query';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Substack',
};

export default async function SubstackPage() {
  const { configuration } = await executeQuery(SubstackQuery);

  return (
    <>
      <BasicHero title="Substack">
        <div className="mb:w-[515px]">
          <h4 className="mb:text-xl mb:mb-3.5 mb-2 font-sans text-[18px] leading-120 font-semibold text-[#262626]">
            Stay up to date
          </h4>
          <SubstackNewsletterWidget />
        </div>
      </BasicHero>

      <div className="mb:pb-30 mx-auto max-w-7xl px-4 pt-17 pb-15 sm:px-6 lg:px-8">
        <h4 className="text-primary-navy mb:text-[29px] mb:leading-130 mb:mb-6 mb-4 font-sans text-[23px] leading-120 font-semibold">
          Latest
        </h4>
        <RSSFeedReader />
        <Cta
          label="Explore more articles"
          link={{ externalUrl: 'https://centerforhumanetechnology.substack.com/' }}
          extraClass="mb:mt-25 mt-10"
        />
      </div>

      <NewsletterBlock
        title={configuration?.newsletterTitle}
        introduction={configuration?.newsletterIntroduction}
      />
      <DonateBlock
        title={configuration?.donateTitle}
        cta={configuration?.donateCta}
        image={configuration?.donateImage}
      />
    </>
  );
}
