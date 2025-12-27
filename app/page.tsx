import Sidebar from '@/components/Sidebar';
import GameCard from '@/components/GameCard';
import { games } from '@/data/games';
import { categories } from '@/data/categories';
import { Search, Play, Gamepad2 } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <Sidebar />
      <div className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-gray-900 to-stone-900 rounded-xl p-4 md:p-6 mb-6 text-white relative overflow-hidden shadow-lg border border-orange-500/10 landscape:mb-4">
           {/* Decorative Elements */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-[80px]"></div>
           <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-600/5 rounded-full translate-y-1/3 -translate-x-1/3 blur-[60px]"></div>
           
           <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center">
              <div className="flex-1 text-center md:text-left">
                  <h1 className="text-xl md:text-2xl font-bold mb-2 tracking-tight">重温经典 - 免费在线畅玩复古游戏</h1>
                  <p className="text-stone-400 text-xs md:text-sm mb-0 max-w-lg leading-relaxed hidden md:block">体验经典游戏的怀旧魅力，在浏览器中直接畅玩不同年代的经典游戏。无需下载，即点即玩。</p>
                  <p className="text-stone-400 text-xs md:hidden">在浏览器中直接畅玩经典游戏，无需下载。</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-1 group md:w-64">
                    <input 
                        type="text" 
                        placeholder="搜索游戏..." 
                        className="w-full pl-4 pr-10 py-2.5 rounded-lg bg-white/5 backdrop-blur-sm text-sm text-white focus:outline-none focus:ring-1 focus:ring-orange-500/50 shadow-inner placeholder:text-stone-600 border border-white/10 transition-all group-hover:bg-white/10"
                    />
                    <button className="absolute right-1 top-1 bottom-1 text-stone-400 hover:text-white px-2 transition-colors">
                        <Search size={16} />
                    </button>
                </div>
                <Link href="/upload" className="bg-orange-600/90 hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-sm border border-orange-500/20 hover:border-orange-500/40">
                    <Play size={16} fill="currentColor" />
                    上传游戏
                </Link>
              </div>
           </div>
        </div>

        {/* Mobile Category List */}
        <div className="lg:hidden mb-6 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide flex gap-3">
            {categories.map((category) => (
                <Link 
                    key={category.id}
                    href={`#`} 
                    className="flex-shrink-0 flex items-center gap-2 bg-white border border-gray-100 px-3 py-2 rounded-lg shadow-sm active:scale-95 transition-transform"
                >
                    <div className="w-6 h-6 flex items-center justify-center bg-orange-50 text-orange-600 rounded">
                        <Gamepad2 size={14} />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{category.name}</span>
                </Link>
            ))}
        </div>

        {/* Featured Games Header */}
        <div className="flex items-center justify-between mb-4 md:mb-6">
             <h2 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent flex items-center gap-2">
                精选复古游戏
                <span className="text-amber-600">★</span>
             </h2>
             <a href="#" className="text-orange-600 hover:text-orange-800 text-xs md:text-sm font-medium flex items-center gap-1">
                查看所有 <span className="hidden md:inline">复古游戏</span> →
             </a>
        </div>
        
        {/* Game Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
}
