import { IChatLog } from '@/types/Chat';

export enum GptModel {
  gpt3_5 = 'gpt-3.5',
  gpt3_5_Turbo = 'gpt-3.5-turbo',
  gpt4 = 'gpt-4',
  gpt4_Turbo = 'gpt-4-turbo',
}

export interface IGptParam {
  messages: IChatLog[];
  model: GptModel;
  max_tokens: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
}
