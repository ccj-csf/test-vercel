import { ANDROID_DOWNLOAD_URL, IOS_DOWNLOAD_URL, WEBSITE_URL } from '@/constants';
import { isDesktop, isIOS } from 'react-device-detect';
import { openOuterLink } from './tg';

export const openDownloadLink = () => {
  if (isDesktop) {
    openOuterLink(WEBSITE_URL);
  } else {
    if (isIOS) {
      openOuterLink(IOS_DOWNLOAD_URL);
    } else {
      openOuterLink(ANDROID_DOWNLOAD_URL);
    }
  }
};
