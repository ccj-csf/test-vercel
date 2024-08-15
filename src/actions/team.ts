'use server';

import { getTgTeamMiningApi, tgTeamMiningApi } from '@/services';

export async function getTeamMiningAction() {
  return getTgTeamMiningApi();
}

export async function teamMiningAction() {
  return tgTeamMiningApi();
}
