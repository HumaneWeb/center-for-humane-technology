type Props = {
  title: string;
  items: {
    id: string;
    value: string;
    label: string;
  }[];
};

export default function StatsBlock({ title, items }: Props) {
  return (
    <section className="bg-primary-blue mt-20 mb-32 pt-14 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="text-primary-cream mb-14 font-sans text-2xl leading-130 font-semibold">
          {title}
        </h3>

        <div className="grid grid-cols-3 gap-20">
          {items.map((item) => (
            <div key={item.id} className="flex items-end gap-2.5">
              <h4 className="font-sans text-7xl leading-[78%] font-semibold text-[#93F2EF]">
                {item.value}
              </h4>
              <h6 className="text-primary-cream max-w-24 font-sans text-xl leading-110 font-semibold">
                {item.label}
              </h6>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
