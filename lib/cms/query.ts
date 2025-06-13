import { graphql } from '@/lib/cms/graphql';

// Utils
export const GlobalLinkFragment = graphql(`
  fragment GlobalLinkFragment on GlobalLinkRecord {
    id
    internalTitle
    externalUrl
    content {
      __typename
      ... on BasicPageRecord {
        slug
      }
    }
  }
`);

export const CTAFragment = graphql(
  `
    fragment CTAFragment on CtaRecord {
      id
      label
      helperLabel
      variant
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
      cta {
        ...CTAFragment
      }
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
      imagePosition
    }
  `,
  [CTAFragment, ImageFragment],
);

export const SubstackManualFeedFragment = graphql(
  `
    fragment SubstackManualFeedFragment on SubstackManualFeedRecord {
      __typename
      id
      title
      introduction
      backgroundColor
      variant
      cta {
        ...CTAFragment
      }
      items {
        ... on SubstackCardRecord {
          id
          title
          introduction
          url
          variant
          image {
            ...ImageFragment
          }
        }
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

export const AwarenessBlockFragment = graphql(
  `
    fragment AwarenessBlockFragment on AwarenessBlockRecord {
      __typename
      id
      caseStudyCard {
        ... on GenericCardRecord {
          id
          title
          preTitle
          introduction
          image {
            ...ImageFragment
          }
          cta {
            ...CTAFragment
          }
        }
      }
      podcastCard {
        ... on PodcastCardRecord {
          id
          title
          preTitle
          introduction
          cta {
            ...CTAFragment
          }
          icon {
            ...ImageFragment
          }
          higlightedPodcast {
            ... on PodcastRecord {
              id
              title
              episode
              introduction
              image {
                ...ImageFragment
              }
              slug
              _modelApiKey
            }
          }
        }
      }
    }
  `,
  [CTAFragment, ImageFragment],
);

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

export const TeamAndBoardQuery = graphql(
  `
    query TeamAndBoardQuery {
      page: teamBoard {
        id
        title
        preTitle
        careers {
          ... on CareerRecord {
            id
            title
            introduction
          }
        }
      }
      teamList: allTeamMembers(filter: { category: { eq: "team" } }) {
        id
        fullName
        teamPosition
        image {
          ...ImageFragment
        }
        slug
        _modelApiKey
      }
      boardList: allTeamMembers(filter: { category: { eq: "board" } }) {
        id
        fullName
        teamPosition
        organization
        image {
          ...ImageFragment
        }
        slug
        _modelApiKey
      }
      configuration {
        newsletterTitle
        newsletterIntroduction
        donateTitle
        donateCta {
          ...CTAFragment
        }
        donateImage {
          ...ImageFragment
        }
      }
    }
  `,
  [ImageFragment, CTAFragment],
);

export const TeamDetailQuery = graphql(
  `
    query TeamDetailQuery($slug: String) {
      teamBoard: teamBoard {
        title
        slug
        __typename
      }
      member: teamMember(filter: { slug: { eq: $slug } }) {
        fullName
        teamPosition
        organization
        information {
          value
        }
        image {
          ...ImageFragment
        }
        twitterXUrl
        linkedinUrl
        email
      }
      configuration {
        donateTitle
        donateImage {
          ...ImageFragment
        }
        donateCta {
          ...CTAFragment
        }
      }
    }
  `,
  [ImageFragment, CTAFragment],
);

export const SubstackQuery = graphql(
  `
    query SubstackQuery {
      configuration {
        newsletterTitle
        newsletterIntroduction
        donateTitle
        donateCta {
          ...CTAFragment
        }
        donateImage {
          ...ImageFragment
        }
      }
    }
  `,
  [CTAFragment, ImageFragment],
);

export const BasicPageQuery = graphql(
  `
    query BasicPageQuery($slug: String) {
      page: basicPage(filter: { slug: { eq: $slug } }) {
        title
        preTitle
        introduction
        backgroundColor
        contentBackgroundColor
        image {
          ...ImageFragment
        }
        content {
          value
          blocks {
            __typename
            ... on RecordInterface {
              id
            }
            ... on CtaRecord {
              ...CTAFragment
            }
            ... on ImageBlockRecord {
              image {
                url
                width
                height
                alt
              }
            }
            ... on ImageContentBlockRecord {
              content
              image {
                ...ImageFragment
              }
            }
            ... on NarrativeBlockRecord {
              title
              introduction
              ctas {
                ...CTAFragment
              }
              image {
                ...ImageFragment
              }
              imagePosition
            }
            ... on ApproachBlockRecord {
              headline
              title
              introduction
              cta {
                ...CTAFragment
              }
              backgroundColor
            }
            ... on SignUpBlockRecord {
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
            ... on ThinkingBlockRecord {
              title
              items {
                ... on ThinkingCardRecord {
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
            ... on StatsBlockRecord {
              title
              items {
                ... on StatItemRecord {
                  id
                  value
                  label
                }
              }
            }
            ...ImpactBlockFragment
            ... on ColumnsBlockRecord {
              title
              items {
                ... on ColumnItemRecord {
                  id
                  title
                  introduction
                }
              }
            }
            ... on SubstackManualFeedRecord {
              title
              introduction
              variant
              cta {
                ...CTAFragment
              }
              items {
                ... on SubstackCardRecord {
                  id
                  title
                  introduction
                  variant
                  image {
                    ...ImageFragment
                  }
                }
              }
            }
            ... on GalleryImageInformationBlockRecord {
              title
              highlightedInformation
              information
              ctas {
                ...CTAFragment
              }
              items {
                id
                preTitle
                title
                image {
                  id
                  image {
                    url
                  }
                }
              }
            }
            ... on LinksBlockRecord {
              title
              ctas {
                ...CTAFragment
              }
            }
          }
        }
      }
      configuration {
        donateTitle
        donateImage {
          ...ImageFragment
        }
        donateCta {
          ...CTAFragment
        }
      }
    }
  `,
  [ImageFragment, CTAFragment, ImpactBlockFragment],
);

export const PodcastListQuery = graphql(
  `
    query PodcastListQuery {
      page: podcastList {
        title
        introduction
        image {
          ...ImageFragment
        }
        decoratorIcon {
          ...ImageFragment
        }
      }
      podcasts: allPodcasts {
        ... on PodcastRecord {
          id
          title
          introduction
          image {
            ...ImageFragment
          }
          slug
          _modelApiKey
        }
      }
      configuration {
        newsletterTitle
        newsletterIntroduction
        donateTitle
        donateImage {
          ...ImageFragment
        }
        donateCta {
          ...CTAFragment
        }
      }
    }
  `,
  [ImageFragment, CTAFragment],
);

export const PodcastDetailQuery = graphql(
  `
    query PodcastDetailQuery($slug: String) {
      teamBoard: teamBoard {
        title
        slug
        __typename
      }
      podcast(filter: { slug: { eq: $slug } }) {
        title
        introduction
        image {
          ...ImageFragment
        }
      }
      moreReading: allPodcasts(filter: { slug: { neq: $slug } }) {
        id
        title
        introduction
        image {
          ...ImageFragment
        }
        slug
        _modelApiKey
      }
      configuration {
        donateTitle
        donateImage {
          ...ImageFragment
        }
        donateCta {
          ...CTAFragment
        }
        newsletterTitle
        newsletterIntroduction
      }
    }
  `,
  [ImageFragment, CTAFragment],
);

// Utils
export const LatestPodcastQuery = graphql(
  `
    query LatestPodcastQuery {
      podcast(orderBy: _createdAt_ASC) {
        id
        title
        episode
        introduction
        image {
          ...ImageFragment
        }
        slug
        _modelApiKey
      }
    }
  `,
  [ImageFragment],
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
          internalTitle
          ...GlobalLinkFragment
        }
        columns {
          ... on FooterColumnRecord {
            id
            headline
            links {
              id
              internalTitle
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

export const NavbarQuery = graphql(
  `
    query NavbarQuery {
      navbar: allMenuItems(filter: { parent: { exists: false } }, orderBy: position_ASC) {
        id
        label
        asButton
        link {
          ...GlobalLinkFragment
        }
        children {
          id
          label
          link {
            ...GlobalLinkFragment
          }
        }
      }
    }
  `,
  [GlobalLinkFragment],
);
