import { DEFAULT_ERROR } from '@/constants';
import { ResponseWrapper } from '@/lib';
import { BotAuthUserApiData, BotAuthUserApiParams } from '@/types';
import { NextRequest, NextResponse } from 'next/server';
import 'server-only';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  const data = (await request.json()) as BotAuthUserApiParams;

  const authDataParams = new URLSearchParams(data.authDataStr);
  console.log(data.authDataStr);
  console.log(Object.fromEntries(authDataParams));

  const isAuthorized = await authorize(authDataParams);

  // 邀请
  // const start_param = authDataParams.get('start_param');

  const userStr = authDataParams.get('user') || '';
  const user = JSON.parse(userStr);
  const tgUser = {
    id: user.id,
    username: user.username,
  };
  if (isAuthorized) {
    return NextResponse.json(
      ResponseWrapper.success<BotAuthUserApiData>({
        tgUser,
      }),
    );
  } else {
    return NextResponse.json(ResponseWrapper.fail(DEFAULT_ERROR, 500));
  }
}

const authorize = async (authDataParams: URLSearchParams) => {
  try {
    // 校验有效期
    // const authDate = authDataParams.get('auth_date');

    const checkHash = authDataParams.get('hash');
    const dataCheckArray: string[] = [];
    authDataParams.forEach((value, key) => {
      if (key !== 'hash') {
        dataCheckArray.push(`${key}=${value}`);
      }
    });
    dataCheckArray.sort();
    const dataCheckString = dataCheckArray.join('\n');
    console.log('dataCheckString', dataCheckString);

    // 边缘计算环境
    const encoder = new TextEncoder();
    const key1 = await crypto.subtle.importKey(
      'raw',
      encoder.encode('WebAppData'),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    );
    const secretKey = await crypto.subtle.sign('HMAC', key1, encoder.encode(process.env.BOT_TOKEN));

    const key2 = await crypto.subtle.importKey(
      'raw',
      secretKey,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign'],
    );
    const signature = await crypto.subtle.sign('HMAC', key2, encoder.encode(dataCheckString));
    const signatureArray = Array.from(new Uint8Array(signature));
    const hash = signatureArray.map((b) => b.toString(16).padStart(2, '0')).join('');

    // 浏览器环境
    // const secretKey = crypto.HmacSHA256(process.env.BOT_TOKEN, 'WebAppData');
    // const hash = crypto.HmacSHA256(dataCheckString, secretKey).toString(crypto.enc.Hex);

    // node 环境
    // const secretKey =  crypto.createHmac('sha256', 'WebAppData').update(process.env.BOT_TOKEN).digest();
    // const hash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');
    return hash === checkHash;
  } catch (error) {
    console.log(error);
    return false;
  }
};
