'use server';

import { getMineData } from '@/services';
import { IMineDataType } from '@/types';

export async function getMineDataAction(type: IMineDataType) {
  return getMineData({ type });
}
