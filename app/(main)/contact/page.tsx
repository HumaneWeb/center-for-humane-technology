// @ts-nocheck
import DonateBlock from '@/components/blocks/donate-block';
import NewsletterBlock from '@/components/blocks/newsletter-block';
import BasicHero from '@/components/layout/basic-hero';
import CareerCard from '@/components/shared/career-card';
import ContactForm from '@/components/shared/contact-form';
import Cta from '@/components/shared/cta';
import { FadeIn } from '@/components/shared/fade-in';
import SocialNetworks from '@/components/shared/social-networks';
import TeamCard from '@/components/shared/team-card';
import { executeQuery } from '@/lib/cms/executeQuery';
import { generateMetadataFn } from '@/lib/cms/generateMetadataFn';
import { ContactPageQuery } from '@/lib/cms/query';
import { Suspense } from 'react';

export const generateMetadata = generateMetadataFn({
  query: ContactPageQuery,
  pickSeoMetaTags: (data) => data.page?._seoMetaTags,
});

export default async function ContactPage() {
  const { page } = await executeQuery(ContactPageQuery);
  const { title, preTitle, information, networks } = page!;

  return (
    <>
      <BasicHero title={title} preTitle={preTitle} variant="purple" />
      <FadeIn className="mb:pt-17 mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <h3 className="text-primary-navy mb:text-[29px] mb:leading-130 mb:mb-6 mb-5 font-sans text-[23px] leading-120 font-semibold">
          Get in Touch
        </h3>

        <div className="mb:grid-cols-2 mb:gap-30 mb:pb-30 grid gap-10 pb-20">
          <Suspense>
            <ContactForm />
          </Suspense>

          {information && (
            <div>
              <address className="not-italic">
                <div
                  className="text-primary-navy [&>p>a]:text-primary-teal mb:text-xl mb:mb-12 mb-8 font-sans text-[18px] leading-140 [&>p]:mb-4 [&>p>a]:font-semibold [&>p>a]:underline"
                  dangerouslySetInnerHTML={{ __html: information }}
                />
              </address>
              {networks && <SocialNetworks networks={networks} />}
            </div>
          )}
        </div>
      </FadeIn>
    </>
  );
}
