import { NextRequest, NextResponse } from 'next/server';

// 缺 cors、鉴权、日志、错误处理等中间件
function middleware1(next: Function) {
  return async (request: NextRequest) => {
    // console.log('middleware1 request');
    next(request);
    // console.log('middleware1 response');
  };
}

function middleware2(next: Function) {
  return async (request: NextRequest) => {
    // console.log('middleware2 request');
    next(request);
    // console.log('middleware2 response');
  };
}

export const middleware = compose([middleware1, middleware2]);

export const config = {
  matcher: '/api/:path*',
};

function next(request: NextRequest) {
  return NextResponse.next();
}

function compose(middlewares: any[]) {
  return dispatch(0);
  function dispatch(index: number): Function {
    let fn = middlewares[index];
    if (index === middlewares.length) {
      return next;
    }
    return fn(dispatch(index + 1));
  }
}
