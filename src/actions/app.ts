'use server';

import { getTgAppTaskApi } from '@/services';

export async function getAppTaskAction() {
  return getTgAppTaskApi();
}
