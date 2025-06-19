import CustomStructuredText from '../shared/custom-structured-text';

type Props = {
  firstColumn: any;
  secondColumn: any;
};

export default function GridBlock({ firstColumn, secondColumn }: Props) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="h-full">
        <CustomStructuredText data={firstColumn} isInnerContainer />
      </div>
      <div className="h-full">
        <CustomStructuredText data={secondColumn} isInnerContainer />
      </div>
    </div>
  );
}
