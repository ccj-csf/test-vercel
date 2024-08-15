import { IResponseWrapper } from '@/types';
export const responseWrapperHandler = <T>(
  data: T | string,
  code = 200,
  success = true,
): IResponseWrapper<T> => {
  const base = {
    code,
    success,
  };
  if (success) {
    return Object.assign(base, { data: data as T });
  } else {
    return Object.assign(base, { msg: data as string });
  }
};

export class ResponseWrapper {
  static success<T>(data: T, code = 200): IResponseWrapper<T> {
    return responseWrapperHandler(data, code, true);
  }
  static fail(msg: string, code = 400): IResponseWrapper {
    return responseWrapperHandler(msg, code, false);
  }
}
