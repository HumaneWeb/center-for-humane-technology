'use client';

import { useState, useRef, useEffect } from 'react';
import CustomImage, { CustomImageProps } from '../shared/custom-image';
import { StructuredText } from 'react-datocms';
import { cn } from '@/lib/utils/css.utils';
import { se } from 'date-fns/locale';

interface Item {
  id: string;
  title: string;
  image: CustomImageProps;
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

  useEffect(() => {
    const selectedIndex = items.findIndex((item) => item.id === selectedItem.id);
    const selectedElement = itemRefs.current[selectedIndex];

    if (selectedElement) {
      const rect = selectedElement.getBoundingClientRect();
      const containerRect = selectedElement.parentElement?.getBoundingClientRect();

      if (containerRect) {
        const itemCenter = rect.left - containerRect.left + rect.width / 2;
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
    <div className="mb:mb-[24px] mx-auto my-20 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="relative mb-2 grid grid-cols-2 gap-[23px] md:grid-cols-4">
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => (itemRefs.current[index] = el)}
            className={`cursor-pointer rounded-[10px] px-[40px] py-[25px] transition-all duration-300 hover:scale-105 ${
              selectedItem.id === item.id ? 'transform bg-white' : 'bg-[#E0D8F6]'
            } `}
            style={
              selectedItem.id === item.id ? { boxShadow: '0 4px 24px 0 rgba(0, 0, 0, 0.20)' } : {}
            }
            onClick={() => handleItemClick(item)}
          >
            <div className="mx-auto mb-[30px] flex items-center justify-center overflow-hidden rounded-full bg-gray-100">
              <CustomImage {...item.image} className="h-full w-full object-cover" />
            </div>
            <h3
              className={cn(
                'max-w-[190px] text-xl leading-120 font-semibold',
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
          className="absolute top-0 z-10 h-0 w-0 transition-all duration-300 ease-out"
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
        className={`rounded-[10px] bg-white px-8 py-11 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'} `}
      >
        <h2 className="tracking-039 mb-10 text-[39px] leading-110 font-semibold text-[#262626]">
          {selectedItem.title}
        </h2>

        <div className="space-y-6">
          <div className="text-primary-navy text-xl leading-140 font-normal [&>h5]:mb-5 [&>h5]:text-[25px] [&>h5]:leading-130 [&>h5]:font-semibold [&>p]:mb-10">
            <StructuredText data={selectedItem.content} />
          </div>
        </div>
      </div>
    </div>
  );
}
