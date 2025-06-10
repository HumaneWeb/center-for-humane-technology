import { logWarning } from '@/lib/utils/logs.utils';
import AwarenessBlock from './awareness-block';
import CampaignBlock from './campaign-block';
import DepthAreasBlock from './depth-areas-block';
import DonateBlock from './donate-block';
import HighlightTextBlock from './highlight-text-block';
import ImpactBlock from './impact-block';
import MediaBlock from './media-block';
import NarrativeBlock from './narrative-block';
import NewsletterBlock from './newsletter-block';
import SubstackManualFeed from './substack-manual-feed';

type Props = {
  components: {
    __typename: string;
    id: string;
  }[];
};

const BaseComponents: Record<string, any> = {
  // Add DatoCms blocks here... (Use __typename as key of the map)
  // Eg: RichTextBlock
  SignUpBlockRecord: NewsletterBlock,
  ImpactBlockRecord: ImpactBlock,
  NarrativeBlockRecord: NarrativeBlock,
  HighlightTextBlockRecord: HighlightTextBlock,
  AwarenessBlockRecord: AwarenessBlock,
  CampaignBlockRecord: CampaignBlock,
  DepthAreasBlockRecord: DepthAreasBlock,
  MediaBlockRecord: MediaBlock,
  DonateBlockRecord: DonateBlock,
  SubstackManualFeedRecord: SubstackManualFeed,
};

const BlockBuilder: React.FC<Props> = ({ components = [] }) => {
  return (
    <>
      {components.map((blockComponent) => {
        const { __typename, id, ...rest } = blockComponent;
        const BlockComponent = BaseComponents[__typename];

        if (!BlockComponent) {
          logWarning(`Block component not found for __typename: ${__typename}`);
          return null;
        }

        return <BlockComponent key={id} {...rest} />;
      })}
    </>
  );
};

export default BlockBuilder;
