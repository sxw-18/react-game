'use client';

import { useEffect, useRef } from 'react';
import { Game } from '@/data/types';

interface GamePlayerProps {
  game: Game;
}

export default function GamePlayer({ game }: GamePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    
    // Define the global EJS variables
    window.EJS_player = '#game';
    window.EJS_gameName = game.id;
    window.EJS_gameUrl = `/roms/${game.rom}`;
    window.EJS_core = game.core || 'nes'; // Default or from game data
    window.EJS_pathtodata = 'https://static.8bgame.top/data/';
    window.EJS_startOnLoaded = true;
    window.EJS_disableDatabases = true;
    window.EJS_language = "zh-CN";

    const script = document.createElement('script');
    script.src = 'https://static.8bgame.top/data/loader.js';
    script.async = true;
    
    script.onload = () => {
        console.log('EmulatorJS loader loaded');
        scriptLoaded.current = true;
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup logic if needed
      // Ideally we should destroy the emulator instance but EJS doesn't expose a clean destroy method easily
    };
  }, [game]);

  return (
    <div className="w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl relative" ref={containerRef}>
      <div id="game" className="w-full h-full"></div>
    </div>
  );
}
