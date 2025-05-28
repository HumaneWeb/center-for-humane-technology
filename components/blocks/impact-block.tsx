import Cta from '../shared/cta';

export default function ImpactBlock() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-[840px]">
          <h2 className="text-primary-navy mb-5 font-sans text-5xl leading-110 font-semibold">
            We work to shift the incentives shaping technology’s design and impact.
          </h2>
          <p className="text-primary-navy mb-28 font-sans text-xl leading-140">
            Our strategy operates across three reinforcing fronts: changing public narratives,
            informing policy, and engaging with industry to raise internal standards. These efforts
            form a reinforcing feedback loop that moves the tech ecosystem toward long-term,
            structural change.
          </p>
        </div>

        <div className="mx-auto flex w-full max-w-6xl justify-between gap-10">
          <div>
            <h3 className="text-primary-teal mb-1 font-sans text-3xl leading-100 font-semibold">
              Public Awareness
            </h3>
            <span className="text-primary-teal mb-3.5 block font-sans text-xl leading-120 font-semibold">
              Cultivate an engaged society
            </span>
            <p className="text-primary-navy mb-3.5 font-sans text-[16px] leading-135 font-normal">
              We inspire public engagement by demystifying the causes of our digital challenges,
              offering a clear vision for humane technology, and building a sustained constituency
              for change.
            </p>
            <Cta label="Read more" href="/" />
          </div>
          <div>
            <GraphicImpact />
          </div>
          <div className="self-end">
            <h3 className="text-primary-blue mb-1 font-sans text-3xl leading-100 font-semibold">
              Policy & Law
            </h3>
            <span className="text-primary-blue mb-3.5 block font-sans text-xl leading-120 font-semibold">
              Shift Key incentives
            </span>
            <p className="text-primary-navy mb-3.5 font-sans text-[16px] leading-135 font-normal">
              We work across sectors to build bipartisan coalitions, advise global leaders, support
              policymakers through education and legislative drafting, and help lay the groundwork
              for impact litigation.
            </p>
            <Cta label="Read more" href="/" />
          </div>
        </div>
      </div>
    </section>
  );
}

const GraphicImpact = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="467"
    height="467"
    viewBox="0 0 467 467"
    fill="none"
  >
    <path
      d="M398.689 398.689C307.608 489.77 159.392 489.77 68.311 398.689C-22.7703 307.608 -22.7703 159.392 68.311 68.311C159.392 -22.7703 307.608 -22.7703 398.689 68.311C489.77 159.392 489.77 307.608 398.689 398.689ZM134.875 134.875C80.4922 189.257 80.4922 277.743 134.875 332.125C189.257 386.508 277.743 386.508 332.125 332.125C386.508 277.743 386.508 189.257 332.125 134.875C277.743 80.4922 189.257 80.4922 134.875 134.875Z"
      fill="url(#paint0_linear_3161_856)"
    />
    <path
      d="M398.689 398.689C307.608 489.77 159.392 489.77 68.311 398.689L123.038 385.875L134.875 332.125C189.257 386.508 277.743 386.508 332.125 332.125C386.508 277.743 386.508 189.257 332.125 134.875L347.047 84.2087L398.689 68.311C489.77 159.392 489.77 307.608 398.689 398.689Z"
      fill="url(#paint1_linear_3161_856)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_3161_856"
        x1="432.187"
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
);
