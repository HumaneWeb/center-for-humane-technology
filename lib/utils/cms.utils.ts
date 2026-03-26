const CMS_MODELS_ROUTE_MAP = {
  BasicPageRecord: '',
  PodcastRecord: '/podcast',
  TeamMemberRecord: '/team-board',
  LandingRecord: '/landing',
  CaseStudyRecord: '/case-study',
  ToolkitRecord: '/youth',
  CareerRecord: '/careers',
} as const;

type CmsModelKey = keyof typeof CMS_MODELS_ROUTE_MAP;

export type LinkType = {
  externalUrl?: string;
  content: {
    __typename: string;
    basicPageSlug?: string | null;
    podcastListSlug?: string | null;
    podcastSlug?: string | null;
    teamBoardSlug?: string | null;
    landingSlug?: string | null;
    donateSlug?: string | null;
    contactSlug?: string | null;
    caseStudySlug?: string | null;
    caseStudiesListSlug?: string | null;
    blogListSlug?: string | null;
    toolkitSlug?: string | null;
    aiInSocietySlug?: string | null;
    careersListSlug?: string | null;
    areasOfWorkSlug?: string | null;
  };
};

export const getLinkCmsUrl = (rawLink: LinkType) => {
  const { externalUrl, content } = rawLink || {};
  if (externalUrl) {
    const isExternal =
      externalUrl.startsWith('http://') ||
      externalUrl.startsWith('https://') ||
      externalUrl.includes('www.');

    return {
      external: isExternal,
      path: externalUrl,
    };
  }

  const __typename = content?.__typename;
  const slug =
    content?.basicPageSlug ??
    content?.podcastListSlug ??
    content?.podcastSlug ??
    content?.teamBoardSlug ??
    content?.landingSlug ??
    content?.donateSlug ??
    content?.contactSlug ??
    content?.caseStudySlug ??
    content?.caseStudiesListSlug ??
    content?.blogListSlug ??
    content?.toolkitSlug ??
    content?.aiInSocietySlug ??
    content?.careersListSlug ??
    content?.areasOfWorkSlug ??
    '';
  if (__typename in CMS_MODELS_ROUTE_MAP) {
    return {
      external: false,
      path: `${CMS_MODELS_ROUTE_MAP[__typename as CmsModelKey]}/${slug}`,
    };
  }

  return {
    external: false,
    path: `/${slug}`,
  };
};

// Preview utils
const PREVIEW_CMS_MODELS_ROUTE_MAP = {
  basic_page: '',
  podcast: '/podcast',
  team_member: '/team-board',
  landing: '/landing',
  case_study: '/case-study',
  toolkit: '/youth',
  career: '/careers',
  ai_in_society: '',
  areas_of_work: '',
  team_board: '',
  podcast_list: '',
  careers_list: '',
  blog_list: '',
  case_studies_list: '',
  toolkit_list: '',
  donate: '',
  contact: '',
  path_forward: '',
} as const;
type PreviewCmsModelKey = keyof typeof PREVIEW_CMS_MODELS_ROUTE_MAP;

export async function recordToWebsiteRoute(
  item: any,
  itemTypeApiKey: string,
  locale: string,
): Promise<string | null> {
  const __typename = itemTypeApiKey;
  const slug = item?.attributes?.slug;

  if (__typename === 'homepage') {
    return '/';
  }

  if (__typename && __typename in PREVIEW_CMS_MODELS_ROUTE_MAP && slug) {
    const basePath = PREVIEW_CMS_MODELS_ROUTE_MAP[__typename as PreviewCmsModelKey];
    return basePath ? `${basePath}/${slug}` : `/${slug}`;
  }

  console.log('No matching route found for __typename:', __typename);
  return null;
}
