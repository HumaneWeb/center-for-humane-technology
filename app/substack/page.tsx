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
      <BasicHero title="Substack">{/* <SubstackNewsletterWidget /> */}</BasicHero>

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
