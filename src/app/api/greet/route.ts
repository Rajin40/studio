
import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // You can access query parameters like this:
  // const searchParams = request.nextUrl.searchParams;
  // const name = searchParams.get('name');
  // const message = name ? `Hello, ${name}!` : 'Hello from the API!';

  const message = 'Hello from your new Next.js API route!';
  
  return NextResponse.json({ message });
}
