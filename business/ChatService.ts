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

  setChat(pChatLogList: IChat): boolean {
    return this.GptRepository.setChat(pChatLogList);
  }

  createChat(pChatLogContent: IChatLog['content']): IChat['id'] {
    return this.GptRepository.createChat(pChatLogContent);
  }

  async getAnswer(chatLogList: IChatLog[]): Promise<IChatLog[]> {
    const response = await this.GptRepository.getAnswer(chatLogList);

    if (typeof response !== 'string') {
      throw new Error('값이 없습니다.');
    }

    const answerChat: IChatLog[] = [
      ...chatLogList,
      {
        role: ChatLogRole.assistant,
        content: response,
      },
    ];

    return answerChat;
  }
}
