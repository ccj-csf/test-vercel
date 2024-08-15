export interface IRefferalListData {
  boost: number;
  energy: number;
  has_more: number;
  items: {
    user_name: string;
    profile_img_url: string;
    commissions: number;
    level: number;
    cai: number;
  }[];
  reward_point: number;
  squad_boost: number;
  total: number;
  total_commissions: number;
  commissions: number;
}
