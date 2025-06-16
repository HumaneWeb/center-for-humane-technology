import { cn } from '@/lib/utils/css.utils';
import CustomImage, { CustomImageProps } from './custom-image';
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

  return (
    // @ts-expect-error
    <CustomLink content={{ content: { slug, __typename } }} extraClass="group">
      <article className="transition-all duration-200">
        <div className="mb-5">
          <CustomImage {...image} extraClass="aspect-square group-hover:grayscale" />
        </div>
        <h3
          className={cn(
            'group-hover:text-primary-navy mb-2 font-sans leading-120 font-semibold',
            isTeam ? 'text-primary-teal text-2xl' : 'text-primary-navy text-xl',
          )}
        >
          {fullName}
        </h3>
        <h4
          className={cn(
            'font-sans text-[16px] font-semibold',
            isTeam ? 'tracking-08 text-primary-navy leading-135 uppercase' : 'leading-140',
          )}
        >
          {teamPosition}
        </h4>
        <h5 className="text-primary-teal font-sans text-[16px] leading-140 font-semibold">
          {organization}
        </h5>
      </article>
    </CustomLink>
  );
}
