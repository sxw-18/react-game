'use client';

import { games } from '@/data/games';
import GamePlayer from '@/components/GamePlayer';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Game } from '@/data/types';

export default function GamePage() {
  const params = useParams();
  const router = useRouter();
  
  const id = params?.id as string;
  const game = games.find((g) => g.id === id);

  const [isPlaying, setIsPlaying] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  const handleStartGame = () => {
    setIsPlaying(true);
  };

  const handleBackClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isPlaying) {
      setShowExitModal(true);
    } else {
      router.push('/');
    }
  };

  const confirmExit = () => {
    // GamePlayer component will handle cleanup on unmount
    setIsPlaying(false);
    setShowExitModal(false);
    router.push('/');
  };

  const cancelExit = () => {
    setShowExitModal(false);
  };

  if (!game) {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
            <div className="text-xl font-bold text-gray-800">未找到该游戏</div>
            <Link href="/" className="text-orange-600 hover:text-orange-700 font-medium">返回首页</Link>
        </div>
    );
  }

  return (
    <div className="relative">
       {/* Breadcrumb Header - Hidden on mobile when playing */}
       <div className={`mb-4 md:mb-6 flex items-center gap-4 ${isPlaying ? 'hidden md:flex' : 'flex'}`}>
          <button onClick={handleBackClick} className="inline-flex items-center gap-1 text-gray-600 hover:text-gray-900 transition-colors bg-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg shadow-sm border border-gray-100 text-sm md:text-base">
             <ArrowLeft size={18} />
             <span className="font-medium">返回</span>
          </button>
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shadow-sm relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
             </div>
             <div>
                <h1 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">{game.title}</h1>
                <span className="text-xs text-gray-500 font-medium">{game.platform}</span>
             </div>
          </div>
       </div>

       <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Game Area */}
          <div className={`flex-1 ${isPlaying ? 'w-full fixed inset-0 z-50 bg-black flex items-center justify-center md:relative md:w-auto md:bg-transparent md:block md:inset-auto landscape:h-screen landscape:w-screen landscape:fixed landscape:inset-0 landscape:z-50 landscape:bg-black' : ''}`}>
             
             {/* Mobile Back Button Overlay */}
             {isPlaying && (
                <button 
                    onClick={handleBackClick}
                    className="absolute top-4 left-4 z-[60] bg-white/20 backdrop-blur-md text-white p-2 rounded-full md:hidden landscape:top-2 landscape:left-2 landscape:p-1.5"
                >
                    <ArrowLeft size={24} />
                </button>
             )}

             <div className={`bg-gradient-to-b from-[#1a1b2e] to-black overflow-hidden shadow-2xl relative flex items-center justify-center group w-full mx-auto ${isPlaying ? 'h-full w-full md:h-auto md:aspect-[4/3] md:rounded-xl md:border-4 md:border-[#1a1b2e] landscape:h-full landscape:w-full landscape:rounded-none landscape:border-0' : 'aspect-square md:aspect-[4/3] rounded-xl border-4 border-[#1a1b2e]'}`}>
                {/* Initial Start Screen Overlay */}
                {!isPlaying && (
                    <div className="absolute top-0 left-0 w-full h-full z-20 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                        <div className="w-32 h-32 md:w-48 md:h-48 mb-4 md:mb-6 relative shadow-2xl rounded-lg overflow-hidden border-4 border-white/10">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={game.image} alt={game.title} className="w-full h-full object-cover" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg text-center">{game.title}</h2>
                        <span className="text-gray-400 text-sm mb-6 md:mb-8 bg-white/10 px-3 py-1 rounded-full">{game.platform}</span>
                        <button 
                            onClick={handleStartGame}
                            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-orange-900/50 flex items-center gap-2"
                        >
                            <span className="text-xl">▶</span> 开始游戏
                        </button>
                    </div>
                )}
                
                {/* Actual Game Player */}
                {isPlaying && (
                    <div className="relative z-10 w-full h-full bg-black flex items-center justify-center">
                        <GamePlayer game={game} />
                    </div>
                )}
             </div>
          </div>

          {/* Right Sidebar - Controls & Info - Hidden on mobile when playing */}
          <div className={`w-full lg:w-80 flex-shrink-0 space-y-4 relative ${isPlaying ? 'hidden lg:block' : ''}`}>
             {/* Operations Panel */}
             <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <h3 className="font-bold text-gray-800 mb-4 text-sm border-b border-gray-100 pb-2">操作</h3>
                
                <div className="space-y-3">
                   {/* Key Mapping Groups */}
                   <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 font-medium w-12">A / B</span>
                      <div className="flex gap-1">
                         <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-full text-gray-700 min-w-[24px] text-center font-mono">Z</kbd>
                         <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-full text-gray-700 min-w-[24px] text-center font-mono">X</kbd>
                      </div>
                      <span className="text-gray-200">|</span>
                      <span className="text-gray-500 font-medium w-8">X / Y</span>
                      <div className="flex gap-1">
                         <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-full text-gray-700 min-w-[24px] text-center font-mono">A</kbd>
                         <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-full text-gray-700 min-w-[24px] text-center font-mono">S</kbd>
                      </div>
                   </div>

                   <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 font-medium w-12">L / R</span>
                      <div className="flex gap-1">
                         <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-full text-gray-700 min-w-[24px] text-center font-mono">Q</kbd>
                         <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-full text-gray-700 min-w-[24px] text-center font-mono">E</kbd>
                      </div>
                      <span className="text-gray-200">|</span>
                      <span className="text-gray-500 font-medium w-8">L2/R2</span>
                      <div className="flex gap-1">
                         <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-full text-gray-700 min-w-[24px] text-center font-mono">R</kbd>
                         <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded-full text-gray-700 min-w-[24px] text-center font-mono">W</kbd>
                      </div>
                   </div>

                   <div className="flex items-center gap-2 text-xs border-t border-gray-50 pt-3">
                      <div className="flex flex-col gap-1 items-center">
                         <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Start</span>
                         <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-gray-700 w-full text-center font-mono text-[10px]">Enter</kbd>
                      </div>
                      <div className="flex flex-col gap-1 items-center">
                         <span className="text-gray-400 text-[10px] uppercase font-bold tracking-wider">Select</span>
                         <kbd className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-gray-700 w-full text-center font-mono text-[10px]">Shift</kbd>
                      </div>
                      <div className="flex flex-col gap-1 flex-1 ml-2 pl-2 border-l border-gray-100">
                         <span className="text-gray-400 text-[10px] uppercase text-center font-bold tracking-wider">十字键</span>
                         <div className="flex justify-center gap-1">
                            <kbd className="w-5 h-5 flex items-center justify-center bg-gray-100 border border-gray-200 rounded text-gray-700">↑</kbd>
                            <kbd className="w-5 h-5 flex items-center justify-center bg-gray-100 border border-gray-200 rounded text-gray-700">↓</kbd>
                            <kbd className="w-5 h-5 flex items-center justify-center bg-gray-100 border border-gray-200 rounded text-gray-700">←</kbd>
                            <kbd className="w-5 h-5 flex items-center justify-center bg-gray-100 border border-gray-200 rounded text-gray-700">→</kbd>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Quick Save/Load */}
                <div className="mt-4 space-y-2 pt-4 border-t border-gray-50">
                   <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>快速保存游戏状态</span>
                      <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-gray-600 font-mono min-w-[20px] text-center">1</kbd>
                   </div>
                   <div className="flex items-center justify-between text-xs text-gray-600">
                      <span>快速加载游戏状态</span>
                      <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-200 rounded text-gray-600 font-mono min-w-[20px] text-center">2</kbd>
                   </div>
                </div>

                {/* Warning Box */}
                <div className="mt-4 bg-red-50 border border-red-100 rounded-lg p-3 flex gap-2">
                   <div className="shrink-0 w-4 h-4 rounded-full bg-red-100 text-red-500 flex items-center justify-center text-[10px] mt-0.5">!</div>
                   <p className="text-[11px] text-red-800/80 leading-relaxed">
                      「设备存储空间不足」在本次窗口内保存，缓存可能会被回收。如需不被回收，请下方进行备份操作。
                   </p>
                </div>

                {/* Guide Box */}
                <div className="mt-3 bg-yellow-50 border border-yellow-100 rounded-lg p-3 flex gap-2 relative group cursor-help">
                   <div className="absolute top-2 right-2 text-blue-400 opacity-50"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>
                   <div className="shrink-0 w-4 h-4 text-yellow-500 mt-0.5">💾</div>
                   <div className="text-[11px] text-yellow-800/80 leading-relaxed">
                      <strong className="block mb-0.5 text-yellow-900">下载与保存指南</strong>
                      您可能需要打开「设备存储权限」才能列出缓存，以保证「设备存储权限指南」可用。
                   </div>
                </div>

                {/* Mapping Diagnostics Box */}
                <div className="mt-3 bg-blue-50 border border-blue-100 rounded-lg p-3 flex gap-2 relative">
                   <div className="absolute top-2 right-2 text-blue-400 opacity-50"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>
                   <div className="shrink-0 w-4 h-4 text-blue-500 mt-0.5">⌨️</div>
                   <div className="text-[11px] text-blue-800/80 leading-relaxed">
                      <strong className="block mb-0.5 text-blue-900">键盘映射排查</strong>
                      在存储权限中定义并保存游戏键映射方案。
                   </div>
                </div>
             </div>
             
             {/* Floating Action Buttons */}
             <div className="absolute -right-16 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                <button className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                </button>
                <button className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                   <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                </button>
             </div>
          </div>
       </div>

       {/* Exit Confirmation Modal */}
       {showExitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm transform transition-all scale-100 opacity-100">
                <div className="flex flex-col items-center text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <AlertTriangle className="text-red-600 w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">确认退出游戏</h3>
                    <p className="text-sm text-gray-500 mb-6">您确定要退出游戏吗？未保存的游戏进度将会丢失。</p>
                    <div className="flex gap-3 w-full">
                        <button 
                            onClick={cancelExit}
                            className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                        >
                            继续游戏
                        </button>
                        <button 
                            onClick={confirmExit}
                            className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors shadow-sm"
                        >
                            退出游戏
                        </button>
                    </div>
                </div>
            </div>
        </div>
       )}
    </div>
  );
}
