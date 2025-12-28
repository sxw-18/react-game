'use client';

import { useEffect, useRef, useState } from 'react';
import { Game } from '@/data/types';
import { emulatorConfig } from '@/data/config';
import { getCoreFromExtension } from '@/utils/emulatorUtils';
import { Loader2 } from 'lucide-react';

// 确保 Window 接口包含 EmulatorJS 的回调函数
declare global {
  interface Window {
    EJS_onLoad?: () => void;
    EJS_onGameStart?: () => void;
    EJS_defaultControls?: any;
  }
}

interface GamePlayerProps {
  game?: Game;
  romUrl?: string;
  core?: string;
}

export default function GamePlayer({ game, romUrl, core }: GamePlayerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  
  // 计算有效的 ROM URL
  const effectiveRomUrl = romUrl || (game ? (game.rom.startsWith('http') ? game.rom : `/api/roms/${game.rom}`) : '');
  
  // 自动检测核心
  let detectedCore = 'nes';
  if (effectiveRomUrl) {
      detectedCore = getCoreFromExtension(effectiveRomUrl) || 'nes';
  }
  const effectiveCore = core || (game?.core) || detectedCore;

  useEffect(() => {
    if (!effectiveRomUrl) return;

    // 清理之前的脚本和配置（如果存在）
    const existingScript = document.getElementById('emulator-script');
    if (existingScript) {
      existingScript.remove();
    }
    
    // 如果已有实例，尝试清理（EmulatorJS 没有标准的销毁方法，这里只能清理 DOM）
    if (gameContainerRef.current) {
        gameContainerRef.current.innerHTML = '';
    }

    // 设置全局变量
    window.EJS_player = '#game';
    window.EJS_gameName = game ? game.id : 'local-game';
    window.EJS_gameUrl = effectiveRomUrl;
    window.EJS_core = effectiveCore;
    window.EJS_pathtodata = emulatorConfig.basePath;
    window.EJS_startOnLoaded = true;
    window.EJS_disableDatabases = false;
    window.EJS_language = "zh-CN";
    
    // 初始化按钮配置对象 (保留默认值，仅按需覆盖)
    window.EJS_Buttons = window.EJS_Buttons || {};
    // 如果需要开启 Netplay，可以在这里设置: window.EJS_Buttons.netplay = true;

    // 设置回调
    window.EJS_onLoad = function() {
      setIsLoading(false);
      // 尝试聚焦
      setTimeout(function() {
          const gameContainer = document.getElementById('game');
          if (gameContainer) {
              gameContainer.focus();
              const canvas = gameContainer.querySelector('canvas');
              if (canvas) canvas.focus();
          }
      }, 500);
    };
    
    window.EJS_onGameStart = function() {
      setIsLoading(false);
      // 游戏开始时再次聚焦
      setTimeout(function() {
          const gameContainer = document.getElementById('game');
          if (gameContainer) {
              gameContainer.focus();
              const canvas = gameContainer.querySelector('canvas');
              if (canvas) canvas.focus();
          }
      }, 100);
    };

    // 动态加载 loader.js
    const script = document.createElement('script');
    script.src = emulatorConfig.loaderPath;
    script.id = 'emulator-script';
    script.async = true;
    document.body.appendChild(script);

    // 清理函数
    return () => {
      // 移除脚本
      const scriptToRemove = document.getElementById('emulator-script');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
      
      // 清理全局回调，防止内存泄漏或报错
      delete (window as any).EJS_onLoad;
      delete (window as any).EJS_onGameStart;
      // 注意：不能轻易 delete 其他 EJS_ 变量，因为模拟器运行可能还需要它们，
      // 但在卸载组件时，我们通常希望停止一切。
      // 理想情况下应该调用模拟器的销毁方法，但这里只能做 DOM 和 Script 的清理。
    };
  }, [effectiveRomUrl, effectiveCore, game]);

  if (!effectiveRomUrl) {
      return <div className="flex items-center justify-center h-full text-white bg-black">No ROM URL provided</div>;
  }

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
      {/* 
        EmulatorJS 需要一个 ID 为 "game" 的元素 (由 EJS_player 指定)
        我们添加 tabIndex="0" 使其可聚焦，以接收键盘事件
      */}
      <div 
        id="game" 
        ref={gameContainerRef}
        className="w-full h-full outline-none" 
        tabIndex={0}
      ></div>
    </div>
  );
}
