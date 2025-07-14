import CaseStudyCard from '../shared/case-study-card';
import PodcastCard from '../shared/podcast-card';
import { LatestPodcastQuery } from '@/lib/cms/query';
import { executeQuery } from '@/lib/cms/executeQuery';
import { FadeIn } from '../shared/fade-in';

type Props = {
  id: string;
  caseStudyCard: any;
  podcastCard: any;
};

export default async function AwarenessBlock({ caseStudyCard, podcastCard }: Props) {
  const { podcast } = await executeQuery(LatestPodcastQuery);

  return (
    <div className="awareness-block mb:grid-cols-2 mb:gap-5 grid grid-cols-1 gap-2.5">
      <div className="awareness-block-first bg-primary-blue mb:py-20 flex items-start justify-end py-8">
        <FadeIn className="awareness-block-first-wrapper mb:mr-[90px] mb:px-0 mb:max-w-[530px] mx-auto w-full max-w-7xl px-4 sm:px-6">
          <CaseStudyCard {...caseStudyCard} />
        </FadeIn>
      </div>

      <div className="awareness-block-second bg-gradient-podcast mb:py-20 flex items-start justify-start py-8">
        <FadeIn className="awareness-block-second-wrapper mb:ml-[50px] mb:px-0 mb:max-w-[550px] mx-auto w-full max-w-7xl px-4 sm:px-6">
          <PodcastCard
            title={podcastCard.title}
            preTitle={podcastCard.preTitle}
            introduction={podcastCard.introduction}
            cta={podcastCard.cta}
            icon={podcastCard.icon}
            podcast={podcastCard.highlightedPodcast ?? podcast}
          />
        </FadeIn>
      </div>
    </div>
  );
}
