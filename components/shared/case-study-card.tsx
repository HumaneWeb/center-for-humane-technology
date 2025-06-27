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
        <h6 className="text-primary-cream mb:leading-135 tracking-08 mb:mb-7 mb-5 font-sans text-[16px] leading-120 font-medium uppercase">
          {preTitle}
        </h6>
      )}
      {title && (
        <h2 className="text-primary-cream tracking-031 mb:text-3xl mb:leading-110 mb:mb-7 mb-5 font-sans text-[23px] leading-120 font-semibold">
          {title}
        </h2>
      )}
      {image && (
        <div className="mb:mb-7 mb-5">
          <CustomImage {...image} />
        </div>
      )}
      {introduction && (
        <div
          className="text-neutral-white mb:text-xl mb-7 font-sans text-[18px] leading-140 font-normal"
          dangerouslySetInnerHTML={{ __html: introduction }}
        />
      )}
      {cta && <CtaList items={cta} ctaExtraClassnames="hover:bg-[#0B1023]" />}
    </article>
  );
}
