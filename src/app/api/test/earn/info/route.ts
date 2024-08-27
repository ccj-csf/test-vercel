import {
  dailyRewards,
  specialTasks as initialSpecialTasks,
  tasks as initialTasks,
  mockDailySigns,
} from '@/app/(app)/earn/data';
import { ResponseWrapper } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// 全局状态
let currentDailyReward = { ...dailyRewards };
let currentSpecialTasks = [...initialSpecialTasks];
let currentTasks = [...initialTasks];

export async function GET(request: NextRequest) {
  // 构造返回的数据
  const data = {
    dailyTasks: dailyRewards,
    specialTasks: currentSpecialTasks,
    tasks: currentTasks,
    dailySigns: mockDailySigns,
  };

  // 返回数据作为 JSON 响应
  return NextResponse.json(ResponseWrapper.success(data));
}
