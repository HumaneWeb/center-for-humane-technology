import { cn } from '@/lib/utils/css.utils';

type Props = {
  title: string;
  content: string;
  isTextDark?: boolean;
  contentColor?: string | null;
  /** Default landing: centered. Use `left` inside two-column layouts (e.g. content + embed). */
  align?: 'center' | 'left';
};

const colorClass: Record<string, string> = {
  teal: 'text-primary-teal',
  navy: 'text-primary-navy',
  light: 'text-neutral-white',
};

export default function ContentBlock({ title, content, isTextDark, contentColor, align = 'center' }: Props) {
  const isLeft = align === 'left';
  const colorOverride = contentColor ? colorClass[contentColor] : undefined;

  return (
    <div className="mb:mb-13.5 my-5">
      {title && (
        <h2
          className={cn(
            'tracking-039 text-neutral-white mb:text-[39px] mb:leading-110 mb:mb-9 mb-5 max-w-[840px] font-sans text-[23px] leading-120 font-semibold',
            isLeft ? 'mx-0 max-w-none text-left' : 'mx-auto text-center',
            isTextDark && 'text-primary-navy',
            colorOverride,
          )}
        >
          {title}
        </h2>
      )}
      {content && (
        <div
          dangerouslySetInnerHTML={{ __html: content }}
          className={cn(
            'text-neutral-white mb:text-[25px] mb:mb-20 mb-0 max-w-[840px] font-sans text-xl leading-140 [&>p]:mb-4',
            isLeft ? 'mx-0 max-w-none text-left' : 'mx-auto text-center',
            isTextDark && 'text-primary-navy',
            colorOverride,
          )}
        />
      )}
    </div>
  );
}
