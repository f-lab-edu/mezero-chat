import { ChatLogRole, IChatLogParam } from '@/types/ChatLogParam';

export default function Chat({ role, content }: IChatLogParam) {
  return (
    <div
      className={`flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ${
        role === ChatLogRole.user ? 'ml-auto bg-primary text-primary-foreground' : 'mr-auto bg-muted'
      }`}
    >
      {content}
    </div>
  );
}
