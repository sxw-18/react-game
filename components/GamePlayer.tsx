'use client';

import { useEffect, useRef, useState } from 'react';
import { Game } from '@/data/types';
import { Loader2 } from 'lucide-react';

declare global {
  interface Window {
    EJS_player: string;
    EJS_gameName: string;
    EJS_gameUrl: string;
    EJS_core: string;
    EJS_pathtodata: string;
    EJS_startOnLoaded: boolean;
    EJS_disableDatabases: boolean;
    EJS_language: string;
    EJS_emulator: any;
    EJS_onLoad: () => void;
    EJS_onGameStart: () => void;
  }
}

interface GamePlayerProps {
  game: Game;
}

export default function GamePlayer({ game }: GamePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isUnmounted = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    isUnmounted.current = false;
    setIsLoading(true);
    
    // Cleanup any existing emulator instance before starting a new one
    if (window.EJS_emulator) {
        try {
            console.log('Cleaning up existing emulator before mount...');
            window.EJS_emulator.callEvent("exit");
            window.EJS_emulator = null;
        } catch (e) {
            console.warn('Error cleanup existing emulator:', e);
        }
    }

    // Define the global EJS variables
    window.EJS_player = '#game';
    window.EJS_gameName = game.id;
    window.EJS_gameUrl = `/roms/${game.rom}`;
    window.EJS_core = game.core || 'nes';
    window.EJS_pathtodata = 'https://static.8bgame.top/data/';
    window.EJS_startOnLoaded = true;
    window.EJS_disableDatabases = true;
    window.EJS_language = "zh-CN";
    
    const handleReady = () => {
        if (!isUnmounted.current) {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
    };

    // Hook into EJS ready event to handle race conditions
    const originalOnLoad = window.EJS_onLoad;
    window.EJS_onLoad = () => {
        if (isUnmounted.current && window.EJS_emulator) {
            console.log('Emulator loaded after unmount, destroying immediately...');
            window.EJS_emulator.callEvent("exit");
            window.EJS_emulator = null;
        } else {
            console.log('EJS_onLoad fired');
            handleReady();
        }
        if (originalOnLoad) originalOnLoad();
    };

    // Also hook into onGameStart if available
    const originalOnGameStart = (window as any).EJS_onGameStart;
    (window as any).EJS_onGameStart = () => {
        console.log('EJS_onGameStart fired');
        handleReady();
        if (originalOnGameStart) originalOnGameStart();
    };

    const script = document.createElement('script');
    script.src = 'https://static.8bgame.top/data/loader.js';
    script.async = true;
    
    script.onload = () => {
        console.log('EmulatorJS loader loaded');
        // Fallback: if no events fire within 8 seconds, force remove loader
        // This handles cases where EJS_onLoad might be missed or not called
        setTimeout(() => {
            if (!isUnmounted.current) {
                console.log('Force removing loader due to timeout');
                setIsLoading(false);
            }
        }, 8000);
    };

    document.body.appendChild(script);

    return () => {
      isUnmounted.current = true;
      
      // Cleanup logic: Stop the emulator
      if (window.EJS_emulator) {
          try {
              console.log('Stopping emulator...');
              window.EJS_emulator.callEvent("exit");
              // Force destroy global reference
              window.EJS_emulator = null;
          } catch (e) {
              console.warn('Error stopping emulator:', e);
          }
      }
      
      // Remove the script tag
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      
      // Clean up container content to ensure canvas is removed
      if (containerRef.current) {
          containerRef.current.innerHTML = '<div id="game" class="w-full h-full"></div>';
      }
    };
  }, [game]);

  return (
    <div className="w-full aspect-[4/3] max-h-[80vh] bg-black rounded-lg overflow-hidden shadow-2xl relative mx-auto" ref={containerRef}>
      {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#1a1b2e] text-white">
              <div className="flex flex-col items-center gap-3">
                  <div className="relative">
                      <div className="w-12 h-12 rounded-full border-4 border-white/10 border-t-purple-500 animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                          <Loader2 className="w-6 h-6 text-purple-500 animate-pulse" />
                      </div>
                  </div>
                  <p className="text-sm font-medium text-gray-300 animate-pulse">正在启动模拟器...</p>
              </div>
          </div>
      )}
      <div id="game" className="w-full h-full"></div>
    </div>
  );
}
