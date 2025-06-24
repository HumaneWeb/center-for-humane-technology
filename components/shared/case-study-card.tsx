import CustomImage, { CustomImageProps } from './custom-image';
import CtaList from './cta-list';

type Props = {
  id: string;
  title: string;
  preTitle: string;
  introduction: string;
  image: CustomImageProps;
  cta: any;
  variant: string;
};

export default function CaseStudyCard({ title, preTitle, image, introduction, cta }: Props) {
  return (
    <article>
      {preTitle && (
        <h6 className="text-primary-cream tracking-075 mb-7 font-sans text-[15px] leading-135 font-medium uppercase">
          {preTitle}
        </h6>
      )}
      {title && (
        <h2 className="text-primary-cream tracking-031 mb-7 font-sans text-3xl leading-110 font-semibold">
          {title}
        </h2>
      )}
      {image && (
        <div className="mb-7">
          <CustomImage {...image} />
        </div>
      )}
      {introduction && (
        <div
          className="text-neutral-white mb-7 font-sans text-xl leading-140 font-medium"
          dangerouslySetInnerHTML={{ __html: introduction }}
        />
      )}
      {cta && <CtaList items={cta} ctaExtraClassnames="hover:bg-[#0B1023]" />}
    </article>
  );
}
