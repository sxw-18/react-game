import Link from 'next/link';
import Image from 'next/image';
import { Play, Heart } from 'lucide-react';
import { Game } from '@/data/types';

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group border border-gray-100">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <Image
          src={game.image}
          alt={game.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
            <Link href={`/game/${game.id}`} className="bg-white text-orange-500 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-1 hover:bg-orange-50 transition-colors transform translate-y-2 group-hover:translate-y-0 duration-300">
                <Play size={16} fill="currentColor" />
                立即游玩
            </Link>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-gray-800 line-clamp-1 mb-1">{game.title}</h3>
        <div className="flex items-center justify-between mt-2">
            <span className="inline-block bg-orange-50 text-orange-600 text-xs px-2 py-1 rounded-md font-medium">
            {game.platform}
            </span>
            <span className="text-gray-400 text-xs">{game.year}</span>
        </div>
        
        <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center">
             <Link href={`/game/${game.id}`} className="text-xs font-semibold text-orange-500 hover:text-orange-700 flex items-center gap-1">
                立即游玩
             </Link>
             <button className="text-xs font-semibold text-gray-400 hover:text-pink-500 flex items-center gap-1 transition-colors">
                <Heart size={14} />
                收藏
             </button>
        </div>
      </div>
    </div>
  );
}
