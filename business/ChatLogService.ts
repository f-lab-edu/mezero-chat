import { OpenAiRepository } from '@/data/OpenAiRepository';
import { IOpenAiParam } from '@/types/OpenAiParam';

export class ChatLogService {
  public static async getAnswer(chatLogList: IOpenAiParam[]) {
    return await OpenAiRepository.getAnswer(chatLogList);
  }
}
