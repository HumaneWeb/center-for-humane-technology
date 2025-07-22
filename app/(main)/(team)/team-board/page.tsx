// @ts-nocheck
import DonateBlock from '@/components/blocks/donate-block';
import NewsletterBlock from '@/components/blocks/newsletter-block';
import BasicHero from '@/components/layout/basic-hero';
import CareerCard from '@/components/shared/career-card';
import Cta from '@/components/shared/cta';
import CustomImage from '@/components/shared/custom-image';
import { FadeIn } from '@/components/shared/fade-in';
import TeamCard from '@/components/shared/team-card';
import { executeQuery } from '@/lib/cms/executeQuery';
import { generateMetadataFn } from '@/lib/cms/generateMetadataFn';
import { TeamAndBoardQuery } from '@/lib/cms/query';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const generateMetadata = generateMetadataFn({
  query: TeamAndBoardQuery,
  pickSeoMetaTags: (data) => data.page?._seoMetaTags,
});

export default async function TeamListPage() {
  const { page, teamList, boardList, careersList, supporters, allies, configuration } =
    await executeQuery(TeamAndBoardQuery);
  const { title, preTitle, careers } = page!;

  return (
    <>
      <BasicHero title={title} preTitle={preTitle} variant="purple" />
      <section className="mb:py-14 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <FadeIn className="mb:mb-36 mb-10">
          <h2 className="tracking-049 text-primary-navy mb:text-5xl mb:leading-110 mb:mb-12 mb-5 font-sans text-[29px] leading-120 font-semibold">
            Team
          </h2>
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 md:grid-cols-3">
            {teamList.map((team) => (
              <TeamCard key={team.id} {...team} type="team" />
            ))}
          </div>
        </FadeIn>
      </section>

      <NewsletterBlock
        title={configuration?.newsletterTitle}
        introduction={configuration?.newsletterIntroduction}
      />

      <div className="bg-primary-teal/[0.06] mb:pt-24 mb:pb-28 pt-8 pb-15">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="tracking-049 text-primary-navy mb:text-5xl mb:leading-110 mb:mb-12 mb-5 font-sans text-[29px] leading-120 font-semibold">
              Board
            </h2>
            <div className="mb:grid-cols-4! grid gap-x-6 gap-y-10 sm:grid-cols-2">
              {boardList.map((team) => (
                <TeamCard key={team.id} {...team} type="board" />
              ))}
            </div>
          </FadeIn>
        </section>
      </div>

      {careers && careers.length > 0 && (
        <section className="mb-10">
          <FadeIn className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
            <h2 className="tracking-049 text-primary-navy mb:text-5xl mb:leading-110 mb:mb-16 mb-5 font-sans text-[29px] leading-120 font-semibold">
              Careers
            </h2>

            <div className="mb:grid-cols-2 mb:mb-24 mb-12 grid gap-x-28 gap-y-5">
              {careers.map((career) => (
                <CareerCard {...career} key={career.id} />
              ))}
            </div>

            <Cta
              label="See All Openings"
              link={{ content: { slug: careersList?.slug, __typename: careersList?.__typename } }}
            />
          </FadeIn>
        </section>
      )}

      <div className="bg-neutral-white mb:pt-24 mb:pb-28 pt-8 pb-15">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="tracking-049 text-primary-navy mb:text-5xl mb:leading-110 mb:mb-12 mb-5 font-sans text-[29px] leading-120 font-semibold">
              Thanks to our generous lead supporters
            </h2>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-6 lg:gap-8">
              {supporters.map((supporter, index) => {
                const CardContent = () => (
                  <>
                    <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-blue-50/0 to-purple-50/0 transition-all duration-300 group-hover:from-blue-50/30 group-hover:to-purple-50/30"></div>

                    <div className="relative flex h-20 items-center justify-center md:h-24">
                      <CustomImage
                        {...supporter.logo}
                        extraClass="max-h-full max-w-full object-contain grayscale filter transition-all duration-300 group-hover:grayscale-0"
                      />
                    </div>

                    {supporter.externalUrl && (
                      <div className="absolute top-2 right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="bg-primary-teal/20 flex h-6 w-6 items-center justify-center rounded-full">
                          <ExternalLink className="text-primary-teal h-3 w-3" />
                        </div>
                      </div>
                    )}
                  </>
                );

                const cardClasses = `group hover:border-blue-200/20 relative rounded-sm border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg md:p-8`;

                return supporter.externalUrl ? (
                  <Link
                    key={supporter.id}
                    href={supporter.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClasses}
                  >
                    <CardContent />
                  </Link>
                ) : (
                  <div key={supporter.id} className={cardClasses}>
                    <CardContent />
                  </div>
                );
              })}
            </div>
          </FadeIn>
        </section>
      </div>

      <div className="bg-primary-teal/[0.06] mb:pt-24 mb:pb-28 pt-8 pb-15">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <h2 className="tracking-049 text-primary-navy mb:text-5xl mb:leading-110 mb:mb-12 mb-5 font-sans text-[29px] leading-120 font-semibold">
              Founding Allies, Key Advisors & Community
            </h2>
            <div className="grid grid-cols-1 gap-8 gap-y-12 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-6">
              {allies.map((person, index) => (
                <div key={index} className="space-y-1">
                  {person.externalUrl ? (
                    <Link
                      href={person.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-navy block text-base font-semibold transition-colors duration-200 hover:underline"
                    >
                      {person.name}
                    </Link>
                  ) : (
                    <h3 className="text-primary-navy text-base leading-tight font-semibold">
                      {person.name}
                    </h3>
                  )}

                  <div className="space-y-2">
                    {person.description && (
                      <p className="text-sm leading-relaxed text-gray-600 italic">
                        {person.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </section>
      </div>

      <DonateBlock
        title={configuration?.donateTitle}
        image={configuration?.donateImage}
        cta={configuration?.donateCta}
      />
    </>
  );
}
