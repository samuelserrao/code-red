import { NextResponse } from 'next/server';
import axios from 'axios';

// Get these from process.env, which the user will provide in .env.local
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GOOGLE_CX = process.env.GOOGLE_CX;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');

  if (!q) {
    return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
  }

  // If no API keys are provided, return mock results so the UI still works nicely
  if (!GOOGLE_API_KEY || !GOOGLE_CX) {
    return NextResponse.json({
      items: [
        {
          title: `[MOCK] Understanding ${q}`,
          link: 'https://example.com/mock-1',
          snippet: `This is a mock search result for "${q}" because Google API keys were not found in .env.local. Please add GOOGLE_API_KEY and GOOGLE_CX to test the real integration.`,
        },
        {
          title: `[MOCK] History of ${q}`,
          link: 'https://example.com/mock-2',
          snippet: `Another mock result. The application is designed to smoothly fallback when API keys are missing to ensure continuous development and testing.`,
        }
      ]
    });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: GOOGLE_API_KEY,
        cx: GOOGLE_CX,
        q: q,
      }
    });

    return NextResponse.json({ items: response.data.items || [] });
  } catch (error) {
    console.error('Google Custom Search API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch search results' }, { status: 500 });
  }
}
