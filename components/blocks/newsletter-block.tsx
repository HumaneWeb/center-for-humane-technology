import Script from 'next/script';
import { FragmentOf, readFragment } from '@/lib/cms/graphql';
import { SignupBlockFragment } from '@/lib/cms/query';

type Props = FragmentOf<typeof SignupBlockFragment>;

export default function NewsletterBlock(data: Props) {
  const { title, introduction, withFeaturedContent, featuredTitle, featuredImage, featuredLink } =
    readFragment(SignupBlockFragment, data);

  return (
    <section className="bg-secondary-light-purple/20 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-primary-blue mb-3 font-sans text-3xl leading-130 font-semibold">
              {title}
            </h2>
            {introduction && (
              <div
                className="text-primary-navy font-sans text-xl leading-135"
                dangerouslySetInnerHTML={{ __html: introduction }}
              />
            )}
          </div>
          <div>
            <div id="custom-substack-embed"></div>
          </div>
        </div>
      </div>

      <Script id="substack-config">
        {`
          window.CustomSubstackWidget = {
            substackUrl: "centerforhumanetechnology.substack.com",
            placeholder: "Enter your email",
            buttonText: "Subscribe",
            theme: "custom",
            colors: {
              primary: "#293462",
              input: "#9E5F5F00",
              email: "#293462",
              text: "#FFFFFF",
            },
          };
        `}
      </Script>
      <Script src="https://substackapi.com/widget.js" strategy="afterInteractive" />
    </section>
  );
}
