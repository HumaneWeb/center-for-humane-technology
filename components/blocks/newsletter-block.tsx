import Script from 'next/script';

interface NewsletterProps {
  title: string;
  description: string;
  placeholderText: string;
  buttonText: string;
}

export default function NewsletterBlock({
  title,
  description,
  placeholderText,
  buttonText,
}: NewsletterProps) {
  return (
    <section className="bg-secondary-light-purple/20 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
          <div>
            <h2 className="text-primary-blue mb-3 font-sans text-3xl leading-130 font-semibold">
              {title}
            </h2>
            <p className="text-primary-navy font-sans text-xl leading-135">{description}</p>
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
