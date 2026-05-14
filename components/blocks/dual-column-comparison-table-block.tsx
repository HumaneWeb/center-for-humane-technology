import { cn } from '@/lib/utils/css.utils';

type TableItem = {
  id: string;
  header: string;
  copy?: string | null;
};

type Props = {
  leftColumnHeader: string;
  leftColumnColor?: { hex: string } | null;
  leftColumnItems: TableItem[];
  rightColumnHeader: string;
  rightColumnColor?: { hex: string } | null;
  rightColumnItems: TableItem[];
};

const DEFAULT_LEFT_COLOR = '#c0392b';
const DEFAULT_RIGHT_COLOR = '#007981';

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn('shrink-0', className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function DualColumnComparisonTableBlock({
  leftColumnHeader,
  leftColumnColor,
  leftColumnItems,
  rightColumnHeader,
  rightColumnColor,
  rightColumnItems,
}: Props) {
  const leftColor = leftColumnColor?.hex ?? DEFAULT_LEFT_COLOR;
  const rightColor = rightColumnColor?.hex ?? DEFAULT_RIGHT_COLOR;

  const rowCount = Math.max(leftColumnItems.length, rightColumnItems.length);

  return (
    <section className="my-8 mb:my-14 w-full">
      <div className="bg-primary-navy px-4 py-8 sm:px-6 mb:px-10 mb:py-12">
        <div className="mx-auto max-w-7xl">
          {/* Column headers */}
          <div className="mb-4 grid grid-cols-1 items-center gap-2 mb:grid-cols-[1fr_48px_1fr] mb:gap-4">
            <div
              className="hidden items-center justify-center rounded-sm px-4 py-3 mb:flex mb:py-4"
              style={{ backgroundColor: leftColor }}
            >
              <h2 className="text-center font-sans text-sm font-bold uppercase leading-tight tracking-[0.065em] text-neutral-white mb:text-base">
                {leftColumnHeader}
              </h2>
            </div>

            <div className="hidden items-center justify-center mb:flex">
              <ArrowIcon className="text-neutral-white h-5 w-5 mb:h-6 mb:w-6" />
            </div>

            <div
              className="flex items-center justify-center rounded-sm px-4 py-3 mb:py-4"
              style={{ backgroundColor: rightColor }}
            >
              <h2 className="text-center font-sans text-sm font-bold uppercase leading-tight tracking-[0.065em] text-neutral-white mb:text-base">
                {rightColumnHeader}
              </h2>
            </div>
          </div>

          {/* Rows */}
          <div className="flex flex-col gap-3 mb:gap-4">
            {Array.from({ length: rowCount }).map((_, i) => {
              const left = leftColumnItems[i];
              const right = rightColumnItems[i];

              return (
                <div
                  key={i}
                  className="grid grid-cols-1 items-stretch gap-2 mb:grid-cols-[1fr_48px_1fr] mb:gap-4"
                >
                  {/* Left cell — hidden on mobile */}
                  {left ? (
                    <div className="hidden flex-col justify-center bg-neutral-white p-4 shadow-sm mb:flex mb:p-6">
                      <p className="font-sans text-sm font-semibold leading-120 text-primary-navy mb:text-base">
                        {left.header}
                      </p>
                      {left.copy && (
                        <div
                          className="mt-1 font-sans text-xs leading-140 text-neutral-medium-gray mb:text-sm [&>p]:m-0"
                          dangerouslySetInnerHTML={{ __html: left.copy }}
                        />
                      )}
                    </div>
                  ) : (
                    <div className="hidden mb:block" />
                  )}

                  {/* Arrow connector — hidden on mobile */}
                  <div className="hidden items-center justify-center mb:flex">
                    <ArrowIcon className="text-neutral-white h-5 w-5 mb:h-6 mb:w-6" />
                  </div>

                  {/* Right cell */}
                  {right ? (
                    <div className="flex flex-col justify-center bg-neutral-white p-4 shadow-sm mb:p-6">
                      <p className="font-sans text-sm font-semibold leading-120 text-primary-navy mb:text-base">
                        {right.header}
                      </p>
                      {right.copy && (
                        <div
                          className="mt-1 font-sans text-xs leading-140 text-neutral-medium-gray mb:text-sm [&>p]:m-0"
                          dangerouslySetInnerHTML={{ __html: right.copy }}
                        />
                      )}
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
