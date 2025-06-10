type Props = {
  id: string;
  title: string | null;
  introduction: string | null;
};

export default function CareerCard({ title, introduction }: Props) {
  return (
    <article>
      <h3 className="text-primary-teal mb-2 font-sans text-2xl leading-130 font-semibold">
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
