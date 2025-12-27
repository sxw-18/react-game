import Sidebar from '@/components/Sidebar';
import GameCard from '@/components/GameCard';
import { games } from '@/data/games';
import { Search, Play } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex gap-6">
      <Sidebar />
      <div className="flex-1">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 mb-8 text-white relative overflow-hidden shadow-lg">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl"></div>
           <div className="relative z-10">
              <h1 className="text-3xl font-bold mb-2">重温经典 - 免费在线畅玩复古游戏</h1>
              <p className="text-slate-300 mb-8 max-w-xl">体验经典游戏的怀旧魅力，在浏览器中直接畅玩不同年代的经典游戏。</p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-2xl">
                <div className="relative flex-1">
                    <input 
                        type="text" 
                        placeholder="搜索想玩的复古游戏..." 
                        className="w-full pl-4 pr-12 py-3 rounded-lg bg-white/10 backdrop-blur-md text-white focus:outline-none focus:ring-2 focus:ring-slate-400 shadow-lg placeholder:text-slate-400 border border-white/10"
                    />
                    <button className="absolute right-1 top-1 bottom-1 bg-white/10 hover:bg-white/20 text-white px-4 rounded-md transition-colors flex items-center gap-1">
                        <Search size={18} />
                        搜索
                    </button>
                </div>
                <div className="flex items-center gap-4">
                     <span className="text-sm text-slate-400 hidden sm:inline">或者</span>
                     <Link href="/upload" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 whitespace-nowrap shadow-lg shadow-orange-500/20">
                        <Play size={18} fill="currentColor" />
                        上传游戏运行
                    </Link>
                </div>
              </div>
           </div>
        </div>

        {/* Featured Games Header */}
        <div className="flex items-center justify-between mb-6">
             <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent flex items-center gap-2">
                精选复古游戏
                <span className="text-amber-400">★</span>
             </h2>
             <a href="#" className="text-orange-500 hover:text-orange-700 text-sm font-medium flex items-center gap-1">
                查看所有复古游戏 →
             </a>
        </div>

        {/* Game Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {games.map(game => (
                <GameCard key={game.id} game={game} />
            ))}
        </div>
      </div>
    </div>
  );
}
