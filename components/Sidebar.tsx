import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 w-72">
      <div className="relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2">
          <li className="w-full">
            {/* if isActive: variant secondary */}
            <Button variant="ghost" className="w-full justify-start h-10 mb-1" asChild>
              <Link href="/">
                <p className="max-w-[200px] truncate translate-x-0 opacity-100">제목이 나타납니다.</p>
              </Link>
            </Button>
          </li>
        </ul>
      </div>
    </aside>
  );
}
