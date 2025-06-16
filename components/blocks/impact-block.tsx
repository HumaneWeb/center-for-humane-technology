import Cta from '../shared/cta';
import { ResultOf, readFragment } from '@/lib/cms/graphql';
import { ImpactBlockFragment } from '@/lib/cms/query';
import { cn } from '@/lib/utils/css.utils';

type Props = ResultOf<typeof ImpactBlockFragment> & {
  extraClass?: string;
};

export default function ImpactBlock(data: Props) {
  // @ts-expect-error
  const { title, introduction, items, cta, extraClass } = readFragment(ImpactBlockFragment, data);
  const [firstItem, secondItem] = items;

  return (
    <section className={cn('mt-20 mb-48', extraClass)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-[840px]">
          {title && (
            <h2 className="text-primary-navy tracking-049 mb-5 font-sans text-5xl leading-110 font-semibold">
              {title}
            </h2>
          )}
          {introduction && (
            <div
              className="text-primary-navy mb-5 font-sans text-xl leading-140 font-medium"
              dangerouslySetInnerHTML={{ __html: introduction }}
            />
          )}
          {cta && <Cta {...cta} extraClass="mb-28" />}
        </div>

        <div className="flex w-full items-center justify-between gap-16">
          <div className="text-right">
            <h3 className="text-primary-teal mb-1 font-sans text-3xl leading-100 font-semibold">
              {firstItem.title}
            </h3>
            <span className="text-primary-teal mb-3.5 block font-sans text-xl leading-120 font-semibold">
              {firstItem.subtitle}
            </span>
            {firstItem.introduction && (
              <div
                className="text-primary-navy mb-3.5 max-w-[340px] font-sans text-[16px] leading-135 font-normal"
                dangerouslySetInnerHTML={{
                  __html: firstItem.introduction,
                }}
              />
            )}
          </div>

          <GraphicImpact />

          <div>
            <h3 className="text-primary-blue mb-1 font-sans text-3xl leading-100 font-semibold">
              {secondItem.title}
            </h3>
            <span className="text-primary-blue mb-3.5 block font-sans text-xl leading-120 font-semibold">
              {secondItem.subtitle}
            </span>
            {secondItem.introduction && (
              <div
                className="text-primary-navy mb-3.5 max-w-[340px] font-sans text-[16px] leading-135 font-normal"
                dangerouslySetInnerHTML={{
                  __html: secondItem.introduction,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

const GraphicImpact = () => (
  <div className="relative">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="467"
      height="467"
      viewBox="0 0 467 467"
      fill="none"
      className="drop-shadow-lg"
    >
      <g className="outer-ring">
        <path
          d="M398.689 398.689C307.608 489.77 159.392 489.77 68.311 398.689C-22.7703 307.608 -22.7703 159.392 68.311 68.311C159.392 -22.7703 307.608 -22.7703 398.689 68.311C489.77 159.392 489.77 307.608 398.689 398.689ZM134.875 134.875C80.4922 189.257 80.4922 277.743 134.875 332.125C189.257 386.508 277.743 386.508 332.125 332.125C386.508 277.743 386.508 189.257 332.125 134.875C277.743 80.4922 189.257 80.4922 134.875 134.875Z"
          fill="url(#paint0_linear_3161_856)"
        />
      </g>

      <g className="inner-ring">
        <path
          d="M398.689 398.689C307.608 489.77 159.392 489.77 68.311 398.689L123.038 385.875L134.875 332.125C189.257 386.508 277.743 386.508 332.125 332.125C386.508 277.743 386.508 189.257 332.125 134.875L347.047 84.2087L398.689 68.311C489.77 159.392 489.77 307.608 398.689 398.689Z"
          fill="url(#paint1_linear_3161_856)"
        />
      </g>

      <defs>
        <linearGradient
          id="paint0_linear_3161_856"
          x1="232.187"
          y1="168.925"
          x2="12.9351"
          y2="145.318"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#0D787D" />
          <stop offset="1" stopColor="#18DAE3" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_3161_856"
          x1="409.775"
          y1="146.913"
          x2="126.317"
          y2="431.738"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#6F87EE" />
          <stop offset="1" stopColor="#293462" />
        </linearGradient>
      </defs>
    </svg>
  </div>
);
