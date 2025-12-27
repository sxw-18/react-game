import { Game } from './types';

export const games: Game[] = [
  {
    id: 'kof97',
    title: '拳皇97',
    platform: '街机 Arcade',
    year: '1997',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=The%20King%20of%20Fighters%2097%20game%20cover%20art%20retro%20arcade%20style&image_size=square_hd',
    rom: 'kof97.zip',
    core: 'fbneo'
  },
  {
    id: 'cadillacs',
    title: '恐龙快打',
    platform: '街机 Arcade',
    year: '1993',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Cadillacs%20and%20Dinosaurs%20arcade%20game%20cover%20art&image_size=square_hd',
    rom: 'dino.zip',
    core: 'fbalpha2012_cps1'
  },
  {
    id: 'dragonball_adventure',
    title: '龙珠大冒险',
    platform: 'GBA掌机',
    year: '2004',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Dragon%20Ball%20Advanced%20Adventure%20GBA%20game%20cover&image_size=square_hd',
    rom: 'DragonBall.gba', 
    core: 'gba'
  },
  {
    id: 'tmnt',
    title: '忍者神龟',
    platform: '红白机FC',
    year: '1989',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Teenage%20Mutant%20Ninja%20Turtles%20NES%20game%20cover&image_size=square_hd',
    rom: 'TMNT.nes',
    core: 'nes'
  },
  {
    id: 'contra',
    title: '魂斗罗1',
    platform: '红白机FC',
    year: '1988',
    image: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Contra%20NES%20game%20cover&image_size=square_hd',
    rom: 'Contra.nes',
    core: 'nes'
  }
];

/*
 * 核心 (core) 对照表参考：
 * Nintendo Entertainment System (FC/NES) -> 'nes'
 * Super Nintendo (SFC/SNES) -> 'snes'
 * Game Boy -> 'gb'
 * Game Boy Color -> 'gbc'
 * Game Boy Advance -> 'gba'
 * Nintendo 64 -> 'n64'
 * Sega Mega Drive / Genesis -> 'segaMD'
 * PlayStation -> 'psx'
 * Arcade (街机) -> 'fbalpha2012_neogeo' (对于 NeoGeo 游戏) 或 'mame2003'
 * 
 * ROM 存放位置：
 * 请将游戏 ROM 文件（.zip, .nes, .smc, .gba 等）直接放入 `web/public/roms/` 目录中。
 * `rom` 字段填写该目录下的文件名。
 */
