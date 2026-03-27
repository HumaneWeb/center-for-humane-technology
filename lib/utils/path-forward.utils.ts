import { extractParagraphsFromHtml } from './text.utils';

export type ImageVariant =
  | 'glass'
  | 'rules'
  | 'hooks'
  | 'hand-brain'
  | 'justice'
  | 'missile'
  | 'hand-chart';

/** Safely get URL from DatoCMS FileField (object with url) or string. */
function getUrl(field: unknown): string | undefined {
  if (field == null) return undefined;
  if (typeof field === 'string') return field || undefined;
  if (
    typeof field === 'object' &&
    'url' in field &&
    typeof (field as { url: unknown }).url === 'string'
  ) {
    return (field as { url: string }).url || undefined;
  }
  return undefined;
}

export type Pillar = {
  id: string;
  number: string;
  title: string;
  summary: string;
  imageVariant?: ImageVariant;
  image: string;
  imageDetail?: string;
  content: string;
};

export type PathForwardCmsPage = {
  title?: string | null;
  introduction?: string | null;
  introductionHighlight?: string | null;
  introductionLabel?: string | null;
  image?: { url?: string | null } | null;
  principles?: Array<{
    id: string;
    title?: string | null;
    introduction?: string | null;
    content?: string | null;
    image?: { url?: string | null } | null;
  }> | null;
  report?: { url?: string | null } | null;
  signers?: Array<{
    id: string;
    name?: string | null;
    signerPosition?: string | null;
    image?: { url?: string | null } | null;
  }> | null;
  systemIntroduction?: string | null;
  systemIntroductionHighlight?: string | null;
  systemLabel?: string | null;
};

type RawPrinciple = {
  id: string;
  title?: string | null;
  introduction?: string | null;
  content?: string | null;
  imageVariant?: string | null;
  image?: { url?: string | null } | null;
  imageDetail?: { url?: string | null } | null;
};

/**
 * Maps a raw CMS principle (id, title, introduction, content HTML, image) to Pillar.
 */
export function mapRawPrincipleToPillar(raw: RawPrinciple, index: number): Pillar {
  const number = String(index + 1).padStart(2, '0');

  return {
    id: raw.id ?? `pillar-${index + 1}`,
    number,
    title: raw.title ?? '',
    summary: raw.introduction ?? '',
    imageVariant: isImageVariant(raw.imageVariant) ? raw.imageVariant : undefined,
    image: getUrl(raw.image) ?? '',
    imageDetail: getUrl(raw.imageDetail) ?? '',
    content: raw.content ?? '',
  };
}

function isImageVariant(v: unknown): v is ImageVariant {
  return (
    v === 'glass' ||
    v === 'rules' ||
    v === 'hooks' ||
    v === 'hand-brain' ||
    v === 'justice' ||
    v === 'missile' ||
    v === 'hand-chart'
  );
}

/**
 * Builds bridge section data from raw CMS fields (systemLabel, systemIntroduction, systemIntroductionHighlight).
 */
export function getBridgeFromCms(data: {
  systemLabel?: string | null;
  systemIntroduction?: string | null;
  systemIntroductionHighlight?: string | null;
}): { headline: string; paragraphs: string[] } {
  const headline = data.systemLabel ?? '';
  const highlight = data.systemIntroductionHighlight ?? '';
  const systemIntro = data.systemIntroduction ?? '';
  const paragraphsFromIntro = extractParagraphsFromHtml(systemIntro);
  if (paragraphsFromIntro.length === 0 && systemIntro.trim()) {
    paragraphsFromIntro.push(
      systemIntro
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim(),
    );
  }
  const paragraphs = highlight ? [highlight, ...paragraphsFromIntro] : paragraphsFromIntro;
  return { headline, paragraphs };
}
