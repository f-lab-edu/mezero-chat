'use client';

import { useEffect, useState } from 'react';
import { ChatService } from '@/business/ChatService';
import { IChat, IChatLog, ChatLogRole } from '@/types/Chat';
import Header from '@/components/Header';
import ChatLog from '@/components/ChatLog';
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

  const initChat = async () => {
    const chat = chatService.findChat(id);
    setChatLogList(chat.chatLogList);

    if (isLastChatLogFromUser()) {
      const answerChatLog: IChat = await chatService.createAnswerChatLog(chat.chatLogList, id);
      setChatLogList(answerChatLog.chatLogList);
      setIsTyping(false);
    }
  };

  const isLastChatLogFromUser = (): boolean => {
    const chat = chatService.findChat(id);
    const lastChatLogRole = chat.chatLogList.map((chatLog) => chatLog.role).pop();
    return lastChatLogRole === ChatLogRole.user ? true : false;
  };

  const onSubmit = async (pChatLogContent: string) => {
    setIsTyping(true);
    const questionChatLog: IChat = chatService.createQuestionChatLog(pChatLogContent, id);
    setChatLogList(questionChatLog.chatLogList);
    const answerChatLog: IChat = await chatService.createAnswerChatLog(questionChatLog.chatLogList, id);
    setChatLogList(answerChatLog.chatLogList);
    setIsTyping(false);
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
                <ChatLog key={chat.content + index} role={chat.role} content={chat.content}></ChatLog>
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
