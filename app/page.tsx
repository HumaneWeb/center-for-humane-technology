import AwarenessBlock from '@/components/blocks/awareness-block';
import CampaignBlock from '@/components/blocks/campaign-block';
import DepthAreasBlock from '@/components/blocks/depth-areas-block';
import DonateBlock from '@/components/blocks/donate-block';
import HighlightTextBlock from '@/components/blocks/highlight-text-block';
import ImpactBlock from '@/components/blocks/impact-block';
import MediaBlock from '@/components/blocks/media-block';
import NarrativeBlock from '@/components/blocks/narrative-block';
import NewsletterBlock from '@/components/blocks/newsletter-block';
import HomepageHero from '@/components/layout/homepage-hero';
// import { performRequest } from '@/lib/cms/datocms';
// import { PAGE_CONTENT_QUERY } from '@/lib/cms/query';
import { toNextMetadata } from 'react-datocms';

export default async function Home() {
  // const { homepage } = await performRequest(PAGE_CONTENT_QUERY);

  const heroData = {
    title: "We want a world where technology serves humanity's best interest",
    subtitle: 'Building a better future',
    description:
      "CHT is a movement from leading insight, policy, and ethical design—advancing how we create technology that serves humanity's best interests.",
    ctaText: 'Learn more about CHT',
    ctaHref: '/about',
    profileImageUrl: '/placeholder.svg?height=300&width=250',
    profileImageAlt: 'Team member profile',
    backgroundImageUrl: '/placeholder.svg?height=200&width=300',
    backgroundImageAlt: 'Technology background',
  };

  const newsletterData = {
    title: 'Stay up to date',
    description: 'Get the latest updates on our work and research delivered to your inbox.',
    placeholderText: 'Enter your email',
    buttonText: 'Subscribe',
  };

  return (
    <div>
      <HomepageHero {...heroData} />
      <NewsletterBlock {...newsletterData} />
      <ImpactBlock />
      <NarrativeBlock />
      <HighlightTextBlock />
      <AwarenessBlock />
      <CampaignBlock />
      <DepthAreasBlock />
      <MediaBlock />
      <DonateBlock />
    </div>
  );
}
