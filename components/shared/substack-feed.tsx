import Script from 'next/script';

export default function SubstackFeed() {
  return (
    <section className="mx-auto max-w-7xl py-20">
      <h1>substack feed example</h1>

      <div id="substack-feed-embed"></div>

      <Script id="substack-config">
        {` 
          window.SubstackFeedWidget = {
            substackUrl: "centerforhumanetechnology.substack.com",
            posts: 4,
            filter: "community"
          };
        `}
      </Script>
      <Script src="https://substackapi.com/embeds/feed.js" strategy="afterInteractive" />
    </section>
  );
}
