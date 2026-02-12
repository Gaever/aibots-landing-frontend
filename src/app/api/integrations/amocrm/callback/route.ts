import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.json({ error: `AmoCRM Error: ${error}` }, { status: 400 });
    }

    if (!code) {
      return NextResponse.json({ error: 'No authorization code provided' }, { status: 400 });
    }

    const CLIENT_ID = process.env.AMOCRM_CLIENT_ID;
    const CLIENT_SECRET = process.env.AMOCRM_CLIENT_SECRET;
    const REDIRECT_URI = process.env.AMOCRM_REDIRECT_URI;
    const BASE_URL = process.env.AMOCRM_BASE_URL;

    if (!CLIENT_ID || !CLIENT_SECRET || !REDIRECT_URI || !BASE_URL) {
      console.error('Missing AmoCRM OAuth credentials');
      return NextResponse.json({ error: 'Server configuration error: Missing OAuth credentials' }, { status: 500 });
    }

    // Exchange code for tokens
    const response = await fetch(`${BASE_URL}/oauth2/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        error: 'Failed to exchange code for token',
        details: data
      }, { status: response.status });
    }

    // In a real app, you would save these tokens to a database (associated with a user or system config)
    // For now, we just return them so the admin can configure the env manually.
    return NextResponse.json({
      message: 'Authorization successful! Please copy these tokens to your .env file.',
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expires_in: data.expires_in,
      token_type: data.token_type
    });

  } catch (error) {
    console.error('Auth Callback Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
