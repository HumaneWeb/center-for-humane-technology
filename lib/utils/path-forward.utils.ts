import { extractListItemsFromHtml, extractParagraphsFromHtml, splitByH3 } from './text.utils';

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

export type PillarHowSection = {
  heading: string;
  intro?: string;
  items: string[];
};

export type Pillar = {
  id: string;
  number: string;
  title: string;
  summary: string;
  image: string;
  currentPath: string[];
  narrowPath: string[];
  howWeGetThere: PillarHowSection[];
  whatsBeingDone: string[];
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
  image?: { url?: string | null } | null;
};

/**
 * Parses principle content HTML (with <h3>Current Path</h3>, <h3>Narrow Path</h3>, etc.)
 * into the Pillar content shape used by the layout.
 */
export function parsePrincipleContentFromHtml(html: string): {
  currentPath: string[];
  narrowPath: string[];
  howWeGetThere: PillarHowSection[];
  whatsBeingDone: string[];
} {
  const sections = splitByH3(html);
  let currentPath: string[] = [];
  let narrowPath: string[] = [];
  const howWeGetThere: PillarHowSection[] = [];
  let whatsBeingDone: string[] = [];

  const whatsDoneHeading = "what's already being done";
  let inHowWeGetThere = false;

  for (const { heading, content } of sections) {
    const h = heading.toLowerCase().trim();
    if (h === 'current path') {
      inHowWeGetThere = false;
      currentPath = extractParagraphsFromHtml(content);
    } else if (h === 'narrow path') {
      inHowWeGetThere = false;
      narrowPath = extractParagraphsFromHtml(content);
    } else if (h === whatsDoneHeading) {
      inHowWeGetThere = false;
      whatsBeingDone = extractListItemsFromHtml(content);
    } else if (h.includes('how we get there')) {
      inHowWeGetThere = true;
      const paras = extractParagraphsFromHtml(content);
      if (paras.length > 0) {
        howWeGetThere.push({ heading: 'Overview', intro: paras[0], items: paras.slice(1) });
      }
    } else if (inHowWeGetThere) {
      const paras = extractParagraphsFromHtml(content);
      const items = extractListItemsFromHtml(content);
      const intro = paras.length > 0 ? paras[0] : undefined;
      howWeGetThere.push({ heading, intro, items });
    }
  }

  return { currentPath, narrowPath, howWeGetThere, whatsBeingDone };
}

/**
 * Maps a raw CMS principle (id, title, introduction, content HTML, image) to Pillar.
 */
export function mapRawPrincipleToPillar(raw: RawPrinciple, index: number): Pillar {
  const number = String(index + 1).padStart(2, '0');
  const contentHtml = raw.content ?? '';
  const parsed = parsePrincipleContentFromHtml(contentHtml);

  return {
    id: raw.id ?? `pillar-${index + 1}`,
    number,
    title: raw.title ?? '',
    summary: raw.introduction ?? '',
    image: getUrl(raw.image) ?? '',
    currentPath: parsed.currentPath,
    narrowPath: parsed.narrowPath,
    howWeGetThere: parsed.howWeGetThere,
    whatsBeingDone: parsed.whatsBeingDone,
  };
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
