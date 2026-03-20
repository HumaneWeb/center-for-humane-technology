import { cn } from '@/lib/utils/css.utils';

type Props = {
  id: string;
  snippet: string;
  isTextDark?: boolean;
};

/** Raw HTML from CMS — rendered as returned (trusted editorial content). */
export default function EmbedBlock({ snippet, isTextDark = false }: Props) {
  if (!snippet?.trim()) {
    return null;
  }

  return (
    <section className="mb:mb-13.5 my-5">
      <div
        className={cn(
          'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8',
          isTextDark && 'text-primary-navy',
          !isTextDark && 'text-neutral-white',
        )}
      >
        <div dangerouslySetInnerHTML={{ __html: snippet }} />
      </div>
    </section>
  );
}
