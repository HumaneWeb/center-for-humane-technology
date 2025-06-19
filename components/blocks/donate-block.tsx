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
    <section
      className="bg-primary-navy bg-contain bg-right bg-no-repeat py-10"
      style={{ backgroundImage: 'url(/donate-bg.png)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-15 lg:grid-cols-2">
          <div>
            {title && (
              <h2 className="text-neutral-white mb-5 font-sans text-3xl leading-140 font-semibold">
                {title}
              </h2>
            )}
            {cta && <Cta {...cta} />}
          </div>

          {image && (
            <div className="flex justify-end">
              <CustomImage {...image} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
