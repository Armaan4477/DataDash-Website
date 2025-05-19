import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch beta version data from GitHub repository
    const response = await fetch('https://raw.githubusercontent.com/Project-Bois/data-dash-test-files/refs/heads/main/version.json', {
      cache: 'no-store' // Don't cache the response
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch beta version info: ${response.status}`);
    }
    
    const versionData = await response.json();
    
    // Return the data with proper headers
    return NextResponse.json(versionData, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching beta version data:', error);
    
    // Return error response
    return NextResponse.json(
      { error: 'Failed to fetch beta version data' },
      { status: 500 }
    );
  }
}
