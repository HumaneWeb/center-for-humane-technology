import DepthAreaCard from '../shared/depth-area-card';

export default function DepthAreasBlock() {
  return (
    <section>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-[1fr_2fr] items-start gap-15">
          <div>
            <h2 className="text-primary-navy mb-1.5 font-sans text-5xl leading-130 font-semibold">
              In-depth areas
            </h2>
            <p className="text-primary-navy font-sans text-xl leading-140">
              Figma ipsum component variant main layer. Ellipse export star distribute edit.
              Rectangle underline auto rotate align selection scale invite device shadow.
            </p>
          </div>

          <div className="flex flex-col gap-11">
            <DepthAreaCard />
            <DepthAreaCard />
          </div>
        </div>
      </div>
    </section>
  );
}
