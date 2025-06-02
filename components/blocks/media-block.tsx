import { FragmentOf, readFragment } from '@/lib/cms/graphql';
import { MediaBlockFragment } from '@/lib/cms/query';
import CustomImage from '../shared/custom-image';
import CustomLink from '../shared/custom-link';

type Props = FragmentOf<typeof MediaBlockFragment>;

export default function MediaBlock(data: Props) {
  const { title, items, information } = readFragment(MediaBlockFragment, data);

  return (
    <section className="my-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-primary-navy mb-12 text-center font-sans text-3xl leading-135 font-semibold">
            {title}
          </h2>

          <div className="mb-16 flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
            {items.map((item) => {
              if (item.link) {
                return (
                  // @ts-expect-error
                  <CustomLink key={item.id} content={item.link}>
                    <CustomImage {...item.image} />
                  </CustomLink>
                );
              }

              return (
                <div key={item.id}>
                  <CustomImage {...item.image} />
                </div>
              );
            })}
          </div>

          {information && (
            <div
              className="tracking-02 [&>p>a]:text-primary-teal text-center font-sans text-xl leading-120 [&>p]:mb-8 [&>p>a]:font-bold [&>p>a]:underline"
              dangerouslySetInnerHTML={{ __html: information }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
