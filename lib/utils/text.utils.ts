/**
 * Splits markdown/text into paragraphs (by double newline).
 * Returns an array of non-empty trimmed paragraphs.
 */
export function toParagraphs(text: string | null | undefined): string[] {
  if (!text?.trim()) return [];
  return text
    .trim()
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Returns the number of words in a string. */
export function wordCount(s: string): number {
  return s.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Takes up to maxWords from the start of text.
 * Returns the taken substring, how many words were consumed, and whether there is more content.
 */
export function takeWords(
  text: string,
  maxWords: number,
): { text: string; consumed: number; hasMore: boolean } {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const hasMore = words.length > maxWords;
  const taken = hasMore ? words.slice(0, maxWords).join(' ') : text.trim();
  const consumed = hasMore ? maxWords : words.length;
  return { text: taken, consumed, hasMore };
}

/** Strip HTML tags and decode common entities; returns plain text. */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&lsquo;|&rsquo;/g, "'")
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

/** Extract paragraph texts from HTML (content inside <p>...</p>). */
export function extractParagraphsFromHtml(html: string): string[] {
  const parts = html.split(/<\/p>\s*<p[^>]*>/i);
  return parts
    .map((p) => stripHtml(p.replace(/^<p[^>]*>/i, '').replace(/<\/p>$/i, '')))
    .filter(Boolean);
}

/** Extract list item texts from HTML (content inside <li>...</li>). */
export function extractListItemsFromHtml(html: string): string[] {
  const matches = html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi);
  return Array.from(matches)
    .map((m) => stripHtml(m[1]))
    .filter(Boolean);
}

/**
 * Split HTML by <h3>...</h3> sections. Returns array of { heading, content }.
 * Content is the raw HTML between this heading and the next <h3>.
 */
export function splitByH3(html: string): { heading: string; content: string }[] {
  const sections: { heading: string; content: string }[] = [];
  const regex = /<h3[^>]*>([\s\S]*?)<\/h3>([\s\S]*?)(?=<h3[^>]*>|$)/gi;
  let match;
  while ((match = regex.exec(html)) !== null) {
    const heading = stripHtml(match[1]).trim();
    const content = match[2].trim();
    if (heading || content) sections.push({ heading, content });
  }
  return sections;
}
