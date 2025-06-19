import { cn } from '@/lib/utils/css.utils';
import CustomImage from './custom-image';
import CtaList from './cta-list';

type Props = {
  id: string;
  title: string;
  preTitle?: string;
  introduction: string | null;
  cta: any;
  variant: 'default' | 'minimal' | 'basic' | 'vertical';
  image: any | null;
};

export default function GenericCard({ title, preTitle, introduction, image, cta, variant }: Props) {
  return (
    <article
      className={cn(
        'group transition-all duration-200 ease-in',
        variant === 'minimal' && 'bg-neutral-white group-hover:bg-primary-blue w-[400px] p-7',
        variant === 'basic' && 'grid grid-cols-2 gap-6',
        variant === 'vertical' && 'bg-[#F0F7F7] p-[30px]',
      )}
    >
      {image && <CustomImage {...image} extraClass="h-[252px] w-full mb-5 object-cover" />}

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
        <h2
          className={cn(
            'text-primary-teal mb-5 font-sans text-2xl leading-130 font-semibold',
            variant === 'minimal' && 'group-hover:text-neutral-white',
            variant === 'default' && 'group-hover:text-primary-blue',
            variant === 'basic' && 'mb-2',
            variant === 'vertical' && 'mb-5',
          )}
        >
          {title}
        </h2>
        {introduction && (
          <div
            className={cn(
              'text-primary-navy font-sans text-[16px] leading-140',
              variant === 'minimal' && 'group-hover:text-neutral-white',
              variant === 'basic' && 'mb-8',
              variant === 'vertical' && 'mb-5',
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
  );
}
