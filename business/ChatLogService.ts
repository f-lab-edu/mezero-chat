import { OpenAiRepository } from '@/data/OpenAiRepository';
import { IChat, IOpenAiParam, OpenAiRole } from '@/types/OpenAiParam';

export class ChatLogService {
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

  async getAnswer(chatLogList: IOpenAiParam[]) {
    const response = await this.openAiRepository.getAnswer(chatLogList);

    if (typeof response !== 'string') {
      throw new Error('값이 없습니다.');
    }

    const answerChat: IOpenAiParam[] = [
      ...chatLogList,
      {
        role: OpenAiRole.assistant,
        content: response,
      },
    ];

    return answerChat;
  }
}
