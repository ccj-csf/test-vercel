import { COOKIES_TOKEN } from '@/constants';
import { IRequestWrapper, IResponseWrapper } from '@/types';
import { cookies } from 'next/headers';

export class ApiRequest {
  static async post<T>(
    apiName: string,
    data: IRequestWrapper = {},
    headers: Record<string, any> = {},
  ): Promise<IResponseWrapper<T>> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${apiName}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${cookies().get(COOKIES_TOKEN)?.value}`,
        ...headers,
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  static async get<T>(
    apiName: string,
    data: Record<string, any> = {},
  ): Promise<IResponseWrapper<T>> {
    let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}${apiName}`;
    const params = new URLSearchParams(data);
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${cookies().get(COOKIES_TOKEN)?.value}`,
      },
    });
    return response.json();
  }
}
