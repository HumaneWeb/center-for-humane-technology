import { StructuredText, StructuredTextDocument } from 'react-datocms';

export default function CustomStructuredText({
  data,
}: {
  data: Document | Node | StructuredTextDocument | null | undefined;
}) {
  // @ts-expect-error
  return <StructuredText data={data} />;
}
