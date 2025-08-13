// @ts-nocheck
import GenericCardsGrid from '@/components/blocks/generic-cards-grid';
import NewsletterBlock from '@/components/blocks/newsletter-block';
import ContentLayout from '@/components/layout/content-layout';
import { executeQuery } from '@/lib/cms/executeQuery';
import { generateMetadataFn } from '@/lib/cms/generateMetadataFn';
import { AreasOfWorkQuery } from '@/lib/cms/query';
import { draftMode } from 'next/headers';

export const generateMetadata = generateMetadataFn({
  query: AreasOfWorkQuery,
  pickSeoMetaTags: (data) => data.page?._seoMetaTags,
});

export default async function AreasOfWorkPage() {
  const { isEnabled } = await draftMode();

  const { page, configuration } = await executeQuery(AreasOfWorkQuery, {
    includeDrafts: isEnabled,
  });

  return (
    <ContentLayout
      page={{ ...page, textColor: 'purple' }}
      configuration={configuration}
      containerClassNames="bg-[#F0EBFF] mb:mt-0 mt-0 mb:pt-15 pt-5"
    >
      <GenericCardsGrid {...page?.caseStudiesGrid} />
      <NewsletterBlock
        title={configuration?.newsletterTitle!}
        introduction={configuration?.newsletterIntroduction!}
      />
    </ContentLayout>
  );
}
