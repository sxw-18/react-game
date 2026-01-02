import { NextRequest } from 'next/server';
import { emulatorConfig } from '@/data/config';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const romUrl = searchParams.get('rom');
  const core = searchParams.get('core');
  const gameId = searchParams.get('gameId') || 'local-game';

  if (!romUrl || !core) {
    return new Response('Missing rom or core parameters', { status: 400 });
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body, html { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; background-color: #000; }
        #game { width: 100%; height: 100%; }
      </style>
    </head>
    <body>
      <div id="game"></div>
      <script>
        window.EJS_player = '#game';
        window.EJS_gameName = '${gameId}';
        window.EJS_gameUrl = '${romUrl}';
        window.EJS_core = '${core}';
        window.EJS_pathtodata = '${emulatorConfig.basePath}';
        window.EJS_startOnLoaded = true;
        window.EJS_disableDatabases = false;
        window.EJS_language = "zh-CN";
        window.EJS_Buttons = {};
        
        window.EJS_onLoad = function() {
          window.parent.postMessage({ type: 'EJS_onLoad' }, '*');
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
          window.parent.postMessage({ type: 'EJS_onGameStart' }, '*');
           setTimeout(function() {
            const gameContainer = document.getElementById('game');
            if (gameContainer) {
                gameContainer.focus();
                const canvas = gameContainer.querySelector('canvas');
                if (canvas) canvas.focus();
            }
          }, 100);
        };
      </script>
      <script src="${emulatorConfig.loaderPath}" crossorigin="anonymous"></script>
    </body>
    </html>
  `;

  return new Response(htmlContent, {
    headers: {
      'Content-Type': 'text/html',
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  });
}
