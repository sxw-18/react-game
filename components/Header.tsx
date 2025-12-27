import Link from 'next/link';
import { Gamepad2, Globe } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-orange-50 p-1.5 rounded-lg">
                <Gamepad2 className="text-orange-500 w-6 h-6" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900">
              Retro<span className="text-orange-500">Games</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-orange-500 hover:bg-orange-50 px-3 py-2 rounded-md transition-colors">首页</Link>
            <Link href="#" className="hover:text-orange-500 hover:bg-orange-50 px-3 py-2 rounded-md transition-colors">游戏站</Link>
            <Link href="#" className="hover:text-orange-500 hover:bg-orange-50 px-3 py-2 rounded-md transition-colors">下载 ROM</Link>
            <Link href="#" className="hover:text-orange-500 hover:bg-orange-50 px-3 py-2 rounded-md transition-colors">分类</Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 text-gray-500 text-sm hover:text-gray-900 cursor-pointer">
             <Globe size={18} />
             <span>简体中文</span>
          </div>
        </div>
      </div>
    </header>
  );
}
