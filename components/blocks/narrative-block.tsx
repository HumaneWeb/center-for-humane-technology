import CustomImage, { CustomImageProps } from '../shared/custom-image';
import CtaList from '../shared/cta-list';
import { cn } from '@/lib/utils/css.utils';

type Props = {
  id: string;
  title: string;
  introduction: string;
  ctas: any;
  image: CustomImageProps;
  imagePosition: 'right' | 'left';
  extraClass?: string;
  textExtraClass?: string;
};

export default function NarrativeBlock({
  title,
  introduction,
  ctas,
  image,
  imagePosition,
  extraClass,
  textExtraClass,
}: Props) {
  const isImageLeft = imagePosition === 'left';

  return (
    <section className={cn('narrative-block mb:pb-36 pb-5', extraClass)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb:gap-15 grid grid-cols-1 items-center gap-5 lg:grid-cols-2">
          {image && (
            <div className={isImageLeft ? 'mb:order-1' : 'mb:order-2'}>
              <CustomImage {...image} />
            </div>
          )}

          <div className={isImageLeft ? 'mb:order-2' : 'mb:order-1'}>
            <h2
              className={cn(
                'text-primary-navy tracking-049 mb:text-5xl mb:leading-110 mb:mb-8 mb-5 font-sans text-[29px] leading-120 font-semibold',
                textExtraClass,
              )}
            >
              {title}
            </h2>
            <div>
              {introduction && (
                <div
                  className={cn(
                    'text-primary-navy mb:mb-8 mb:text-xl mb-5 font-sans text-[18px] leading-140 font-medium [&>p]:mb-4',
                    textExtraClass,
                  )}
                  dangerouslySetInnerHTML={{ __html: introduction }}
                />
              )}
              {ctas && <CtaList items={ctas} />}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
