import { ChatLogRole, IChatLog } from '@/types/Chat';

export default function ChatLog({ role, content }: IChatLog) {
  return (
    <div
      className={`flex w-max max-w-[75%] flex-col mb-4 rounded-lg px-3 py-2 text-sm ${
        role === ChatLogRole.user ? 'ml-auto bg-primary text-primary-foreground' : 'mr-auto bg-muted'
      }`}
    >
      {content}
    </div>
  );
}
