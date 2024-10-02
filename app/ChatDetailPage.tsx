'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChatService } from '@/business/ChatService';
import { ChatLogRole, IChatLogParam } from '@/types/ChatLogParam';
import Header from '@/components/Header';
import Chat from '@/components/Chat';
import ChatLogMessageInput from '@/components/ChatLogMessageInput';

export default function ChatDetailPage() {
  const pathname = usePathname();
  const displayId = pathname.split('/')[2];

  const [isTyping, setIsTyping] = useState(false);
  const [chatLogList, setChatLogList] = useState<IChatLogParam[]>([]);

  const chatLogService = new ChatService();
  const chatList = chatLogService.getStoredChatList();
  const currentChat = chatList.filter((chat) => chat.displayId === displayId);

  const initChat = () => {
    if (currentChat.length > 0) {
      setChatLogList(currentChat[0].chatLogList);
    }
  };

  //- todo: move to logic service
  const onSubmit = async (pChatLog: string) => {
    console.log('==========handleSubmit==========');
    const questionChatLogList: IChatLogParam[] = [...chatLogList, { role: ChatLogRole.user, content: pChatLog }];
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
            <ChatLogMessageInput onSubmit={onSubmit} isTyping={isTyping} />
          </div>
        </div>
      </div>
    </div>
  );
}
