import { NextResponse } from 'next/server';
export const runtime = 'edge';
const userData = {
  userName: 'Kim Kardasham',
  avatar: 'https://d121vty759npai.cloudfront.net/images/648715e6e5df45a7b284d52e487b01f4.jpeg',
  level: 2,
  totalPoints: 189809,
  invites: 3,
  profitPerHour: 3600,
  inviteCode: '123456',
  rewardPoints: 6400,
};

export async function GET() {
  return NextResponse.json({
    data: userData,
  });
}
