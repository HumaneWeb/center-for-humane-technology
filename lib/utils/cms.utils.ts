const CMS_MODELS_ROUTE_MAP = {
  BasicPageRecord: '',
  event: '/event',
  post: '/posts',
} as const;

type CmsModelKey = keyof typeof CMS_MODELS_ROUTE_MAP;

export const getLinkCmsUrl = (rawLink: {
  externalUrl?: string;
  content: {
    __typename: string;
    slug: string;
  };
}) => {
  const { externalUrl, content } = rawLink || {};
  if (externalUrl)
    return {
      external: true,
      path: externalUrl,
    };

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
