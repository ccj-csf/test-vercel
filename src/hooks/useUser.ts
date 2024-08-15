import { getUserInfoAction } from '@/actions';
import { useUserStore } from '@/store';
import { useMemoizedFn } from 'ahooks';

export const useUser = () => {
  const {
    setUserProfile,
    setBooster,
    setTodayReward,
    setLevelConfig,
    setRefferalCount,
    setUserWallet,
    setCai,
    setAppUser,
  } = useUserStore();

  const initUserInfo = useMemoizedFn(async () => {
    const res = await getUserInfoAction();

    if (res.data) {
      setUserWallet(res.data.wallet);
      setAppUser(res.data.app_user); // 用户 twitter 等信息
      setLevelConfig(res.data.level_config);
      setUserProfile(res.data.user);
      setRefferalCount(res.data.referral_count);
      setTodayReward(res.data.today_reward);
      setBooster(res.data.booster);
      setCai(res.data.wallet.cai);
    }
  });
  return {
    initUserInfo,
  };
};
