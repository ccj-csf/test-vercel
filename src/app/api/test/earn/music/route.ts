import { IMusicRewardRequestData } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body: IMusicRewardRequestData = await request.json();

    const { musicId, reward, rewardTime } = body;

    if (!musicId || !rewardTime || reward === undefined) {
      return NextResponse.json(
        { message: 'Missing required fields in request body' },
        { status: 400 },
      );
    }

    // 模拟处理逻辑，例如保存奖励信息到数据库

    return NextResponse.json(
      { message: 'Music reward processed successfully', data: body },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error processing music reward:', error);
    return NextResponse.json({ message: 'Failed to process music reward' }, { status: 500 });
  }
}
