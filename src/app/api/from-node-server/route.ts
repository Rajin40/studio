
import { type NextRequest, NextResponse } from 'next/server';

// IMPORTANT: Replace this URL with the actual URL of your Node.js server endpoint.
// For development, if your Node.js server is running locally on port 5000
// and has an endpoint like '/api/external-data', this would be the URL.
const NODE_SERVER_URL = 'http://localhost:5000/api/external-data'; 

export async function GET(request: NextRequest) {
  try {
    // Make a request to your external Node.js server
    const response = await fetch(NODE_SERVER_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any other headers your Node.js server might require,
        // e.g., an API key or authorization token.
        // 'Authorization': `Bearer YOUR_API_KEY_OR_TOKEN`
      },
      // If you need to control caching behavior for this server-to-server request:
      // cache: 'no-store', // To always fetch fresh data
    });

    // Check if the request to the Node.js server was successful
    if (!response.ok) {
      // If the Node.js server returned an error, forward that error
      const errorData = await response.text(); // Or response.json() if it sends JSON errors
      console.error(`Error from Node.js server: ${response.status} ${response.statusText}`, errorData);
      return NextResponse.json(
        { message: `Error fetching data from Node.js server: ${response.statusText}`, details: errorData },
        { status: response.status }
      );
    }

    // Parse the JSON response from your Node.js server
    const data = await response.json();

    // Return the data to the client that called this Next.js API route
    return NextResponse.json(data);

  } catch (error) {
    console.error('Failed to fetch from Node.js server:', error);
    let errorMessage = 'An unexpected error occurred while fetching data.';
    if (error instanceof Error) {
        // Check for specific network errors, like server not reachable
        if (error.message.includes('ECONNREFUSED') || error.message.toLowerCase().includes('fetch failed')) {
            errorMessage = 'Could not connect to the Node.js server. Please ensure it is running and accessible.';
        } else {
            errorMessage = error.message;
        }
    }
    return NextResponse.json(
      { message: 'Internal Server Error in Next.js API route', error: errorMessage },
      { status: 500 }
    );
  }
}

// You can also define POST, PUT, DELETE handlers here to forward those requests
// to your Node.js server if needed. For example:
/*
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const response = await fetch(NODE_SERVER_URL_FOR_POST, { // Ensure this URL is for POST requests
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { message: `Error posting data to Node.js server: ${response.statusText}`, details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });

  } catch (error) {
    console.error('Failed to POST to Node.js server:', error);
    return NextResponse.json(
      { message: 'Internal Server Error in Next.js API route while POSTing' },
      { status: 500 }
    );
  }
}
*/
