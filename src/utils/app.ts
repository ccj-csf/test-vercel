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

    // 尝试打开应用
    window.location.href = this.CUSTOM_URL_SCHEME;

    // 如果应用未安装，延迟一秒后跳转到应用商店
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
