import OpenAI from 'openai';
import { IChat, IChatLog, ChatLogRole } from '@/types/Chat';
import { v4 } from 'uuid';

export class OpenAiRepository {
  static client = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  getChatList(): IChat[] {
    const ChatList = localStorage.getItem('chatList');
    const chatList: IChat[] = ChatList ? JSON.parse(ChatList) : [];
    return chatList;
  }

  getLastChat(): IChat | null {
    const chatList = this.getChatList();
    const lastChat = chatList.pop() || null;
    return lastChat;
  }

  getLastId(): IChat['id'] {
    const chatList = this.getChatList();
    const lastId = chatList.map((chat) => chat.id).pop() || 0;
    return lastId;
  }

  setChatList(pChat: IChat): boolean {
    const saveChatList = [...this.getChatList(), pChat];
    localStorage.setItem('chatList', JSON.stringify(saveChatList));
    return true;
  }

  createChat(pChatLogContent: IChatLog['content']): IChat['displayId'] {
    const id = this.getLastId() + 1;
    const displayId = v4();
    const newChat: IChat = {
      id: id,
      displayId: displayId,
      chatLogList: [{ role: ChatLogRole.user, content: pChatLogContent }],
    };
    this.setChatList(newChat);
    return displayId;
  }

  async getAnswer(chatLogList: IChatLog[]): Promise<string | undefined> {
    console.log(chatLogList);
    try {
      const chatCompletion = await OpenAiRepository.client.chat.completions.create({
        messages: chatLogList,
        model: 'gpt-3.5-turbo',
        max_tokens: 1024,
        top_p: 0.5,
        frequency_penalty: 0.5,
        presence_penalty: 0.5,
      });

      console.log(chatCompletion);
      const response = chatCompletion.choices[0].message.content;
      if (response === null && typeof response !== 'string') {
        throw new Error();
      }
      return response;
    } catch (error) {
      console.error('오류가 발생했습니다');
      console.log(error);
    }
  }
}
