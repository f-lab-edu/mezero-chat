import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'mezero-chat',
  description: 'mezero-chat에서 무엇이든지 물어보세요.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
