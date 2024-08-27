import { ResponseWrapper } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

// 处理 POST 请求
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, id, status } = body;
    console.log('🚀 ~ POST ~ body:', body);

    if (!type || !id || !status) {
      return NextResponse.json(
        ResponseWrapper.fail('Missing type, id, or status in request body'),
        {
          status: 400,
        },
      );
    }
    // 返回更新后的任务状态和其他信息
    return NextResponse.json(
      ResponseWrapper.success({
        type,
        id,
        status,
      }),
    );
  } catch (error) {
    console.error('Failed to update data:', error);
    return NextResponse.json(ResponseWrapper.fail('Failed to update data'), {
      status: 500,
    });
  }
}
