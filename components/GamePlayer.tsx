'use client';

import { useEffect, useState } from 'react';
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
  
  // 监听来自 iframe 的消息，判断模拟器是否加载完成
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // 确保消息来自我们信任的源（如果是同源 iframe，通常没问题）
      if (event.data === 'EJS_onLoad' || event.data === 'EJS_onGameStart') {
        setIsLoading(false);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // 计算有效的 ROM URL
  const effectiveRomUrl = romUrl || (game ? (game.rom.startsWith('http') ? game.rom : `${emulatorConfig.romBasePath}${game.rom}`) : '');
  
  // 自动检测核心
  let detectedCore = 'nes';
  if (effectiveRomUrl) {
      detectedCore = getCoreFromExtension(effectiveRomUrl) || 'nes';
  }
  const effectiveCore = core || (game?.core) || detectedCore;

  if (!effectiveRomUrl) {
      return <div className="flex items-center justify-center h-full text-white bg-black">No ROM URL provided</div>;
  }

  // 构建 iframe 内部的 HTML
  // 使用 srcDoc 可以避免跨域问题，并且能直接注入配置
  const iframeHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body, html { margin: 0; padding: 0; width: 100%; height: 100%; background-color: black; overflow: hidden; }
          #game { width: 100%; height: 100%; }
        </style>
      </head>
      <body>
        <div id="game"></div>
        <script>
          // 配置 EmulatorJS 全局变量
          window.EJS_player = '#game';
          window.EJS_gameName = ${JSON.stringify(game ? game.id : 'local-game')};
          window.EJS_gameUrl = ${JSON.stringify(effectiveRomUrl)};
          window.EJS_core = ${JSON.stringify(effectiveCore)};
          window.EJS_pathtodata = ${JSON.stringify(emulatorConfig.basePath)};
          window.EJS_startOnLoaded = true;
          window.EJS_disableDatabases = false;
          window.EJS_language = "zh-CN";
          
          // 回调函数：通知父窗口加载状态
          window.EJS_onLoad = function() {
            window.parent.postMessage('EJS_onLoad', '*');
            
            // 尝试聚焦
            setTimeout(function() {
                var gameContainer = document.getElementById('game');
                if (gameContainer) {
                    gameContainer.focus();
                    var canvas = gameContainer.querySelector('canvas');
                    if (canvas) canvas.focus();
                }
            }, 500);
          };
          
          window.EJS_onGameStart = function() {
            window.parent.postMessage('EJS_onGameStart', '*');
          };
        </script>
        <!-- 加载 EmulatorJS 核心脚本 -->
        <script src="${emulatorConfig.loaderPath}"></script>
      </body>
    </html>
  `;

  return (
    <div className="w-full h-full md:aspect-[4/3] md:h-auto md:max-h-[80vh] bg-black rounded-lg overflow-hidden shadow-2xl relative mx-auto">
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#1a1b2e] text-white">
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
        srcDoc={iframeHtml}
        className="w-full h-full border-none block"
        allow="autoplay; fullscreen; gamepad; clipboard-read; clipboard-write"
        title="Emulator"
      />
    </div>
  );
}
