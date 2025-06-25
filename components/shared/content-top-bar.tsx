'use client';
import type { SidebarItem } from '@/lib/utils/types';
import { handleClickJumpToSection } from '@/lib/utils/ui.utils';

interface ContentTopBarProps {
  items: SidebarItem[];
}

export default function ContentTopBar({ items }: ContentTopBarProps) {
  return (
    <div className="jump-to-section-ui bg-neutral-white sticky top-0 mt-10 self-start border border-[#A8ADB6] py-3.5">
      <ul className="text-primary-teal mx-auto flex max-w-7xl items-center gap-20 px-4 font-sans text-[16px] leading-140 font-semibold sm:px-6 lg:px-8">
        {items.map((item) => (
          <li
            key={item.id}
            className="hover:text-primary-blue cursor-pointer transition-all duration-200 ease-in"
            onClick={() => {
              handleClickJumpToSection(item.headline);
            }}
          >
            {item.headline}
          </li>
        ))}
      </ul>
    </div>
  );
}
