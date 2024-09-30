'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import { v4 } from 'uuid';

import ChatMessageInput from '@/components/ChatMessageInput';
import { useRouter } from 'next/navigation';
import { ChatLogService } from '@/business/ChatLogService';
import { IOpenAiParam, OpenAiRole } from '@/types/OpenAiParam';

export default function ChatPage() {
  const [chatLogList, setChatLogList] = useState<IOpenAiParam[]>([]);
  const router = useRouter();
  const displayId = v4();
  const chatData = {
    id: 1,
    displayId: displayId,
    chatLogList: [
      {
        role: '',
        content: '',
      },
    ],
  };

  const onSubmit = async (chatLog: string) => {
    console.log('==========handleSubmit==========');
    const userChat: IOpenAiParam[] = [...chatLogList, { role: OpenAiRole.user, content: chatLog }];

    const chatLogService = new ChatLogService();
    const response = await chatLogService.getAnswer(userChat);

    const saveChatData = {
      ...chatData,
      chatLogList: response,
    };

    //- todo : Find id when there are multiple chats
    localStorage.removeItem('chatList');
    if (localStorage.getItem('chatList') === null) {
      localStorage.setItem('chatList', JSON.stringify(saveChatData));
    }

    console.log(localStorage);
    router.push('/chat/' + chatData.displayId);
  };

  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col">
        <Header />
        <main className="relative flex h-full min-h-[50vh] flex-col bg-white lg:col-span-2">
          <div className="w-full max-w-2xl m-auto">
            <div className="flex flex-col items-center w-full h-full space-y-4">
              <h2 className="text-3xl font-bold text-center text-gray-800 tracking-wide leading-tight">
                궁금한 것은 무엇이든 물어보세요.
              </h2>
              <div className="w-full bg-white border p-5 rounded-2xl">
                <div className="max-w-2xl m-auto">
                  <ChatMessageInput onSubmit={onSubmit} />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
