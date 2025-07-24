import CustomLink from './custom-link';

type Props = {
  id: string;
  title: string | null;
  introduction: string | null;
  slug: string;
  __typename: string;
};

export default function CareerCard({ title, introduction, slug, __typename }: Props) {
  return (
    // @ts-ignore
    <CustomLink content={{ content: { slug, __typename } }} extraClass="group h-full">
      <article className="group">
        <h3 className="text-primary-teal group-hover:text-primary-navy mb:text-2xl mb:leading-130 mb-2 font-sans text-xl leading-120 font-semibold transition-all duration-200 ease-in">
          {title}
        </h3>
        {introduction && (
          <div
            className="text-primary-navy font-sans text-[16px] leading-135"
            dangerouslySetInnerHTML={{ __html: introduction }}
          />
        )}
      </article>
    </CustomLink>
  );
}
