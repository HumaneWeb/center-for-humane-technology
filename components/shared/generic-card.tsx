import { cn } from '@/lib/utils/css.utils';
import CustomImage, { CustomImageProps } from './custom-image';
import CtaList from './cta-list';
import { CtaProps } from './cta';

type Props = {
  id: string;
  title: string;
  preTitle?: string;
  introduction: string | null;
  cta?: CtaProps[];
  variant: 'default' | 'minimal' | 'minimal-small' | 'basic' | 'vertical';
  image: CustomImageProps | null;
  extraClassnames?: string;
};

export default function GenericCard({
  title,
  preTitle,
  introduction,
  image,
  cta,
  variant,
  extraClassnames,
}: Props) {
  return (
    <div className="h-full">
      <article
        className={cn(
          'group h-full transition-all duration-200 ease-in',
          variant === 'minimal' && 'bg-neutral-white hover:bg-primary-blue w-[400px] p-7',
          variant === 'basic' && 'grid grid-cols-[1fr_2fr] gap-6',
          variant === 'vertical' && 'bg-[#F0F7F7] p-[30px]',
          variant === 'minimal-small' && 'bg-neutral-white hover:bg-primary-blue w-full p-2.5',
          extraClassnames,
        )}
      >
        {image && (
          <CustomImage
            {...image}
            extraClass={cn(
              'h-[252px] w-full mb-5 object-cover',
              variant === 'minimal-small' && 'h-auto mb-2.5',
            )}
          />
        )}

        <div>
          {preTitle && (
            <h4
              className={cn(
                'tracking-08 mb-2 font-sans text-[16px] leading-135 font-semibold uppercase',
                variant === 'vertical' && 'mb-5',
              )}
            >
              {preTitle}
            </h4>
          )}
          {title && (
            <h2
              className={cn(
                'text-primary-teal mb-5 font-sans text-2xl leading-130 font-semibold',
                (variant === 'minimal' || variant === 'minimal-small') &&
                  'group-hover:text-neutral-white',
                variant === 'default' && 'group-hover:text-primary-blue',
                variant === 'basic' && 'mb-2',
                variant === 'vertical' && 'mb-5',
                variant === 'minimal-small' && 'mb-2.5 text-xl leading-120',
              )}
            >
              {title}
            </h2>
          )}
          {introduction && (
            <div
              className={cn(
                'text-primary-navy font-sans text-[16px] leading-140',
                (variant === 'minimal' || variant === 'minimal-small') &&
                  'group-hover:text-neutral-white',
                variant === 'basic' && 'mb-8',
                variant === 'vertical' && 'mb-5',
                variant === 'minimal-small' && 'text-[13px] leading-135',
              )}
              dangerouslySetInnerHTML={{ __html: introduction }}
            />
          )}
          {cta && (
            <CtaList
              items={cta}
              extraClassnames={cn(variant === 'vertical' && 'flex-col text-center')}
            />
          )}
        </div>
      </article>
    </div>
  );
}
