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

  findChat(pId: IChat['id']): IChat {
    const chatList = this.getChatList();
    return chatList.filter((chat) => chat.id === pId)[0];
  }

  createChat(pChatLogContent: string): IChat['id'] {
    return this.GptRepository.createChat(pChatLogContent);
  }

  createQuestionChatLog(pChatLogContent: string, pId: IChat['id']): IChat {
    return this.GptRepository.createQuestionChatLog(pChatLogContent, pId);
  }

  async createAnswerChatLog(pChatLogList: IChatLog[], pId: IChat['id']): Promise<IChat> {
    const response = await this.GptRepository.createAnswerChatLog(pChatLogList, pId);
    if (response === undefined) {
      throw new Error('값이 없습니다.');
    }
    return response;
  }
}
