import { OpenAiRepository } from '@/data/OpenAiRepository';
import { IChatParam } from '@/types/chat';

export class ChatLogService {
  public static async getAnswer(chatLogList: IChatParam[]): Promise<string | undefined> {
    return OpenAiRepository.getAnswer(chatLogList);
  }
}
