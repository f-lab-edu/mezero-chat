import OpenAI from 'openai';
import { IChat, IChatLog, ChatLogRole } from '@/types/Chat';
import { v4 } from 'uuid';

export class GptRepository {
  static client = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  getChatList(): IChat[] {
    const storedChatList = localStorage.getItem('chatList');
    const chatList: IChat[] = storedChatList ? JSON.parse(storedChatList) : [];
    return chatList;
  }

  getLastChat(): IChat | null {
    const chatList = this.getChatList();
    const lastChat = chatList.pop() || null;
    return lastChat;
  }

  saveChatList(pChat: IChat): boolean {
    const chatList = [...this.getChatList()];
    const updateChatList = chatList.some((chat) => chat.id === pChat.id)
      ? chatList.map((chat) => (chat.id === pChat.id ? pChat : chat))
      : [...chatList, pChat];

    localStorage.setItem('chatList', JSON.stringify(updateChatList));
    return true;
  }

  findChat(pId: string): IChat {
    const chatList = this.getChatList();
    return chatList.filter((chat) => chat.id === pId)[0];
  }

  createChat(pChatLogContent: string): string {
    const id = v4();
    const newChat: IChat = {
      id: id,
      chatLogList: [{ role: ChatLogRole.user, content: pChatLogContent }],
    };
    this.saveChatList(newChat);
    return id;
  }

  createQuestionChatLog(pId: string, pChatLogContent: string): IChat {
    const chat = this.findChat(pId);
    const updateChat = {
      id: pId,
      chatLogList: [...chat.chatLogList, { role: ChatLogRole.user, content: pChatLogContent }],
    };
    this.saveChatList(updateChat);
    return updateChat;
  }

  async createAnswerChatLog(pId: string, pChatLogList: IChatLog[]): Promise<IChat | undefined> {
    try {
      const chatCompletion = await GptRepository.client.chat.completions.create({
        messages: pChatLogList,
        model: 'gpt-3.5-turbo',
        max_tokens: 1024,
        top_p: 0.5,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
      });
      const response = chatCompletion.choices[0].message.content;

      if (response === null && typeof response !== 'string') {
        throw new Error();
      }

      const answerChat = {
        id: pId,
        chatLogList: [...pChatLogList, { role: ChatLogRole.assistant, content: response }],
      };
      this.saveChatList(answerChat);
      return answerChat;
    } catch (error) {
      console.error('오류가 발생했습니다');
    }
  }
}
