import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-white px-4">
      <Link href="/" className="flex items-center">
        {/* <img src="" className="mr-3 h-6 sm:h-9" alt="Mezero Chat Logo" /> */}
        {/* <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Mezero Chat</span> */}
        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Chat</span>
      </Link>
      <div className="flex items-center ml-auto">
        <Link
          href="/"
          className="text-gray-800 bg-gray-50 dark:text-white hover:text-white hover:bg-primary focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
        >
          로그인
        </Link>
        {/* <button
          type="button"
          className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
        >
          <span className="sr-only">메인 메뉴 열기</span>
          <svg className="w-6 h-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"></path>
          </svg>
          <svg className="hidden w-6 h-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
          </svg>
        </button> */}
      </div>
    </header>
  );
}
