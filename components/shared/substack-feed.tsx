'use client';

import Script from 'next/script';
import { useEffect } from 'react';

export default function SubstackFeed() {
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
    <section className="mx-auto max-w-7xl py-20">
      <h1>substack feed example</h1>

      <div id="substack-feed-embed"></div>

      <Script id="substack-config">
        {` 
          window.SubstackFeedWidget = {
            substackUrl: "centerforhumanetechnology.substack.com",
            posts: 12,
            filter: "new"
          };
        `}
      </Script>
      <Script src="https://substackapi.com/embeds/feed.js" strategy="afterInteractive" />
    </section>
  );
}
