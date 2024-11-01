'use client';

import { useEffect, useState } from 'react';
import { ChatService } from '@/business/ChatService';
import { IChat, IChatLog, ChatLogRole } from '@/types/Chat';
import Sidebar from '@/components/Sidebar';
import ChatLayout from '@/app/chat/ChatLayout';
import ChatLog from '@/components/ChatLog';
import ChatLogContentInput from '@/components/ChatLogContentInput';
import GoChatPageButton from '@/components/GoChatPageButton';

export default function ChatDetailPage({ id }: { id: string }) {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [chatTitle, setChatTitle] = useState<string>('');
  const [chatLogList, setChatLogList] = useState<IChatLog[]>([]);

  const initChat = async (pId: string) => {
    const chat = ChatService.getChat(pId);
    setChatLogList(chat.chatLogList);

    if (isLastChatLogFromUser(chat)) {
      setIsTyping(true);
      const answerChatLogList: IChatLog[] = await ChatService.createAnswerChatLog(pId, chat.chatLogList);
      setChatLogList(answerChatLogList);

      if (createTitleFlag()) {
        const newChatTitle = await ChatService.updateChatTitle(pId, answerChatLogList);
        setChatTitle(newChatTitle);
      }
    }

    setIsTyping(false);
  };

  const isLastChatLogFromUser = (pChat: IChat): boolean => {
    const lastChatLogRole = pChat.chatLogList.map((chatLog) => chatLog.role).pop();
    return lastChatLogRole === ChatLogRole.user ? true : false;
  };

  const createTitleFlag = () => {
    return chatTitle.length === 0 || (chatLogList.length > 2 && chatLogList.length % 10 === 2) ? true : false;
  };

  const onSubmit = async (pChatLogContent: string) => {
    setIsTyping(true);
    const questionChatLogList: IChatLog[] = ChatService.createQuestionChatLog(id, pChatLogContent);
    setChatLogList(questionChatLogList);
    const answerChatLogList: IChatLog[] = await ChatService.createAnswerChatLog(id, questionChatLogList);
    setChatLogList(answerChatLogList);

    if (createTitleFlag()) {
      const newChatTitle = await ChatService.updateChatTitle(id, answerChatLogList);
      setChatTitle(newChatTitle);
    }
    setIsTyping(false);
  };

  useEffect(() => {
    initChat(id);
  }, [id]);

  return (
    <>
      <Sidebar chatId={id} />
      <main className="min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300 sm:ml-72">
        <ChatLayout>
          {chatLogList.map((chat, index) => (
            <ChatLog key={chat.content + index} role={chat.role} content={chat.content}></ChatLog>
          ))}
        </ChatLayout>
      </main>
      <div className="transition-[margin-left] ease-in-out duration-300 sm:ml-72">
        <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-4 md:mx-8 flex h-14 items-center">
            <div className="flex-1 w-full max-w-2xl m-auto">
              <div className="space-y-4">
                <ChatLogContentInput onSubmit={onSubmit} isTyping={isTyping} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <GoChatPageButton />
    </>
  );
}
