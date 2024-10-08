'use client';

import { useEffect, useState } from 'react';
import { ChatService } from '@/business/ChatService';
import { IChat, IChatLog, ChatLogRole } from '@/types/Chat';
import Sidebar from '@/components/Sidebar';
import ChatLayout from '@/app/chat/ChatLayout';
import ChatLog from '@/components/ChatLog';
import ChatLogContentInput from '@/components/ChatLogContentInput';

export default function ChatDetailPage({ id }: { id: string }) {
  const [isTyping, setIsTyping] = useState(false);
  const [chatLogList, setChatLogList] = useState<IChatLog[]>([]);

  const chatService = new ChatService();

  const initChat = async () => {
    const chat = chatService.getChat(id);
    setChatLogList(chat.chatLogList);

    if (isLastChatLogFromUser()) {
      const answerChatLog: IChat = await chatService.createAnswerChatLog(id, chat.chatLogList);
      setChatLogList(answerChatLog.chatLogList);
      setIsTyping(false);
    }
  };

  const isLastChatLogFromUser = (): boolean => {
    const chat = chatService.getChat(id);
    const lastChatLogRole = chat.chatLogList.map((chatLog) => chatLog.role).pop();
    return lastChatLogRole === ChatLogRole.user ? true : false;
  };

  const onSubmit = async (pChatLogContent: string) => {
    setIsTyping(true);
    const questionChatLog: IChat = chatService.createQuestionChatLog(id, pChatLogContent);
    setChatLogList(questionChatLog.chatLogList);
    const answerChatLog: IChat = await chatService.createAnswerChatLog(id, questionChatLog.chatLogList);
    setChatLogList(answerChatLog.chatLogList);
    setIsTyping(false);
  };

  useEffect(() => {
    initChat();
  }, []);

  return (
    <>
      <Sidebar />
      <main className="min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 lg:ml-72">
        <ChatLayout>
          {chatLogList.map((chat, index) => (
            <ChatLog key={chat.content + index} role={chat.role} content={chat.content}></ChatLog>
          ))}
        </ChatLayout>
      </main>
      <div className="transition-[margin-left] ease-in-out duration-300 lg:ml-72">
        <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-4 md:mx-8 flex h-14 items-center">
            <div className="flex-1 w-full max-w-2xl m-auto">
              <div className="space-y-4">
                <ChatLogContentInput onSubmit={onSubmit} isTyping={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
