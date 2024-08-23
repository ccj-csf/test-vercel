import { ITaskConfig, ITaskType } from '@/types';

export const DEFAULT_LOCALE = 'en';

export const QUERY_SHARE = 'share_id_';

export const APP_VERSION = '2.1.0';
export const DEVICE_TYPE = 'mini-app';

export const WEBSITE_URL = 'https://characterx.ai';
export const AIRDROP_URL = `${WEBSITE_URL}/airdrop`;

export const ANDROID_DOWNLOAD_URL =
  'https://play.google.com/store/apps/details?id=xyz.aicentr.gptx';

export const IOS_DOWNLOAD_URL =
  'https://apps.apple.com/us/app/characterx-chat-with-ai-bots/id6464392665';

export const HOW_TO_PLAY_URL =
  'https://www.notion.so/characterx/CharacterX-Mini-App-Guide-f34a968eeb8a4d368353f220d46bdcb7';

export const TWITTER_URL = 'https://twitter.com/CharacterXAI';
export const TELEGRAM_URL = process.env.NEXT_PUBLIC_TG_GROUP_URL || '';
export const LEARN_MORE_URL = 'https://t.me/CharacterX_News';
export const TELEGRAM_GROUP_URL = process.env.NEXT_PUBLIC_TG_GROUP_URL || '';

export const DEFAULT_AVATAR = '/imgs/default-avatar.png';
export const DEFAULT_LEVEL = 1;
export const DEFAULT_MINT_SDID_LEVEL = 3;
export const MAX_LEVEL = 9;
export const DEFAULT_CIRCLE_TIME = 15;
export const DEFAULT_BOOSTING_TIME = 2;
export const DEFAULT_PERCENT = '0.00';

export const EMPTY_TIPS = 'Oops! There is no content yet:(';

export const TASK_CONFIG_MAP: Record<ITaskType, ITaskConfig> = {
  downloadApp: {
    actionText: 'Download the App',
    checkActionText: 'Check',
    link: '/download-app',
    iconPath: '/icons/logo.svg',
  },
  joinTelegram: {
    actionText: 'Join Group',
    checkActionText: 'Check',
    link: 'https://t.me/joinchat/XXXXX',
    iconPath: 'telegram',
  },
  followOnX: {
    actionText: 'Follow',
    checkActionText: 'Check',
    link: 'https://x.com/yourprofile',
    iconPath: 'x',
  },
  subscribeYouTube: {
    actionText: 'Subscribe',
    checkActionText: 'Check',
    link: 'https://youtube.com/yourchannel',
    iconPath: 'youtube',
  },
  inviteFriends: {
    actionText: 'Invite',
    checkActionText: 'Check',
    link: '/invite-friends',
    iconPath: 'friends-plus',
  },
  dailyReward: {
    actionText: 'Claim',
    iconPath: 'calendar',
  },
};
