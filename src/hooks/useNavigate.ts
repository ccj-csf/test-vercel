import {
  ROUTES_ACCOUNT,
  ROUTES_EARN,
  ROUTES_FRIENDS,
  ROUTES_HOME,
  ROUTES_LOGIN,
  ROUTES_MINE,
  ROUTES_MUSIC_DETAIL,
  ROUTES_USER_LEVEL,
} from '@/constants'; // 路径根据项目结构调整
import { startVibrate } from '@/utils';
import { useRouter } from 'next/navigation';

interface NavigateOptions {
  query?: Record<string, any>;
  params?: Record<string, any>;
}

const useNavigate = () => {
  const router = useRouter();

  const buildUrlWithParams = (path: string, params?: Record<string, any>) => {
    if (!params) return path;

    // 拼接 params 到 path 的末尾
    const paramString = Object.values(params).join('/');
    return `${path}/${paramString}`;
  };

  const buildUrlWithQuery = (path: string, query?: Record<string, any>) => {
    const queryString = query
      ? '?' +
        Object.keys(query)
          .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
          .join('&')
      : '';
    return path + queryString;
  };

  const navigate = (route: string, { query, params }: NavigateOptions = {}) => {
    startVibrate();
    const path = buildUrlWithParams(route, params);
    const fullPath = buildUrlWithQuery(path, query);
    router.push(fullPath);
  };

  const gotoHomePage = (options: NavigateOptions = {}) => navigate(ROUTES_HOME, options);
  const gotoAccountPage = (options: NavigateOptions = {}) => navigate(ROUTES_ACCOUNT, options);
  const gotoEarnPage = (options: NavigateOptions = {}) => navigate(ROUTES_EARN, options);
  const gotoFriendsPage = (options: NavigateOptions = {}) => navigate(ROUTES_FRIENDS, options);
  const gotoMinePage = (options: NavigateOptions = {}) => navigate(ROUTES_MINE, options);
  const gotoLoginPage = (options: NavigateOptions = {}) => navigate(ROUTES_LOGIN, options);
  const gotoMusicDetailPage = (options: NavigateOptions = {}) =>
    navigate(ROUTES_MUSIC_DETAIL, options);
  const gotoUserLevelPage = (options: NavigateOptions = {}) => navigate(ROUTES_USER_LEVEL, options);

  return {
    gotoHomePage,
    gotoAccountPage,
    gotoEarnPage,
    gotoFriendsPage,
    gotoMinePage,
    gotoLoginPage,
    gotoMusicDetailPage,
    gotoUserLevelPage,
    navigate,
  };
};

export { useNavigate };
