import { cn } from '@/lib/utils/css.utils';

type Props = {
  content: string;
  isTextDark?: boolean;
};

export default function ContentMarkdownBlock({ content, isTextDark }: Props) {
  if (!content) {
    return null;
  }

  return (
    <div className="mb:mb-13.5 my-5">
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className={cn(
          'text-neutral-white mb:text-[25px] mb:mb-20 mx-auto mb-0 max-w-[840px] font-sans text-xl leading-140',
          '[&>p]:mb-4 [&>p]:text-center',
          '[&>h1]:tracking-039 [&>h1]:mb:text-[39px] [&>h1]:mb:leading-110 [&>h1]:mb:mb-9 [&>h1]:mb-5 [&>h1]:text-center [&>h1]:font-sans [&>h1]:text-[23px] [&>h1]:leading-120 [&>h1]:font-semibold',
          '[&>h2]:tracking-039 [&>h2]:mb:text-[32px] [&>h2]:mb:leading-110 [&>h2]:mb:mb-7 [&>h2]:mb-4 [&>h2]:text-center [&>h2]:font-sans [&>h2]:text-[20px] [&>h2]:leading-120 [&>h2]:font-semibold',
          '[&>h3]:mb:text-[25px] [&>h3]:mb:mb-5 [&>h3]:mb-3 [&>h3]:text-center [&>h3]:font-sans [&>h3]:text-[18px] [&>h3]:leading-130 [&>h3]:font-semibold',
          '[&>ul]:list-disc [&>ul]:pl-10 [&>ul]:mx-auto [&>ul]:max-w-fit [&>ul>li]:mb-3 [&>ul>li]:text-left',
          '[&>ol]:list-decimal [&>ol]:pl-10 [&>ol]:mx-auto [&>ol]:max-w-fit [&>ol>li]:mb-3 [&>ol>li]:text-left',
          '[&_a]:font-semibold [&_a]:underline [&_a]:hover:opacity-80',
          '[&>blockquote]:border-l-4 [&>blockquote]:border-primary-blue [&>blockquote]:pl-5 [&>blockquote]:italic [&>blockquote]:my-6',
          '[&>code]:bg-gray-100 [&>code]:px-2 [&>code]:py-1 [&>code]:rounded [&>code]:text-sm',
          '[&>pre]:bg-gray-100 [&>pre]:p-4 [&>pre]:rounded [&>pre]:overflow-x-auto [&>pre]:text-left [&>pre]:my-4',
          '[&>pre>code]:bg-transparent [&>pre>code]:p-0',
          isTextDark && 'text-primary-navy',
        )}
      />
    </div>
  );
}
