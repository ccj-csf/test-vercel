'use server';

import { getFriendsData } from '@/services';

export async function getFriendsDataAction() {
  return getFriendsData();
}
