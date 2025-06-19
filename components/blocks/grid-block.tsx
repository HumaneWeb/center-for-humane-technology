import CustomStructuredText from '../shared/custom-structured-text';

type Props = {
  firstColumn: any;
  secondColumn: any;
};

export default function GridBlock({ firstColumn, secondColumn }: Props) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        <CustomStructuredText data={firstColumn} />
      </div>
      <div>
        <CustomStructuredText data={secondColumn} />
      </div>
    </div>
  );
}
