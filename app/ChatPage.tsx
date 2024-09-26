'use client';

import { useState } from 'react';
import { ChatLogService } from '@/business/ChatLogService';
import { IOpenAiParam, OpenAiRole } from '@/types/OpenAiParam';
import Header from '@/components/Header';
import Chat from '@/components/Chat';
import ChatMessageInput from '@/components/ChatMessageInput';

export default function ChatPage() {
  const [isTyping, setIsTyping] = useState(false);
  const [chatLogList, setChatLogList] = useState<IOpenAiParam[]>([]);

  const onSubmit = async (chatLog: string) => {
    console.log('==========handleSubmit==========');
    setIsTyping(true);

    const userChat: IOpenAiParam[] = [...chatLogList, { role: OpenAiRole.user, content: chatLog }];
    setChatLogList(userChat);

    const response = await ChatLogService.getAnswer(userChat);
    setIsTyping(false);

    if (typeof response !== 'string') {
      throw new Error('값이 없습니다.');
    }

    const assistantChat: IOpenAiParam[] = [
      ...userChat,
      {
        role: OpenAiRole.assistant,
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
            <ChatMessageInput onSubmit={onSubmit} isTyping={isTyping} />
          </div>
        </div>
      </div>
    </div>
  );
}
