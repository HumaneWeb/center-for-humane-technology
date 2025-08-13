'use client';

import { cn } from '@/lib/utils/css.utils';
import { useState, useRef, useEffect } from 'react';
import { StructuredText } from 'react-datocms';
import CustomImage, { CustomImageProps } from '../shared/custom-image';

interface Item {
  id: string;
  title: string;
  image: CustomImageProps;
  defaultImage: CustomImageProps;
  content: any;
}

interface ItemSelectorProps {
  items: Item[];
}

export default function ItemSelector({ items }: ItemSelectorProps) {
  const [selectedItem, setSelectedItem] = useState(items[0]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [polygonPosition, setPolygonPosition] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const selectedIndex = items.findIndex((item) => item.id === selectedItem.id);
    const selectedElement = itemRefs.current[selectedIndex];
    const container = containerRef.current;

    if (selectedElement && container) {
      if (window.innerWidth < 992) {
        const scrollLeft =
          selectedElement.offsetLeft - container.offsetWidth / 2 + selectedElement.offsetWidth / 2;

        container.scrollTo({
          left: Math.max(0, scrollLeft),
          behavior: 'smooth',
        });

        setTimeout(() => {
          const itemCenter =
            selectedElement.offsetLeft - container.scrollLeft + selectedElement.offsetWidth / 2;
          setPolygonPosition(itemCenter);
        }, 300);
      } else {
        const itemCenter = selectedElement.offsetLeft + selectedElement.offsetWidth / 2;
        setPolygonPosition(itemCenter);
      }
    }
  }, [selectedItem, items]);

  const handleItemClick = (item: Item) => {
    if (item.id === selectedItem.id) return;

    setIsTransitioning(true);

    setTimeout(() => {
      setSelectedItem(item);
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <div className="mb:mb-[24px] mb:my-20 mx-auto my-10 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div
        ref={containerRef}
        className={`scrollbar-hide mb:grid mb:overflow-visible relative mb-2 flex grid-cols-4 gap-[23px] overflow-x-auto pb-4`}
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style jsx>
          {`
            @media (max-width: 992px) {
              .scrollbar-hide::-webkit-scrollbar {
                display: none;
              }
            }
          `}
        </style>

        {items.map((item, index) => (
          <div
            key={item.id}
            // @ts-ignore
            ref={(el) => (itemRefs.current[index] = el)}
            className={`mb:w-auto mb:flex-shrink mb:hover:scale-105 mb:px-[40px] mb:max-w-full w-[70%] max-w-[250px] flex-shrink-0 cursor-pointer rounded-[10px] px-[20px] py-[25px] transition-all duration-300 ${selectedItem.id === item.id ? 'transform bg-white' : 'bg-[#E0D8F6]'}`}
            style={
              selectedItem.id === item.id ? { boxShadow: '0 4px 24px 0 rgba(0, 0, 0, 0.20)' } : {}
            }
            onClick={() => handleItemClick(item)}
          >
            <div className="mx-auto mb-[30px] flex items-center justify-center overflow-hidden rounded-full bg-gray-100">
              <CustomImage
                {...(selectedItem.id === item.id ? item.image : item.defaultImage)}
                className="h-full w-full object-cover"
              />
            </div>
            <h3
              className={cn(
                'mb:text-xl max-w-[190px] text-[18px] leading-120 font-semibold',
                selectedItem.id === item.id ? 'text-[#B66736]' : 'text-primary-blue',
              )}
            >
              {item.title}
            </h3>
          </div>
        ))}
      </div>

      <div className="relative mb-6">
        <div
          className={`absolute top-[-4px] z-10 h-0 w-0 transition-all duration-300 ease-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
          style={{
            left: `${polygonPosition}px`,
            transform: 'translateX(-50%)',
            borderLeft: '20px solid transparent',
            borderRight: '20px solid transparent',
            borderBottom: '20px solid white',
          }}
        />
      </div>

      <div
        className={`mb:px-8 mb:py-11 rounded-[10px] bg-white px-4 py-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        <h2 className="tracking-039 mb:text-[39px] mb:leading-110 mb:mb-10 mb-5 text-[26px] leading-120 font-semibold text-[#262626]">
          {selectedItem.title}
        </h2>

        <div>
          <div className="text-primary-navy [&>h5]:mb:text-[25px] [&>h5]:mb:leading-130 [&>p]:mb:mb-10 mb:text-xl text-[16px] leading-140 font-normal [&>h5]:mb-5 [&>h5]:text-xl [&>h5]:leading-120 [&>h5]:font-semibold [&>p]:mb-5">
            <StructuredText data={selectedItem.content} />
          </div>
        </div>
      </div>
    </div>
  );
}
