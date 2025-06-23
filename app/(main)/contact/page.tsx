// @ts-nocheck
import DonateBlock from '@/components/blocks/donate-block';
import NewsletterBlock from '@/components/blocks/newsletter-block';
import BasicHero from '@/components/layout/basic-hero';
import CareerCard from '@/components/shared/career-card';
import ContactForm from '@/components/shared/contact-form';
import Cta from '@/components/shared/cta';
import SocialNetworks from '@/components/shared/social-networks';
import TeamCard from '@/components/shared/team-card';
import { executeQuery } from '@/lib/cms/executeQuery';
import { ContactPageQuery } from '@/lib/cms/query';

export default async function ContactPage() {
  const { page } = await executeQuery(ContactPageQuery);
  const { title, preTitle, information, networks } = page!;

  return (
    <>
      <BasicHero title={title} preTitle={preTitle} variant="purple" />
      <div className="mx-auto max-w-7xl px-4 pt-17 sm:px-6 lg:px-8">
        <h3 className="text-primary-navy mb-6 font-sans text-[29px] leading-130 font-semibold">
          Get in touch
        </h3>

        <div className="grid grid-cols-2 gap-30 pb-30">
          <div>
            <ContactForm />
          </div>

          {information && (
            <div>
              <div
                className="text-primary-navy [&>p>a]:text-primary-teal mb-12 font-sans text-xl leading-140 [&>p]:mb-4 [&>p>a]:font-semibold [&>p>a]:underline"
                dangerouslySetInnerHTML={{ __html: information }}
              />
              {networks && <SocialNetworks networks={networks} />}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
