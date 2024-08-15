import { PublishStatusEnum } from '@/enums';
import { IFetchDataListResult } from './global';

export interface IAuth {
  twitter?: number;
  discord?: number;
  instagram?: number;
}
export type ITags = {
  id?: string;
  name?: string;
  fixed?: number;
};

export interface ICharacterItem {
  id?: number;
  character_type?: number;
  holder?: number;
  img_link?: string;
  creator?: string;
  total_chat?: number;
  total_user?: number;
  publish_status: PublishStatusEnum;
  title?: string;
  name?: string;
  token_address?: string;
  greeting?: string;
  description?: string;
  is_default?: number;
  voice_name?: string;
  voice_style?: string;
  voice_rate?: string;
  style_degree?: number;
  third_api?: number;
  chat_img?: number;
  img_greeting?: string;
  voice_clone?: number;
  tags?: Array<ITags>;
  status?: number;
  rejected_reason_type?: number;
  rejected_reason?: string;
  creator_id?: string;
  openai_model_name?: string;
  assistant_api?: number;
  assistant_id?: string;
  openai_voice_name?: string;
  openai_voice_model?: string;
  tts_type?: number;
  liked_cnt?: number;
  level?: number;
  cur_exp?: number;
  cur_level_exp?: number;
  next_level_exp?: number;
  voice_id?: string;
  intro_message_enabled?: number;
  voice_enabled?: number;
  content_level?: number;
  auth?: IAuth;
  prompt?: string;
  holderCount?: number;
  holderMine?: number;
}

export interface IPlotCard {
  id: string;
  plot_img_link: string;
  plot_name: string;
  is_unlocked: boolean;
}

export type IFetchCharacterDataListResult = IFetchDataListResult<ICharacterItem>;
