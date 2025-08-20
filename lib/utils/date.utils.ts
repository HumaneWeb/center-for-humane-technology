import { format, parseISO } from 'date-fns';

export function formatDate(dateString: string): string {
  try {
    const parsedDate = parseISO(dateString);
    return format(parsedDate, 'MMM d, yyyy');
  } catch {
    return '';
  }
}

export function formatDuration(input: string): string {
  const match = input.match(/^(\d+)\s*(\w+)/);
  if (!match) return input;

  const [, value, unit] = match;

  switch (unit.toLowerCase()) {
    case 'minutes':
    case 'minute':
    case 'min':
      return `${value}’`;
    case 'hours':
    case 'hour':
    case 'h':
      return `${value}h`;
    case 'seconds':
    case 'second':
    case 'sec':
    case 's':
      return `${value}s`;
    default:
      return input;
  }
}
