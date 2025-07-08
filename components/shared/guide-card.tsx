import { cn } from '@/lib/utils/css.utils';
import CustomImage, { CustomImageProps } from './custom-image';
import CustomLink, { CustomLinkProps } from './custom-link';

type Props = {
  title: string;
  introduction: string;
  information?: string;
  guideNumber: string;
  icon: CustomImageProps;
  variant: 'blue' | 'green' | 'yellow' | 'orange';
  link: CustomLinkProps;
};

export default function GuideCard({
  title,
  introduction,
  information,
  guideNumber,
  icon,
  variant = 'blue',
  link,
}: Props) {
  const cardContent = () => (
    <article
      className={cn(
        'p-8',
        variant === 'blue' && 'bg-guide-card',
        variant === 'green' && 'bg-guide-green-card',
        variant === 'yellow' && 'bg-guide-yellow-card',
        variant === 'orange' && 'bg-guide-orange-card',
      )}
    >
      {guideNumber && (
        <span className="text-neutral-white tracking-039 mb-4 block font-sans text-4xl leading-110 font-semibold">
          {guideNumber}
        </span>
      )}
      {title && (
        <h3 className="text-neutral-white mb-4 font-sans text-2xl leading-130 font-semibold">
          {title}
        </h3>
      )}
      {introduction && (
        <div
          className="text-neutral-white mb-5 font-sans text-[18px] leading-140 font-medium"
          dangerouslySetInnerHTML={{ __html: introduction }}
        />
      )}
      {information && (
        <div
          className="text-neutral-white mb-5 font-sans text-[18px] leading-140 font-medium"
          dangerouslySetInnerHTML={{ __html: information }}
        />
      )}
      {icon && <CustomImage {...icon} />}
    </article>
  );

  if (link) {
    return (
      // @ts-ignore
      <CustomLink content={{ content: link.content, externalUrl: link.externalUrl }}>
        {cardContent()}
      </CustomLink>
    );
  }

  return cardContent();
}
