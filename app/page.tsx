'use client';

import Header from '@/components/Header';
import MessageInput from '@/app/MessageInput';

export default function Home() {
  return (
    <div className="grid h-screen w-full">
      <div className="flex flex-col">
        <Header />
        <main className="relative flex h-full min-h-[50vh] flex-col bg-white p-4 lg:col-span-2">
          <div className="flex-1 w-full max-w-2xl m-auto">
            <div className="space-y-4">
              {/* <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">
                내가 질문한 내용입니다.
              </div>
              <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm mr-auto bg-muted">
                Chat이 답변한 내용입니다.
              </div> */}
            </div>
          </div>
        </main>
        <div className="sticky bottom-0 w-full py-2 border-t bg-white">
          <div className="max-w-2xl m-auto">
            <MessageInput />
          </div>
        </div>
      </div>
    </div>
  );
}
