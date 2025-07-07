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
      ... on PodcastListRecord {
        slug
      }
      ... on PodcastRecord {
        slug
      }
      ... on TeamBoardRecord {
        slug
      }
      ... on LandingRecord {
        slug
      }
      ... on DonateRecord {
        slug
      }
      ... on ContactRecord {
        slug
      }
      ... on CaseStudyRecord {
        slug
      }
      ... on CaseStudiesListRecord {
        slug
      }
      ... on BlogListRecord {
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
      icon
      link {
        ...GlobalLinkFragment
      }
      externalUrl
      hideBlock
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
    title
  }
`);

export const AnchorItemFragment = graphql(`
  fragment AnchorItemFragment on AnchorItemRecord {
    id
    headline
    sublinks {
      ... on AnchorItemRecord {
        id
        headline
      }
    }
  }
`);

export const GenericCardFragment = graphql(
  `
    fragment GenericCardFragment on GenericCardRecord {
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
      variant
    }
  `,
  [ImageFragment, CTAFragment],
);

export const CaseStudyFragment = graphql(
  `
    fragment CaseStudyFragment on CaseStudyRecord {
      id
      title
      introduction
      image {
        ...ImageFragment
      }
      slug
      __typename
    }
  `,
  [ImageFragment],
);

export const PodcastFragment = graphql(
  `
    fragment PodcastFragment on PodcastRecord {
      id
      title
      episode
      introduction
      image {
        ...ImageFragment
      }
      slug
      __typename
    }
  `,
  [ImageFragment],
);

export const BlogFragment = graphql(
  `
    fragment BlogFragment on BlogRecord {
      id
      title
      estTime
      externalUrl
      date
      image {
        ...ImageFragment
      }
    }
  `,
  [ImageFragment],
);

export const PressFragment = graphql(
  `
    fragment PressFragment on PressRecord {
      id
      title
      externalUrl
      source
      length
      date
      category
      image {
        ...ImageFragment
      }
    }
  `,
  [ImageFragment],
);

export const PodcastCardFragment = graphql(
  `
    fragment PodcastCardFragment on PodcastCardRecord {
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
      highlightedPodcast {
        ...PodcastFragment
      }
    }
  `,
  [PodcastFragment],
);

export const ImageBlockFragment = graphql(
  `
    fragment ImageBlockFragment on ImageBlockRecord {
      id
      image {
        ... on AltFileField {
          id
          alt
          width
          height
          url
          title
        }
      }
      alignment
      link {
        ...GlobalLinkFragment
      }
      hideBlock
    }
  `,
  [GlobalLinkFragment],
);

export const ImageContentBlockFragment = graphql(
  `
    fragment ImageContentBlockFragment on ImageContentBlockRecord {
      id
      content
      image {
        ...ImageFragment
      }
      hideBlock
    }
  `,
  [ImageFragment],
);

// Blocks
export const AccordionBlockFragment = graphql(`
  fragment AccordionBlockFragment on AccordionBlockRecord {
    items {
      ... on AccordionItemRecord {
        id
        title
        content
      }
    }
    hideBlock
  }
`);

export const BlockquoteFragment = graphql(
  `
    fragment BlockquoteFragment on BlockquoteRecord {
      content
      footer
      image {
        ...ImageFragment
      }
    }
  `,
  [ImageFragment],
);

export const HighlightedBlockFragment = graphql(
  `
    fragment HighlightedBlockFragment on HighlightedBlockRecord {
      title
      content
      backgroundColor
      variant
      cta {
        ...CTAFragment
      }
      hideBlock
    }
  `,
  [CTAFragment],
);

export const RelatedAnchorBlockFragment = graphql(
  `
    fragment RelatedAnchorBlockFragment on RelatedAnchorBlockRecord {
      items {
        id
        title
        introduction
        image {
          ...ImageFragment
        }
        items {
          ...ImageContentBlockFragment
        }
        information
      }
      information
      hideBlock
    }
  `,
  [ImageFragment, ImageContentBlockFragment],
);

export const TableFragment = graphql(`
  fragment TableFragment on TableRecord {
    content
  }
`);

export const FootnoteFragment = graphql(`
  fragment FootnoteFragment on FootnoteRecord {
    title
    content
  }
`);

export const GuideFragment = graphql(
  `
    fragment GuideFragment on GuideCardRecord {
      title
      introduction
      guideNumber
      icon {
        ...ImageFragment
      }
    }
  `,
  [ImageFragment],
);

export const GridFragment = graphql(
  `
    fragment GridFragment on GridRecord {
      firstColumn {
        value
        blocks {
          __typename
          ... on RecordInterface {
            id
          }
          ...GuideFragment
          ...GenericCardFragment
          ...AccordionBlockFragment
        }
      }
      secondColumn {
        value
        blocks {
          __typename
          ... on RecordInterface {
            id
          }

          ...GuideFragment
          ...GenericCardFragment
          ...AccordionBlockFragment
        }
      }
    }
  `,
  [GuideFragment, GenericCardFragment, AccordionBlockFragment],
);

export const ApproachBlockFragment = graphql(
  `
    fragment ApproachBlockFragment on ApproachBlockRecord {
      headline
      title
      introduction
      cta {
        ...CTAFragment
      }
      backgroundColor
      hideBlock
    }
  `,
  [CTAFragment],
);

export const SignUpBlockFragment = graphql(
  `
    fragment SignUpBlockFragment on SignUpBlockRecord {
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
      hideBlock
    }
  `,
  [ImageFragment, GlobalLinkFragment],
);

export const ThinkingBlockFragment = graphql(
  `
    fragment ThinkingBlockFragment on ThinkingBlockRecord {
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
      hideBlock
    }
  `,
  [ImageFragment, GlobalLinkFragment],
);

export const StatsBlockFragment = graphql(`
  fragment StatsBlockFragment on StatsBlockRecord {
    id
    title
    items {
      ... on StatItemRecord {
        id
        value
        label
      }
    }
    variant
    hideBlock
  }
`);

export const ColumnsBlockFragment = graphql(`
  fragment ColumnsBlockFragment on ColumnsBlockRecord {
    title
    items {
      ... on ColumnItemRecord {
        id
        title
        introduction
      }
    }
    hideBlock
  }
`);

export const GenericCardsGridFragment = graphql(
  `
    fragment GenericCardsGridFragment on GenericCardsGridRecord {
      title
      introduction
      variant
      backgroundColor
      cta {
        ...CTAFragment
      }
      items {
        ...GenericCardFragment
      }
      hideBlock
    }
  `,
  [CTAFragment, GenericCardFragment],
);

export const GalleryImageInformationFragment = graphql(
  `
    fragment GalleryImageInformationFragment on GalleryImageInformationBlockRecord {
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
          ...ImageBlockFragment
        }
      }
      hideBlock
    }
  `,
  [CTAFragment, ImageBlockFragment],
);

export const LinksBlockFragment = graphql(
  `
    fragment LinksBlockFragment on LinksBlockRecord {
      title
      ctas {
        ...CTAFragment
      }
      hideBlock
    }
  `,
  [CTAFragment],
);

export const LinksGridBlockFragment = graphql(
  `
    fragment LinksGridBlockFragment on LinksGridRecord {
      id
      first {
        ...LinksBlockFragment
      }
      last {
        ...LinksBlockFragment
      }
      hideBlock
    }
  `,
  [LinksBlockFragment],
);

export const ContactWidgetBlockFragment = graphql(`
  fragment ContactWidgetBlockFragment on ContactWidgetBlockRecord {
    id
    title
    introduction
    hideBlock
  }
`);

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
      hideBlock
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
      hideBlock
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
      hideBlock
    }
  `,
  [CTAFragment, ImageFragment],
);

export const LandingHighlightTexFragment = graphql(
  `
    fragment LandingHighlightTexFragment on LandingHighlightTextRecord {
      __typename
      id
      title
      firstQuote
      firstQuoteAuthor
      secondQuote
      secondQuoteAuthor
    }
  `,
  [CTAFragment],
);

export const VideoItemFragment = graphql(
  `
    fragment VideoItemFragment on VideoItemRecord {
      __typename
      id
      video {
        title
        url
        thumbnailUrl
      }
      thumbnailImage {
        ...ImageFragment
      }
      hideBlock
    }
  `,
  [ImageFragment],
);

export const ContentBlockFragment = graphql(`
  fragment ContentBlockFragment on ContentBlockRecord {
    __typename
    id
    title
    content
    hideBlock
  }
`);

export const ImageGalleryFragment = graphql(
  `
    fragment ImageGalleryFragment on ImageGalleryRecord {
      __typename
      id
      images {
        ...ImageFragment
      }
    }
  `,
  [ImageFragment],
);

export const LandingHighlightCtaFragment = graphql(
  `
    fragment LandingHighlightCtaFragment on LandingHighlightCtaRecord {
      __typename
      id
      title
      variant
      cta {
        ...CTAFragment
      }
      hideBlock
    }
  `,
  [CTAFragment],
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
      hideBlock
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
        ...GenericCardFragment
      }
      podcastCard {
        ...PodcastCardFragment
      }
      hideBlock
    }
  `,
  [GenericCardFragment, PodcastCardFragment],
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
      hideBlock
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
      hideBlock
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
      ctas {
        ...CTAFragment
      }
      items {
        ...ImageBlockFragment
      }
      hideBlock
    }
  `,
  [ImageBlockFragment, CTAFragment],
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
      hideBlock
    }
  `,
  [CTAFragment, ImageFragment],
);

export const SocialNetworksFragment = graphql(`
  fragment SocialNetworksFragment on SocialNetworksBlockRecord {
    id
    facebookUrl
    facebookLabel
    twitterXUrl
    twitterXLabel
    linkedinUrl
    linkedinLabel
    youtubeUrl
    youtubeLabel
  }
`);

export const TagFragment = graphql(`
  fragment TagFragment on Tag {
    tag
    attributes
    content
  }
`);

export const CareerFragment = graphql(`
  fragment CareerFragment on CareerRecord {
    id
    title
    introduction
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
          ...CareerFragment
        }
        _seoMetaTags {
          ...TagFragment
        }
      }
      careersList: careersList {
        id
        slug
        __typename
      }
      teamList: allTeamMembers(filter: { category: { eq: "team" } }) {
        id
        fullName
        teamPosition
        image {
          ...ImageFragment
        }
        slug
        __typename
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
        __typename
      }
      supporters: allSupporters {
        id
        internalTitle
        externalUrl
        logo {
          ...ImageFragment
        }
      }
      allies: allFoundingAllies {
        id
        name
        description
        externalUrl
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
  [ImageFragment, CTAFragment, TagFragment, CareerFragment],
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
        _seoMetaTags {
          ...TagFragment
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
  [ImageFragment, CTAFragment, TagFragment],
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
        mobileImage {
          ...ImageFragment
        }
        variant
        contentAnchors
        anchors {
          ...AnchorItemFragment
        }
        content {
          value
          blocks {
            __typename
            ... on RecordInterface {
              id
            }
            ...CTAFragment
            ...ImageBlockFragment
            ...ImageContentBlockFragment
            ...NarrativeBlockFragment
            ...ApproachBlockFragment
            ...SignUpBlockFragment
            ...ThinkingBlockFragment
            ...StatsBlockFragment
            ...ImpactBlockFragment
            ...ColumnsBlockFragment
            ...GenericCardsGridFragment
            ...GalleryImageInformationFragment
            ...LinksBlockFragment
            ...HighlightedBlockFragment
            ...RelatedAnchorBlockFragment
            ...LinksGridBlockFragment
            ...ContactWidgetBlockFragment
          }
        }
        _seoMetaTags {
          ...TagFragment
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
  [
    TagFragment,
    CTAFragment,
    AnchorItemFragment,
    ImageBlockFragment,
    ImageContentBlockFragment,
    NarrativeBlockFragment,
    ImpactBlockFragment,
    ApproachBlockFragment,
    SignUpBlockFragment,
    ThinkingBlockFragment,
    StatsBlockFragment,
    ImpactBlockFragment,
    ColumnsBlockFragment,
    GenericCardsGridFragment,
    GalleryImageInformationFragment,
    LinksBlockFragment,
    HighlightedBlockFragment,
    RelatedAnchorBlockFragment,
    LinksGridBlockFragment,
    ContactWidgetBlockFragment,
  ],
);

export const ToolkitPageQuery = graphql(
  `
    query ToolkitQuery($slug: String) {
      page: toolkit(filter: { slug: { eq: $slug } }) {
        title
        preTitle
        introduction
        backgroundColor
        contentBackgroundColor
        image {
          ...ImageFragment
        }
        variant
        contentAnchors
        anchors {
          ...AnchorItemFragment
        }
        content {
          value
          blocks {
            __typename
            ... on RecordInterface {
              id
            }
            ...CTAFragment
            ...ImageBlockFragment
            ...ImageContentBlockFragment
            ...NarrativeBlockFragment
            ...ApproachBlockFragment
            ...SignUpBlockFragment
            ...ThinkingBlockFragment
            ...StatsBlockFragment
            ...ImpactBlockFragment
            ...ColumnsBlockFragment
            ...GenericCardsGridFragment
            ...GalleryImageInformationFragment
            ...LinksBlockFragment
            ...HighlightedBlockFragment
            ...RelatedAnchorBlockFragment
          }
        }
        _seoMetaTags {
          ...TagFragment
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
  [
    TagFragment,
    CTAFragment,
    AnchorItemFragment,
    ImageBlockFragment,
    ImageContentBlockFragment,
    NarrativeBlockFragment,
    ImpactBlockFragment,
    ApproachBlockFragment,
    SignUpBlockFragment,
    ThinkingBlockFragment,
    StatsBlockFragment,
    ImpactBlockFragment,
    ColumnsBlockFragment,
    GenericCardsGridFragment,
    GalleryImageInformationFragment,
    LinksBlockFragment,
    HighlightedBlockFragment,
    RelatedAnchorBlockFragment,
  ],
);

export const CaseStudyPageQuery = graphql(
  `
    query CaseStudyPageQuery($slug: String) {
      page: caseStudy(filter: { slug: { eq: $slug } }) {
        title
        preTitle
        introduction
        backgroundColor
        contentBackgroundColor
        image {
          ...ImageFragment
        }
        variant
        contentAnchors
        anchors {
          ...AnchorItemFragment
        }
        content {
          value
          blocks {
            __typename
            ... on RecordInterface {
              id
            }
            ...CTAFragment
            ...ImageBlockFragment
            ...ImageContentBlockFragment
            ...NarrativeBlockFragment
            ...ApproachBlockFragment
            ...SignUpBlockFragment
            ...ThinkingBlockFragment
            ...StatsBlockFragment
            ...ImpactBlockFragment
            ...ColumnsBlockFragment
            ...GenericCardsGridFragment
            ...GalleryImageInformationFragment
            ...LinksBlockFragment
            ...HighlightedBlockFragment
            ...RelatedAnchorBlockFragment
          }
        }
        _seoMetaTags {
          ...TagFragment
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
  [
    TagFragment,
    CTAFragment,
    AnchorItemFragment,
    ImageBlockFragment,
    ImageContentBlockFragment,
    NarrativeBlockFragment,
    ImpactBlockFragment,
    ApproachBlockFragment,
    SignUpBlockFragment,
    ThinkingBlockFragment,
    StatsBlockFragment,
    ImpactBlockFragment,
    ColumnsBlockFragment,
    GenericCardsGridFragment,
    GalleryImageInformationFragment,
    LinksBlockFragment,
    HighlightedBlockFragment,
    RelatedAnchorBlockFragment,
  ],
);

export const CaseStudiesListQuery = graphql(
  `
    query PodcastListQuery($skip: IntType!, $first: IntType!) {
      page: caseStudiesList {
        title
        _seoMetaTags {
          ...TagFragment
        }
      }
      studies: allCaseStudies(skip: $skip, first: $first, orderBy: _createdAt_DESC) {
        ...CaseStudyFragment
      }
      podcastsCount: _allCaseStudiesMeta {
        count
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
  [ImageFragment, CTAFragment, CaseStudyFragment, TagFragment],
);

export const InThePressListQuery = graphql(
  `
    query InThePressListQuery($skip: IntType!, $first: IntType!) {
      page: blogList {
        title
        _seoMetaTags {
          ...TagFragment
        }
      }
      press: allPresses(skip: $skip, first: $first, orderBy: date_DESC) {
        ...PressFragment
      }
      pressCount: _allPressesMeta {
        count
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
  [ImageFragment, CTAFragment, PressFragment, TagFragment],
);

export const CareerListQuery = graphql(
  `
    query CareerListQuery($skip: IntType!, $first: IntType!) {
      page: careersList {
        title
        _seoMetaTags {
          ...TagFragment
        }
      }
      careers: allCareers(skip: $skip, first: $first, orderBy: title_ASC) {
        ...CareerFragment
      }
      careersCount: _allCareersMeta {
        count
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
  [ImageFragment, CTAFragment, CareerFragment, TagFragment],
);

export const PodcastListQuery = graphql(
  `
    query PodcastListQuery($searchQuery: String!, $skip: IntType!, $first: IntType!) {
      page: podcastList {
        title
        introduction
        extraInformation
        applePodcastsUrl
        spotifyUrl
        youtubeUrl
        image {
          ...ImageFragment
        }
        decoratorIcon {
          ...ImageFragment
        }
        _seoMetaTags {
          ...TagFragment
        }
      }
      podcasts: allPodcasts(
        filter: { title: { matches: { pattern: $searchQuery } } }
        skip: $skip
        first: $first
        orderBy: date_DESC
      ) {
        ...PodcastFragment
      }
      podcastsCount: _allPodcastsMeta(filter: { title: { matches: { pattern: $searchQuery } } }) {
        count
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
  [ImageFragment, CTAFragment, PodcastFragment, TagFragment],
);

export const PodcastDetailQuery = graphql(
  `
    query PodcastDetailQuery($slug: String) {
      podcastList {
        slug
        applePodcastsUrl
        spotifyUrl
        youtubeUrl
        __typename
      }
      podcast(filter: { slug: { eq: $slug } }) {
        title
        introduction
        directDownloadLink
        content {
          value
          blocks
        }
        majorTakeaways {
          value
          blocks
        }
        recommendedMedia {
          value
          blocks
        }
        takeAction {
          value
          blocks
        }
        moreListening {
          ...PodcastFragment
        }
        episode
        date
        applePodcastsUrl
        spotifyUrl
        youtubeUrl
        episodeUrl
        substackUrl
        videoUrl
        image {
          ...ImageFragment
        }
        _seoMetaTags {
          ...TagFragment
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
        newsletterTitle
        newsletterIntroduction
      }
    }
  `,
  [ImageFragment, CTAFragment, TagFragment, PodcastFragment],
);

export const BlogDetailPageQuery = graphql(
  `
    query BlogDetailPageQuery($slug: String) {
      page: blog(filter: { slug: { eq: $slug } }) {
        title
        introduction
        content {
          value
          blocks {
            __typename
            ... on RecordInterface {
              id
            }
            ...CTAFragment
            ...ImageBlockFragment
            ...AccordionBlockFragment
            ...BlockquoteFragment
            ...HighlightedBlockFragment
            ...TableFragment
            ...FootnoteFragment
            ...GenericCardFragment
            ...GridFragment
          }
        }
        _seoMetaTags {
          ...TagFragment
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
  [
    TagFragment,
    ImageFragment,
    ImageBlockFragment,
    AccordionBlockFragment,
    CTAFragment,
    AccordionBlockFragment,
    BlockquoteFragment,
    HighlightedBlockFragment,
    TableFragment,
    FootnoteFragment,
    GenericCardFragment,
    GridFragment,
  ],
);

export const LandingPageQuery = graphql(
  `
    query LandingPageQuery($slug: String) {
      landing(filter: { slug: { eq: $slug } }) {
        title
        subheading
        introduction
        variant
        backgroundColor
        heroTextColor
        heroBackgroundImage {
          ...ImageFragment
        }
        logo {
          ...ImageFragment
        }

        blocks {
          __typename
          ...CTAFragment
          ...LandingHighlightTexFragment
          ...NarrativeBlockFragment
          ...StatsBlockFragment
          ...VideoItemFragment
          ...ContentBlockFragment
          ...ImageGalleryFragment
          ...LandingHighlightCtaFragment
          ...ImageBlockFragment
        }
        _seoMetaTags {
          ...TagFragment
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
        newsletterTitle
        newsletterIntroduction
      }
    }
  `,
  [
    ImageFragment,
    CTAFragment,
    StatsBlockFragment,
    NarrativeBlockFragment,
    TagFragment,
    LandingHighlightTexFragment,
    VideoItemFragment,
    ContentBlockFragment,
    ImageGalleryFragment,
    LandingHighlightCtaFragment,
    ImageBlockFragment,
  ],
);

export const DonatePageQuery = graphql(
  `
    query DonatePageQuery {
      donate {
        title
        informationTitle
        information
        helpItems {
          ...AccordionBlockFragment
        }
        _seoMetaTags {
          ...TagFragment
        }
      }
    }
  `,
  [AccordionBlockFragment, TagFragment],
);

export const ContactPageQuery = graphql(
  `
    query ContactPageQuery {
      page: contact {
        id
        title
        preTitle
        information
        networks {
          ...SocialNetworksFragment
        }
        _seoMetaTags {
          ...TagFragment
        }
      }
    }
  `,
  [SocialNetworksFragment, TagFragment],
);

// Utils
export const LatestPodcastQuery = graphql(
  `
    query LatestPodcastQuery {
      podcast(orderBy: date_DESC) {
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
          ...ImageFragment
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
  [GlobalLinkFragment, ImageFragment],
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
          children {
            id
            label
            link {
              ...GlobalLinkFragment
            }
          }
        }
      }
    }
  `,
  [GlobalLinkFragment],
);
