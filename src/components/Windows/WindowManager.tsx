'use client';

import { useWindowStore } from '@/store/useWindowStore';
import BaseWindow from './BaseWindow';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function WindowManager() {
  const windows = useWindowStore((state) => state.windows);
  const activeWindows = useWindowStore((state) => state.activeWindows);
  const activeWindow = activeWindows[activeWindows.length - 1] || null;

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {Object.values(windows).map((win) => (
        <AnimatePresence key={win.id}>
          {win.isOpen && !win.isMinimized && (
            <BaseWindow
              app={win}
              isActive={activeWindow === win.id}
              hideHeader={win.id === 'safari' || win.id === 'finder'}
              className={win.id === 'calculator' || win.id === 'terminal' ? '!overflow-hidden !rounded-b-xl' : ''}
            />
          )}
        </AnimatePresence>
      ))}
    </div>
  );
}
