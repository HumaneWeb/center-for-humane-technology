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
    <section className="my-30">
      <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="tracking-049 text-primary-navy mb-10 font-sans text-5xl leading-110 font-semibold">
          {title}
        </h3>
        <div className="grid grid-cols-3 gap-7">
          {items.map((item) => (
            <div key={item.id}>
              <h4 className="text-primary-navy mb-6 font-sans text-2xl leading-130 font-semibold">
                {item.title}
              </h4>
              <div
                className="text-primary-navy font-sans text-xl leading-140 font-medium"
                dangerouslySetInnerHTML={{ __html: item.introduction }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
