import {
  INVITE_CODE,
  LOCAL_STORAGE_NEW_USER,
  LOCAL_STORAGE_PROFILE,
  LOCAL_STORAGE_TOKEN,
} from '@/constants';
import { IUserProfile } from '@/types';
import store from 'store2';

/**
 * Auth类用于处理认证相关的操作，包括设置和移除token、新用户标志及用户信息。
 */
export class Auth {
  /**
   * 设置访问令牌。
   * @param accessToken {string} 访问令牌。
   */
  static setToken(accessToken: string) {
    store.session.set(LOCAL_STORAGE_TOKEN, accessToken);
  }

  static getToken(): string {
    return store.session.get(LOCAL_STORAGE_TOKEN);
  }

  /**
   * 设置新用户标志。
   * @param new_user {number} 新用户标志，通常为1表示新用户，0表示老用户。
   */
  static setNewUser(new_user: number) {
    store.session.set(LOCAL_STORAGE_NEW_USER, new_user);
  }

  /**
   * 设置用户信息。
   * @param profile {any} 用户信息，可以是任意格式。
   */
  static setProfile(profile: any) {
    store.session.set(LOCAL_STORAGE_PROFILE, profile);
  }

  static getProfile(): IUserProfile {
    return store.session.get(LOCAL_STORAGE_PROFILE) || {};
  }

  static setInviteCode(inviteCode: string) {
    store.session.set(INVITE_CODE, inviteCode);
  }

  static getInviteCode(): string {
    return store.session.get(INVITE_CODE) || '';
  }

  /**
   * 移除登录时存储的电子邮件信息。
   * 该方法用于登出操作，清除用户认证相关的所有本地存储数据。
   */
  static removeLoginWithTokenInfo() {
    store.remove(LOCAL_STORAGE_TOKEN);
    store.remove(LOCAL_STORAGE_NEW_USER);
    store.remove(LOCAL_STORAGE_PROFILE);
  }
}
