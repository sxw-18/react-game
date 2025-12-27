'use client';

import { useEffect, useRef } from 'react';
import { Game } from '@/data/types';

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
  }
}

interface GamePlayerProps {
  game: Game;
}

export default function GamePlayer({ game }: GamePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isUnmounted = useRef(false);

  useEffect(() => {
    isUnmounted.current = false;
    
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
    
    // Hook into EJS ready event to handle race conditions
    // We define this before loading the script
    const originalOnLoad = (window as any).EJS_onLoad;
    (window as any).EJS_onLoad = () => {
        if (isUnmounted.current && window.EJS_emulator) {
            console.log('Emulator loaded after unmount, destroying immediately...');
            window.EJS_emulator.callEvent("exit");
            window.EJS_emulator = null;
        }
        if (originalOnLoad) originalOnLoad();
    };

    const script = document.createElement('script');
    script.src = 'https://static.8bgame.top/data/loader.js';
    script.async = true;
    
    script.onload = () => {
        console.log('EmulatorJS loader loaded');
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
      <div id="game" className="w-full h-full"></div>
    </div>
  );
}
