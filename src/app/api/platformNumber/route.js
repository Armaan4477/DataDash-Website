import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Get the platform parameter from the URL
    const { searchParams } = new URL(request.url);
    const platform = searchParams.get('platform');
    
    // Fetch version data from GitHub repository
    const response = await fetch('https://raw.githubusercontent.com/Project-Bois/DataDash-files/refs/heads/main/version.json', {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch version info: ${response.status}`);
    }
    
    const versionData = await response.json();
    
    // If a specific platform was requested, return just that version
    if (platform && versionData.platformValues && versionData.platformValues[platform]) {
      return NextResponse.json(
        { value: versionData.platformValues[platform] },
        {
          status: 200,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Content-Type': 'application/json'
          }
        }
      );
    }
    
    // Otherwise return the full version data
    return NextResponse.json(versionData, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching version data:', error);
    
    // Return error response
    return NextResponse.json(
      { error: 'Failed to fetch version data' },
      { status: 500 }
    );
  }
}
