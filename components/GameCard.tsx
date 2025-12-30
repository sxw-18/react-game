import Link from 'next/link';
import Image from 'next/image';
import { Play, Heart } from 'lucide-react';
import { Game } from '@/data/types';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group border border-gray-100 flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Link href={`/game/${game.id}`} className="block w-full h-full">
            <Image
            src={game.image}
            alt={game.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            unoptimized
            />
        </Link>
        
        {/* 悬停覆盖层 */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px] pointer-events-none group-hover:pointer-events-auto">
            <Link href={`/game/${game.id}`} className="bg-orange-600 text-white px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-orange-700 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg hover:shadow-orange-500/30 hover:scale-105">
                <Play size={16} fill="currentColor" />
                开始游戏
            </Link>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start gap-2 mb-2">
            <Link href={`/game/${game.id}`} className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 line-clamp-1 text-base group-hover:text-orange-600 transition-colors">{game.title}</h3>
            </Link>
            <span className="text-gray-400 text-xs bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100 whitespace-nowrap">{game.year}</span>
        </div>
        
        <div className="flex justify-between items-end gap-2 mb-3">
            <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
                <span className="inline-flex items-center bg-orange-50 text-orange-700 text-[10px] px-2 py-0.5 rounded-md font-medium border border-orange-100/50 whitespace-nowrap">
                    {game.platform}
                </span>
                {game.genre && (
                    <span className="inline-flex items-center bg-blue-50 text-blue-700 text-[10px] px-2 py-0.5 rounded-md font-medium border border-blue-100/50 whitespace-nowrap">
                        {game.genre}
                    </span>
                )}
            </div>
             <button className="text-gray-400 hover:text-pink-500 transition-colors p-1.5 hover:bg-pink-50 rounded-full flex-shrink-0">
                <Heart size={18} />
             </button>
        </div>

        {game.description && (
            <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mt-auto h-9 mb-3">
                {game.description}
            </p>
        )}

        <Link href={`/game/${game.id}`} className="w-full bg-orange-600 text-white py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 hover:bg-orange-700 transition-colors shadow-sm md:hidden">
            <Play size={14} fill="currentColor" />
            开始游戏
        </Link>
      </div>
    </div>
  );
}
