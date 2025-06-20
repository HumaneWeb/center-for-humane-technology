type Props = {
  id: string;
  title: string | null;
  introduction: string | null;
};

export default function CareerCard({ title, introduction }: Props) {
  return (
    <article className="group">
      <h3 className="text-primary-teal group-hover:text-primary-navy mb-2 font-sans text-2xl leading-130 font-semibold transition-all duration-200 ease-in">
        {title}
      </h3>
      {introduction && (
        <div
          className="text-primary-navy font-sans text-[16px] leading-135"
          dangerouslySetInnerHTML={{ __html: introduction }}
        />
      )}
    </article>
  );
}
