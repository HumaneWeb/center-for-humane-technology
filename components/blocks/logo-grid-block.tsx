import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import CustomImage from '../shared/custom-image';
import { FadeIn } from '../shared/fade-in';
import { cn } from '@/lib/utils/css.utils';

type LogoItem = {
  id: string;
  logo: {
    id: string;
    url: string;
    alt: string;
    width: number;
    height: number;
    title: string;
  };
  altText: string | null;
  linkUrl: string | null;
  openNewTab: boolean;
};

type Props = {
  columns?: number | null;
  logos?: LogoItem[] | null;
};

const DESKTOP_COLS: Record<number, string> = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
  5: 'lg:grid-cols-5',
  6: 'lg:grid-cols-6',
  7: 'lg:grid-cols-7',
  8: 'lg:grid-cols-8',
};

const cardClass =
  'group relative rounded-sm border border-neutral-light-gray bg-neutral-white p-6 shadow-sm transition-all duration-300 hover:border-primary-blue/30 hover:shadow-lg md:p-8';

const CardContent = ({ item }: { item: LogoItem }) => (
  <>
    <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-neutral-200/0 to-neutral-200/0 transition-all duration-300 group-hover:from-neutral-200/25 group-hover:to-blue-50/20" />

    <div className="relative flex h-20 items-center justify-center md:h-24">
      <CustomImage
        {...item.logo}
        alt={item.altText ?? item.logo.alt ?? ''}
        extraClass="max-h-full max-w-full object-contain grayscale filter transition-all duration-300 group-hover:grayscale-0"
      />
    </div>

    {item.linkUrl && (
      <div className="absolute top-2 right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="bg-primary-teal/20 flex h-6 w-6 items-center justify-center rounded-full">
          <ExternalLink className="text-primary-teal h-3 w-3" />
        </div>
      </div>
    )}
  </>
);

export default function LogoGridBlock({ columns = 4, logos }: Props) {
  const list = (logos ?? []).filter((item) => item?.logo?.url);
  if (list.length === 0) {
    return null;
  }

  const desktopCols = DESKTOP_COLS[columns ?? 4] ?? 'lg:grid-cols-4';

  return (
    <section className="py-10 mb:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <div className={cn('grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-8', desktopCols)}>
            {list.map((item) =>
              item.linkUrl ? (
                <Link
                  key={item.id}
                  href={item.linkUrl}
                  target={item.openNewTab ? '_blank' : '_self'}
                  rel={item.openNewTab ? 'noopener noreferrer' : undefined}
                  className={cardClass}
                >
                  <CardContent item={item} />
                </Link>
              ) : (
                <div key={item.id} className={cardClass}>
                  <CardContent item={item} />
                </div>
              ),
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
