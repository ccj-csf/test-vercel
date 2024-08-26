import { NextResponse } from 'next/server';

export const runtime = 'edge';

const pointsData = {
  timestamp: new Date().toISOString(),
  userId: 'user123',
  totalPoints: 189809,
};

export async function GET() {
  // 这里返回当前的用户积分数据
  return NextResponse.json({
    data: pointsData,
  });
}
