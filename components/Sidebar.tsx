import Link from 'next/link';
import { ChatService } from '@/business/ChatService';
import { Button } from '@/components/ui/button';

export default function Sidebar({ chatId }: { chatId: string }) {
  const chatList = ChatService.getChatList();

  return (
    <aside className="fixed top-0 left-0 z-20 h-screen -translate-x-full sm:translate-x-0 transition-[width] ease-in-out duration-300 w-72">
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          {chatList.map((chat, index) => (
            <li className="w-full" key={chat.id + index}>
              <Button
                variant={chatId === chat.id ? 'secondary' : 'ghost'}
                className="w-full justify-start h-10 mb-1"
                asChild
              >
                <Link href={'/chat/' + chat.id} scroll={false}>
                  <p className="max-w-[200px] truncate translate-x-0 opacity-100">{chat.title}</p>
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
