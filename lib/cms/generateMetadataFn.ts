import type { TadaDocumentNode } from 'gql.tada';
import type { Metadata, ResolvingMetadata } from 'next';
import { draftMode } from 'next/headers';
import { type SeoOrFaviconTag, type TitleMetaLinkTag, toNextMetadata } from 'react-datocms/seo';
import { executeQuery } from './executeQuery';

const SHARE_IMAGE = 'https://www.datocms-assets.com/160835/1751894899-cht-share-image.png';

/**
 * Generates a function that fits the Next.js `generateMetadata()` format. This
 * automates the creation of meta tags based on the `_seoMetaTags` present in a
 * DatoCMS GraphQL query.
 */
export function generateMetadataFn<PageProps, Result, Variables>(
  options: GenerateMetadataFnOptions<PageProps, Result, Variables>,
) {
  return async function generateMetadata(
    pageProps: PageProps,
    parent: ResolvingMetadata,
  ): Promise<Metadata> {
    // const { isEnabled: isDraftModeEnabled } = draftMode();
    const variables = options.buildQueryVariables?.(pageProps) || ({} as Variables);

    const [parentMetadata, data] = await Promise.all([
      parent,
      executeQuery(options.query, {
        variables,
        // includeDrafts: isDraftModeEnabled,
      }),
    ]);

    const updatedTags = (options.pickSeoMetaTags(data as Result) || []).map((tag) => {
      if (
        tag.tag === 'meta' &&
        tag.attributes &&
        // @ts-ignore
        (tag.attributes.property === 'og:image' || tag.attributes.name === 'twitter:image')
      ) {
        return {
          ...tag,
          attributes: {
            ...tag.attributes,
            content: SHARE_IMAGE,
          },
        };
      }
      return tag;
    });

    // Combine metadata from parent routes with those of this route:
    return {
      ...(parentMetadata as Metadata),
      // @ts-ignore
      ...toNextMetadata(updatedTags || []),
    };
  };
}

export type BuildQueryVariablesFn<PageProps, Variables> = (context: PageProps) => Variables;

export type GenerateMetadataFnOptions<PageProps, Result, Variables> = {
  /** The GraphQL query that will be used to generate metadata. */
  query: TadaDocumentNode<Result, Variables>;

  /** A function that takes page props and builds and returns the variables
   * required by the GraphQL query. */
  buildQueryVariables?: BuildQueryVariablesFn<PageProps, Variables>;

  /** A callback that picks the SEO meta tags from the result of the query. */
  pickSeoMetaTags: (data: Result) => TitleMetaLinkTag[] | SeoOrFaviconTag[] | undefined;
};
