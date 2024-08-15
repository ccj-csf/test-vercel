'use server';

import {
  getTgUserBoostApi,
  getTgUserInfoApi,
  getTgUserTaskApi,
  gptxUserEmailApi,
  tgUserActiveApi,
  tgUserBindApi,
  tgUserBoostApi,
  tgUserEnergyApi,
} from '@/services';
import { IUserActiveParams, IUserBindParams, IUserBoostParams, IUserEmailParams } from '@/types';

export async function getUserInfoAction() {
  return getTgUserInfoApi();
}

export async function getUserBoostAction() {
  return getTgUserBoostApi();
}

export async function userBoostAction(data?: IUserBoostParams) {
  return tgUserBoostApi(data);
}

export async function userActiveAction(data: IUserActiveParams) {
  return tgUserActiveApi(data);
}

export async function getUserEmailCodeAction(data: IUserEmailParams) {
  return gptxUserEmailApi(data);
}

export async function userBindAction(data: IUserBindParams) {
  return tgUserBindApi(data);
}

export async function getUserTaskAction() {
  return getTgUserTaskApi();
}

export async function userEnergyAction() {
  return tgUserEnergyApi();
}
