import ChatDetailPage from '@/app/chat/ChatDetailPage';
import { redirect } from 'next/navigation';

type ChatDetailProps = {
  params: {
    id: string;
  };
};

export default function ChatDetail({ params }: ChatDetailProps) {
  const { id } = params;

  if (!id) {
    redirect('/');
  }

  return <ChatDetailPage id={id} />;
}
