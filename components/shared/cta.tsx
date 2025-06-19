import CustomLink, { CustomLinkProps } from './custom-link';
import { cn } from '@/lib/utils/css.utils';

export type CtaProps = {
  id: string;
  label: string;
  helperLabel?: string;
  link: CustomLinkProps;
  extraClass?: string;
  children?: React.ReactNode;
  variant?: 'default' | 'minimal' | 'underline' | 'border';
  icon?: 'play' | 'video' | 'substack' | 'download' | 'back';
};

const ICON_MAP = {
  play: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="none">
      <path
        d="M19.5 11.8C20.1667 12.1849 20.1667 13.1471 19.5 13.532L9 19.5942C8.33333 19.9791 7.5 19.498 7.5 18.7282L7.5 6.60384C7.5 5.83404 8.33333 5.35291 9 5.73781L19.5 11.8Z"
        fill="currentColor"
      />
    </svg>
  ),
  video: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M17 10.5V7C17 6.73478 16.8946 6.48043 16.7071 6.29289C16.5196 6.10536 16.2652 6 16 6H4C3.73478 6 3.48043 6.10536 3.29289 6.29289C3.10536 6.48043 3 6.73478 3 7V17C3 17.2652 3.10536 17.5196 3.29289 17.7071C3.48043 17.8946 3.73478 18 4 18H16C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V13.5L21 17.5V6.5L17 10.5Z"
        fill="currentColor"
      />
    </svg>
  ),
  substack: (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3 5H25V8.06977H3V5ZM3 16.1973H25V30L13.9977 23.8578L3 30V16.1973ZM3 10.5986H25V13.6684H3V10.5986Z"
        fill="currentColor"
      />
    </svg>
  ),
  download: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 16.5V18.75C3 19.3467 3.23705 19.919 3.65901 20.341C4.08097 20.7629 4.65326 21 5.25 21H18.75C19.3467 21 19.919 20.7629 20.341 20.341C20.7629 19.919 21 19.3467 21 18.75V16.5M16.5 12L12 16.5M12 16.5L7.5 12M12 16.5V3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  ),
  back: (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path
        d="M15.75 19.5L8.25 12L15.75 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
};

export default function Cta({
  label,
  helperLabel,
  extraClass,
  link,
  children,
  variant = 'default',
  icon,
}: CtaProps) {
  return (
    <CustomLink
      content={link}
      extraClass={cn(
        `bg-secondary-light-teal text-primary-navy hover:bg-primary-blue hover:text-neutral-white tracking-02 inline-block rounded-[5px] px-5 py-4 text-xl leading-120 font-semibold transition-all duration-200 ease-in group`,
        variant === 'minimal' &&
          'p-0 bg-transparent text-primary-teal hover:bg-transparent hover:text-primary-navy',
        variant === 'underline' &&
          ' p-0 bg-transparent text-primary-teal hover:bg-transparent hover:text-primary-navy',
        variant === 'border' &&
          'bg-transparent border-2 border-primary-teal text-primary-teal hover:bg-primary-teal hover:text-neutral-white',
        icon && 'flex items-center justify-center',
        extraClass,
      )}
    >
      {icon && <span className="mr-2">{ICON_MAP[icon]}</span>}
      <span className="flex flex-col">
        <span className={cn(variant === 'underline' && 'font-medium underline')}>{label}</span>
        {helperLabel && (
          <span className="text-primary-navy pointer-none: font-sans text-[16px] leading-140 font-normal">
            {helperLabel}
          </span>
        )}
      </span>
      {children && children}
    </CustomLink>
  );
}
