import { cn } from '@/lib/utils/css.utils';
import CustomImage, { CustomImageProps } from './custom-image';
import CtaList from './cta-list';
import { CtaProps } from './cta';
import CustomLink from './custom-link';

type Props = {
  id: string;
  title: string;
  preTitle?: string;
  introduction: string | null;
  cta?: CtaProps[];
  variant: 'default' | 'minimal' | 'minimal-small' | 'basic' | 'vertical';
  image: CustomImageProps | null;
  extraClassnames?: string;
  wrapperExtraClassnames?: string;
  externalUrl?: string;
};

export default function GenericCard({
  title,
  preTitle,
  introduction,
  image,
  cta,
  variant,
  extraClassnames,
  wrapperExtraClassnames,
  externalUrl,
}: Props) {
  const renderContent = () => (
    <article
      className={cn(
        'group flex h-full flex-col transition-all duration-200 ease-in',
        variant === 'default' && 'generic-card-grid',
        variant === 'minimal' && 'bg-neutral-white hover:bg-primary-blue mb:w-[400px] p-7',
        variant === 'basic' && 'mb:grid-cols-[1fr_2fr] mb:gap-6 grid',
        variant === 'vertical' && 'mb:p-[30px] bg-[#F0F7F7] p-[15px]',
        variant === 'minimal-small' && 'bg-neutral-white hover:bg-primary-blue w-full p-2.5',
        extraClassnames,
      )}
    >
      {variant === 'default' && title && (
        <h2 className="generic-card-pre-title mb:leading-130 text-primary-teal group-hover:text-primary-blue mb:text-[25px] mb:mb-5 mb-4 font-sans text-xl leading-120 font-semibold">
          {title}
        </h2>
      )}
      {image && (
        <CustomImage
          {...image}
          extraClass={cn(
            'w-full mb:mb-5 mb-4 object-cover aspect-[3/2]',
            variant === 'minimal-small' && 'h-auto mb-2.5',
            variant === 'default' && 'generic-card-image',
          )}
        />
      )}

      <div className="flex flex-1 flex-col">
        {preTitle && (
          <h4
            className={cn(
              'tracking-08 mb-2 font-sans text-[16px] leading-135 font-semibold uppercase',
              variant === 'vertical' && 'mb-5',
              variant === 'default' && 'generic-card-pre-title',
              (variant === 'minimal' || variant === 'minimal-small') &&
                'group-hover:text-neutral-white',
            )}
          >
            {preTitle}
          </h4>
        )}
        {externalUrl ? (
          <a href={externalUrl} target="_blank">
            <h2
              className={cn(
                'text-primary-teal mb:mb-5 mb-1 font-sans text-2xl leading-130 font-semibold',
                (variant === 'minimal' || variant === 'minimal-small') &&
                  'group-hover:text-neutral-white mb-4 text-xl',
                variant === 'basic' && 'mb-2',
                variant === 'vertical' && 'mb-5',
                variant === 'minimal-small' && 'mb-2.5 text-xl leading-120',
                variant === 'default' && 'generic-card-title',
              )}
            >
              {title}
            </h2>
          </a>
        ) : (
          variant !== 'default' &&
          title && (
            <h2
              className={cn(
                'text-primary-teal mb:mb-5 mb-1 font-sans text-2xl leading-130 font-semibold',
                (variant === 'minimal' || variant === 'minimal-small') &&
                  'group-hover:text-neutral-white mb-4 text-xl',
                variant === 'basic' && 'mb-2',
                variant === 'vertical' && 'mb-5',
                variant === 'minimal-small' && 'mb-2.5 text-xl leading-120',
              )}
            >
              {title}
            </h2>
          )
        )}
        {introduction && (
          <div
            className={cn(
              'special-introduction text-primary-navy font-sans text-[16px] leading-140',
              (variant === 'minimal' || variant === 'minimal-small') &&
                'group-hover:text-neutral-white',
              variant === 'basic' && 'mb:mb-8',
              variant === 'vertical' && 'mb-5',
              variant === 'minimal-small' && 'text-[16px] leading-140',
              variant === 'default' && 'generic-card-introduction',
              (variant === 'minimal' || variant === 'minimal-small') &&
                'group-hover:text-neutral-white group-hover:[&>span]:text-neutral-white!',
            )}
            dangerouslySetInnerHTML={{ __html: introduction }}
          />
        )}
        {cta && variant !== 'default' && (
          <CtaList
            items={cta}
            extraClassnames={cn(
              'mt-5 flex-1 items-end',
              variant === 'vertical' && 'flex-col justify-end text-center mt-0 items-stretch',
            )}
          />
        )}
      </div>
    </article>
  );

  if (variant === 'default' && cta && cta?.length > 0) {
    return (
      // @ts-expect-error
      <CustomLink content={cta[0].link}>{renderContent()}</CustomLink>
    );
  }

  return <div className={wrapperExtraClassnames}>{renderContent()}</div>;
}
