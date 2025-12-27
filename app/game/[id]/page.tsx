import { games } from '@/data/games';
import GamePlayer from '@/components/GamePlayer';
import Sidebar from '@/components/Sidebar';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export function generateStaticParams() {
  return games.map((game) => ({
    id: game.id,
  }));
}

export default async function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const game = games.find((g) => g.id === resolvedParams.id);

  if (!game) {
    return <div className="text-center py-20 text-gray-600">Game not found</div>;
  }

  return (
    <div className="flex gap-6">
       <div className="hidden xl:block">
         <Sidebar />
       </div>
       
       <div className="flex-1">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-4 transition-colors">
             <ArrowLeft size={20} />
             <span>返回首页</span>
          </Link>
          
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6">
              <h1 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-900">
                 <span className="bg-orange-50 text-orange-600 text-sm px-2 py-1 rounded-md">{game.platform}</span>
                 {game.title}
              </h1>
              
              <GamePlayer game={game} />
              
              <div className="mt-6 prose max-w-none text-gray-600">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">游戏介绍</h3>
                  <p>这里是 {game.title} 的游戏描述。由于我们目前使用的是静态数据，这只是一个占位符。在实际应用中，这里会显示游戏的详细背景故事、操作说明和玩法技巧。</p>
                  <p className="mt-2 text-sm text-gray-500">发布年份: {game.year}</p>
              </div>
          </div>
       </div>
    </div>
  );
}
