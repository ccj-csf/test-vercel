// 示例：API 端点文件 /api/items.ts
import { instruments as initialInstruments, styles as initialStyles } from '@/app/(app)/mine/data';
import { ResponseWrapper } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');

  let data;
  if (type === 'Instruments') {
    data = initialInstruments;
  } else if (type === 'Styles') {
    data = initialStyles;
  } else {
    return NextResponse.json(ResponseWrapper.fail('Invalid type specified'), {
      status: 400,
    });
  }

  return NextResponse.json(ResponseWrapper.success({ items: data }));
}
