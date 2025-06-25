import Cta from '../shared/cta';
import CustomImage, { CustomImageProps } from '../shared/custom-image';

type Props = {
  id: string;
  title: string;
  introduction: string;
  cta: any;
  image: CustomImageProps;
};

export default function CampaignBlock({ title, introduction, cta, image }: Props) {
  return (
    <section className="mb:mt-24 mb:mb-36 mx-auto my-8 max-w-[1400px] lg:px-8">
      <div className="mb:p-0 mx-auto max-w-7xl bg-[#007981] pt-8">
        <div className="mb:gap-15 grid grid-cols-1 items-center gap-5 lg:grid-cols-2">
          <div className="mb:pl-12 mb:pr-0 px-4">
            <h2 className="text-neutral-white tracking-049 mb:mb-10 mb:text-5xl mb:leading-110 mb-5 font-sans text-[29px] leading-120 font-semibold">
              {title}
            </h2>
            <div>
              {introduction && (
                <div
                  className="text-neutral-white mb:text-xl mb:mb-10 mb-5 font-sans text-[18px] leading-140 [&>p]:mb-4"
                  dangerouslySetInnerHTML={{
                    __html: introduction,
                  }}
                />
              )}
              {cta && <Cta {...cta} />}
            </div>
          </div>

          <div className="aspect-square">
            <CustomImage {...image} extraClass="w-full h-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
