import { NextResponse } from 'next/server';
export const runtime = 'edge';
// 模拟应用配置的数据
const mockAppConfig = {
  levels: [
    { level: 1, name: 'Beginner Beat', points: 5000, invites: 1 },
    { level: 2, name: 'Basic Note', points: 30000, invites: 3 },
    { level: 3, name: 'Junior Jammer', points: 100000, invites: 5 },
    { level: 4, name: 'Rhythm Rookie', points: 1000000, invites: 7 },
    { level: 5, name: 'Melody Mover', points: 2000000, invites: 10 },
    { level: 6, name: 'Tune Tracker', points: 10000000, invites: 12 },
    { level: 7, name: 'Song Shaper', points: 50000000, invites: 15 },
    { level: 8, name: 'Harmony Hero', points: 100000000, invites: 18 },
    { level: 9, name: 'Music Master', points: 500000000, invites: 20 },
    { level: 10, name: 'Sound Superstar', points: 1000000000, invites: 30 },
  ],
};

export async function GET() {
  return NextResponse.json({
    data: mockAppConfig,
  });
}
