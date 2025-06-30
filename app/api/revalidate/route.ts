import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function POST(req: Request) {
  // const body = await req.json();

  // if (body.secret !== process.env.REVALIDATE_SECRET) {
  //   return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  // }

  revalidateTag('datocms');
  return NextResponse.json({ revalidated: true });
}
