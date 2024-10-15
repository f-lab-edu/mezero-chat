import Link from 'next/link';
import { Undo2 } from 'lucide-react';

export default function GoChatPageButton() {
  return (
    <Link
      href="/"
      className="fixed bottom-24 right-8 group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-12 md:w-12 md:text-base"
    >
      <Undo2 className="h-6 w-6" />
    </Link>
  );
}
