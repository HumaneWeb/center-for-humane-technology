// @ts-nocheck
import CustomStructuredText from '../shared/custom-structured-text';
import { FadeIn } from '../shared/fade-in';

type Props = {
  firstColumn: any;
  secondColumn: any;
};

export default function GridBlock({ firstColumn, secondColumn }: Props) {
  return (
    <FadeIn className="mb:grid-cols-2 mb:gap-6 grid gap-3">
      <div className="h-full">
        <CustomStructuredText data={firstColumn} isInnerContainer />
      </div>
      <div className="h-full">
        <CustomStructuredText data={secondColumn} isInnerContainer />
      </div>
    </FadeIn>
  );
}
