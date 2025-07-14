import { FadeIn } from '../shared/fade-in';

type Props = {
  title: string;
  items: {
    id: string;
    title: string;
    introduction: string;
  }[];
};

export default function ColumnsBlock({ title, items }: Props) {
  return (
    <section className="mb:mt-20 mb:mb-10 py-8">
      <div className="mb:mb-12 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <h3 className="tracking-049 text-primary-navy mb:text-5xl mb:leading-110 mb:mb-10 mb-5 font-sans text-[29px] leading-120 font-semibold">
            {title}
          </h3>
        </FadeIn>
        <FadeIn delay={0.35} className="mb:grid-cols-3 grid gap-10">
          {items.map((item) => (
            <div key={item.id}>
              <h4 className="text-primary-navy mb:text-2xl mb:leading-130 mb:mb-6 mb-2 font-sans text-xl leading-120 font-semibold">
                {item.title}
              </h4>
              <div
                className="text-primary-navy mb:text-xl font-sans text-[18px] leading-140 font-normal"
                dangerouslySetInnerHTML={{ __html: item.introduction }}
              />
            </div>
          ))}
        </FadeIn>
      </div>
    </section>
  );
}
