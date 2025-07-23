import { cn } from '@/lib/utils/css.utils';
import CustomImage, { type CustomImageProps } from './custom-image';
import CustomLink from './custom-link';

type Props = {
  fullName: string;
  teamPosition?: string;
  organization?: string;
  image: CustomImageProps;
  type: 'team' | 'board';
  slug: string;
  __typename: string;
};

const INVISIBLE_CHAR_REGEX = /[\u200B-\u200D\uFEFF]/g;

export default function TeamCard({
  fullName,
  image,
  teamPosition,
  organization,
  slug,
  __typename,
  type,
}: Props) {
  const isTeam = type === 'team';

  if (isTeam) {
    return (
      // @ts-expect-error
      <CustomLink content={{ content: { slug, __typename } }} extraClass="group h-full">
        <article className="h-full">
          {image && (
            <div className="mb-5 overflow-hidden">
              <CustomImage
                {...image}
                extraClass="aspect-square object-cover transition-all duration-500 ease-in-out group-hover:grayscale group-hover:scale-105 w-full"
              />
            </div>
          )}
          {fullName && (
            <h3
              className={cn(
                'mb:mb-2 mb-1 font-sans leading-120 font-semibold transition-colors duration-200 ease-in-out',
                isTeam
                  ? 'text-primary-teal group-hover:text-primary-navy mb:text-2xl text-[23px]'
                  : 'text-primary-navy group-hover:text-primary-teal mb:text-xl text-[23px]',
              )}
            >
              {fullName.replace(INVISIBLE_CHAR_REGEX, '')}
            </h3>
          )}
          {teamPosition && (
            <h4
              className={cn(
                'mb:text-[16px] font-sans text-[14px] font-semibold',
                isTeam
                  ? 'tracking-08 text-primary-navy mb:leading-135 leading-120 uppercase'
                  : 'leading-140',
              )}
            >
              {teamPosition.replace(INVISIBLE_CHAR_REGEX, '')}
            </h4>
          )}
          {organization && (
            <h5 className="text-primary-teal mb:text-[16px] font-sans text-[14px] leading-140 font-semibold">
              {organization.replace(INVISIBLE_CHAR_REGEX, '')}
            </h5>
          )}
        </article>
      </CustomLink>
    );
  }

  return (
    <article className="group h-full">
      {image && (
        <div className="mb-5 overflow-hidden">
          <CustomImage
            {...image}
            extraClass="aspect-square object-cover transition-all duration-500 ease-in-out w-full"
          />
        </div>
      )}
      {fullName && (
        <h3
          className={cn(
            'mb:mb-2 mb-1 font-sans leading-120 font-semibold transition-colors duration-200 ease-in-out',
            isTeam
              ? 'text-primary-teal group-hover:text-primary-navy mb:text-2xl text-[23px]'
              : 'text-primary-navy group-hover:text-primary-teal mb:text-xl text-[23px]',
          )}
        >
          {fullName.replace(INVISIBLE_CHAR_REGEX, '')}
        </h3>
      )}
      {teamPosition && (
        <h4
          className={cn(
            'mb:text-[16px] font-sans text-[14px] font-semibold',
            isTeam
              ? 'tracking-08 text-primary-navy mb:leading-135 leading-120 uppercase'
              : 'leading-140',
          )}
        >
          {teamPosition.replace(INVISIBLE_CHAR_REGEX, '')}
        </h4>
      )}
      {organization && (
        <h5 className="text-primary-teal mb:text-[16px] font-sans text-[14px] leading-140 font-semibold">
          {organization.replace(INVISIBLE_CHAR_REGEX, '')}
        </h5>
      )}
    </article>
  );
}
