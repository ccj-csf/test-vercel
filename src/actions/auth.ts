'use server';

import { getTwitterAuthUrlApi } from '@/services';
import { tgAuthApi } from '@/services/tg/auth';

export async function getTwitterAuthUrlAction() {
  return getTwitterAuthUrlApi();
}

export async function tgAuthAction() {
  return tgAuthApi();
}
