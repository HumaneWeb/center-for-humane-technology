import Cta from '../shared/cta';
import { cn } from '@/lib/utils/css.utils';
import { FadeIn } from '../shared/fade-in';

type Props = {
  id: string;
  title: string;
  introduction: string;
  cta: any;
  items: {
    id: string;
    title: string;
    subtitle: string;
    introduction: string;
    cta: any;
  }[];
  extraClass?: string;
};

export default function ImpactBlock({ title, introduction, items, cta, extraClass }: Props) {
  const [firstItem, secondItem] = items;

  return (
    <section className={cn('mb:mt-20 mb:mb-48 my-8', extraClass)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-[840px]">
          {title && (
            <FadeIn>
              <h2 className="text-primary-navy tracking-049 mb:text-5xl mb:leading-110 mb-[30px] font-sans text-[29px] leading-120 font-semibold">
                {title}
              </h2>
            </FadeIn>
          )}
          {introduction && (
            <FadeIn delay={0.5}>
              <div
                className="text-primary-navy mb:text-xl mb-[30px] font-sans text-[18px] leading-140 font-normal"
                dangerouslySetInnerHTML={{ __html: introduction }}
              />
            </FadeIn>
          )}
          {cta && (
            <FadeIn delay={0.6}>
              <Cta {...cta} extraClass="mb:mb-28 mb-10" />
            </FadeIn>
          )}
        </div>

        <div className="mb:flex-row mb:gap-16 mb:items-center circle-grid flex w-full flex-col justify-between gap-5">
          <FadeIn delay={0.6}>
            <div className="mb:text-right circle-grid-item-1">
              <h3 className="text-primary-teal mb:text-3xl mb:leading-100 mb-3 font-sans text-[23px] leading-120 font-semibold">
                {firstItem.title}
              </h3>
              {firstItem.subtitle && (
                <span className="text-primary-teal mb:text-xl mb-3.5 block font-sans text-[18px] leading-120 font-semibold">
                  {firstItem.subtitle}
                </span>
              )}
              {firstItem.introduction && (
                <div
                  className="text-primary-navy mb:leading-135 mb:max-w-[340px] mb-3.5 font-sans text-[16px] leading-140 font-normal"
                  dangerouslySetInnerHTML={{
                    __html: firstItem.introduction,
                  }}
                />
              )}
            </div>

            <div className="impact-block-last-item-mobile">
              <div className="circle-grid-item-3">
                <h3 className="text-primary-blue mb:text-3xl mb:leading-100 mb-3 font-sans text-[23px] leading-120 font-semibold">
                  {secondItem.title}
                </h3>
                {secondItem.subtitle && (
                  <span className="text-primary-blue mb:text-xl mb-3.5 block font-sans text-[18px] leading-120 font-semibold">
                    {secondItem.subtitle}
                  </span>
                )}
                {secondItem.introduction && (
                  <div
                    className="text-primary-navy mb:leading-135 mb:max-w-[340px] font-sans text-[16px] leading-140 font-normal"
                    dangerouslySetInnerHTML={{
                      __html: secondItem.introduction,
                    }}
                  />
                )}
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <GraphicImpact />
          </FadeIn>

          <FadeIn delay={0.6} className="impact-block-last-item">
            <div className="circle-grid-item-3">
              <h3 className="text-primary-blue mb:text-3xl mb:leading-100 mb-3 font-sans text-[23px] leading-120 font-semibold">
                {secondItem.title}
              </h3>
              {secondItem.subtitle && (
                <span className="text-primary-blue mb:text-xl mb-3.5 block font-sans text-[18px] leading-120 font-semibold">
                  {secondItem.subtitle}
                </span>
              )}
              {secondItem.introduction && (
                <div
                  className="text-primary-navy mb:leading-135 mb:max-w-[340px] font-sans text-[16px] leading-140 font-normal"
                  dangerouslySetInnerHTML={{
                    __html: secondItem.introduction,
                  }}
                />
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

const GraphicImpact = () => (
  <div className="circle-grid-item-2 relative">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="467"
      height="467"
      viewBox="0 0 467 467"
      fill="none"
      className="mb:w-full mb:mb-0 mx-auto mb-3.5 h-full w-[90%] drop-shadow-lg"
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
