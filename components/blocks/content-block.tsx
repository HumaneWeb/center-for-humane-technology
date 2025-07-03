import { cn } from '@/lib/utils/css.utils';

type Props = {
  title: string;
  content: string;
  isTextDark?: boolean;
};

export default function ContentBlock({ title, content, isTextDark }: Props) {
  return (
    <div className="mb:mb-13.5 my-5">
      {title && (
        <h2
          className={cn(
            'tracking-039 text-neutral-white mb:text-[39px] mb:leading-110 mb:mb-9 mx-auto mb-5 max-w-[840px] text-center font-sans text-[23px] leading-120 font-semibold',
            isTextDark && 'text-primary-navy',
          )}
        >
          {title}
        </h2>
      )}
      {content && (
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className={cn(
            'text-neutral-white mb:text-[25px] mb:mb-20 mx-auto mb-0 max-w-[840px] text-center font-sans text-xl leading-140 [&>p]:mb-4',
            isTextDark && 'text-primary-navy',
          )}
        />
      )}
    </div>
  );
}
