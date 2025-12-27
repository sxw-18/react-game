import Link from 'next/link';
import { Gamepad2, Globe } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-orange-50 p-1.5 rounded-lg">
                <Gamepad2 className="text-orange-500 w-6 h-6" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900">
              Play<span className="text-orange-500">Box</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-orange-500 hover:bg-orange-50 px-3 py-2 rounded-md transition-colors">首页</Link>
            <Link href="#" className="hover:text-orange-500 hover:bg-orange-50 px-3 py-2 rounded-md transition-colors text-orange-600 bg-orange-50">游戏</Link>
            <Link href="/upload" className="hover:text-orange-500 hover:bg-orange-50 px-3 py-2 rounded-md transition-colors">上传 ROM</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
             <span className="sr-only">Settings</span>
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          </button>
          
          {/* <div className="hidden md:flex items-center gap-2 text-gray-600 text-sm hover:text-gray-900 cursor-pointer font-medium">
             <span className="flex items-center gap-1">
                <span className="text-lg leading-none">🇨🇳</span> 简体中文 <span className="text-[10px] mt-0.5 text-gray-400">▼</span>
             </span>
          </div> */}
          
          {/* <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-1.5 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-purple-200">
             登录
          </button> */}
        </div>
      </div>
    </header>
  );
}
