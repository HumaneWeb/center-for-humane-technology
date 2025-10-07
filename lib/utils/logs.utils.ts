import { track } from '@vercel/analytics';

export const logError = (error: unknown): void => {
  if (process.env.NODE_ENV !== 'development') return;
  console.error('Error occurred:', error);
};

export const logInfo = (message: string): void => {
  if (process.env.NODE_ENV !== 'development') return;
  console.info('Info:', message);
};

export const logDebug = (message: string): void => {
  if (process.env.NODE_ENV !== 'development') return;
  console.debug('Debug:', message);
};
export const logWarning = (message: string): void => {
  if (process.env.NODE_ENV !== 'development') return;
  console.warn('Warning:', message);
};

export function logAnalyticsError(context: string, error: unknown) {
  let message = 'Unknown error';
  if (error instanceof Error) {
    message = error.message;
  } else if (typeof error === 'string') {
    message = error;
  }

  track('checkout_error', {
    context,
    message,
    timestamp: new Date().toISOString(),
  });
}
