import { OpenAiRepository } from '@/data/OpenAiRepository';
import { IChat, IChatLog, ChatLogRole } from '@/types/Chat';

export class ChatService {
  private openAiRepository: OpenAiRepository;

  constructor() {
    this.openAiRepository = new OpenAiRepository();
  }

  getChatList(): IChat[] {
    return this.openAiRepository.getChatList();
  }

  setChatList(pChatLogList: IChat): boolean {
    return this.openAiRepository.setChatList(pChatLogList);
  }

  createChat(pChatLogContent: IChatLog['content']): IChat['displayId'] {
    return this.openAiRepository.createChat(pChatLogContent);
  }

  async getAnswer(chatLogList: IChatLog[]): Promise<IChatLog[]> {
    const response = await this.openAiRepository.getAnswer(chatLogList);

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
