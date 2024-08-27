import platform from 'platform';

export class AppUtils {
  private static readonly IOS_APP_URL =
    'https://apps.apple.com/us/app/wav-ai-music-song-maker/id6618139996';
  private static readonly ANDROID_APP_URL =
    'https://play.google.com/store/apps/details?id=xyz.wav.musicapp';
  private static readonly FALLBACK_URL = 'https://wav.xyz';

  // 定义项目特定的自定义URL Scheme
  private static readonly CUSTOM_URL_SCHEME = 'wav://app';

  /**
   * 尝试打开应用，如果未安装则跳转到应用商店。
   */
  static openAppOrRedirect() {
    const platformInfo = platform.parse(navigator.userAgent);
    const isIos = platformInfo.os?.family === 'iOS';
    const isAndroid = platformInfo.os?.family === 'Android';

    // Telegram 环境中的特殊处理
    if (window.Telegram && window.Telegram.WebApp) {
      // 尝试通过 Telegram WebApp 特定 API 进行跳转或打开应用
      // window.Telegram.WebApp.openLink(this.CUSTOM_URL_SCHEME);
      setTimeout(() => {
        if (isIos) {
          window.Telegram.WebApp.openLink(this.IOS_APP_URL);
        } else if (isAndroid) {
          window.Telegram.WebApp.openLink(this.ANDROID_APP_URL);
        } else {
          alert('The application is not installed on your device.');
          window.Telegram.WebApp.openLink(this.FALLBACK_URL);
        }
      }, 1000);
    } else {
      // 浏览器中的标准处理逻辑
      window.location.href = this.CUSTOM_URL_SCHEME;

      setTimeout(() => {
        if (isIos) {
          window.location.href = this.IOS_APP_URL;
        } else if (isAndroid) {
          window.location.href = this.ANDROID_APP_URL;
        } else {
          window.location.href = this.FALLBACK_URL;
        }
      }, 1000);
    }
  }

  /**
   * 打开指定的外部链接。
   * @param url 外部链接的URL。
   */
  static openExternalLink(url: string) {
    // window.open(url, '_blank');
    window.Telegram?.WebApp.openLink(url);
  }
}
