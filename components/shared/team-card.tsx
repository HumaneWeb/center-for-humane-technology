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
  _modelApiKey: string;
};

export default function TeamCard({
  fullName,
  image,
  teamPosition,
  organization,
  slug,
  _modelApiKey,
  type,
}: Props) {
  const isTeam = type === 'team';

  return (
    // @ts-expect-error
    <CustomLink content={{ slug, __typename: _modelApiKey }}>
      <article>
        <div className="mb-5">
          <CustomImage {...image} extraClass="aspect-square" />
        </div>
        <h3
          className={cn(
            'mb-2 font-sans leading-120 font-semibold',
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
