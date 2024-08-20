'use server';

import { getUserLevelData } from '@/services';
import { ILevelNumber } from '@/types';

export async function getUserLevelDataAction(level: ILevelNumber) {
  return getUserLevelData({ level });
}
