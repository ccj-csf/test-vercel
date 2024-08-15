'use server';

import { getTgReferralListApi } from '@/services';

export async function getReferralListAction() {
  return getTgReferralListApi();
}
