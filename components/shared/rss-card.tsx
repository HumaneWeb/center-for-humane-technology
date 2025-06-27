import { RSSItem } from '@/lib/utils/types';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

interface RSSCardProps {
  item: RSSItem;
  variant?: 'grid' | 'list';
}

export default function RSSCard({ item, variant = 'grid' }: RSSCardProps) {
  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString)
        .toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        })
        .toUpperCase();
    } catch {
      return 'JUN 2';
    }
  };

  const stripHtml = (html: string) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const truncateText = (text: string, maxLength = 200) => {
    const cleanText = stripHtml(text);
    if (cleanText.length <= maxLength) return cleanText;
    return cleanText.substring(0, maxLength) + '...';
  };

  if (variant === 'list') {
    return (
      <div className="overflow-hidden transition-all duration-300">
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <div className="flex-shrink-0">
            <div className="relative h-48 w-full sm:h-40 sm:w-64">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 256px"
                />
              ) : (
                <div className="h-full w-full bg-gray-200" />
              )}
            </div>
          </div>

          <div className="max-w-[600px] flex-1">
            <div className="mb-2.5 flex items-center gap-4">
              <span className="text-primary-blue tracking-065 font-sans text-[13px] leading-120 font-semibold uppercase">
                {item.author || 'CENTER FOR HUMANE TECHNOLOGY'}
              </span>
              <span className="text-primary-blue tracking-065 font-sans text-[13px] leading-120 font-semibold uppercase">
                {formatDate(item.pubDate)}
              </span>
            </div>
            <h3 className="group mb-2.5">
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-teal hover:text-primary-navy font-sans text-xl leading-120 font-semibold transition-colors"
              >
                <span className="group-hover:underline">{item.title}</span>
              </a>
            </h3>

            <p className="text-primary-navy line-clamp-2 text-[16px] leading-140">
              {truncateText(item.description, 300)}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden transition-all duration-300">
      <div className="relative h-64 w-full">
        {item.imageUrl ? (
          <Image
            src={item.imageUrl!}
            alt={item.title}
            fill
            className="aspect-square object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full w-full bg-gray-200" />
        )}
      </div>

      <div className="py-[30px]">
        <div className="mb-2.5 flex items-center gap-3.5">
          <span className="text-primary-blue tracking-065 text-[13px] leading-120 font-semibold uppercase">
            {item.author || 'CENTER FOR HUMANE TECHNOLOGY'}
          </span>
          <span className="text-primary-blue tracking-065 text-[13px] leading-120 font-semibold uppercase">
            {formatDate(item.pubDate)}
          </span>
        </div>
        <h3 className="group mb-2.5">
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-teal hover:text-primary-navy mb:text-[25px] mb:leading-130 font-sans text-[20px] leading-120 font-semibold transition-colors"
          >
            <span>{item.title}</span>
          </a>
        </h3>

        <p className="text-primary-navy mb:text-xl mb:font-medium font-sans text-[16px] leading-140 font-normal">
          {truncateText(item.description, 250)}
        </p>
      </div>
    </div>
  );
}
