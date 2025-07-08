const CMS_MODELS_ROUTE_MAP = {
  BasicPageRecord: '',
  PodcastRecord: '/podcast',
  TeamMemberRecord: '/team-board',
  LandingRecord: '/landing',
  CaseStudyRecord: '/case-study',
  ToolkitRecord: '/youth',
} as const;

type CmsModelKey = keyof typeof CMS_MODELS_ROUTE_MAP;

export type LinkType = {
  externalUrl?: string;
  content: { __typename: string; slug: string };
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

  const { __typename, slug } = content || {};
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
