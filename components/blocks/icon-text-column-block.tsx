import CustomImage, { CustomImageProps } from '../shared/custom-image';
import { FadeIn } from '../shared/fade-in';
import { cn, richHtmlBlockStackClass } from '@/lib/utils/css.utils';

type ColumnItem = {
  id: string;
  heading?: string | null;
  copy?: string | null;
  iconImage: CustomImageProps;
};

type Props = {
  columns: number;
  blocks: ColumnItem[];
};

function gridColsClass(n: number): string {
  const c = Math.min(Math.max(Math.floor(n) || 1, 1), 6);
  const map: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
    6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  };
  return map[c] ?? map[2];
}

export default function IconTextColumnBlock({ columns, blocks }: Props) {
  if (!blocks?.length) return null;

  return (
    <section className="mb:my-11 my-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn className={cn('grid gap-10 mb:gap-12', gridColsClass(columns))}>
          {blocks.map((block) => (
            <div key={block.id} className="flex flex-col items-center text-center">
              <CustomImage
                {...block.iconImage}
                extraClass="mb-6 h-auto w-full max-w-[280px] object-contain"
              />
              {block.heading && (
                <h4 className="text-primary-navy mb:text-2xl mb:leading-130 mb:mb-4 mb-2 font-sans text-xl leading-120 font-semibold">
                  {block.heading}
                </h4>
              )}
              {block.copy && (
                <div
                  className={cn(
                    richHtmlBlockStackClass,
                    'w-full text-primary-navy mb:text-xl font-sans text-[18px] leading-140 font-normal',
                    '[&>p]:text-center',
                    '[&_ul]:mx-auto [&_ul]:max-w-fit [&_ul]:list-disc [&_ul]:pl-10 [&_ul]:text-left',
                    '[&_ol]:mx-auto [&_ol]:max-w-fit [&_ol]:list-decimal [&_ol]:pl-10 [&_ol]:text-left',
                    '[&_li]:mb-3 [&_li]:text-left [&_li]:last:mb-0',
                    '[&_li_ul]:mt-2 [&_li_ol]:mt-2',
                    '[&_a]:font-semibold [&_a]:text-primary-teal [&_a]:underline [&_a]:hover:opacity-80',
                    '[&>blockquote]:border-primary-blue [&>blockquote]:my-0 [&>blockquote]:border-l-4 [&>blockquote]:py-2 [&>blockquote]:pl-5 [&>blockquote]:italic',
                    '[&>code]:rounded [&>code]:bg-gray-100 [&>code]:px-2 [&>code]:py-1 [&>code]:text-sm',
                    '[&>pre]:my-0 [&>pre]:overflow-x-auto [&>pre]:rounded [&>pre]:bg-gray-100 [&>pre]:p-4 [&>pre]:text-left',
                    '[&>pre>code]:bg-transparent [&>pre>code]:p-0',
                    '[&_strong]:font-semibold [&_em]:italic',
                  )}
                  dangerouslySetInnerHTML={{ __html: block.copy }}
                />
              )}
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
