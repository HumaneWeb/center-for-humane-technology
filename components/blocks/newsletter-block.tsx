import type { CustomImageProps } from '../shared/custom-image';

type Props = {
  id: string;
  title: string;
  introduction: string;
  withFeaturedContent: boolean;
  featuredTitle: string;
  featuredImage: CustomImageProps;
  featuredLink: any;
};

export default function NewsletterBlock({
  title,
  introduction,
  withFeaturedContent,
  featuredTitle,
  featuredImage,
  featuredLink,
}: Props) {
  const renderFeaturedBlock = () => (
    <section className="flex w-full flex-col md:flex-row">
      <div
        className="flex w-full items-end justify-end bg-cover bg-center bg-no-repeat px-12 pt-44 pb-7 md:w-1/2"
        style={{ backgroundImage: `url(${featuredImage!.url})` }}
      >
        <div className="max-w-sm text-center md:max-w-[560px]">
          <h2 className="text-primary-cream text-left font-sans text-[29px] leading-130 font-semibold">
            {featuredTitle}
          </h2>
        </div>
      </div>

      <div className="bg-secondary-light-purple/20 flex w-full items-center justify-start px-7 py-14 md:w-1/2">
        <div className="w-full md:max-w-[560px]">
          <h2 className="text-primary-blue mb-3 font-sans text-3xl leading-130 font-semibold">
            {title}
          </h2>
          {introduction && (
            <div
              className="text-primary-navy mb-5 font-sans text-[16px] leading-135"
              dangerouslySetInnerHTML={{ __html: introduction }}
            />
          )}

          <SubstackNewsletterWidget />
        </div>
      </div>
    </section>
  );

  if (withFeaturedContent) {
    return renderFeaturedBlock();
  }

  return (
    <div className="bg-neutral-white">
      <section className="bg-secondary-light-purple/20 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-2">
            <div>
              <h2 className="text-primary-blue mb-3 font-sans text-3xl leading-130 font-semibold">
                {title}
              </h2>
              {introduction && (
                <div
                  className="text-primary-navy font-sans text-xl leading-140 font-medium"
                  dangerouslySetInnerHTML={{ __html: introduction }}
                />
              )}
            </div>
            <div>
              <SubstackNewsletterWidget />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export const SubstackNewsletterWidget = () => {
  return (
    <>
      <div data-supascribe-embed-id="853810951530" data-supascribe-subscribe />
    </>
  );
};
