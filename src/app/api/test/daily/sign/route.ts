import { ResponseWrapper } from '@/lib';
import dayjs from 'dayjs';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// 假设你有一个全局状态或数据库来存储签到信息
let dailySignStatus = {
  lastSignDate: '', // 上次签到的日期
};

export async function PUT(request: NextRequest) {
  try {
    const today = dayjs().format('YYYY-MM-DD'); // 获取当前日期

    // 检查是否已经签到
    if (dailySignStatus.lastSignDate === today) {
      // 如果今天已经签到，忽略请求
      return NextResponse.json(ResponseWrapper.fail('Already signed in today'), { status: 200 });
    }

    // 更新签到状态为今天
    dailySignStatus.lastSignDate = today;

    return NextResponse.json(
      ResponseWrapper.success({ message: 'Signed in successfully', date: today }),
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(ResponseWrapper.fail('Failed to sign in'), { status: 500 });
  }
}
