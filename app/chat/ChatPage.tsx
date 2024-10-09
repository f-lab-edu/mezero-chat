'use client';

import { useRouter } from 'next/navigation';
import { ChatService } from '@/business/ChatService';
import ChatLayout from '@/app/chat/ChatLayout';
import ChatLogContentInput from '@/components/ChatLogContentInput';

export default function ChatPage() {
  const router = useRouter();

  const onSubmit = (pChatLogContent: string) => {
    const chatService = new ChatService();
    const id = chatService.createChat(pChatLogContent);
    router.push('/chat/' + id, { scroll: false });
  };

  return (
    <>
      <main className="min-h-[calc(100vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300">
        <ChatLayout>
          <div className="absolute top-1/2 left-1/2 space-y-4 transform -translate-x-1/2 -translate-y-1/2">
            <h2 className="text-3xl font-bold text-center text-gray-800 tracking-wide leading-tight">
              궁금한 것은 무엇이든 물어보세요.
            </h2>
            <div className="w-full bg-white border p-5 rounded-2xl">
              <div className="max-w-2xl m-auto">
                <ChatLogContentInput onSubmit={onSubmit} />
              </div>
            </div>
          </div>
        </ChatLayout>
      </main>
      <div className="z-20 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-4 md:mx-8 flex justify-center items-center h-14">
          <p className="text-xs md:text-sm leading-loose text-muted-foreground text-left">
            Copyright 2024 &copy; MEZERO All rights reserved
          </p>
        </div>
      </div>
    </>
  );
}
