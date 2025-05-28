import Image from 'next/image';
import Cta from '../shared/cta';

export default function DonateBlock() {
  return (
    <section
      className="bg-primary-navy bg-contain bg-right bg-no-repeat py-10"
      style={{ backgroundImage: 'url(/donate-bg.png)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-15 lg:grid-cols-2">
          <div>
            <h2 className="text-neutral-white mb-5 font-sans text-3xl leading-140 font-semibold">
              Help us design a better future at the intersection of technology and humanity
            </h2>
            <Cta label="Make a donation" href="/donate" />
          </div>

          <div className="flex justify-end">
            <Image
              src="https://www.datocms-assets.com/160835/1748352368-graohic-1.svg"
              alt="Donate to CHT"
              width={293}
              height={208}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
