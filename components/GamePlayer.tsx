'use client';

import { useEffect, useRef, useState } from 'react';
import { Game } from '@/data/types';
import { emulatorConfig } from '@/data/config';
import { getCoreFromExtension } from '@/utils/emulatorUtils';
import { Loader2 } from 'lucide-react';

// 确保 Window 接口包含 EmulatorJS 的回调函数和类
    declare global {
      interface Window {
        EJS_onLoad?: () => void;
        EJS_onGameStart?: () => void;
        EJS_defaultControls?: any;
        EmulatorJS: any;
        EJS_player: string;
        EJS_gameName: string;
        EJS_gameUrl: string;
        EJS_core: string;
        EJS_pathtodata: string;
        EJS_startOnLoaded: boolean;
        EJS_disableDatabases: boolean;
        EJS_language: string;
        EJS_Buttons?: {
            [key: string]: any;
            netplay?: boolean | undefined;
        };
        EJS_biosUrl?: string;
        EJS_color?: string;
        EJS_AdUrl?: string;
        EJS_AdMode?: any;
        EJS_AdTimer?: any;
        EJS_AdSize?: any;
        EJS_alignStartButton?: string;
        EJS_VirtualGamepadSettings?: any;
        EJS_volume?: number;
        EJS_fullscreenOnLoaded?: boolean;
        EJS_paths?: any;
        EJS_loadStateURL?: string;
        EJS_emulator?: any;
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
      const effectiveRomUrl = romUrl || (game ? (game.rom.startsWith('http') ? game.rom : `${emulatorConfig.romBasePath}${game.rom}`) : '');
      
      // 自动检测核心
      let detectedCore = 'nes';
      if (effectiveRomUrl) {
          detectedCore = getCoreFromExtension(effectiveRomUrl) || 'nes';
      }
      const effectiveCore = core || (game?.core) || detectedCore;
    
      useEffect(() => {
        if (!effectiveRomUrl) return;
    
        // 如果已有实例，尝试清理 DOM
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
    
        // 检查 EmulatorJS 是否已经加载
        if (typeof window.EmulatorJS !== 'undefined') {
            console.log('EmulatorJS already loaded, manually initializing...');
            // 如果已加载，手动初始化
            const config: any = {};
            config.gameUrl = window.EJS_gameUrl;
            config.dataPath = window.EJS_pathtodata;
            config.system = window.EJS_core;
            config.biosUrl = window.EJS_biosUrl;
            config.gameName = window.EJS_gameName;
            config.color = window.EJS_color;
            config.adUrl = window.EJS_AdUrl;
            config.adMode = window.EJS_AdMode;
            config.adTimer = window.EJS_AdTimer;
            config.adSize = window.EJS_AdSize;
            config.alignStartButton = window.EJS_alignStartButton;
            config.VirtualGamepadSettings = window.EJS_VirtualGamepadSettings;
            config.buttonOpts = window.EJS_Buttons;
            config.volume = window.EJS_volume;
            config.defaultControllers = window.EJS_defaultControls;
            config.startOnLoad = window.EJS_startOnLoaded;
            config.fullscreenOnLoad = window.EJS_fullscreenOnLoaded;
            config.filePaths = window.EJS_paths;
            config.loadState = window.EJS_loadStateURL;
            
            try {
                window.EJS_emulator = new window.EmulatorJS(window.EJS_player, config);
                window.EJS_emulator.checkSupportedOpts();
            } catch (e) {
                console.error('Failed to manually initialize EmulatorJS:', e);
            }
        } else {
            // 只有在未加载时才加载 loader.js
            // 并且检查是否已经存在 script 标签（避免重复添加）
            if (!document.getElementById('emulator-script')) {
                console.log('Loading loader.js...');
                const script = document.createElement('script');
                script.src = emulatorConfig.loaderPath;
                script.id = 'emulator-script';
                script.async = true;
                document.body.appendChild(script);
            } else {
                console.log('loader.js script tag exists but EmulatorJS not defined. Waiting for load...');
                // 这里可能需要一个轮询机制，或者什么都不做等待 script onload
                // 由于 loader.js 是 async 的，它加载完会自动执行初始化
            }
        }
    
        // 清理函数
        return () => {
          // 不再移除 loader.js 脚本，因为这会导致 EmulatorJS 代码被重复加载引起冲突
          // const scriptToRemove = document.getElementById('emulator-script');
          // if (scriptToRemove) {
          //   scriptToRemove.remove();
          // }
          
          // 清理全局回调
          delete (window as any).EJS_onLoad;
          delete (window as any).EJS_onGameStart;
          
          // 尝试停止旧的模拟器实例（如果存在）
          // EmulatorJS 没有公开的 destroy 方法，但清理 DOM 可能会触发一些垃圾回收
          // 注意：不能 delete window.EJS_emulator，因为 loader.js 可能会重用它或者我们需要它来检测状态
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
