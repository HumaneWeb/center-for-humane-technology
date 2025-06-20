'use client';
import { cn } from '@/lib/utils/css.utils';
import { useState } from 'react';

type Props = {
  items: {
    id: string;
    title: string;
    content: string;
  }[];
  variant?: 'default' | 'small';
};

export default function AccordionBlock({ items, variant = 'default' }: Props) {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleItem = (itemId: string) => {
    setActiveItem(activeItem === itemId ? null : itemId);
  };

  return (
    <div id="accordion-collapse" data-accordion="collapse" className="flex flex-col gap-[15px]">
      {items.map((item, index) => {
        const isActive = activeItem === item.id;
        const isFirst = index === 0;
        const isLast = index === items.length - 1;

        return (
          <div key={item.id}>
            <h2 id={`accordion-collapse-heading-${item.id}`}>
              <button
                type="button"
                className={cn(
                  'flex w-full cursor-pointer items-center justify-between gap-3 bg-[#F0F7F7] px-8 py-6 font-medium text-gray-500 transition-colors duration-200',
                  variant === 'small' && 'px-4 py-3',
                )}
                onClick={() => toggleItem(item.id)}
                aria-expanded={isActive}
                aria-controls={`accordion-collapse-body-${item.id}`}
              >
                <span
                  className={cn(
                    'font-sans text-2xl leading-120 font-semibold text-[#262626]',
                    variant === 'small' && 'text-[16px]',
                  )}
                >
                  {item.title}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="31"
                  viewBox="0 0 30 31"
                  fill="none"
                  className={cn(
                    `shrink-0 transition-transform duration-300 ${
                      isActive ? 'rotate-180' : 'rotate-0'
                    }`,
                    variant === 'small' && 'h-5 w-5',
                  )}
                >
                  <path
                    d="M24.375 10.979L15 20.354L5.625 10.979"
                    stroke="#262626"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </h2>
            <div
              id={`accordion-collapse-body-${item.id}`}
              className={cn(
                `overflow-hidden bg-[#F0F7F7] px-8 transition-all duration-300 ease-in-out ${
                  isActive ? 'max-h-max py-4 opacity-100' : 'max-h-0 opacity-0'
                }`,
                variant === 'small' && 'px-4 py-3',
              )}
              aria-labelledby={`accordion-collapse-heading-${item.id}`}
            >
              <div
                className={cn(
                  'text-primary-navy [&>ul>li>a]:text-primary-teal text-xl leading-140 [&>p]:mb-4 [&>ul>li>a]:font-semibold',
                  variant === 'small' && 'text-base',
                )}
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
