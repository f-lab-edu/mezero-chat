import { GptRepository } from '@/data/GptRepository';
import { IChat, IChatLog, ChatLogRole } from '@/types/Chat';

export class ChatService {
  private GptRepository: GptRepository;

  constructor() {
    this.GptRepository = new GptRepository();
  }

  getChatList(): IChat[] {
    return this.GptRepository.getChatList();
  }

  getChat(pId: string): IChat {
    return this.GptRepository.getChat(pId);
  }

  createChat(pChatLogContent: string): string {
    return this.GptRepository.createChat(pChatLogContent);
  }

  createQuestionChatLog(pId: string, pChatLogContent: string): IChat {
    return this.GptRepository.createQuestionChatLog(pId, pChatLogContent);
  }

  async createAnswerChatLog(pId: string, pChatLogList: IChatLog[]): Promise<IChat> {
    const response = await this.GptRepository.createAnswerChatLog(pId, pChatLogList);
    if (response === undefined) {
      throw new Error('값이 없습니다.');
    }
    return response;
  }
}
