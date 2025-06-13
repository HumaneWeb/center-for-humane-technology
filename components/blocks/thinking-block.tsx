import DepthAreaCard from '../shared/depth-area-card';

type Props = {
  title: string;
  items: {
    id: string;
    title: string;
    introduction: string;
    image: any;
    link: any;
  }[];
};

export default function ThinkingBlock({ title, items }: Props) {
  return (
    <section className="bg-primary-cream pt-16 pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="text-primary-navy mb-16 font-sans text-3xl leading-130 font-semibold">
          {title}
        </h3>

        <div className="grid grid-cols-3 gap-16">
          {items.map((item) => (
            <DepthAreaCard key={item.id} {...item} variant="vertical" />
          ))}
        </div>
      </div>
    </section>
  );
}
