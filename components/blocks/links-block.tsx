import CtaList from '../shared/cta-list';

type Props = {
  title: string;
  ctas: any;
};

export default function LinksBlock({ title, ctas }: Props) {
  return (
    <section className="bg-neutral-white pt-20 pb-30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="tracking-049 text-primary-navy mb-[70px] font-sans text-5xl leading-110 font-semibold">
          {title}
        </h3>

        <div>
          <CtaList items={ctas} variant="underline" extraClassnames="flex-col items-start gap-6" />
        </div>
      </div>
    </section>
  );
}
