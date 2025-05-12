import { executeQuery } from '@datocms/cda-client';
import { cache } from 'react';

type PerformRequestArgs = [
  query: string,
  options: any & {
    token?: string;
    environment?: string;
  },
];

const dedupedPerformRequest = cache(<T>(serializedArgs: string): Promise<T> => {
  const args: PerformRequestArgs = JSON.parse(serializedArgs);
  return executeQuery<T>(...args);
});

export function performRequest<T>(
  query: string,
  options: Omit<any, 'token' | 'environment'> = {},
): Promise<T> {
  return dedupedPerformRequest<T>(
    JSON.stringify([
      query,
      {
        ...options,
        token: process.env.NEXT_DATOCMS_API_TOKEN,
        environment: process.env.NEXT_DATOCMS_ENVIRONMENT,
      },
    ] satisfies PerformRequestArgs),
  );
}
