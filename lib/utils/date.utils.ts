import { format, parseISO } from 'date-fns';

export function formatDate(dateString: string): string {
  try {
    const parsedDate = parseISO(dateString);
    return format(parsedDate, 'MMM d, yyyy');
  } catch {
    return '';
  }
}
