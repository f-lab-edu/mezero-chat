'use client';

import { useState } from 'react';
import { ChatService } from '@/business/ChatService';
import { IChatParam } from '@/types/chat';
import Header from '@/components/Header';
import Chat from '@/components/Chat';
import ChatMessageInput from '@/components/ChatMessageInput';

export default function ChatPage() {
  const [isTyping, setIsTyping] = useState(false);
  const [chatList, setChatList] = useState<IChatParam[]>([]);

  const onSubmit = async (values: string) => {
    console.log('==========handleSubmit==========');
    setIsTyping(true);
    setChatList((prevChatList) => [
      ...prevChatList,
      {
        role: 'user',
        message: values,
      },
    ]);

    const response = await ChatService.getAnswer(values);
    setIsTyping(false);

    if (typeof response !== 'string') {
      throw new Error('값이 없습니다.');
    }
    setChatList((prevChatList) => [
      ...prevChatList,
      {
        role: 'assistant',
        message: response,
      },
    ]);
  };

  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col">
        <Header />
        <main className="relative flex h-full min-h-[50vh] flex-col bg-white p-4 lg:col-span-2">
          <div className="flex-1 w-full max-w-2xl m-auto">
            <div className="space-y-4">
              {chatList.map((chat, index) => (
                <Chat key={index} message={chat.message} role={chat.role}></Chat>
              ))}
            </div>
          </div>
        </main>
        <div className="sticky bottom-0 w-full py-2 border-t bg-white">
          <div className="max-w-2xl m-auto">
            <ChatMessageInput onSubmit={onSubmit} isTyping={isTyping} />
          </div>
        </div>
      </div>
    </div>
  );
}
