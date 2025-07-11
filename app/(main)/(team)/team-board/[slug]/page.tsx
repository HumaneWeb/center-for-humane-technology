// @ts-nocheck
import DonateBlock from '@/components/blocks/donate-block';
import CustomImage from '@/components/shared/custom-image';
import CustomLink from '@/components/shared/custom-link';
import CustomStructuredText from '@/components/shared/custom-structured-text';
import { executeQuery } from '@/lib/cms/executeQuery';
import { generateMetadataFn } from '@/lib/cms/generateMetadataFn';
import { TeamDetailQuery } from '@/lib/cms/query';
import type { PageSlug } from '@/lib/utils/types';

export const generateMetadata = generateMetadataFn({
  query: TeamDetailQuery,
  buildQueryVariables: ({ params }) => ({ slug: params.slug }),
  pickSeoMetaTags: (data) => data.member?._seoMetaTags,
});

export default async function TeamDetailPage({ params }: PageSlug) {
  const { slug } = await params;

  const { member, teamBoard, configuration } = await executeQuery(TeamDetailQuery, {
    variables: { slug },
  });
  const {
    fullName,
    image,
    information,
    organization,
    teamPosition,
    twitterXUrl,
    linkedinUrl,
    email,
  } = member!;

  return (
    <section className="bg-primary-teal/[0.08] pt-20">
      <div className="mb:pb-40 mx-auto max-w-7xl px-4 py-16 pb-20 sm:px-6 lg:px-8">
        <div className="mb:mb-12 mb-5">
          <CustomLink content={{ content: teamBoard }} extraClass="flex items-center gap-[10px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M15.75 19.5L8.25 12L15.75 4.5"
                stroke="#293462"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-primary-blue mb:text-xl text-[18px] leading-120 font-semibold underline">
              {teamBoard?.title}
            </span>
          </CustomLink>
        </div>

        <div className="team-detail-grid mb:grid-cols-[1fr_2fr] mb:gap-32 grid gap-10">
          <div>
            <CustomImage {...image} extraClass="mb:mb-9 mb-5" />
            <div className="flex flex-wrap items-center gap-5">
              {twitterXUrl && (
                <a href={twitterXUrl}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    viewBox="0 0 45 45"
                    fill="none"
                  >
                    <circle cx="22.5" cy="22.5" r="22.5" fill="#293462" />
                    <path
                      d="M24.9047 21.4696L32.3513 13H30.5873L24.1187 20.3525L18.956 13H13L20.8087 24.1194L13 33H14.764L21.5907 25.2338L27.044 33H33M15.4007 14.3016H18.1107L30.586 31.7624H27.8753"
                      fill="white"
                    />
                  </svg>
                </a>
              )}
              {linkedinUrl && (
                <a href={linkedinUrl}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    viewBox="0 0 45 45"
                    fill="none"
                  >
                    <circle cx="22.5" cy="22.5" r="22.5" fill="#293462" />
                    <path
                      d="M18.0291 30H14.2973V18.65H18.0291V30ZM16.1612 17.1017C14.9679 17.1017 14 16.1682 14 15.0412C14 14.4998 14.2277 13.9806 14.633 13.5978C15.0383 13.2151 15.588 13 16.1612 13C16.7344 13 17.2841 13.2151 17.6894 13.5978C18.0947 13.9806 18.3224 14.4998 18.3224 15.0412C18.3224 16.1682 17.3541 17.1017 16.1612 17.1017ZM31.996 30H28.2722V24.4749C28.2722 23.1581 28.2441 21.4695 26.332 21.4695C24.3918 21.4695 24.0945 22.9001 24.0945 24.38V30H20.3667V18.65H23.9458V20.1982H23.998C24.4963 19.3065 25.7133 18.3654 27.5289 18.3654C31.3057 18.3654 32 20.7143 32 23.7653V30H31.996Z"
                      fill="white"
                    />
                  </svg>
                </a>
              )}
              {email && (
                <a className={`mailto:${email}`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="45"
                    height="45"
                    viewBox="0 0 45 45"
                    fill="none"
                  >
                    <circle cx="22.5" cy="22.5" r="22.5" fill="#293462" />
                    <path
                      d="M9.76535 14V14.0291L23.0068 23.1145L36.2351 14.0387V14.0001L9.76535 14Z"
                      fill="white"
                    />
                    <path d="M25.7446 22.5067L37 30.2295V14.7844L25.7446 22.5067Z" fill="white" />
                    <path d="M9 14.7753V30.2388L20.269 22.5067L9 14.7753Z" fill="white" />
                    <path
                      d="M24.979 23.2531L23.0067 24.6051L21.0341 23.2531L9.76518 30.9838V31H36.2348V30.9749L24.979 23.2531Z"
                      fill="white"
                    />
                  </svg>
                </a>
              )}
            </div>
          </div>
          <div>
            <h1 className="tracking-049 text-primary-navy mb:text-5xl mb:leading-110 mb:mb-3.5 mb-2 font-sans text-[29px] leading-120 font-semibold">
              {fullName}
            </h1>
            <h3 className="text-primary-navy mb:text-xl mb:leading-135 mb:mb-11 mb-5 font-sans text-[18px] leading-120 font-semibold tracking-[1px] uppercase">
              {teamPosition || organization}
            </h3>
            <div className="text-primary-navy mb:text-xl font-sans text-[18px] leading-140 [&>p]:mb-4">
              <CustomStructuredText data={information} defaultRules />
            </div>
          </div>
        </div>
      </div>

      <DonateBlock
        title={configuration?.donateTitle}
        cta={configuration?.donateCta}
        image={configuration?.donateImage}
      />
    </section>
  );
}
