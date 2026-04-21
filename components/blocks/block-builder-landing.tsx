import { logWarning } from '@/lib/utils/logs.utils';
import NarrativeBlock from './narrative-block';
import { CTAWrapper } from '../shared/cta';
import StatsBlock from './stats-block';
import LandingHighlightCtaBlock from './landing-highlight-cta-block';
import LandingHighlightTextBlock from './landing-highlight-text-block';
import ImageGalleryBlock from './image-gallery-block';
import ContentBlock from './content-block';
import VideoItem from '../shared/video-item';
import ImageBlock from './image-block';
import { FadeIn } from '../shared/fade-in';
import ContentMarkdownBlock from './content-markdown-block';
import ButtonsBlock from './buttons-block';
import LogoGridBlock from './logo-grid-block';
import NumberedListBlock from './numbered-list-block';
import ContentCardContainerBlock from './content-card-container-block';
import ContentCtaEmbedBlock from './content-cta-embed-block';
import EmbedBlock from './embed-block';
import PillarTabBlock from './pillar-tab-block';
import TopNavCardBlock from './top-nav-card-block';

type Props = {
  components: {
    __typename: string;
    id: string;
    hideBlock?: boolean;
  }[];
  variant?: 'text-dark' | 'text-default';
  invertPrimaryButtons?: boolean;
};

const BaseComponents: Record<string, React.ElementType | React.ReactNode> = {
  CtaRecord: CTAWrapper,
  LandingHighlightTextRecord: LandingHighlightTextBlock,
  NarrativeBlockRecord: NarrativeBlock,
  StatsBlockRecord: StatsBlock,
  VideoItemRecord: VideoItem,
  ContentBlockRecord: ContentBlock,
  ImageGalleryRecord: ImageGalleryBlock,
  LandingHighlightCtaRecord: LandingHighlightCtaBlock,
  ImageBlockRecord: ImageBlock,
  ContentMarkdownRecord: ContentMarkdownBlock,
  ButtonsBlockRecord: ButtonsBlock,
  LogoGridRecord: LogoGridBlock,
  NumberedListRecord: NumberedListBlock,
  ContentCardContainerRecord: ContentCardContainerBlock,
  ContentCtaEmbedRecord: ContentCtaEmbedBlock,
  EmbedRecord: EmbedBlock,
  PillarTabBlockRecord: PillarTabBlock,
  TopNavCardRecord: TopNavCardBlock,
};

const ExtraProps: Record<string, any> = {
  NarrativeBlockRecord: {
    extraClass: '[&>div]:p-0 mb:mb-0 mb-5',
    textExtraClass: 'text-neutral-white',
  },
};

const BlockBuilderLanding: React.FC<Props> = ({
  components = [],
  variant = 'text-default',
  invertPrimaryButtons = false,
}) => {
  const globalVariantProps = {
    ...(variant === 'text-dark' ? { isTextDark: true as const } : {}),
    ...(invertPrimaryButtons ? { invertPrimaryButtons: true as const } : {}),
  };

  return (
    <>
      {components.map((blockComponent) => {
        const { __typename, id, hideBlock, ...rest } = blockComponent;
        const BlockComponent = BaseComponents[__typename];

        if (!BlockComponent) {
          logWarning(`Block component not found for __typename: ${__typename}`);
          return null;
        }

        if (hideBlock) {
          return null;
        }

        const extraProps = ExtraProps[__typename] || {};
        const variantProps = __typename === 'LogoGridRecord' ? {} : globalVariantProps;
        if (typeof BlockComponent === 'function' || typeof BlockComponent === 'object') {
          return (
            <FadeIn key={id}>
              {/* @ts-ignore */}
              <BlockComponent {...rest} {...extraProps} {...variantProps} />
            </FadeIn>
          );
        }

        return <div key={id}>{BlockComponent}</div>;
      })}
    </>
  );
};

export default BlockBuilderLanding;
