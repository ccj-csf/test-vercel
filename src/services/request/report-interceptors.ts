// import { reportHttpAction } from '@/actions';
// import {
//   API_CHARACTER_LIST,
//   API_CHARACTER_PROFILE,
//   API_TG_BOT_USER,
//   API_TG_DAILY_ACTIVE,
//   API_TG_MINING_HASHRATE_LIST,
//   API_TG_USER_ACTIVE,
//   COOKIES_UIN_TG_USERNAME,
// } from '@/constants';
// import { ReportHttpTypeEnum } from '@/enums';
// const whiteList = [
//   API_TG_USER_ACTIVE,
//   API_CHARACTER_LIST,
//   API_CHARACTER_PROFILE,
//   API_TG_DAILY_ACTIVE,
//   API_TG_BOT_USER,
//   API_TG_MINING_HASHRATE_LIST,
// ];
// export async function reportInterceptors(response: any) {
//   try {
//     const data = {
//       method: response?.config?.method,
//       url: response?.config?.url,
//       requestBody: response?.config?.data,
//       responseData: response?.data,
//     };

//     if (
//       typeof window === 'undefined' &&
//       !whiteList.some((item) => response?.config?.url.includes(item)) &&
//       process.env.NODE_ENV !== 'development'
//     ) {
//       const { cookies } = await import('next/headers');
//       const uin = cookies().get(COOKIES_UIN_TG_USERNAME)?.value;
//       reportHttpAction({
//         uin: uin || '',
//         type: ReportHttpTypeEnum.REQUEST_RESPONSE,
//         data: JSON.stringify(data),
//       });
//     }
//   } catch (e) {
//     console.error(e);
//   }

//   return response;
// }
