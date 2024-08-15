// import { getRequestContext } from '@cloudflare/next-on-pages';
// class Db {
//   static instance: D1Database;
//   static getInstance(): D1Database {
//     if (!Db.instance) {
//       if (process.env.NODE_ENV === 'development') {
//         const { env } = getRequestContext();
//         // const adapter = new PrismaD1(env.DB);
//         // return new PrismaClient({ adapter });
//         return env.DB;
//       }
//       // const adapter = new PrismaD1(process.env.DB);
//       // return new PrismaClient({ adapter });
//       return process.env.DB;
//     }
//     return Db.instance;
//   }
// }
// const db = Db.getInstance();
// export { db };
