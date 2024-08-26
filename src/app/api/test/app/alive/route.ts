import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function PUT() {
  // 这里只是简单返回成功的响应，表示心跳正常
  return NextResponse.json({
    data: 'Heartbeat received',
  });
}
