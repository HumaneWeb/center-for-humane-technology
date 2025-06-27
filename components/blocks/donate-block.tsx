import Cta, { CtaProps } from '../shared/cta';
import CustomImage, { CustomImageProps } from '../shared/custom-image';

type Props = {
  id: string | null;
  title: string | null;
  cta: CtaProps;
  image: CustomImageProps;
};

export default function DonateBlock({ title, cta, image }: Props) {
  return (
    <section className="bg-primary-navy mb:py-10 py-8 md:bg-[url('/donate-bg.png')] md:bg-contain md:bg-right md:bg-no-repeat">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-15 lg:grid-cols-2">
          <div>
            {title && (
              <h2 className="text-neutral-white mb:text-3xl mb:leading-140 mb-5 font-sans text-[25px] leading-110 font-semibold">
                {title}
              </h2>
            )}
            {cta && <Cta {...cta} />}
          </div>

          {image && (
            <div className="mb:flex hidden justify-end">
              <CustomImage {...image} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
