'use server';

import { getEarnData, updateEarnData } from '@/services';
import { IEarnDataType, UpdatePayload } from '@/types';

export async function getEarnDataAction() {
  return getEarnData();
}

// 更新数据，返回新的数据
export async function updateEarnDataAction<T extends IEarnDataType>(
  dataType: T,
  updatePayload: UpdatePayload<T>,
) {
  return updateEarnData({ type: dataType, data: updatePayload });
}
