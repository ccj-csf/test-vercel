import { ReportEventType } from '@/enums/event';
import { ResponseWrapper } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface ReportEventParams {
  type: ReportEventType;
}

// GET 请求 /api/report/event
export async function GET() {
  // const res = (await db.prepare('SELECT * FROM ReportEvent').all()).results;
  return NextResponse.json(ResponseWrapper.success({}));
}

export async function POST(request: NextRequest) {
  // const data = (await request.json()) as ReportEventParams;
  // db.prepare('INSERT INTO ReportEvent (type) VALUES (?1)').bind(data.type).run();
  return NextResponse.json({});
}
