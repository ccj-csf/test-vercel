interface BaseEnv {
  DB: D1Database;
  BOT_TOKEN: string;
  NEXT_PUBLIC_ICONFONT_URL: string;
  NEXT_PUBLIC_TG_MINIAPP_URL: string;
  NEXT_PUBLIC_BASE_URL: string;
  NEXT_PUBLIC_API_BASE_URL: string;
  NEXT_PUBLIC_API_TG_URL: string;
  NEXT_PUBLIC_TG_GROUP_URL: string;
  NEXT_PUBLIC_ENV: 'production' | 'test' | 'development';
}
// 存放环境变量相关的全局类型声明
declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv extends BaseEnv {}
    }
  }
}
interface CloudflareEnv extends BaseEnv {}
