'use client';

import { motion, AnimatePresence, useDragControls } from 'framer-motion';
import { useWindowStore, AppWindow } from '@/store/useWindowStore';
import { ReactNode, useEffect, useState, useRef } from 'react';
import Safari from '@/components/Apps/Safari';
import WhatsApp from '@/components/Apps/WhatsApp';
import Terminal from '@/components/Apps/Terminal';
import Notes from '@/components/Apps/Notes';
import Calculator from '@/components/Apps/Calculator';
import Finder from '@/components/Apps/Finder';
import Settings from '@/components/Apps/Settings';
import Calendar from '@/components/Apps/Calendar';
import Photos from '@/components/Apps/Photos';
import Music from '@/components/Apps/Music';
import Podcasts from '@/components/Apps/Podcasts';
import TV from '@/components/Apps/TV';
import AppStore from '@/components/Apps/AppStore';
import Mail from '@/components/Apps/Mail';
import Messages from '@/components/Apps/Messages';
import Maps from '@/components/Apps/Maps';
import Reminders from '@/components/Apps/Reminders';
import ActivityMonitor from '@/components/Apps/ActivityMonitor';
import Contacts from '@/components/Apps/Contacts';
import Trash from '@/components/Apps/Trash';
import Pages from '@/components/Apps/Pages';

interface BaseWindowProps {
  app: AppWindow;
  isActive: boolean;
  children?: ReactNode;
  sidebar?: ReactNode;
  toolbar?: ReactNode;
  className?: string; 
  hideHeader?: boolean;
}

const getAppContent = (id: string) => {
  switch (id) {
    case 'finder': return <Finder />;
    case 'safari': return <Safari />;
    case 'whatsapp': return <WhatsApp />;
    case 'terminal': return <Terminal />;
    case 'notes': return <Notes />;
    case 'calculator': return <Calculator />;
    case 'settings': return <Settings />;
    case 'calendar': return <Calendar />;
    case 'photos': return <Photos />;
    case 'music': return <Music />;
    case 'podcasts': return <Podcasts />;
    case 'tv': return <TV />;
    case 'appstore': return <AppStore />;
    case 'mail': return <Mail />;
    case 'messages': return <Messages />;
    case 'maps': return <Maps />;
    case 'reminders': return <Reminders />;
    case 'activity': return <ActivityMonitor />;
    case 'contacts': return <Contacts />;
    case 'trash': return <Trash />;
    case 'pages': return <Pages />;
    default: return <div className="w-full flex-1 bg-white" />;
  }
};

export default function BaseWindow({ app, isActive, children, sidebar, toolbar, className = '', hideHeader = false }: BaseWindowProps) {
  const { closeWindow, minimizeWindow, maximizeWindow, focusWindow } = useWindowStore();
  const dragControls = useDragControls();
  
  // Hydration safe window dimensions
  const [winSize, setWinSize] = useState({ width: 1000, height: 800 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setWinSize({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => setWinSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTrafficLight = (e: React.MouseEvent, action: 'close' | 'minimize' | 'maximize') => {
    e.stopPropagation();
    if (action === 'close') {
      closeWindow(app.id);
    }
    if (action === 'minimize') minimizeWindow(app.id);
    if (action === 'maximize') maximizeWindow(app.id);
  };

  if (!mounted) return null; // Prevent SSR mismatch completely for floating windows

  return (
    <motion.div
      layoutId={`window-${app.id}`} // Genie Effect magic
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: 1, 
        y: 0,
        x: 0,
        width: app.isMaximized ? '100vw' : 850,
        height: app.isMaximized ? 'calc(100vh - 30px)' : 550,
        top: app.isMaximized ? 30 : (winSize.height - 550) / 2 - 20, 
        left: app.isMaximized ? 0 : (winSize.width - 850) / 2,
        borderRadius: app.isMaximized ? '0px' : '24px',
      }}
      exit={{ 
        opacity: 0, 
        scale: 0, 
        y: 500,
        x: 0,
        transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
      }} 
      transition={{ type: 'spring', damping: 26, stiffness: 220, mass: 0.8 }}
      style={{ zIndex: isActive ? 50 : 10 }}
      drag={!app.isMaximized}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.1}
      onMouseDown={() => focusWindow(app.id)}
      className={`absolute overflow-hidden shadow-2xl flex flex-col bg-mac-bg border border-mac-border select-none ${isActive ? 'ring-1 ring-black/10' : ''} ${app.isMaximized ? 'shadow-none !fixed !inset-0 !top-[30px] !z-50' : 'rounded-[24px]'}`}
    >
      {/* Main Container - supports optional layout variations */}
        {sidebar && (
        <div 
          className="w-[220px] shrink-0 bg-white/40 backdrop-blur-xl border-r border-black/10 flex flex-col relative pt-[38px] pb-2"
          onPointerDown={(e) => !app.isMaximized && dragControls.start(e)}
        >
          <div className="absolute top-0 left-0 right-0 h-[38px] flex items-center px-4 z-10 drag-handle">
            {/* Traffic Lights for Sidebar style */}
            <TrafficLights onAction={handleTrafficLight} />
          </div>
          <div className="flex-1 overflow-y-auto w-full px-2">
            {sidebar}
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col bg-[#f5f5f5] h-full relative">
        {/* Top Toolbar Area */}
        {!hideHeader && (
          <div 
            className="h-[52px] shrink-0 bg-[#f6f6f6] border-b border-black/5 flex items-center w-full px-4 relative z-10 drag-handle"
            onPointerDown={(e) => !app.isMaximized && dragControls.start(e)}
          >
            {!sidebar && (
              <div className="absolute left-4 top-1/2 -translate-y-1/2 z-20">
                <TrafficLights onAction={handleTrafficLight} />
              </div>
            )}
            <div className="flex-1 h-full flex items-center justify-center font-medium text-[13px] text-black/80 font-sans tracking-tight">
                {toolbar ? toolbar : <span className="select-none">{app.title}</span>}
            </div>
          </div>
        )}

        {/* If header is hidden, we still need traffic lights somewhere! */}
        {hideHeader && !sidebar && (
          <div 
            className="absolute top-0 left-0 right-0 h-12 z-50 drag-handle"
            onPointerDown={(e) => !app.isMaximized && dragControls.start(e)}
          >
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <TrafficLights onAction={handleTrafficLight} />
            </div>
          </div>
        )}

        {/* Application Specific Content */}
        <div className={`flex-1 overflow-y-auto relative ${className}`}>
          {children || getAppContent(app.id)}
        </div>
      </div>
    </motion.div>
  );
}

// Sub-component for traffic lights
function TrafficLights({ onAction }: { onAction: (e: React.MouseEvent, action: 'close'|'minimize'|'maximize') => void }) {
  return (
    <div 
      className="flex items-center gap-[8px] group"
      onPointerDown={(e) => e.stopPropagation()} // Click Hijack Fix
    >
      <button 
        onClick={(e) => onAction(e, 'close')}
        className="w-[12px] h-[12px] rounded-[24px] bg-[#FF5F56] border border-black/10 hover:brightness-110 flex items-center justify-center"
      >
        <span className="opacity-0 group-hover:opacity-100 text-black/50 text-[8px] font-bold leading-none select-none">×</span>
      </button>
      <button 
        onClick={(e) => onAction(e, 'minimize')}
        className="w-[12px] h-[12px] rounded-[24px] bg-[#FFBD2E] border border-black/10 hover:brightness-110 flex items-center justify-center"
      >
        <span className="opacity-0 group-hover:opacity-100 text-black/50 text-[8px] font-bold leading-none select-none">−</span>
      </button>
      <button 
        onClick={(e) => onAction(e, 'maximize')}
        className="w-[12px] h-[12px] rounded-[24px] bg-[#27C93F] border border-black/10 hover:brightness-110 flex items-center justify-center"
      >
        <span className="opacity-0 group-hover:opacity-100 text-black/50 text-[10px] font-bold leading-none select-none">+</span>
      </button>
    </div>
  );
}
