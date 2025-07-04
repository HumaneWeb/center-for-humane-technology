import { cn } from '@/lib/utils/css.utils';
import CustomImage, { CustomImageProps } from './custom-image';

type Props = {
  content: string;
  footer: string;
  image?: CustomImageProps;
};

export default function Blockquote({ content, footer, image }: Props) {
  return (
    <blockquote className="border-primary-blue max-w-[517px] border-l-2 bg-[#F0F7F7] py-6 pr-6 pl-[54px]">
      {content && (
        <div
          className="text-primary-blue mb-4 font-sans text-xl leading-140 font-medium"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
      {footer && (
        <footer
          className={cn(
            'text-primary-blue font-sans text-[16px] leading-140',
            image && 'flex items-center gap-3.5',
          )}
        >
          {image && (
            <div>
              <CustomImage {...image} />
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: footer }} />
        </footer>
      )}
    </blockquote>
  );
}
