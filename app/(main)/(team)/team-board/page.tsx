// @ts-nocheck
import DonateBlock from '@/components/blocks/donate-block';
import NewsletterBlock from '@/components/blocks/newsletter-block';
import BasicHero from '@/components/layout/basic-hero';
import CareerCard from '@/components/shared/career-card';
import Cta from '@/components/shared/cta';
import TeamCard from '@/components/shared/team-card';
import { executeQuery } from '@/lib/cms/executeQuery';
import { TeamAndBoardQuery } from '@/lib/cms/query';

export default async function TeamListPage() {
  const { page, teamList, boardList, configuration } = await executeQuery(TeamAndBoardQuery);

  const { title, preTitle, careers } = page!;

  return (
    <>
      <BasicHero title={title} preTitle={preTitle} variant="purple" />
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="mb-36">
          <h2 className="tracking-049 text-primary-navy mb-12 font-sans text-5xl leading-110 font-semibold">
            Team
          </h2>
          <div className="grid grid-cols-3 gap-x-6 gap-y-10">
            {teamList.map((team) => (
              // @ts-expect-error
              <TeamCard key={team.id} {...team} type="team" />
            ))}
          </div>
        </div>
      </section>

      <div>
        <NewsletterBlock
          // @ts-expect-error
          title={configuration?.newsletterTitle}
          introduction={configuration?.newsletterIntroduction}
        />
      </div>

      <div className="bg-primary-teal/[0.06] pt-24 pb-28">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div>
            <h2 className="tracking-049 text-primary-navy mb-12 font-sans text-5xl leading-110 font-semibold">
              Board
            </h2>
            <div className="grid grid-cols-4 gap-x-6 gap-y-10">
              {boardList.map((team) => (
                // @ts-expect-error
                <TeamCard key={team.id} {...team} type="board" />
              ))}
            </div>
          </div>
        </section>
      </div>

      <section className="mb-20">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <h2 className="tracking-049 text-primary-navy mb-16 font-sans text-5xl leading-110 font-semibold">
            Careers
          </h2>

          <div className="mb-24 grid grid-cols-2 gap-x-28 gap-y-5">
            {careers.map((career) => (
              <CareerCard {...career} key={career.id} />
            ))}
          </div>

          <Cta label="See All Openings" />
        </div>
      </section>

      <DonateBlock
        // @ts-expect-error
        title={configuration?.donateTitle}
        image={configuration?.donateImage}
        cta={configuration?.donateCta}
      />
    </>
  );
}
