'use client';
import React, { useEffect, useState } from 'react';

type Props = {
  children?: React.ReactElement;
};

export default function SubstackFeed({ children }: Props) {
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     const container = document.getElementById('substack-feed-embed');
  //     console.log({ container });

  //     if (!container) return;

  //     clearInterval(intervalId); // ya lo encontró, no seguimos buscando

  //     const handleClick = (event: Event) => {
  //       const target = event.target as HTMLElement;
  //       const anchor = target.closest('a') as HTMLAnchorElement;

  //       if (anchor && anchor.href.includes('substack.com')) {
  //         console.log('Clicking...');

  //         // if (typeof window.gtag === 'function') {
  //         //   window.gtag('event', 'click_substack_link', {
  //         //     event_category: 'engagement',
  //         //     event_label: anchor.href,
  //         //   });
  //         // }
  //       }
  //     };

  //     const addListeners = () => {
  //       const links = container.querySelectorAll('a[href*="substack.com"]');
  //       links.forEach((link) => {
  //         link.removeEventListener('click', handleClick); // por si ya estaba
  //         link.addEventListener('click', handleClick);
  //       });
  //     };

  //     const observer = new MutationObserver(() => {
  //       addListeners();
  //     });

  //     observer.observe(container, { childList: true, subtree: true });

  //     // Por si el widget ya está cargado
  //     addListeners();

  //     // Limpieza al desmontar
  //     return () => {
  //       observer.disconnect();
  //       const links = container.querySelectorAll('a[href*="substack.com"]');
  //       links.forEach((link) => {
  //         link.removeEventListener('click', handleClick);
  //       });
  //     };
  //   }, 1000); // intenta cada 500ms

  //   // timeout de seguridad tras 10s
  //   setTimeout(() => clearInterval(intervalId), 10000);
  // }, []);

  return (
    <section className="mx-auto max-w-7xl pb-14">
      <div data-supascribe-embed-id="834706015840" data-supascribe-feed></div>
      {children && children}
    </section>
  );
}

type FeedItem = {
  title: string;
  link: string;
  pubDate: string;
  description: string;
};

export const BlogFeed: React.FC = () => {
  const [items, setItems] = useState<FeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            'https://centerforhumanetechnology.substack.com/feed',
          )}`,
        );
        const data = await res.json();

        const parser = new DOMParser();
        const xml = parser.parseFromString(data.contents, 'application/xml');

        const parsedItems = Array.from(xml.querySelectorAll('item')).map((item) => ({
          title: item.querySelector('title')?.textContent || '',
          link: item.querySelector('link')?.textContent || '',
          pubDate: item.querySelector('pubDate')?.textContent || '',
          description: item.querySelector('description')?.textContent || '',
        }));

        setItems(parsedItems);
      } catch (error) {
        console.error('Error fetching/parsing feed:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading feed...</p>;

  return (
    <div className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <a
          key={index}
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl border border-gray-100 bg-white p-6 shadow transition duration-300 hover:shadow-lg"
        >
          <h2 className="mb-2 text-xl font-semibold text-blue-700">{item.title}</h2>
          <p className="mb-3 text-sm text-gray-500">
            {new Date(item.pubDate).toLocaleDateString()}
          </p>
          <p
            className="line-clamp-4 text-sm text-gray-700"
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </a>
      ))}
    </div>
  );
};
