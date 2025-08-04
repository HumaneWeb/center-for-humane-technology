import { RSSItem } from '@/lib/utils/types';
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
      <div className="mb:grid-cols-[256px_auto] mb:gap-6 grid grid-cols-[120px_auto] gap-4 overflow-hidden transition-all duration-300">
        <div className="mb:h-48 relative aspect-square w-full">
          <Image
            src={item.imageUrl ? item.imageUrl : '/placeholder-image-2.png'}
            alt={item.title}
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        <div className="max-w-[600px] flex-1">
          <div className="mb:flex-row mb:items-center mb:gap-4 mb:mb-2.5 mb-1.5 flex flex-col gap-1">
            <span className="text-primary-blue mb:tracking-065 mb:text-[13px] font-sans text-[10px] leading-120 font-semibold tracking-[0.5px] uppercase">
              {item.author || 'CENTER FOR HUMANE TECHNOLOGY'}
            </span>
            <span className="text-primary-blue mb:tracking-065 mb:text-[13px] font-sans text-[10px] leading-120 font-semibold tracking-[0.5px] uppercase">
              {formatDate(item.pubDate)}
            </span>
          </div>
          <h3 className="group mb:mb-2.5 mb-1.5">
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-teal hover:text-primary-navy mb:text-xl inline-block font-sans text-[16px] leading-120 font-semibold transition-colors"
            >
              <span className="group-hover:underline">{item.title}</span>
            </a>
          </h3>

          <p className="text-primary-navy mb:text-[16px] line-clamp-2 text-[13px] leading-140">
            {truncateText(item.description, 300)}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden transition-all duration-300">
      <div className="relative h-64 w-full">
        <Image
          src={item.imageUrl ? item.imageUrl : '/placeholder-image-2.png'}
          alt={item.title}
          fill
          className="aspect-square object-cover"
          unoptimized
        />
      </div>

      <div className="py-[30px]">
        <div className="mb:flex-row mb:items-center mb:gap-3.5 mb-2.5 flex flex-col gap-1">
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
        <p className="text-primary-navy mb:text-xl font-sans text-[16px] leading-140 font-normal">
          {truncateText(item.description, 250)}
        </p>
      </div>
    </div>
  );
}
