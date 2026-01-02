'use client';

import { useEffect, useRef, useState } from 'react';
import { Game } from '@/data/types';
import { emulatorConfig } from '@/data/config';
import { getCoreFromExtension } from '@/utils/emulatorUtils';
import { Loader2 } from 'lucide-react';

interface GamePlayerProps {
  game?: Game;
  romUrl?: string;
  core?: string;
}

export default function GamePlayer({ game, romUrl, core }: GamePlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const gameContainerRef = useRef<HTMLIFrameElement>(null);

  // 计算有效的 ROM URL
  const isAbsoluteUrl = (url: string) => /^https?:\/\/|^\/\//i.test(url);
  const effectiveRomUrl = romUrl || (game ? (isAbsoluteUrl(game.rom) ? game.rom : `${emulatorConfig.romBasePath}${game.rom}`) : '');

  // 自动检测核心
  let detectedCore = 'nes';
  if (effectiveRomUrl) {
    detectedCore = getCoreFromExtension(effectiveRomUrl) || 'nes';
  }
  const effectiveCore = core || (game?.core) || detectedCore;

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'EJS_onLoad') {
        setIsLoading(false);
        // Focus the iframe when loaded
        if (gameContainerRef.current) {
          gameContainerRef.current.focus();
        }
      } else if (event.data?.type === 'EJS_onGameStart') {
        setIsLoading(false);
        if (gameContainerRef.current) {
          gameContainerRef.current.focus();
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  if (!effectiveRomUrl) {
    return <div className="flex items-center justify-center h-full text-white bg-black">No ROM URL provided</div>;
  }

  const iframeSrc = `/emulator?rom=${encodeURIComponent(effectiveRomUrl)}&core=${effectiveCore}&gameId=${game ? game.id : 'local-game'}`;

  return (
    <div className="w-full h-full md:aspect-[4/3] md:h-auto md:max-h-[80vh] bg-black rounded-lg overflow-hidden shadow-2xl relative mx-auto">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#1a1b2e] text-white pointer-events-none">
          <div className="relative mb-4">
            <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-purple-500 animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-purple-500 animate-pulse" />
            </div>
          </div>
          <p className="text-sm font-medium text-gray-300 animate-pulse">正在启动模拟器...</p>
        </div>
      )}
      <iframe
        ref={gameContainerRef}
        src={iframeSrc}
        className="w-full h-full border-none outline-none"
        title="Game Emulator"
        allow="autoplay; fullscreen; gamepad"
      />
    </div>
  );
}
