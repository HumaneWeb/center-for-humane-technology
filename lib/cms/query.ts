import { graphql } from '@/lib/cms/graphql';

// Utils
export const GlobalLinkFragment = graphql(`
  fragment GlobalLinkFragment on GlobalLinkRecord {
    id
    externalUrl
    content {
      ... on RecordInterface {
        id
      }
    }
  }
`);

export const CTAFragment = graphql(
  `
    fragment CTAFragment on CtaRecord {
      id
      label
      link {
        ...GlobalLinkFragment
      }
    }
  `,
  [GlobalLinkFragment],
);

export const ImageFragment = graphql(`
  fragment ImageFragment on FileField {
    id
    url
    alt
    width
    height
  }
`);

// Blocks
export const SignupBlockFragment = graphql(
  `
    fragment SignupBlockFragment on SignUpBlockRecord {
      __typename
      id
      title
      introduction
      withFeaturedContent
      featuredTitle
      featuredImage {
        ...ImageFragment
      }
      featuredLink {
        ...GlobalLinkFragment
      }
    }
  `,
  [ImageFragment, GlobalLinkFragment],
);

export const ImpactBlockFragment = graphql(
  `
    fragment ImpactBlockFragment on ImpactBlockRecord {
      __typename
      id
      title
      introduction
      items {
        ... on ImpactBlockItemRecord {
          id
          title
          subtitle
          introduction
          cta {
            ...CTAFragment
          }
        }
      }
    }
  `,
  [CTAFragment],
);

export const NarrativeBlockFragment = graphql(
  `
    fragment NarrativeBlockFragment on NarrativeBlockRecord {
      __typename
      id
      title
      introduction
      ctas {
        ...CTAFragment
      }
      image {
        ...ImageFragment
      }
    }
  `,
  [CTAFragment, ImageFragment],
);

export const HighlightTextBlockFragment = graphql(
  `
    fragment HighlightTextBlockFragment on HighlightTextBlockRecord {
      __typename
      id
      title
      introduction
      dynamicTexts
      cta {
        ...CTAFragment
      }
    }
  `,
  [CTAFragment],
);

export const AwarenessBlockFragment = graphql(`
  fragment AwarenessBlockFragment on AwarenessBlockRecord {
    __typename
    id
  }
`);

export const CampaignBlockFragment = graphql(
  `
    fragment CampaignBlockFragment on CampaignBlockRecord {
      __typename
      id
      title
      introduction
      cta {
        ...CTAFragment
      }
      image {
        ...ImageFragment
      }
    }
  `,
  [CTAFragment, ImageFragment],
);

export const DepthAreasBlockFragment = graphql(
  `
    fragment DepthAreasBlockFragment on DepthAreasBlockRecord {
      __typename
      id
      title
      introduction
      items {
        ... on DepthAreaItemRecord {
          id
          title
          introduction
          image {
            ...ImageFragment
          }
          link {
            ...GlobalLinkFragment
          }
        }
      }
    }
  `,
  [ImageFragment, GlobalLinkFragment],
);

export const MediaBlockFragment = graphql(
  `
    fragment MediaBlockFragment on MediaBlockRecord {
      __typename
      id
      title
      information
      items {
        ... on ImageBlockRecord {
          id
          image {
            ... on AltFileField {
              id
              alt
              width
              height
              url
            }
          }
          link {
            ...GlobalLinkFragment
          }
        }
      }
    }
  `,
  [GlobalLinkFragment],
);

export const DonateBlockFragment = graphql(
  `
    fragment DonateBlockFragment on DonateBlockRecord {
      __typename
      id
      title
      cta {
        ...CTAFragment
      }
      image {
        ...ImageFragment
      }
    }
  `,
  [CTAFragment, ImageFragment],
);

export const TagFragment = graphql(`
  fragment TagFragment on Tag {
    tag
    attributes
    content
  }
`);

// Pages
export const HomepageQuery = graphql(
  `
    query HomepageQuery {
      homepage {
        id
        title
        introduction
        ctas {
          ...CTAFragment
        }
        decorationVideos {
          ... on VideosBlockRecord {
            id
            videos {
              ... on VideoFileField {
                id
                url
                video {
                  muxPlaybackId
                  title
                  width
                  height
                  blurUpThumb
                }
              }
            }
          }
        }
        blocks {
          __typename
          ...SignupBlockFragment
          ...ImpactBlockFragment
          ...NarrativeBlockFragment
          ...HighlightTextBlockFragment
          ...AwarenessBlockFragment
          ...CampaignBlockFragment
          ...DepthAreasBlockFragment
          ...MediaBlockFragment
          ...DonateBlockFragment
        }
        _seoMetaTags {
          ...TagFragment
        }
      }
    }
  `,
  [
    SignupBlockFragment,
    ImpactBlockFragment,
    NarrativeBlockFragment,
    HighlightTextBlockFragment,
    AwarenessBlockFragment,
    CampaignBlockFragment,
    DepthAreasBlockFragment,
    MediaBlockFragment,
    DonateBlockFragment,
    TagFragment,
    CTAFragment,
  ],
);

// Layout
export const FooterQuery = graphql(
  `
    query FooterQuery {
      footer {
        id
        logo {
          id
          url
          alt
          width
          height
        }
        mediaInquiriesEmail
        generalQuestionsEmail
        copyrightText
        extraLinks {
          id
          ...GlobalLinkFragment
        }
        columns {
          ... on FooterColumnRecord {
            id
            headline
            links {
              id
              ...GlobalLinkFragment
            }
          }
        }
        facebookUrl
        twitterXUrl
        linkedinUrl
        youtubeUrl
      }
    }
  `,
  [GlobalLinkFragment],
);

export const NavbarQuery = graphql(`
  query NavbarQuery {
    navbar: allMenuItems(filter: { parent: { exists: false } }, orderBy: position_ASC) {
      id
      label
      asButton
      children {
        id
        label
        position
      }
    }
  }
`);
