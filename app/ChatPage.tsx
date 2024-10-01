'use client';

import { useRouter } from 'next/navigation';
import { ChatLogService } from '@/business/ChatLogService';
import Header from '@/components/Header';
import ChatMessageInput from '@/components/ChatMessageInput';

export default function ChatPage() {
  const router = useRouter();

  const createChat = (pChatLog: string) => {
    const chatLogService = new ChatLogService();
    return chatLogService.createChat(pChatLog);
  };

  const onSubmit = async (pChatLog: string) => {
    const displayId = createChat(pChatLog);
    router.push('/chat/' + displayId);
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
