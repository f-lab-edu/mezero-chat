import Header from '@/components/Header';

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div className="container m-auto pt-8 pb-8 px-4 sm:px-8">{children}</div>
    </div>
  );
}
