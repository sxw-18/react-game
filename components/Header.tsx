'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gamepad2, Globe, Menu, X } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-orange-50 p-1.5 rounded-lg">
                <Gamepad2 className="text-orange-600 w-6 h-6" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-gray-900">
              Play<span className="text-orange-600">Box</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-gray-600 z-50">
            <Link 
                href="/" 
                className={`px-3 py-2 rounded-md transition-colors relative z-50 cursor-pointer ${pathname === '/' ? 'text-orange-700 bg-orange-50' : 'hover:text-orange-600 hover:bg-orange-50'}`}
            >
                首页
            </Link>
            <Link 
                href="/games" 
                className={`px-3 py-2 rounded-md transition-colors relative z-50 cursor-pointer ${pathname?.startsWith('/games') || pathname?.startsWith('/game/') ? 'text-orange-700 bg-orange-50' : 'hover:text-orange-600 hover:bg-orange-50'}`}
            >
                游戏
            </Link>
            <Link 
                href="/upload" 
                className={`px-3 py-2 rounded-md transition-colors relative z-50 cursor-pointer ${pathname === '/upload' ? 'text-orange-700 bg-orange-50' : 'hover:text-orange-600 hover:bg-orange-50'}`}
            >
                上传 ROM
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors">
             <span className="sr-only">Settings</span>
             <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          </button>
          
          <button 
            className="md:hidden p-2 text-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg py-4 px-4 flex flex-col gap-2 z-40">
            <Link 
                href="/" 
                className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-3 ${pathname === '/' ? 'text-orange-700 bg-orange-50' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setIsMenuOpen(false)}
            >
                <Gamepad2 size={18} />
                首页
            </Link>
            <Link 
                href="/games" 
                className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-3 ${pathname?.startsWith('/games') || pathname?.startsWith('/game/') ? 'text-orange-700 bg-orange-50' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setIsMenuOpen(false)}
            >
                <Globe size={18} />
                游戏库
            </Link>
            <Link 
                href="/upload" 
                className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center gap-3 ${pathname === '/upload' ? 'text-orange-700 bg-orange-50' : 'text-gray-600 hover:bg-gray-50'}`}
                onClick={() => setIsMenuOpen(false)}
            >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                上传 ROM
            </Link>
        </div>
      )}
    </header>
  );
}
