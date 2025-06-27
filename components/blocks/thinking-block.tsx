import type { CustomImageProps } from '../shared/custom-image';
import DepthAreaCard from '../shared/depth-area-card';

type Props = {
  title: string;
  items: {
    id: string;
    title: string;
    introduction: string;
    image: CustomImageProps;
    link: any;
  }[];
};

export default function ThinkingBlock({ title, items }: Props) {
  return (
    <section className="bg-primary-cream mb:pt-16 mb:pb-32 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="text-primary-navy mb:text-3xl mb:leading-130 mb:mb-16 mb-8 font-sans text-[23px] leading-120 font-semibold">
          {title}
        </h3>

        <div className="mb:grid-cols-3 mb:gap-16 grid gap-5">
          {items.map((item) => (
            <DepthAreaCard key={item.id} {...item} variant="vertical" />
          ))}
        </div>
      </div>
    </section>
  );
}
