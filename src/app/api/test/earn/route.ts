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
    dailyRewards: dailyRewards,
    specialTasks: currentSpecialTasks,
    tasks: currentTasks,
    dailySigns: mockDailySigns,
  };

  // 返回数据作为 JSON 响应
  return NextResponse.json(ResponseWrapper.success(data));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body; // 这里解析 type 和 data 对象
    console.log('🚀 ~ POST ~ body:', body);

    // console.log('🚀 ~ POST ~ data:', data);
    // console.log('🚀 ~ POST ~ type:', type);

    if (!type || !data) {
      return NextResponse.json(ResponseWrapper.fail('Missing type or data in request body'), {
        status: 400,
      });
    }

    if (type === 'dailyReward') {
      const { currentStreak, newLastClaimDate, totalRewards } = data;
      const newStreak = currentStreak < 10 ? currentStreak + 1 : 1;
    } else if (type === 'specialTasks') {
      const { id, updates } = data;
      currentSpecialTasks = currentSpecialTasks.map((task) =>
        task.id === id ? { ...task, ...updates } : task,
      );
    } else if (type === 'tasks') {
      // const { id, updates } = data;
      // console.log('🚀 ~ POST ~ updates:', updates);
      currentTasks = currentTasks.map((task) =>
        task.id === data.id ? { ...task, ...data } : task,
      );
    } else {
      return NextResponse.json(ResponseWrapper.fail('Invalid type specified'), {
        status: 400,
      });
    }

    // 返回更新后的数据
    return NextResponse.json(
      ResponseWrapper.success({
        dailyReward: currentDailyReward,
        specialTasks: currentSpecialTasks,
        tasks: currentTasks,
      }),
    );
  } catch (error) {
    return NextResponse.json(ResponseWrapper.fail('Failed to update data'), {
      status: 500,
    });
  }
}
