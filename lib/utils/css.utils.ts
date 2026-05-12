import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Use on a host of `dangerouslySetInnerHTML` so block siblings (p, ol, ul, headings)
 * get even vertical spacing. `[&>div]:contents` lifts a single CMS wrapper div so its
 * children become flex items (otherwise only `>p` margin rules run and lists stay tight).
 */
export const richHtmlBlockStackClass =
  'flex flex-col gap-4 [&>*]:min-w-0 [&>div]:contents' as const;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
