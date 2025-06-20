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
    <section className={cn('narrative-block pb-36', extraClass)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-15 lg:grid-cols-2">
          {image && (
            <div className={isImageLeft ? 'order-2' : 'order-1'}>
              <CustomImage {...image} />
            </div>
          )}

          <div className={isImageLeft ? 'order-1' : 'order-2'}>
            <h2
              className={cn(
                'text-primary-navy tracking-049 mb-8 font-sans text-5xl leading-110 font-semibold',
                textExtraClass,
              )}
            >
              {title}
            </h2>
            <div>
              {introduction && (
                <div
                  className={cn(
                    'text-primary-navy mb-8 font-sans text-xl leading-140 font-medium [&>p]:mb-4',
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
