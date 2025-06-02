import { type FragmentOf, readFragment } from '@/lib/cms/graphql';
import CaseStudyCard from '../shared/case-study-card';
import PodcastCard from '../shared/podcast-card';
import { AwarenessBlockFragment } from '@/lib/cms/query';

type Props = FragmentOf<typeof AwarenessBlockFragment>;

export default function AwarenessBlock(data: Props) {
  const unmaskedData = readFragment(AwarenessBlockFragment, data);
  const { caseStudyCard, podcastCard } = unmaskedData;

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
      <div className="bg-primary-blue flex items-start justify-end py-20">
        <div className="mr-[90px] w-full max-w-[550px]">
          <CaseStudyCard {...caseStudyCard} />
        </div>
      </div>

      <div className="bg-gradient-podcast flex items-start justify-start py-20">
        <div className="ml-[90px] w-full max-w-[550px]">
          <PodcastCard {...podcastCard} />
        </div>
      </div>
    </div>
  );
}
