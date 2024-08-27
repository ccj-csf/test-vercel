import { ResponseWrapper } from '@/lib';
import { IFriendsData } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

// 默认数据
const initialBonuses = [
  { level: 1, reward: 25000 },
  { level: 2, reward: 50000 },
  { level: 3, reward: 100000 },
  { level: 4, reward: 100000 },
  { level: 5, reward: 100000 },
  { level: 6, reward: 100000 },
  { level: 7, reward: 100000 },
  { level: 8, reward: 200000 },
  { level: 9, reward: 200000 },
  { level: 10, reward: 400000 },
];

const initialFriends = [
  {
    name: 'Sophia',
    avatar: 'https://d121vty759npai.cloudfront.net/images/4bb3b74de5c8485bbc0ba340a32f20a2.jpeg',
    level: 8,
    totalPoints: 250000,
  },
  {
    name: 'Isla',
    avatar: 'https://d121vty759npai.cloudfront.net/images/535923daad4947a7959cccae187713ec.jpeg',
    level: 9,
    totalPoints: 21200,
  },
  {
    name: 'Liam',
    avatar: 'https://d121vty759npai.cloudfront.net/images/55c38383678a4c0bae7094b6b7de3a1f.jpeg',
    level: 10,
    totalPoints: 210,
  },
  {
    name: 'Harper',
    avatar: 'https://d121vty759npai.cloudfront.net/images/597e5f23ed074553994d44975b2f3994.jpeg',
    level: 7,
    totalPoints: 0,
  },
  {
    name: 'Aiden',
    avatar: 'https://d121vty759npai.cloudfront.net/images/7b242bc2b0364d50baf55f0b0d6c07dc.jpeg',
    level: 6,
    totalPoints: 0,
  },
];

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const data: IFriendsData = {
    friends: initialFriends,
    bonuses: initialBonuses,
  };

  return NextResponse.json(ResponseWrapper.success(data));
}
