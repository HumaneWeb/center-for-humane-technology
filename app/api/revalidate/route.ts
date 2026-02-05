import { NextResponse } from 'next/server';
import { revalidateTag, revalidatePath } from 'next/cache';

export async function POST(req: Request) {
  const timestamp = new Date().toISOString();

  try {
    const body = await req.json();

    console.log(`[${timestamp}] Revalidation requested:`, {
      path: body.path || 'all',
      source: body.entity_type || 'unknown',
    });

    // Optional: Uncomment to add security
    // if (body.secret !== process.env.REVALIDATE_SECRET) {
    //   console.error(`[${timestamp}] Revalidation failed: Invalid token`);
    //   return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    // }

    // 1. Revalidate all DatoCMS queries (clears Next.js Data Cache)
    revalidateTag('datocms');
    console.log(`[${timestamp}] ✓ Cleared Next.js Data Cache (tag: datocms)`);

    // 2. Revalidate all pages (clears Vercel's Edge Cache)
    // This recursively revalidates all pages in the app
    revalidatePath('/', 'layout');
    console.log(`[${timestamp}] ✓ Cleared Vercel Edge Cache (all pages)`);

    // 3. Optionally revalidate specific paths if provided
    if (body.path) {
      revalidatePath(body.path);
      console.log(`[${timestamp}] ✓ Revalidated specific path: ${body.path}`);
    }

    const response = {
      revalidated: true,
      timestamp,
      path: body.path || 'all pages',
      cacheCleared: ['datocms-tag', 'vercel-edge-cache'],
    };

    console.log(`[${timestamp}] ✓ Revalidation completed successfully`);

    return NextResponse.json(response);
  } catch (err) {
    const error = err instanceof Error ? err.message : 'Unknown error';
    console.error(`[${timestamp}] ✗ Revalidation failed:`, error);

    return NextResponse.json(
      {
        message: 'Error revalidating',
        error,
        timestamp,
      },
      { status: 500 },
    );
  }
}
