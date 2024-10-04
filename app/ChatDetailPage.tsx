'use client';

import { useEffect, useState } from 'react';
import { ChatService } from '@/business/ChatService';
import { IChat, IChatLog, ChatLogRole } from '@/types/Chat';
import Header from '@/components/Header';
import Chat from '@/components/Chat';
import ChatLogContentInput from '@/components/ChatLogContentInput';

type ChatDetailProps = {
  params: {
    id: string;
  };
};

export default function ChatDetailPage({ id }: ChatDetailProps['params']) {
  const [isTyping, setIsTyping] = useState(false);
  const [chatLogList, setChatLogList] = useState<IChatLog[]>([]);

  const chatService = new ChatService();

  const chatList = chatService.getChatList();
  const currentChat: IChat[] = chatList.filter((chat) => chat.id === id);

  const initChat = () => {
    if (currentChat.length > 0) {
      setChatLogList(currentChat[0].chatLogList);
    }
  };

  //- todo: move to logic service
  const onSubmit = async (pChatLogContent: string) => {
    console.log('==========handleSubmit==========');
    const questionChatLogList: IChatLog[] = [...chatLogList, { role: ChatLogRole.user, content: pChatLogContent }];
    setIsTyping(true);
    setChatLogList(questionChatLogList);

    const chatService = new ChatService();
    const response = await chatService.getAnswer(questionChatLogList);
    setIsTyping(false);
    setChatLogList(response);
  };

  useEffect(() => {
    initChat();
  }, []);

  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col">
        <Header />
        <main className="relative flex h-full min-h-[50vh] flex-col bg-white p-4 lg:col-span-2">
          <div className="flex-1 w-full max-w-2xl m-auto">
            <div className="space-y-4">
              {chatLogList.map((chat, index) => (
                <Chat key={chat.content + index} role={chat.role} content={chat.content}></Chat>
              ))}
            </div>
          </div>
        </main>
        <div className="sticky bottom-0 w-full py-2 border-t bg-white">
          <div className="max-w-2xl m-auto">
            <ChatLogContentInput onSubmit={onSubmit} isTyping={isTyping} />
          </div>
        </div>
      </div>
    </div>
  );
}
