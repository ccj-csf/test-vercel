'use client';
import { BACKGROUND_COLOR, PRIMARY_COLOR } from '@/constants';
import { useNavigate } from '@/hooks';
import { getAppConfig, getAppMusic, getUserInfo, login } from '@/services';
import { useAppConfigStore, useMusicPlayerStore, useUserInfoStore } from '@/store';
import { IWebAppInitData } from '@/types';
import { Auth, TgUtils } from '@/utils';
import { useMemoizedFn } from 'ahooks';
import Image from 'next/image';
import { FC, memo, useEffect } from 'react';

const testInitData =
  'user=%7B%22id%22%3A6870169413%2C%22first_name%22%3A%22cf%22%2C%22last_name%22%3A%22c%22%2C%22username%22%3A%22csfsil%22%2C%22language_code%22%3A%22zh-hans%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=8702549389354008256&chat_type=private&auth_date=1724653906&hash=e3b59fbcd63c1f871191998f5309697fe5219e33b2cc2fc366a9445ede6eaa49';

interface LoginProps {}
const Container: FC<LoginProps> = memo((props) => {
  const { setPlaylist } = useMusicPlayerStore();
  const { setConfig } = useAppConfigStore();
  const { setUserInfo } = useUserInfoStore();
  const { gotoHomePage } = useNavigate();

  const loginAction = useMemoizedFn(async () => {
    const WebApp = window?.Telegram?.WebApp;
    const initData = WebApp.initData || testInitData;
    if (initData) {
      const authInitDataParams = new URLSearchParams(initData);
      const authInitData = Object.fromEntries(authInitDataParams);
      const authData = authInitData as unknown as IWebAppInitData;

      const LoginDataParams = {
        initRawData: initData,
        inviteCode: '',
      };

      // 邀请逻辑
      if (authData.start_param) {
        console.log('🚀 ~ loginAction ~ authData:', authData);
        let inviteCode = authData.start_param;
        inviteCode = inviteCode.replace(TgUtils.inviteCodePrefix, '');
        Object.assign(LoginDataParams, { inviteCode: inviteCode });
      }

      const res = await login(LoginDataParams);
      console.log('🚀 ~ loginAction ~ res:', res);

      if (res?.data) {
        Auth.setToken(res.data.accessToken);

        // 使用 Promise.all 并行执行三个请求
        const [appConfigRes, appMusicRes, userInfoRes] = await Promise.all([
          getAppConfig(),
          getAppMusic(),
          getUserInfo(),
        ]);

        // 处理 getAppConfig 请求的结果
        if (appConfigRes?.data) {
          setConfig(appConfigRes.data);
        }
        console.log('🚀 ~ loginAction ~ appConfigRes:', appConfigRes);

        // 处理 getAppMusic 请求的结果
        if (appMusicRes?.data) {
          setPlaylist(appMusicRes.data);
        }
        console.log('🚀 ~ loginAction ~ appMusicRes:', appMusicRes);

        // 处理 getUserInfo 请求的结果
        if (userInfoRes?.data) {
          setUserInfo(userInfoRes.data);
          Auth.setInviteCode(userInfoRes.data.inviteCode);
        }

        console.log('🚀 ~ loginAction ~ userInfoRes:', userInfoRes);
        gotoHomePage();
      }
    }
  });

  useEffect(() => {
    const WebApp = window?.Telegram?.WebApp;
    if (WebApp) {
      WebApp?.setHeaderColor(PRIMARY_COLOR);
      WebApp?.setBackgroundColor(PRIMARY_COLOR);
      loginAction();
    }
    return () => {
      WebApp.setHeaderColor(BACKGROUND_COLOR);
      WebApp.setBackgroundColor(BACKGROUND_COLOR);
    };
  }, [loginAction]);

  return (
    <div className="relative flex h-screen w-full flex-col items-center  bg-login bg-cover bg-no-repeat px-[46px]">
      <Image
        src="/icons/black-logo.svg"
        alt="black-logo"
        width={92}
        height={92}
        className="mt-[20vh]"
      />
      <div className="mt-2 text-center text-30  font-semibold text-black">wav.xyz</div>
      <div className=" mb-6 mt-4 text-center text-21  font-medium">
        The world's first Web3 AI music platform.
      </div>
      <section className="absolute bottom-[70px] left-0 w-full">
        <div className="mx-auto mt-[7px] h-[22px] w-[22px] animate-spin rounded-full border-[3px] border-[#dfcaa4]  border-b-black"></div>
      </section>
    </div>
  );
});
Container.displayName = 'Container';
export default Container;
