import Link from 'next/link';
import CustomImage, { type CustomImageProps } from '../shared/custom-image';
import { FadeIn } from '../shared/fade-in';

type Item = {
  id: string;
  caption?: string | null;
  link?: string | null;
  image: CustomImageProps;
};

type Props = {
  introduction?: string | null;
  items?: Item[] | null;
};

function toInternalPath(href: string) {
  if (href.startsWith('/')) return href;

  try {
    const url = new URL(href);
    if (url.hostname === 'www.humanetech.com' || url.hostname === 'humanetech.com') {
      return `${url.pathname}${url.search}${url.hash}`;
    }
  } catch {
    return null;
  }

  return null;
}

export default function ImpactImageGridBlock({ introduction, items }: Props) {
  const list = (items ?? []).filter((item) => item?.image?.url);
  if (!introduction && list.length === 0) {
    return null;
  }

  return (
    <section className={introduction ? 'mb:pt-16 mb:pb-8 pt-12 pb-6' : 'mb:pb-8 pt-0 pb-6'}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {introduction && (
          <FadeIn>
            <div
              className="text-primary-navy mb:text-xl mb:mb-4 mb-3 font-sans text-[18px] leading-140 [&>p]:mb-4 [&>p:last-child]:mb-0 [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: introduction }}
            />
          </FadeIn>
        )}
        {list.length > 0 && (
          <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
            {list.map((item) => {
              const card = (
                <figure>
                  <CustomImage {...item.image} extraClass="h-auto w-full" />
                  {item.caption && (
                    <figcaption
                      className="text-primary-navy mt-3 font-sans text-[16px] leading-140 [&_em]:italic"
                      dangerouslySetInnerHTML={{ __html: item.caption }}
                    />
                  )}
                </figure>
              );

              if (!item.link) {
                return <div key={item.id}>{card}</div>;
              }

              const internalPath = toInternalPath(item.link);

              if (internalPath) {
                return (
                  <Link key={item.id} href={internalPath} className="block">
                    {card}
                  </Link>
                );
              }

              return (
                <a
                  key={item.id}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {card}
                </a>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
