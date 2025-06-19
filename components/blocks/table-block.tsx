import { cn } from '@/lib/utils/css.utils';

interface ResponsiveTableProps {
  content: string;
  className?: string;
  containerClassName?: string;
  sanitize?: boolean;
}

export default function TableBlock({
  content,
  className,
  containerClassName,
  sanitize = false,
}: ResponsiveTableProps) {
  const processedHtml = sanitize
    ? content.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    : content;

  return (
    <div className={cn('w-full overflow-x-auto', containerClassName)}>
      <div
        className={cn(
          'min-w-full',
          // Estilos base para la tabla
          '[&_table]:w-full [&_table]:border-collapse',
          // Estilos para headers
          '[&_th]:text-primary-navy [&_th]:tracking-065 [&_th]:border [&_th]:border-[#DBDEE6] [&_th]:bg-[#F3F0FF] [&_th]:p-4 [&_th]:text-left [&_th]:text-sm [&_th]:leading-120 [&_th]:font-semibold [&_th]:uppercase',
          // Estilos para celdas
          '[&_td]:text-primary-navy [&_td]:border [&_td]:border-[#DBDEE6] [&_td]:p-4 [&_td]:text-sm [&_td]:leading-140',
          // Hover effects
          '[&_tbody_tr:hover]:bg-gray-50',
          // Responsive behavior
          'sm:[&_td]:px-6 sm:[&_td]:py-4 sm:[&_th]:px-6 sm:[&_th]:py-4',
          className,
        )}
        dangerouslySetInnerHTML={{ __html: processedHtml }}
      />
    </div>
  );
}
