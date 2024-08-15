'use client';
import { loginAction } from '@/actions';
import { BACKGROUND_COLOR, PRIMARY_COLOR, ROUTES_HOME } from '@/constants';
import { useUser } from '@/hooks';
import { useMusicPlayerStore, useUserInfoStore, useUserStore } from '@/store';
import { IWebAppInitData } from '@/types';
import { Auth, TgUtils } from '@/utils';
import { useMemoizedFn } from 'ahooks';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, memo, useEffect } from 'react';
const defaultPlaylist = [
  {
    id: '1',
    title: 'Suno Please Fix',
    cover: 'https://cdn2.suno.ai/5b83f352-1956-4ca2-8534-2af03bf76863_aace3111.jpeg',
    style: 'Pop',
    desc: 'A popular song by SirBitesAlot.',
    lyrics: 'La la la la...',
    sourceUrl: 'https://cdn1.suno.ai/5b83f352-1956-4ca2-8534-2af03bf76863.mp3',
    artist: 'SirBitesAlot',
  },
  {
    id: '2',
    title: 'Where Do We Go From Here?',
    cover: 'https://cdn2.suno.ai/image_1c24de5d-28bc-44f4-bac3-93a8a3ab3604.jpeg',
    style: 'Rock',
    desc: 'A rock song by sushileaf 🍣🍃',
    lyrics: 'Rock and roll...',
    sourceUrl: 'https://cdn1.suno.ai/290fc7e0-4796-4c05-a0c0-8c92e1e2827a.mp3',
    artist: 'sushileaf 🍣🍃',
  },
  {
    id: '3',
    title: 'Free Fallin',
    cover: 'https://cdn2.suno.ai/9b3a0739-ebad-4a3b-97eb-40dabf4186b5_5d97716c.jpeg',
    style: 'Rock',
    desc: 'A rock song by sushileaf 🍣🍃',
    lyrics: 'Rock and roll...',
    sourceUrl: 'https://cdn1.suno.ai/5a285fbc-f64a-418a-8b2e-05e3e7990899.mp3',
    artist: 'free',
  },
];

interface LoginProps {}
const Container: FC<LoginProps> = memo((props) => {
  const { setPlaylist, playTrack } = useMusicPlayerStore();

  const {} = props;

  const { setIsLogin, setUserProfile } = useUserStore();
  const { initUserInfo } = useUser();
  const router = useRouter();

  const login = useMemoizedFn(async () => {
    const WebApp = window?.Telegram?.WebApp;
    if (WebApp.initData) {
      const authInitDataParams = new URLSearchParams(WebApp.initData);
      const authInitData = Object.fromEntries(authInitDataParams);

      authInitData.user = JSON.parse(authInitData.user);
      const authData = authInitData as unknown as IWebAppInitData;

      const tgUserLoginApiData = {
        ...authData,
      };

      // 邀请逻辑
      if (authData.start_param) {
        let inviteCode = authData.start_param;
        inviteCode = inviteCode.replace(TgUtils.inviteCodePrefix, '');
        Object.assign(tgUserLoginApiData, { invite_code: inviteCode });
      }
      console.log('tgUserLoginApiData', tgUserLoginApiData);

      const res = await loginAction(tgUserLoginApiData);
      if (res?.data) {
        Auth.setToken(res.data.access_token);
        Auth.setNewUser(res.data.new_user);
        setIsLogin(!!res.data.access_token);
        setUserProfile(res.data.profile);
        router.push(ROUTES_HOME);
      }

      await initUserInfo();
    }
  });
  const { setUserInfo } = useUserInfoStore();

  // 模拟用户登录后的数据设置
  useEffect(() => {
    const userData = {
      userName: 'Kim Kardasham',
      avatarUrl:
        'https://d121vty759npai.cloudfront.net/images/648715e6e5df45a7b284d52e487b01f4.jpeg',
      level: 2,
      profitPerHour: 3600,
      coinBalance: 189809,
    };
    setUserInfo(userData); // 更新用户信息和初始收益数据
    setPlaylist(defaultPlaylist);
    playTrack(0);
  }, [playTrack, setPlaylist, setUserInfo]);

  useEffect(() => {
    const WebApp = window?.Telegram?.WebApp;
    if (WebApp) {
      WebApp.setHeaderColor(PRIMARY_COLOR);
      WebApp.setBackgroundColor(PRIMARY_COLOR);
      login();
      setTimeout(() => {
        router.push(ROUTES_HOME);
      }, 2000);
    }
    return () => {
      WebApp.setHeaderColor(BACKGROUND_COLOR);
      WebApp.setBackgroundColor(BACKGROUND_COLOR);
    };
  }, [login, router]);

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
