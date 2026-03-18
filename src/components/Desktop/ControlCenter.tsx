'use client';

import { useSystemStore } from '@/store/system';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Bluetooth, Airplay, Moon, Sun, Volume2 } from 'lucide-react';

import { useState } from 'react';

export default function ControlCenter() {
  const isOpen = useSystemStore((state) => state.isControlCenterOpen);
  const [brightness, setBrightness] = useState(85);
  const [sound, setSound] = useState(65);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.95 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="absolute top-9 right-4 w-[320px] rounded-[18px] p-2.5 flex flex-col gap-2.5 shadow-2xl z-[200] select-none"
          style={{ 
            backdropFilter: 'blur(40px) saturate(200%)', 
            background: 'rgba(255, 255, 255, 0.3)',
            border: '0.5px solid rgba(255, 255, 255, 0.2)' 
          }}
        >
          {/* Upper Section Grid */}
          <div className="grid grid-cols-2 gap-2.5 h-[150px]">
            {/* Left Panel: Connectivity */}
            <div className="bg-white/10 rounded-2xl p-3 flex flex-col gap-3.5 border border-white/5 shadow-sm">
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-7 h-7 rounded-[24px] bg-blue-500 text-white flex items-center justify-center shadow-md group-active:scale-95 transition-transform">
                  <Wifi size={14} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-[13px] leading-tight">Wi-Fi</span>
                  <span className="text-[10px] text-white/50 leading-tight">Home Network</span>
                </div>
              </div>
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-7 h-7 rounded-[24px] bg-blue-500 text-white flex items-center justify-center shadow-md group-active:scale-95 transition-transform">
                  <Bluetooth size={14} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-[13px] leading-tight">Bluetooth</span>
                  <span className="text-[10px] text-white/50 leading-tight">On</span>
                </div>
              </div>
              <div className="flex items-center gap-3 group cursor-pointer">
                <div className="w-7 h-7 rounded-[24px] bg-blue-500 text-white flex items-center justify-center shadow-md group-active:scale-95 transition-transform">
                  <Airplay size={14} strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-[13px] leading-tight">AirDrop</span>
                  <span className="text-[10px] text-white/50 leading-tight">Contacts Only</span>
                </div>
              </div>
            </div>

            {/* Right Panel: Focus & Keyboard */}
            <div className="flex flex-col gap-2.5">
              <div className="flex-1 bg-white/10 rounded-2xl flex items-center gap-3 px-3 border border-white/5 cursor-pointer hover:bg-white/20 transition-all active:scale-95 shadow-sm">
                <div className="w-7 h-7 rounded-[24px] bg-purple-500/80 text-white flex items-center justify-center shadow-sm">
                  <Moon size={14} fill="currentColor" />
                </div>
                <span className="font-semibold text-[13px]">Focus</span>
              </div>
              <div className="flex-1 bg-white/10 rounded-2xl flex flex-col items-center justify-center p-2 border border-white/5 cursor-pointer hover:bg-white/20 shadow-sm">
                 <Sun size={14} className="text-white/80 mb-1" />
                 <span className="text-[10px] text-white/60 font-medium text-center leading-none">Keyboard Brightness</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 rounded-2xl p-3 flex flex-col gap-4 border border-white/5 shadow-sm">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold text-white/80 pl-1 uppercase tracking-wider">Display</span>
              <div className="relative h-6 flex items-center group">
                <div className="absolute left-2 z-10 pointer-events-none">
                  <Sun size={12} className="text-black/40" />
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={brightness}
                  onChange={(e) => setBrightness(parseInt(e.target.value))}
                  className="macos-slider w-full h-6 appearance-none bg-black/20 rounded-[24px] overflow-hidden cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgba(255, 255, 255, 0.9) ${brightness}%, rgba(0, 0, 0, 0.2) ${brightness}%)`
                  }}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-semibold text-white/80 pl-1 uppercase tracking-wider">Sound</span>
              <div className="relative h-6 flex items-center group">
                <div className="absolute left-2 z-10 pointer-events-none">
                  <Volume2 size={12} className="text-black/40" />
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={sound}
                  onChange={(e) => setSound(parseInt(e.target.value))}
                  className="macos-slider w-full h-6 appearance-none bg-black/20 rounded-[24px] overflow-hidden cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgba(255, 255, 255, 0.9) ${sound}%, rgba(0, 0, 0, 0.2) ${sound}%)`
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
