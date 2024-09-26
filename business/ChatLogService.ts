import { OpenAiRepository } from '@/data/OpenAiRepository';
import { IOpenAiParam } from '@/types/OpenAiParam';

export class ChatLogService {
  public static async getAnswer(chatLogList: IOpenAiParam[]) {
    const response = await OpenAiRepository.getAnswer(chatLogList);
    if (typeof response !== 'string') {
      throw new Error('값이 없습니다.');
    }
    return response;
  }
}
