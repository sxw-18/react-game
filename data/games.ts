import { Game } from './types';

export const games: Game[] = [
  {
    id: "kof97",
    title: "拳皇97",
    description: "经典的格斗游戏巅峰之作，集结了草薙京、八神庵等众多人气角色，体验热血沸腾的街机对战快感。",
    platform: "街机 Arcade",
    genre: "格斗",
    year: "1997",
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=The%20King%20of%20Fighters%2097%20game%20cover%20art%20retro%20arcade%20style&image_size=square_hd",
    rom: "kof97.zip",
    core: "fbalpha2012_neogeo"
  },
  {
    id: "cadillacs",
    title: "恐龙快打",
    description: "改编自经典漫画，驾驶凯迪拉克在恐龙世界中冒险，爽快的打击感和丰富的武器系统让人欲罢不能。",
    platform: "街机 Arcade",
    genre: "动作",
    year: "1993",
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Cadillacs%20and%20Dinosaurs%20arcade%20game%20cover%20art&image_size=square_hd",
    rom: "dino.zip",
    core: "fbalpha2012_cps1"
  },
  {
    id: "dragonball_adventure",
    title: "龙珠大冒险",
    description: "完美还原龙珠早期剧情，从小悟空踏上冒险旅程开始，体验精彩的横版动作闯关。",
    platform: "GBA掌机",
    genre: "动作",
    year: "2004",
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Dragon%20Ball%20Advanced%20Adventure%20GBA%20game%20cover&image_size=square_hd",
    rom: "dragonball_adventure.gba",
    core: "gba"
  },
  {
    id: "tmnt",
    title: "忍者神龟",
    description: "控制四只身怀绝技的忍者神龟，与邪恶势力战斗，守护城市的和平。经典的横版清关动作游戏。",
    platform: "红白机FC",
    genre: "动作",
    year: "1989",
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Teenage%20Mutant%20Ninja%20Turtles%20NES%20game%20cover&image_size=square_hd",
    rom: "tmnt.nes",
    core: "nes"
  },
  {
    id: "contra",
    title: "魂斗罗1",
    description: "射击游戏的里程碑之作，上上下下左右左右BA，与比尔和兰斯一起粉碎外星人的阴谋。",
    platform: "红白机FC",
    genre: "射击",
    year: "1988",
    image: "https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=Contra%20NES%20game%20cover&image_size=square_hd",
    rom: "contra.nes",
    core: "nes"
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
