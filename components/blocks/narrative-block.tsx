import Image from 'next/image';
import Cta from '../shared/cta';

export default function NarrativeBlock() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-15 lg:grid-cols-2">
          <div>
            <Image
              src="https://www.datocms-assets.com/160835/1748352206-rectangle-360.png"
              alt="AI and Society"
              width={624}
              height={494}
            />
          </div>

          <div>
            <h2 className="text-primary-navy mb-8 font-sans text-5xl leading-110 font-semibold">
              This is what CHT has to say about AI
            </h2>
            <div>
              <p className="text-primary-navy mb-4 font-sans text-xl leading-140">
                Social media fractured how we communicate; AI now influences decisions that shape
                our well-being.
              </p>
              <p className="text-primary-navy mb-8 font-sans text-xl leading-140">
                We don’t need to slow innovation — we need to raise its standards — just as we’ve
                done in medicine, aviation, and other fields that put public trust and safety first.
              </p>
              <Cta label="Link to AI & Society" href="/ai-and-society" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
