import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://centerforhumanetechnology.substack.com/feed', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; RSS Reader)',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch RSS feed');
    }

    const xmlText = await response.text();

    return new NextResponse(xmlText, {
      headers: {
        'Content-Type': 'application/xml',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error('Error fetching RSS:', error);
    return NextResponse.json({ error: 'Failed to fetch RSS feed' }, { status: 500 });
  }
}
