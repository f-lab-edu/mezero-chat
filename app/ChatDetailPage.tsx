'use client';

import { useEffect, useState } from 'react';
import { ChatLogService } from '@/business/ChatLogService';
import { OpenAiRole, IOpenAiParam } from '@/types/OpenAiParam';
import Header from '@/components/Header';
import Chat from '@/components/Chat';
import ChatMessageInput from '@/components/ChatMessageInput';
import { usePathname, useRouter } from 'next/navigation';

export default function ChatDetailPage() {
  const pathname = usePathname();
  const [isTyping, setIsTyping] = useState(false);
  const [chatLogList, setChatLogList] = useState<IOpenAiParam[]>([]);
  const chatData = {
    id: 1,
    displayId: 'displayId',
    chatLogList: [
      {
        role: '',
        content: '',
      },
    ],
  };

  const getHistoryChatLog = () => {
    const storedChatList = localStorage.getItem('chatList');
    const chatList = storedChatList !== null ? JSON.parse(storedChatList) : {};

    if (Object.keys(chatList).length > 0) {
      setChatLogList(chatList.chatLogList);
    }
  };

  const setHistoryChatLog = (pChatLogList: IOpenAiParam[]) => {
    if (localStorage.getItem('chatList') !== null) {
      const saveChatData = {
        ...chatData,
        displayId: pathname.split('/')[2],
        chatLogList: pChatLogList,
      };
      localStorage.setItem('chatList', JSON.stringify(saveChatData));
    }
  };

  const onSubmit = async (chatLog: string) => {
    console.log('==========handleSubmit==========');
    const userChat: IOpenAiParam[] = [...chatLogList, { role: OpenAiRole.user, content: chatLog }];
    setIsTyping(true);
    setChatLogList(userChat);
    setHistoryChatLog(userChat);

    const chatLogService = new ChatLogService();
    const response = await chatLogService.getAnswer(userChat);
    setIsTyping(false);
    setChatLogList(response);
    setHistoryChatLog(response);
  };

  useEffect(() => {
    getHistoryChatLog();
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
            <ChatMessageInput onSubmit={onSubmit} isTyping={isTyping} />
          </div>
        </div>
      </div>
    </div>
  );
}
