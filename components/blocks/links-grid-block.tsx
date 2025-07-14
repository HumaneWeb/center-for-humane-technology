import { FadeIn } from '../shared/fade-in';
import type { LinksBlockProps } from './links-block';
import LinksBlock from './links-block';

type Props = {
  first: LinksBlockProps;
  last: LinksBlockProps;
};

export default function LinksGridBlock({ first, last }: Props) {
  return (
    <div className="bg-neutral-white mb:py-0 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className="mb:grid-cols-2 mb:gap-20 grid gap-10">
          {first && <LinksBlock {...first} isInner />}
          {last && <LinksBlock {...last} isInner />}
        </FadeIn>
      </div>
    </div>
  );
}
