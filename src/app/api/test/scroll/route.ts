import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
export const runtime = 'edge';

// 模拟数据生成函数，生成随机数据
function generateRandomData(page: number) {
  const items = [];
  // 每页生成10条数据
  for (let i = 1; i <= 10; i++) {
    items.push({ id: uuidv4(), value: Math.random() * 100 });
  }
  return items;
}
let count = 0;
// GET 请求处理函数
export async function GET(request: NextRequest) {
  // 解析请求中的页码，如果没有则默认为1
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page');
  console.log('🚀 ~ GET ~ page:', page);
  // const page = 1;
  // 生成数据
  const items = generateRandomData(+(page || 1));
  count++;
  // let has_more = true;
  // 判断是否还有更多数据，假设总数据量最多40条
  const has_more = +(page || 1) * 10 < 40; // 4页后停止
  // if (count > 3) {
  //   has_more = false;
  // }

  // 返回生成的数据和控制信息
  return NextResponse.json({ items, has_more, page });
}
