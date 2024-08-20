import { isAndroid } from 'react-device-detect';
import { Auth } from './auth';
import { startVibrate } from './vibrate';

export const openShareLink = (url: string, text: string = '') => {
  startVibrate();
  window.Telegram?.WebApp.openTelegramLink(
    `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${text}`,
  );
};

export const getDirectLink = (startParam: string) => {
  return `${process.env.NEXT_PUBLIC_TG_MINIAPP_URL}?startapp=${startParam}`;
};

export const openTelegramLink = (url: string) => {
  startVibrate();
  window.Telegram?.WebApp.openTelegramLink(url);
};

export const openOuterLink = (url: string) => {
  startVibrate();
  window.Telegram?.WebApp.openLink(url);
};

export const getInviteCodeLink = () => {
  return getDirectLink(TgUtils.getInviteCode());
};
export const openInviteCodeLink = () => {
  openShareLink(
    getInviteCodeLink(),
    `Unlock rewards with me on the WAV Mini App! 🎶
💰 Get 5,000 WAV Points instantly for you and your friend!
🎁 Free AI music creation chances to generate your own song.
Revolutionize your music experience with WAV today. Share and enjoy the rhythm! 🚀`,
  );
  if (isAndroid) {
    // 安卓下，分享后返回 app 不能继续分享，所以关闭页面
    window?.Telegram?.WebApp.close();
  }
};
export class TgUtils {
  static inviteCodePrefix = 'invite_';
  static getInviteCode() {
    const profile = Auth.getProfile();
    const inviteCode = profile.invite_code || '';
    return `${TgUtils.inviteCodePrefix}${inviteCode}`;
  }
}
