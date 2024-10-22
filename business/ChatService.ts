import { v4 } from 'uuid';
import { GptRepository } from '@/data/GptRepository';
import { IChat, IChatLog, ChatLogRole } from '@/types/Chat';
import { GptModel, IGptParam } from '@/types/GptModel';

export class ChatService {
  public static getChatList(): IChat[] {
    return GptRepository.getChatList();
  }

  public static getChat(pId: string): IChat {
    return GptRepository.getChat(pId);
  }

  public static createChat(pChatLogContent: string): string {
    const id = v4();
    const newChat: IChat = {
      id: id,
      title: '',
      chatLogList: [{ role: ChatLogRole.user, content: pChatLogContent }],
    };
    GptRepository.addToChat(newChat);
    return id;
  }

  public static async updateChatTitle(pId: string, pChatLogList: IChatLog[]): Promise<string> {
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
    GptRepository.addToChat(answerChat);
    return answerChat.title;
  }

  public static createQuestionChatLog(pId: string, pChatLogContent: string): IChatLog[] {
    const chat = this.getChat(pId);
    const updateChat = {
      id: pId,
      title: chat.title,
      chatLogList: [...chat.chatLogList, { role: ChatLogRole.user, content: pChatLogContent }],
    };
    GptRepository.addToChat(updateChat);
    return updateChat.chatLogList;
  }

  public static async createAnswerChatLog(pId: string, pChatLogList: IChatLog[]): Promise<IChatLog[]> {
    const chat = this.getChat(pId);
    const answerChatLogContent = await this.getAnswer(pChatLogList);

    const answerChat = {
      id: pId,
      title: chat.title,
      chatLogList: [...pChatLogList, { role: ChatLogRole.assistant, content: answerChatLogContent }],
    };

    GptRepository.addToChat(answerChat);
    return answerChat.chatLogList;
  }

  public static async getAnswer(pChatLogList: IChatLog[]): Promise<string> {
    const chatCompletion: IGptParam = {
      messages: pChatLogList,
      model: GptModel.gpt3_5_Turbo,
      max_tokens: 1024,
      top_p: 0.5,
      frequency_penalty: 0.5,
      presence_penalty: 0.5,
    };
    const answerChatLogContent = await GptRepository.getAnswer(chatCompletion);
    if (answerChatLogContent === null || typeof answerChatLogContent !== 'string') {
      throw new Error();
    }
    return answerChatLogContent;
  }
}
