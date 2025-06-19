'use client';
import { useState } from 'react';

type Props = {
  items: {
    id: string;
    title: string;
    content: string;
  }[];
};

export default function AccordionBlock({ items }: Props) {
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
                className={`flex w-full cursor-pointer items-center justify-between gap-3 bg-[#F0F7F7] px-8 py-6 font-medium text-gray-500 transition-colors duration-200`}
                onClick={() => toggleItem(item.id)}
                aria-expanded={isActive}
                aria-controls={`accordion-collapse-body-${item.id}`}
              >
                <span className="font-sans text-2xl leading-120 font-semibold text-[#262626]">
                  {item.title}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="31"
                  viewBox="0 0 30 31"
                  fill="none"
                  className={`shrink-0 transition-transform duration-300 ${
                    isActive ? 'rotate-180' : 'rotate-0'
                  }`}
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
              className={`overflow-hidden bg-[#F0F7F7] px-8 transition-all duration-300 ease-in-out ${
                isActive ? 'max-h-max py-4 opacity-100' : 'max-h-0 opacity-0'
              }`}
              aria-labelledby={`accordion-collapse-heading-${item.id}`}
            >
              <div
                className="text-primary-navy [&>ul>li>a]:text-primary-teal text-xl leading-140 [&>p]:mb-4 [&>ul>li>a]:font-semibold"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
