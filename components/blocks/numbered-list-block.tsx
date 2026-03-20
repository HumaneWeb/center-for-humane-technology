import { cn } from '@/lib/utils/css.utils';

type ListItem = {
  id: string;
  title?: string | null;
  content?: string | null;
};

function listItemHasContent(item: ListItem) {
  return Boolean(item.title?.trim() || item.content?.trim());
}

type Props = {
  id: string;
  listItems: ListItem[];
  isTextDark?: boolean;
};

export default function NumberedListBlock({ listItems, isTextDark = false }: Props) {
  if (!listItems?.length) {
    return null;
  }

  return (
    <section className="mb:mb-13.5 my-5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ul
          className={cn(
            'numbered-list-block list-none divide-y',
            isTextDark && 'divide-neutral-light-gray',
            !isTextDark && 'divide-white/15',
          )}
        >
          {listItems.filter(listItemHasContent).map((item) => {
            const hasBody = Boolean(item.content?.trim());
            const hasTitle = Boolean(item.title?.trim());
            return (
              <li
                key={item.id}
                className={cn(
                  'numbered-list-block__item mb:gap-8 mb:py-10 flex gap-5 py-8 first:pt-0 last:pb-0',
                  /* ::before counter inherits `color` from the li — body default was leaving it navy */
                  !isTextDark && 'text-white/50',
                  isTextDark && 'text-neutral-gray',
                )}
              >
                <div className="numbered-list-block__stack min-w-0 flex-1">
                  {hasTitle && (
                    <h3
                      className={cn(
                        'mb:mb-3 mb:text-xl mb-2 font-sans text-lg leading-130 font-semibold',
                        isTextDark ? 'text-primary-navy' : 'text-neutral-white',
                      )}
                    >
                      {item.title}
                    </h3>
                  )}
                  {hasBody && (
                    <div
                      className={cn(
                        'numbered-list-block__body font-sans text-base leading-140 [&>p]:mb-3 [&>p:last-child]:mb-0',
                        /* CMS HTML puts copy in <p>, <li>, nested headings, etc. — set color on descendants so it wins over body {} and Dato classes. */
                        isTextDark &&
                          'text-neutral-medium-gray [&_p]:text-neutral-medium-gray [&_li]:text-neutral-medium-gray [&_strong]:text-primary-navy [&_a]:text-primary-teal',
                        !isTextDark &&
                          'text-neutral-white/85 [&_p]:text-neutral-white/85 [&_li]:text-neutral-white/85 [&_ul]:text-neutral-white/85 [&_ol]:text-neutral-white/85 [&_strong]:text-neutral-white [&_em]:text-neutral-white/90 [&_h1]:text-neutral-white [&_h2]:text-neutral-white [&_h3]:text-neutral-white [&_h4]:text-neutral-white [&_a]:text-secondary-light-teal [&_a]:underline',
                      )}
                      dangerouslySetInnerHTML={{ __html: item.content! }}
                    />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
