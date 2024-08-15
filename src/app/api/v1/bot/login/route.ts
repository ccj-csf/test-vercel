import { DEFAULT_ERROR } from '@/constants';
import { ResponseWrapper } from '@/lib';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    // const res = await tgUserLoginApi(data)
    // const response = NextResponse.json(
    //   ResponseWrapper.success<{}>(res.data),
    // );
    // if (res.data?.access_token) {
    //     response.cookies.set(, res.data.access_token, {
    //   })
    // }
    // return response;
  } catch (e) {
    return NextResponse.json(ResponseWrapper.fail(DEFAULT_ERROR, 500));
  }
  // if (isAuthorized) {

  // } else {
  // }
}
