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
      {items.map((item) => {
        const isActive = activeItem === item.id;

        return (
          <div key={item.id}>
            <h2 id={`accordion-collapse-heading-${item.id}`}>
              <button
                type="button"
                className={cn(
                  'mb:px-8 mb:py-6 flex w-full cursor-pointer items-center justify-between gap-3 bg-[#F0F7F7] p-4 font-medium text-gray-500 transition-colors duration-200',
                  variant === 'small' && 'px-4 py-3',
                )}
                onClick={() => toggleItem(item.id)}
                aria-expanded={isActive}
                aria-controls={`accordion-collapse-body-${item.id}`}
              >
                <span
                  className={cn(
                    'mb:text-2xl mb:leading-120 font-sans text-[18px] leading-140 font-semibold text-[#262626]',
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
                    `mb:w-[30px] w-[20px] shrink-0 transition-transform duration-300 ${
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
                `mb:px-8 overflow-hidden bg-[#F0F7F7] p-4 transition-all duration-300 ease-in-out ${
                  isActive ? 'h-max py-4 opacity-100' : 'h-0 py-0 opacity-0'
                }`,
                variant === 'small' && 'px-4 py-3',
              )}
              aria-labelledby={`accordion-collapse-heading-${item.id}`}
            >
              <div
                className={cn(
                  'text-primary-navy [&>ul>li>a]:text-primary-teal mb:text-xl text-[16px] leading-140 [&>p]:mb-4 [&>ul>li>a]:font-semibold',
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
