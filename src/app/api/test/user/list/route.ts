import { ResponseWrapper } from '@/lib';
import { IUserLevel } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  // 模拟生成数据
  const usernames = [
    ['Goloust', 'Neil', 'Wnageb', 'Steve Ater', 'Kim'],
    ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Goloust', 'Neil', 'Wnageb', 'Steve Ater', 'Kim'],
    ['Frank', 'Grace', 'Heidi', 'Ivan', 'Judy'],
    ['Mallory', 'Niaj', 'Oscar', 'Peggy', 'Quentin'],
    ['Romeo', 'Sybil', 'Trent', 'Uma', 'Victor'],
    ['Walter', 'Xena', 'Yves', 'Zara', 'Aria'],
    ['Blake', 'Caleb', 'Dylan', 'Eli', 'Fiona'],
    ['Gina', 'Harry', 'Isla', 'Jack', 'Kara'],
    ['Liam', 'Mia', 'Nina', 'Omar', 'Pia'],
    ['Quinn', 'Rhea', 'Sara', 'Theo', 'Uma'],
  ];

  // 从查询参数中获取级别（假设级别从1到10）
  const { searchParams } = new URL(request.url);
  const level = parseInt(searchParams.get('level') || '1', 10);

  // 检查级别是否在有效范围内
  if (level < 1 || level > 10) {
    return NextResponse.json(ResponseWrapper.fail('Invalid level specified'), { status: 400 });
  }

  // 生成用户数据
  const userData: IUserLevel[] = usernames[level - 1].map((username, index) => ({
    name: username,
    totalPoints: Math.floor(Math.random() * 10000),
    isCurrentUser: index === 0,
    avatar: 'https://d121vty759npai.cloudfront.net/images/648715e6e5df45a7b284d52e487b01f4.jpeg',
    rank: index + 1,
  }));

  // 返回成功的响应
  return NextResponse.json(
    ResponseWrapper.success({
      level: 2,
      users: userData,
    }),
  );
}
