// @ts-nocheck
import DonateBlock from '@/components/blocks/donate-block';
import NewsletterBlock from '@/components/blocks/newsletter-block';
import BasicHero from '@/components/layout/basic-hero';
import CareerCard from '@/components/shared/career-card';
import Cta from '@/components/shared/cta';
import TeamCard from '@/components/shared/team-card';
import { executeQuery } from '@/lib/cms/executeQuery';
import { generateMetadataFn } from '@/lib/cms/generateMetadataFn';
import { TeamAndBoardQuery } from '@/lib/cms/query';

export const generateMetadata = generateMetadataFn({
  query: TeamAndBoardQuery,
  pickSeoMetaTags: (data) => data.page?._seoMetaTags,
});

export default async function TeamListPage() {
  const { page, teamList, boardList, configuration } = await executeQuery(TeamAndBoardQuery);

  const { title, preTitle, careers } = page!;

  return (
    <>
      <BasicHero title={title} preTitle={preTitle} variant="purple" />
      <section className="mb:py-14 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb:mb-36 mb-10">
          <h2 className="tracking-049 text-primary-navy mb:text-5xl mb:leading-110 mb:mb-12 mb-5 font-sans text-[29px] leading-120 font-semibold">
            Team
          </h2>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
            {teamList.map((team) => (
              <TeamCard key={team.id} {...team} type="team" />
            ))}
          </div>
        </div>
      </section>

      <NewsletterBlock
        title={configuration?.newsletterTitle}
        introduction={configuration?.newsletterIntroduction}
      />

      <div className="bg-primary-teal/[0.06] mb:pt-24 mb:pb-28 pt-8 pb-15">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="tracking-049 text-primary-navy mb:text-5xl mb:leading-110 mb:mb-12 mb-5 font-sans text-[29px] leading-120 font-semibold">
              Board
            </h2>
            <div className="mb:grid-cols-4 grid gap-x-6 gap-y-10 sm:grid-cols-2">
              {boardList.map((team) => (
                <TeamCard key={team.id} {...team} type="board" />
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="mb:mb-20 mb-10">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="tracking-049 text-primary-navy mb:text-5xl mb:leading-110 mb:mb-16 mb-5 font-sans text-[29px] leading-120 font-semibold">
            Careers
          </h2>

          <div className="mb:grid-cols-2 mb:mb-24 mb-12 grid gap-x-28 gap-y-5">
            {careers.map((career) => (
              <CareerCard {...career} key={career.id} />
            ))}
          </div>

          <Cta label="See All Openings" />
        </div>
      </section>

      <DonateBlock
        title={configuration?.donateTitle}
        image={configuration?.donateImage}
        cta={configuration?.donateCta}
      />
    </>
  );
}
