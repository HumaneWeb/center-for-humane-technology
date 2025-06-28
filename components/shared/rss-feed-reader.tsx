'use client';

import { useState, useEffect } from 'react';
import RSSCard from './rss-card';
import { Loader2, AlertCircle, Rss } from 'lucide-react';
import { RSSFeed, RSSItem } from '@/lib/utils/types';

export default function RSSFeedReader() {
  const [feed, setFeed] = useState<RSSFeed | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const extractImageFromContent = (content: string): string | undefined => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, 'text/html');
      const img = doc.querySelector('img');
      return img?.src;
    } catch {
      return undefined;
    }
  };

  const parseRSSFeed = (xmlText: string): RSSFeed => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      throw new Error('Error parsing XML');
    }

    const channel = xmlDoc.querySelector('channel');
    if (!channel) {
      throw new Error('Invalid RSS format');
    }

    const title = channel.querySelector('title')?.textContent || 'Sin título';
    const description = channel.querySelector('description')?.textContent || 'Sin descripción';

    const items: RSSItem[] = Array.from(xmlDoc.querySelectorAll('item')).map((item) => {
      let imageUrl: string | undefined;

      // Buscar imagen en diferentes lugares del RSS
      // 1. Enclosure con tipo de imagen
      const enclosure = item.querySelector("enclosure[type^='image']");
      if (enclosure) {
        imageUrl = enclosure.getAttribute('url') || undefined;
      }

      // 2. Media content/thumbnail (namespace media)
      if (!imageUrl) {
        const mediaContent = item.querySelector(
          "media\\:content[medium='image'], media\\:content[type^='image']",
        );
        if (mediaContent) {
          imageUrl = mediaContent.getAttribute('url') || undefined;
        }
      }

      // 3. Media thumbnail
      if (!imageUrl) {
        const mediaThumbnail = item.querySelector('media\\:thumbnail');
        if (mediaThumbnail) {
          imageUrl = mediaThumbnail.getAttribute('url') || undefined;
        }
      }

      // 4. Imagen dentro del contenido HTML
      if (!imageUrl) {
        const description = item.querySelector('description')?.textContent;
        if (description) {
          imageUrl = extractImageFromContent(description);
        }
      }

      // 5. Content:encoded (usado por algunos feeds)
      if (!imageUrl) {
        const contentEncoded = item.querySelector('content\\:encoded')?.textContent;
        if (contentEncoded) {
          imageUrl = extractImageFromContent(contentEncoded);
        }
      }

      return {
        title: item.querySelector('title')?.textContent || 'Sin título',
        description: item.querySelector('description')?.textContent || 'Sin descripción',
        link: item.querySelector('link')?.textContent || '#',
        pubDate: item.querySelector('pubDate')?.textContent || '',
        author:
          item.querySelector('author')?.textContent ||
          item.querySelector('dc\\:creator')?.textContent ||
          undefined,
        guid: item.querySelector('guid')?.textContent || undefined,
        imageUrl: imageUrl,
      };
    });

    return { title, description, items };
  };

  useEffect(() => {
    const fetchRSSFeed = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/rss');

        if (!response.ok) {
          throw new Error('Error al obtener el feed RSS');
        }

        const xmlText = await response.text();
        const parsedFeed = parseRSSFeed(xmlText);

        setFeed(parsedFeed);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchRSSFeed();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="mb-4 h-8 w-8 animate-spin text-teal-600" />
        <p className="text-gray-600">Loading RSS feed...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="mb-4 h-8 w-8 text-red-500" />
        <p className="text-center text-red-600">Error loading feed: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 rounded-lg bg-teal-600 px-6 py-2 font-medium text-white transition-colors hover:bg-teal-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!feed || feed.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Rss className="mb-4 h-8 w-8 text-gray-400" />
        <p className="text-gray-600">No articles found in feed</p>
      </div>
    );
  }

  return (
    <div>
      {feed.items.length > 0 && (
        <div className="mb:mb-16">
          <div className="mb:gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {feed.items.slice(0, 3).map((item, index) => (
              <RSSCard key={item.guid || item.link || index} item={item} variant="grid" />
            ))}
          </div>
        </div>
      )}

      {feed.items.length > 3 && (
        <div className="flex flex-col gap-8.5">
          {feed.items.slice(3).map((item, index) => (
            <RSSCard key={item.guid || item.link || index + 3} item={item} variant="list" />
          ))}
        </div>
      )}
    </div>
  );
}
