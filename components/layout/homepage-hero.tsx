import { ResultOf, readFragment } from '@/lib/cms/graphql';
import { HomepageQuery } from '@/lib/cms/query';
import CtaList from '../shared/cta-list';
import { VideoPlayer } from 'react-datocms';

type Props = ResultOf<typeof HomepageQuery>;

export default function HomepageHero({ homepage }: Props) {
  const { title, introduction, ctas, decorationVideos } = homepage!;

  return (
    <section
      className="homepage-hero bg-primary-cream/50 h-dvh bg-contain bg-right bg-no-repeat py-12 lg:py-20"
      style={{
        backgroundImage: `url("/homepage-circles.svg")`,
      }}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div className="space-y-0">
            <h1 className="text-primary-navy tracking-061 mb-9 font-sans text-4xl leading-110 font-semibold lg:text-6xl">
              {title}
            </h1>

            {introduction && (
              <div
                className="text-primary-navy mb-10 font-sans text-2xl leading-140"
                dangerouslySetInnerHTML={{ __html: introduction }}
              />
            )}

            {ctas && <CtaList items={ctas} />}
          </div>

          <div className="grid grid-cols-3 gap-4">
            {decorationVideos?.videos.map((video, index) => (
              <div
                key={video.id}
                className={`${index === 1 ? 'pt-25' : ''} ${index === 2 ? 'pt-[-25em]' : ''} h-full w-full`}
              >
                <VideoPlayer
                  autoPlay
                  loop
                  muted
                  data={video.video}
                  style={{ aspectRatio: '1 / 2.2' }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
