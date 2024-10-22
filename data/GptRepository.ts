import OpenAI from 'openai';
import { IChat } from '@/types/Chat';
import { IGptParam } from '@/types/GptModel';

export class GptRepository {
  private static client = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  public static getChatList(): IChat[] {
    const storedChatList = localStorage.getItem('chatList');
    const chatList: IChat[] = storedChatList ? JSON.parse(storedChatList) : [];
    return chatList;
  }

  public static getChat(pId: string): IChat {
    const chatList = this.getChatList();
    return chatList.filter((chat) => chat.id === pId)[0];
  }

  public static exist(pId: string): boolean {
    const chatList = this.getChatList();
    return chatList.some((chat) => chat.id === pId);
  }

  public static add(pChat: IChat): IChat[] {
    const chatList = this.getChatList();
    return [...chatList, pChat];
  }

  public static update(pChat: IChat): IChat[] {
    const chatList = this.getChatList();
    return chatList.map((chat) => (chat.id === pChat.id ? pChat : chat));
  }

  public static save(pChat: IChat): boolean {
    const saveList = this.exist(pChat.id) ? this.update(pChat) : this.add(pChat);
    localStorage.setItem('chatList', JSON.stringify(saveList));
    return true;
  }

  public static async getAnswer(pChatCompletion: IGptParam): Promise<string | null> {
    try {
      const chatCompletion = await GptRepository.client.chat.completions.create(pChatCompletion);
      return chatCompletion.choices[0].message.content;
    } catch (error) {
      console.error('오류가 발생했습니다');
      return null;
    }
  }
}
