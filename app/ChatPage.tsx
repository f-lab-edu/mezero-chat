'use client';

import { useState } from 'react';
import { ChatService } from '@/business/ChatService';
import { ChatLogRole, IChatLogParam } from '@/types/ChatLogParam';
import Header from '@/components/Header';
import Chat from '@/components/Chat';
import ChatLogMessageInput from '@/components/ChatLogMessageInput';

export default function ChatPage() {
  const [isTyping, setIsTyping] = useState(false);
  const [chatLogList, setChatLogList] = useState<IChatLogParam[]>([]);

  const onSubmit = async (chatLog: string) => {
    console.log('==========handleSubmit==========');
    setIsTyping(true);

    const userChat: IChatLogParam[] = [...chatLogList, { role: ChatLogRole.user, content: chatLog }];
    setChatLogList(userChat);

    const chatService = new ChatService();
    const response = await chatService.getAnswer(userChat);
    setIsTyping(false);

    const assistantChat: IChatLogParam[] = [
      ...userChat,
      {
        role: ChatLogRole.assistant,
        content: response,
      },
    ];
    setChatLogList(assistantChat);
  };

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
            <ChatLogMessageInput onSubmit={onSubmit} isTyping={isTyping} />
          </div>
        </div>
      </div>
    </div>
  );
}
