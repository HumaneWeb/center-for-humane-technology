import { cn } from '@/lib/utils/css.utils';

type Props = {
  title: string;
  firstQuote: string;
  firstQuoteAuthor: string;
  secondQuote: string;
  secondQuoteAuthor: string;
  isTextDark?: boolean;
};

export default function LandingHighlightTextBlock({
  title,
  firstQuote,
  firstQuoteAuthor,
  secondQuote,
  secondQuoteAuthor,
  isTextDark = false,
}: Props) {
  return (
    <div className="mb:mt-20 mb:mb-13.5 my-13 flex flex-col justify-end">
      {title && (
        <h3
          className={cn(
            'text-neutral-white tracking-049 mb:text-[49px] mb:leading-110 mb:mb-16 mb-5 font-sans text-[25px] leading-120 font-semibold',
            isTextDark && 'text-primary-navy',
          )}
        >
          {title}
        </h3>
      )}
      <div className="mb:grid-cols-2 mb:gap-24 mb:mb-28 grid gap-8">
        <div>
          {firstQuote && (
            <p
              className={cn(
                'text-neutral-white mb:text-[25px] mb:mb-6 mb-3 font-sans text-xl leading-140 font-normal',
                isTextDark && 'text-primary-navy',
              )}
            >
              {firstQuote}
            </p>
          )}
          {firstQuoteAuthor && (
            <span
              className={cn(
                'text-neutral-white mb:text-xl mb:leading-135 mb:tracking-[1px] mb:text-[18px] font-sans text-[16px] leading-120 font-semibold tracking-[0.9px] uppercase',
                isTextDark && 'text-primary-navy',
              )}
            >
              {firstQuoteAuthor}
            </span>
          )}
        </div>
        <div>
          {secondQuote && (
            <p
              className={cn(
                'text-neutral-white mb:text-[25px] mb:mb-6 mb-3 font-sans text-xl leading-140 font-normal',
                isTextDark && 'text-primary-navy',
              )}
            >
              {secondQuote}
            </p>
          )}
          {secondQuoteAuthor && (
            <span
              className={cn(
                'text-neutral-white mb:text-xl mb:leading-135 mb:tracking-[1px] mb:text-[18px] font-sans text-[16px] leading-120 font-semibold tracking-[0.9px] uppercase',
                isTextDark && 'text-primary-navy',
              )}
            >
              {secondQuoteAuthor}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
