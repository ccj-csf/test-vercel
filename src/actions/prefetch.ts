'use server';

import { getAppTaskAction } from './app';
import { getReferralListAction } from './refferal';
import { getUserInfoAction } from './user';

/**
 * 接口预拉取
 * @returns
 */
export async function prefetchAction() {
  return Promise.all([getUserInfoAction(), getReferralListAction(), getAppTaskAction()]);
}
