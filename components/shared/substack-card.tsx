import { cn } from '@/lib/utils/css.utils';
import CustomImage from './custom-image';

type Props = {
  id: string;
  title: string;
  introduction: string | null;
  url: string;
  variant: 'default' | 'minimal';
  image: any | null;
};

export default function SubstackCard({ title, introduction, image, url, variant }: Props) {
  return (
    <a href={url} target="_blank" className="group">
      <article
        className={cn(
          'transition-all duration-200 ease-in',
          variant === 'minimal' && 'bg-neutral-white group-hover:bg-primary-blue w-[400px] p-7',
        )}
      >
        {image && <CustomImage {...image} extraClass="h-[252px] w-full mb-5 object-cover" />}
        <h2
          className={cn(
            'text-primary-teal mb-5 font-sans text-2xl leading-130 font-semibold',
            variant === 'minimal' && 'group-hover:text-neutral-white',
            variant === 'default' && 'group-hover:text-primary-blue',
          )}
        >
          {title}
        </h2>
        {introduction && (
          <p
            className={cn(
              'text-primary-navy font-sans text-[16px] leading-140',
              variant === 'minimal' && 'group-hover:text-neutral-white',
            )}
          >
            {introduction}
          </p>
        )}
      </article>
    </a>
  );
}
