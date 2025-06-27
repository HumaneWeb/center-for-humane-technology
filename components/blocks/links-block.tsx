import CtaList from '../shared/cta-list';

type Props = {
  title: string;
  ctas: any;
};

export default function LinksBlock({ title, ctas }: Props) {
  return (
    <section className="bg-neutral-white mb:pt-20 mb:pb-30 py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="tracking-049 text-primary-navy mb:text-5xl mb:leading-110 mb:mb-[70px] mb-5 font-sans text-[29px] leading-120 font-semibold">
          {title}
        </h3>

        <div>
          <CtaList items={ctas} variant="underline" extraClassnames="flex-col items-start gap-6" />
        </div>
      </div>
    </section>
  );
}
