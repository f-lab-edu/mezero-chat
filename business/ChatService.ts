import { OpenAiRepository } from '@/data/OpenAiRepository';
import { IChat, IChatLogParam, ChatLogRole } from '@/types/ChatLogParam';

export class ChatService {
  private openAiRepository: OpenAiRepository;

  constructor() {
    this.openAiRepository = new OpenAiRepository();
  }

  getStoredChatList() {
    return this.openAiRepository.getStoredChatList();
  }

  setStoredChatList(pChatLogList: IChat) {
    return this.openAiRepository.setStoredChatList(pChatLogList);
  }

  createChat(pChatLog: string) {
    return this.openAiRepository.createChat(pChatLog);
  }

  async getAnswer(chatLogList: IChatLogParam[]) {
    const response = await this.openAiRepository.getAnswer(chatLogList);

    if (typeof response !== 'string') {
      throw new Error('값이 없습니다.');
    }

    const answerChat: IChatLogParam[] = [
      ...chatLogList,
      {
        role: ChatLogRole.assistant,
        content: response,
      },
    ];

    return answerChat;
  }
}
