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

  createChat(pChatLogContent: string): IChat['id'] {
    return this.GptRepository.createChat(pChatLogContent);
  }

  async getAnswer(chatLogList: IChatLog[]): Promise<IChatLog[]> {
    const response = await this.GptRepository.getAnswer(chatLogList);

    if (typeof response !== 'string') {
      throw new Error('값이 없습니다.');
    }

    const answers: IChatLog[] = [
      ...chatLogList,
      {
        role: ChatLogRole.assistant,
        content: response,
      },
    ];

    return answers;
  }
}
