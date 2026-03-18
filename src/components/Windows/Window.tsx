'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useSystemStore } from '@/store/system';
import { useWindowStore, AppWindow } from '@/store/useWindowStore';

interface WindowProps {
  app: AppWindow;
  isActive: boolean;
  children: React.ReactNode;
}

export default function Window({ app, isActive, children }: WindowProps) {
  const { focusApp } = useSystemStore();
  const { closeWindow, minimizeWindow, toggleMaximize } = useWindowStore();

  const handleTrafficLight = (e: React.MouseEvent, action: 'close' | 'minimize' | 'maximize') => {
    e.stopPropagation();
    if (action === 'close') closeWindow(app.id);
    if (action === 'minimize') minimizeWindow(app.id);
    if (action === 'maximize') toggleMaximize(app.id);
  };

  return (
    <AnimatePresence>
      {!app.isMinimized && (
        <motion.div
          layoutId={`window-${app.id}`}
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ 
            opacity: 1, 
            scale: 1, 
            y: 0,
            width: app.isMaximized ? '100vw' : 800,
            height: app.isMaximized ? 'calc(100vh - 28px)' : 600, // subtract menubar
            top: app.isMaximized ? 28 : 100, // under menubar
            left: app.isMaximized ? 0 : 'auto',
          }}
          exit={{ opacity: 0, scale: 0.5, y: 500 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          style={{ zIndex: isActive ? 40 : 10 }}
          drag={!app.isMaximized}
          dragMomentum={false}
          onMouseDown={() => focusApp(app.id)}
          className="absolute shadow-2xl rounded-xl overflow-hidden pointer-events-auto bg-white/70 backdrop-blur-3xl border border-white/20 flex flex-col will-change-transform"
        >
          {/* Title Bar */}
          <div className="h-10 shrink-0 w-full flex items-center justify-between px-4 bg-gradient-to-b from-white/50 to-white/10 select-none">
            <div 
              className="flex items-center gap-2 w-20"
              onPointerDown={(e) => e.stopPropagation()}
            >
              <button 
                onPointerDown={(e) => handleTrafficLight(e, 'close')}
                className="w-3 h-3 rounded-[24px] bg-[#FF5F56] border border-black/10 hover:brightness-110 flex items-center justify-center group"
              >
                <span className="opacity-0 group-hover:opacity-100 text-black/50 text-[8px] leading-none mb-0.5">x</span>
              </button>
              <button 
                onPointerDown={(e) => handleTrafficLight(e, 'minimize')}
                className="w-3 h-3 rounded-[24px] bg-[#FFBD2E] border border-black/10 hover:brightness-110 flex items-center justify-center group"
              >
                <span className="opacity-0 group-hover:opacity-100 text-black/50 text-[8px] leading-none mb-0.5">-</span>
              </button>
              <button 
                onPointerDown={(e) => handleTrafficLight(e, 'maximize')}
                className="w-3 h-3 rounded-[24px] bg-[#27C93F] border border-black/10 hover:brightness-110 flex items-center justify-center group"
              >
                <span className="opacity-0 group-hover:opacity-100 text-black/50 text-[6px] leading-none">↗</span>
              </button>
            </div>
            <div className="font-semibold text-[13px] text-gray-800 tracking-wide">{app.title}</div>
            <div className="w-20" /> {/* Spacer for centering */}
          </div>

          {/* Body */}
          <div className="flex-1 w-full bg-white/50 overflow-hidden">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
