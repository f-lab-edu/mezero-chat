import { OpenAiRepository } from '@/data/OpenAiRepository';
import { IChat, IChatLog, ChatLogRole } from '@/types/Chat';

export class ChatService {
  private openAiRepository: OpenAiRepository;

  constructor() {
    this.openAiRepository = new OpenAiRepository();
  }

  getChatList() {
    return this.openAiRepository.getChatList();
  }

  setChatList(pChatLogList: IChat) {
    return this.openAiRepository.setChatList(pChatLogList);
  }

  createChat(pChatLogContent: IChatLog['content']) {
    return this.openAiRepository.createChat(pChatLogContent);
  }

  async getAnswer(chatLogList: IChatLog[]) {
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
