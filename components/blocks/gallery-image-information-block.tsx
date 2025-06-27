import CtaList from '../shared/cta-list';
import type { CustomImageProps } from '../shared/custom-image';
import ImageGallery from '../shared/image-gallery';

type Props = {
  title: string;
  highlightedInformation: string;
  information: string;
  ctas: any;
  items: {
    id: string;
    preTitle: string;
    title: string;
    image: CustomImageProps;
  }[];
};

export default function GalleryImageInformationBlock({
  title,
  highlightedInformation,
  information,
  ctas,
  items,
}: Props) {
  return (
    <section className="bg-neutral-white mb:pb-36 pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="tracking-049 text-primary-navy mb:text-5xl mb:leading-110 mb:mb-14 mb-5 font-sans text-[29px] leading-120 font-semibold">
          {title}
        </h3>

        <div className="mb:grid-cols-2 mb:gap-24 grid gap-8">
          <div>
            <div
              className="text-primary-navy mb:text-2xl mb-5 font-sans text-[20px] leading-140 font-medium"
              dangerouslySetInnerHTML={{ __html: highlightedInformation }}
            />
            <div
              className="text-primary-navy mb:text-xl mb:mb-14 mb-8 font-sans text-[18px] leading-140 font-medium"
              dangerouslySetInnerHTML={{ __html: information }}
            />
            <CtaList items={ctas} extraClassnames="flex-col items-start gap-8" variant="minimal" />
          </div>
          <ImageGallery images={items} />
        </div>
      </div>
    </section>
  );
}
