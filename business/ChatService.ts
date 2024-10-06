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

  updateChat(pChatLogContent: string, pId: IChat['id']): boolean {
    return this.GptRepository.updateChat(pChatLogContent, pId);
  }

  async getAnswer(pChatLogList: IChatLog[], pId: IChat['id']): Promise<IChatLog[]> {
    const response = await this.GptRepository.getAnswer(pChatLogList, pId);

    if (response.length === 0) {
      throw new Error('값이 없습니다.');
    }

    return response;
  }
}
