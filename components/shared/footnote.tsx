type Props = {
  title: string;
  content: string;
};

export default function Footnote({ title, content }: Props) {
  return (
    <footer>
      <h4 className="text-primary-navy mb-6 font-sans text-xl leading-120 font-semibold">
        {title}
      </h4>
      {content && (
        <div
          className="[&>ul>li>a]:text-primary-teal ml-5 font-sans text-[16px] leading-140 text-black [&>ul]:list-disc [&>ul>li]:mb-3 [&>ul>li>a]:font-semibold"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </footer>
  );
}
