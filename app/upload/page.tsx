'use client';

import { useState, useCallback } from 'react';
import { Upload, FileUp, Gamepad2, AlertCircle } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import GamePlayer from '@/components/GamePlayer';
import { getCoreFromExtension } from '@/utils/emulatorUtils';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [core, setCore] = useState<string>('nes');
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [romUrl, setRomUrl] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      
      // Auto-detect core based on extension
      const detectedCore = getCoreFromExtension(selectedFile.name);
      if (detectedCore) {
        setCore(detectedCore);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/octet-stream': ['.nes', '.sfc', '.smc', '.gba', '.gb', '.gbc', '.md', '.bin', '.gen', '.n64', '.z64', '.nds'],
      'application/zip': ['.zip'],
      'application/x-zip-compressed': ['.zip']
    },
    maxFiles: 1
  });

  const handleStartGame = () => {
    if (!file) return;
    
    try {
      const url = URL.createObjectURL(file);
      setRomUrl(url);
      setIsPlaying(true);
    } catch (err) {
      console.error(err);
      setError('无法加载文件，请重试');
    }
  };

  const handleReset = () => {
    if (romUrl) {
      URL.revokeObjectURL(romUrl);
    }
    setRomUrl(null);
    setIsPlaying(false);
    setFile(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">上传本地 ROM</h1>
        <p className="text-gray-500">
          直接在浏览器中运行您的游戏文件。文件仅在本地处理，不会上传到服务器。
        </p>
      </div>

      {!isPlaying ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Upload Area */}
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
              isDragActive 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-200 hover:border-orange-300 hover:bg-gray-50'
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center gap-4">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDragActive ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'}`}>
                <Upload size={32} />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700 mb-1">
                  {isDragActive ? '释放文件以添加' : '拖拽文件到此处，或点击选择'}
                </p>
                <p className="text-sm text-gray-400">
                  支持 .nes, .gba, .sfc, .md, .n64, .zip 等格式
                </p>
              </div>
            </div>
          </div>

          {/* File Info & Controls */}
          {file && (
            <div className="mt-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                    <FileUp size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{file.name}</h3>
                    <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      模拟器核心 (Core)
                    </label>
                    <select 
                      value={core} 
                      onChange={(e) => setCore(e.target.value)}
                      className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-white py-2 px-3"
                    >
                      <option value="nes">Nintendo NES (Famicom)</option>
                      <option value="snes">Super Nintendo (SNES)</option>
                      <option value="gba">Game Boy Advance (GBA)</option>
                      <option value="gb">Game Boy (GB/GBC)</option>
                      <option value="segaMD">Sega Genesis (Mega Drive)</option>
                      <option value="n64">Nintendo 64</option>
                      <option value="nds">Nintendo DS</option>
                      <option value="psx">PlayStation 1</option>
                      <option value="arcade">Arcade (MAME 2003)</option>
                    </select>
                    <p className="text-xs text-gray-400 mt-1">如果不确定，通常系统会自动选择正确的核心。</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3">
                 <button 
                    onClick={() => setFile(null)}
                    className="px-6 py-2.5 rounded-lg border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                  >
                    取消
                  </button>
                  <button 
                    onClick={handleStartGame}
                    className="px-8 py-2.5 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 shadow-lg shadow-orange-200 transition-all flex items-center gap-2"
                  >
                    <Gamepad2 size={20} />
                    开始游戏
                  </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-lg flex items-center gap-2 border border-red-100">
              <AlertCircle size={20} />
              {error}
            </div>
          )}
        </div>
      ) : (
        <div className="animate-in fade-in zoom-in-95 duration-300">
           <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                 <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md text-sm">{core.toUpperCase()}</span>
                 {file?.name}
              </h2>
              <button 
                onClick={handleReset}
                className="text-sm text-gray-500 hover:text-red-600 flex items-center gap-1 px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
              >
                结束游戏
              </button>
           </div>
           
           <div className="bg-[#1a1b26] rounded-xl overflow-hidden shadow-2xl relative aspect-[4/3] flex items-center justify-center group w-full border-4 border-[#1a1b2e]">
               {romUrl && <GamePlayer romUrl={romUrl} core={core} />}
           </div>

           <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3">
              <div className="text-blue-500 mt-0.5">
                <AlertCircle size={20} />
              </div>
              <div className="text-sm text-blue-800">
                <strong className="block mb-1 font-medium">关于存档</strong>
                本地上传的游戏存档通常保存在浏览器的临时存储中。如果在清理浏览器缓存后存档丢失，请务必在游戏内手动导出存档文件（.state 或 .srm）到本地电脑备份。
              </div>
           </div>
        </div>
      )}
    </div>
  );
}