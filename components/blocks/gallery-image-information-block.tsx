import CtaList from '../shared/cta-list';
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
    image: any;
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
    <section className="bg-neutral-white pb-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-24">
          <div>
            <h3 className="tracking-049 text-primary-navy mb-12 font-sans text-5xl leading-110 font-semibold">
              {title}
            </h3>
            <div
              className="text-primary-navy mb-5 font-sans text-2xl leading-140 font-medium"
              dangerouslySetInnerHTML={{ __html: highlightedInformation }}
            />
            <div
              className="text-primary-navy mb-3.5 font-sans text-xl leading-140 font-medium"
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
