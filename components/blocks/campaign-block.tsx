import Cta from '../shared/cta';

export default function CampaignBlock() {
  return (
    <section className="mx-auto my-20 max-w-[1400px]">
      <div className="mx-auto max-w-7xl bg-[#007981]">
        <div className="grid grid-cols-1 items-center gap-15 lg:grid-cols-2">
          <div className="pl-12">
            <h2 className="text-neutral-white mb-10 font-sans text-5xl leading-110 font-semibold">
              This is what CHT has to say about AI
            </h2>
            <div>
              <p className="text-neutral-white mb-10 font-sans text-xl leading-140">
                Use this component whenever you want to feature any specific content. For instance,
                you can use it for “The Social Dilemma, an upcoming TED talk, a special
                announcement, or pretty much any other content you want to give a higher visual
                hierarchy.
              </p>
              <Cta label="Link to AI & Society" href="/ai-and-society" />
            </div>
          </div>

          <div
            className="aspect-square bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url('https://www.datocms-assets.com/160835/1748352206-rectangle-360.png')`,
            }}
          />
        </div>
      </div>
    </section>
  );
}
