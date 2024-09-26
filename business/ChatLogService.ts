import { OpenAiRepository } from '@/data/OpenAiRepository';
import { IChatParam } from '@/types/chat';

export class ChatLogService {
  public async getAnswer(chatLogList: IChatParam[]) {
    return await OpenAiRepository.getAnswer(chatLogList);
  }
}
