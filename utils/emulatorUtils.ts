
/**
 * 根据文件名后缀自动检测 EmulatorJS 核心
 * 参考官方实现：https://github.com/EmulatorJS/EmulatorJS/blob/main/index.html
 * @param filename 文件名或 URL
 * @returns 核心名称 (例如 'nes', 'gba') 或 null
 */
export const getCoreFromExtension = (filename: string): string | null => {
  if (!filename) return null;

  // 移除 URL 可能包含的参数 (例如 game.nes?token=123)
  const cleanFilename = filename.split('?')[0].split('#')[0];
  const extension = cleanFilename.split('.').pop()?.toLowerCase();

  if (!extension) return null;

  // 1. 精确匹配
  if (["fds", "nes", "unif", "unf"].includes(extension)) return "nes";
  if (["smc", "fig", "sfc", "gd3", "gd7", "dx2", "bsx", "swc"].includes(extension)) return "snes";
  if (["z64", "n64"].includes(extension)) return "n64";
  if (["pce"].includes(extension)) return "pce";
  if (["ngp", "ngc"].includes(extension)) return "ngp";
  if (["ws", "wsc"].includes(extension)) return "ws";
  if (["col", "cv"].includes(extension)) return "coleco";
  if (["d64"].includes(extension)) return "vice_x64sc";
  if (["nds", "gba", "gb"].includes(extension)) return extension;

  // 2. 映射表 (用于其他情况或别名)
  const coreMap: Record<string, string> = {
    // Sega
    'md': 'segaMD',
    'bin': 'segaMD',
    'gen': 'segaMD',
    'smd': 'segaMD',
    'sms': 'segaMS',
    'gg': 'segaGG',
    'sg': 'segaMS',
    '32x': 'sega32x',
    
    // PlayStation
    'psx': 'psx',
    'iso': 'psx',
    'cue': 'psx',
    'pbp': 'psx',
    'chd': 'psx', // CHD 压缩格式常用于 PSX

    // Arcade
    'zip': 'arcade', // 官方 demo 中通常 zip 默认为 arcade 或者需要用户选择，这里为了方便设为 arcade
    '7z': 'arcade',
    
    // Others
    'vb': 'vb',
    'lnx': 'lynx',
    'j64': 'jaguar',
    'a78': 'atari7800',
    'a26': 'atari2600',
  };

  return coreMap[extension] || null;
};
