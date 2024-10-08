import { v4 } from 'uuid';
import { GptRepository } from '@/data/GptRepository';
import { IChat, IChatLog, ChatLogRole } from '@/types/Chat';
import { GptModel, IGptParam } from '@/types/GptModel';

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
    const id = v4();
    const newChat: IChat = {
      id: id,
      chatLogList: [{ role: ChatLogRole.user, content: pChatLogContent }],
    };
    this.GptRepository.addToChat(newChat);
    return id;
  }

  createQuestionChatLog(pId: string, pChatLogContent: string): IChatLog[] {
    const chat = this.getChat(pId);
    const updateChat = {
      id: pId,
      chatLogList: [...chat.chatLogList, { role: ChatLogRole.user, content: pChatLogContent }],
    };
    this.GptRepository.addToChat(updateChat);
    return updateChat.chatLogList;
  }

  async createAnswerChatLog(pId: string, pChatLogList: IChatLog[]): Promise<IChatLog[]> {
    const chatCompletion: IGptParam = {
      messages: pChatLogList,
      model: GptModel.gpt3_5_Turbo,
      max_tokens: 1024,
      top_p: 0.5,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
    };
    const answerChatLogContent = await this.GptRepository.createAnswerChatLog(chatCompletion);

    if (answerChatLogContent === null || typeof answerChatLogContent !== 'string') {
      throw new Error();
    }

    const answerChat = {
      id: pId,
      chatLogList: [...pChatLogList, { role: ChatLogRole.assistant, content: answerChatLogContent }],
    };
    this.GptRepository.addToChat(answerChat);

    return answerChat.chatLogList;
  }
}
