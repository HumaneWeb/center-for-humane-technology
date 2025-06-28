// @ts-nocheck
import CustomImage, { CustomImageProps } from '../shared/custom-image';
import CustomLink, { CustomLinkProps } from '../shared/custom-link';

type Props = {
  id: string;
  title: string;
  information: string;
  items: {
    id: string;
    title: string;
    image: CustomImageProps | null;
    link: CustomLinkProps | null;
  }[];
};

export default function MediaBlock({ title, items, information }: Props) {
  return (
    <section className="mb:my-24 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-primary-navy mb:text-center mb:text-3xl mb:leading-135 mb:mb-12 mb-10 font-sans text-[23px] leading-120 font-semibold">
            {title}
          </h2>

          <div className="mb:justify-center mb-16 flex flex-wrap items-center gap-x-14 gap-y-8">
            {items.map((item: any) => {
              if (item.link) {
                return (
                  <CustomLink key={item.id} content={item.link}>
                    <CustomImage {...item.image} extraClass="opacity-[.7]" />
                  </CustomLink>
                );
              }

              return (
                <div key={item.id}>
                  <CustomImage {...item.image} extraClass="opacity-[.7]" />
                </div>
              );
            })}
          </div>

          {information && (
            <div
              className="tracking-02 [&>p>a]:text-primary-teal [&>p>a]:hover:text-primary-blue mb:text-xl [&>p]:mb:mb-8 mb:text-center font-sans text-[18px] leading-120 [&>p]:mb-4 [&>p>a]:font-bold [&>p>a]:underline [&>p>a]:transition-all [&>p>a]:duration-200 [&>p>a]:ease-in"
              dangerouslySetInnerHTML={{ __html: information }}
            />
          )}
        </div>
      </div>
    </section>
  );
}
