import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { initRawData, inviteCode } = body;

    if (!initRawData) {
      return NextResponse.json(
        { message: 'Missing initRawData or inviteCode in request body' },
        { status: 400 },
      );
    }

    const response = {
      accessToken: 'sampleAccessToken',
      tokenType: 'Bearer',
      expiresIn: 3600,
      expiresAt: new Date(Date.now() + 3600 * 1000).toISOString(),
      refreshToken: 'sampleRefreshToken',
      refreshTokenExpiresAt: new Date(Date.now() + 86400 * 1000).toISOString(),
    };

    return NextResponse.json({
      data: response,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Failed to process login request' },
      {
        status: 500,
      },
    );
  }
}
