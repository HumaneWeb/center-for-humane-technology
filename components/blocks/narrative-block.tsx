import CustomImage, { CustomImageProps } from '../shared/custom-image';
import CtaList from '../shared/cta-list';
import { cn } from '@/lib/utils/css.utils';
import { CtaProps } from '../shared/cta';
import { FadeIn } from '../shared/fade-in';

type Props = {
  id?: string;
  title: string;
  introduction: string;
  ctas?: CtaProps[];
  image: CustomImageProps;
  imagePosition?: 'right' | 'left';
  extraClass?: string;
  headingExtraClass?: string;
  textExtraClass?: string;
  isTextDark?: boolean;
};

export default function NarrativeBlock({
  title,
  introduction,
  ctas,
  image,
  imagePosition,
  extraClass,
  textExtraClass,
  headingExtraClass,
  isTextDark = false,
}: Props) {
  const isImageLeft = imagePosition === 'left';

  return (
    <section className={cn('narrative-block mb:pb-36 pb-5', extraClass)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="narrative-grid mb:gap-15 grid grid-cols-1 items-center gap-5 lg:grid-cols-2">
          {image && (
            <div className={cn('image-div', isImageLeft ? 'mb:order-1' : 'mb:order-2')}>
              <FadeIn>
                <CustomImage {...image} />{' '}
              </FadeIn>
            </div>
          )}

          <div className={cn('content-div', isImageLeft ? 'mb:order-2' : 'mb:order-1')}>
            <FadeIn delay={0.5}>
              <h2
                className={cn(
                  'text-primary-navy tracking-049 mb:text-[39px] mb:leading-110 mb:mb-[30px] mb-5 font-sans text-[29px] leading-120 font-semibold',
                  textExtraClass,
                  headingExtraClass,
                  isTextDark && 'text-primary-navy',
                )}
              >
                {title}
              </h2>
              <div>
                {introduction && (
                  <div
                    className={cn(
                      'text-primary-navy mb:mb-[30px] mb:text-xl mb-5 font-sans text-[18px] leading-140 font-normal [&>p]:mb-4',
                      textExtraClass,
                      isTextDark && 'text-primary-navy',
                    )}
                    dangerouslySetInnerHTML={{ __html: introduction }}
                  />
                )}
                {ctas && <CtaList items={ctas} />}
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
