import { v4 } from 'uuid';
import { GptRepository } from '@/data/GptRepository';
import { IChat, IChatLog, ChatLogRole } from '@/types/Chat';
import { GptModel, IGptParam } from '@/types/GptModel';

export class ChatService {
  private gptRepository: GptRepository;

  constructor() {
    this.gptRepository = new GptRepository();
  }

  getChatList(): IChat[] {
    return this.gptRepository.getChatList();
  }

  getChat(pId: string): IChat {
    return this.gptRepository.getChat(pId);
  }

  createChat(pChatLogContent: string): string {
    const id = v4();
    const newChat: IChat = {
      id: id,
      title: '',
      chatLogList: [{ role: ChatLogRole.user, content: pChatLogContent }],
    };
    this.gptRepository.addToChat(newChat);
    return id;
  }

  async updateChatTitle(pId: string, pChatLogList: IChatLog[]): Promise<string> {
    const chatLogList = [
      ...pChatLogList,
      {
        role: ChatLogRole.user,
        content: '우리의 전체 대화내역을 보고 요약해서 10자 이내의 제목을 지어줘. 설명 필요 없이 제목만.',
      },
    ];
    const answerChatTitle = await this.getAnswer(chatLogList);
    const answerChat = {
      id: pId,
      title: answerChatTitle.replace(/(^['"]+|['"]+$)/g, ''),
      chatLogList: [...pChatLogList],
    };
    console.log(answerChat);
    console.log(answerChat.title);
    this.gptRepository.addToChat(answerChat);
    return answerChat.title;
  }

  createQuestionChatLog(pId: string, pChatLogContent: string): IChatLog[] {
    const chat = this.getChat(pId);
    const updateChat = {
      id: pId,
      title: chat.title,
      chatLogList: [...chat.chatLogList, { role: ChatLogRole.user, content: pChatLogContent }],
    };
    this.gptRepository.addToChat(updateChat);
    return updateChat.chatLogList;
  }

  async createAnswerChatLog(pId: string, pChatLogList: IChatLog[]): Promise<IChatLog[]> {
    const chat = this.getChat(pId);
    const answerChatLogContent = await this.getAnswer(pChatLogList);

    const answerChat = {
      id: pId,
      title: chat.title,
      chatLogList: [...pChatLogList, { role: ChatLogRole.assistant, content: answerChatLogContent }],
    };

    this.gptRepository.addToChat(answerChat);
    return answerChat.chatLogList;
  }

  async getAnswer(pChatLogList: IChatLog[]): Promise<string> {
    const chatCompletion: IGptParam = {
      messages: pChatLogList,
      model: GptModel.gpt3_5_Turbo,
      max_tokens: 1024,
      top_p: 0.5,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
    };
    const answerChatLogContent = await this.gptRepository.getAnswer(chatCompletion);
    if (answerChatLogContent === null || typeof answerChatLogContent !== 'string') {
      throw new Error();
    }
    return answerChatLogContent;
  }
}
