import { cn } from '@/lib/utils/css.utils';

type Props = {
  title: string;
  content: string;
  isTextDark?: boolean;
  contentColor?: string | null;
  disableMarginBottom?: boolean | null;
  fontSize?: string | null;
  /** Default landing: centered. Use `left` inside two-column layouts (e.g. content + embed). */
  align?: 'center' | 'left';
};

const colorClass: Record<string, string> = {
  teal: 'text-primary-teal',
  navy: 'text-primary-navy',
  light: 'text-neutral-white',
};

/** CMS `fontSize` string → title / body utility classes (matches default block scale when unset). */
const fontSizeTitleClass: Record<string, string> = {
  default: 'text-[23px] leading-120 mb:text-[39px] mb:leading-110',
  medium: 'text-[23px] leading-120 mb:text-[39px] mb:leading-110',
  small: 'text-lg leading-120 mb:text-[28px] mb:leading-110',
  sm: 'text-lg leading-120 mb:text-[28px] mb:leading-110',
  large: 'text-[26px] leading-120 mb:text-[44px] mb:leading-110',
  lg: 'text-[26px] leading-120 mb:text-[44px] mb:leading-110',
};

const fontSizeBodyClass: Record<string, string> = {
  default: 'text-xl mb:text-[25px] leading-140 [&>p]:mb-4',
  medium: 'text-xl mb:text-[25px] leading-140 [&>p]:mb-4',
  small: 'text-base mb:text-lg leading-140 [&>p]:mb-4',
  sm: 'text-base mb:text-lg leading-140 [&>p]:mb-4',
  large: 'text-xl mb:text-[28px] leading-140 [&>p]:mb-4',
  lg: 'text-xl mb:text-[28px] leading-140 [&>p]:mb-4',
};

function resolveFontSize(fontSize: string | null | undefined) {
  const key = fontSize?.trim();
  if (!key) {
    return { title: fontSizeTitleClass.default, body: fontSizeBodyClass.default };
  }
  const title = fontSizeTitleClass[key];
  const body = fontSizeBodyClass[key];
  if (title && body) {
    return { title, body };
  }
  return { title: fontSizeTitleClass.default, body: fontSizeBodyClass.default };
}

export default function ContentBlock({
  title,
  content,
  isTextDark,
  contentColor,
  disableMarginBottom,
  fontSize,
  align = 'center',
}: Props) {
  const isLeft = align === 'left';
  const colorOverride = contentColor ? colorClass[contentColor] : undefined;
  const { title: titleSizeClass, body: bodySizeClass } = resolveFontSize(fontSize);
  const noBottomMargin = Boolean(disableMarginBottom);

  return (
    <div
      className={cn(
        'mt-5',
        noBottomMargin ? 'mb-0 mb:mb-0' : 'mb-5 mb:mb-13.5',
      )}
    >
      {title && (
        <h2
          className={cn(
            'tracking-039 text-neutral-white mb:mb-9 mb-5 max-w-[840px] font-sans font-semibold',
            titleSizeClass,
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
            'text-neutral-white max-w-[840px] font-sans',
            noBottomMargin ? 'mb-0' : 'mb-0 mb:mb-20',
            bodySizeClass,
            isLeft ? 'mx-0 max-w-none text-left' : 'mx-auto text-center',
            isTextDark && 'text-primary-navy',
            colorOverride,
          )}
        />
      )}
    </div>
  );
}
