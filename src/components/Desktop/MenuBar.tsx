'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSystemStore } from '@/store/system';
import { useWindowStore } from '@/store/useWindowStore';
import { useTime } from '@/hooks/useTime';
import { Wifi, Battery, Search, Settings2 } from 'lucide-react';
import Image from 'next/image';

export default function MenuBar() {
  const { date, time } = useTime();
  const [mounted, setMounted] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const activeWindows = useWindowStore((state) => state.activeWindows);
  const windows = useWindowStore((state) => state.windows);
  const activeWindowId = activeWindows[activeWindows.length - 1] || null;
  const activeApp = activeWindowId ? windows[activeWindowId] : null;
  const toggleControlCenter = useSystemStore((state) => state.toggleControlCenter);
  const isControlCenterOpen = useSystemStore((state) => state.isControlCenterOpen);

  useEffect(() => {
    setMounted(true);
    
    const handleClickOutside = () => {
      setActiveMenu(null);
    };

    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const safariMenuItems = ['File', 'Edit', 'View', 'History', 'Bookmarks', 'Window', 'Help'];
  const defaultMenuItems = ['File', 'Edit', 'View', 'Go', 'Window', 'Help']; // Moved 'Finder' to the active app spot
  const currentMenuItems = activeApp?.id === 'safari' ? safariMenuItems : defaultMenuItems;

  const appMenuName = activeApp?.title || 'Finder';

  const menus: Record<string, { label?: string, shortcut?: string, isDivider?: boolean }[]> = {
    'Apple': [
      { label: 'About This Mac' },
      { isDivider: true },
      { label: 'System Settings (1 update)' },
      { label: 'App Store (6 updates)' },
      { isDivider: true },
      { label: 'Recent Items', shortcut: '›' },
      { isDivider: true },
      { label: 'Force Quit...', shortcut: '⌥⌘⎋' },
      { isDivider: true },
      { label: 'Sleep' },
      { label: 'Restart...' },
      { label: 'Shut Down...' },
      { isDivider: true },
      { label: 'Lock Screen', shortcut: '⌃⌘Q' },
      { label: 'Log Out...', shortcut: '⇧⌘Q' }
    ],
    'Finder': [
      { label: 'About Finder' },
      { isDivider: true },
      { label: 'Preferences...', shortcut: '⌘,' },
      { isDivider: true },
      { label: 'Empty Bin...', shortcut: '⇧⌘⌫' },
      { isDivider: true },
      { label: 'Hide Finder', shortcut: '⌘H' },
      { label: 'Hide Others', shortcut: '⌥⌘H' },
      { label: 'Show All' }
    ],
    'Safari': [
      { label: 'About Safari' },
      { label: 'Settings...', shortcut: '⌘,' },
      { isDivider: true },
      { label: 'Clear History...' },
      { isDivider: true },
      { label: 'Quit Safari', shortcut: '⌘Q' }
    ],
    'File': [
      { label: 'New Window', shortcut: '⌘N' },
      { label: 'New Tab', shortcut: '⌘T' },
      { label: 'Open...', shortcut: '⌘O' },
      { isDivider: true },
      { label: 'Close Window', shortcut: '⌘W' }
    ],
    'Edit': [
      { label: 'Undo', shortcut: '⌘Z' },
      { label: 'Redo', shortcut: '⇧⌘Z' },
      { isDivider: true },
      { label: 'Cut', shortcut: '⌘X' },
      { label: 'Copy', shortcut: '⌘C' },
      { label: 'Paste', shortcut: '⌘V' }
    ],
    'View': [
      { label: 'As Icons', shortcut: '⌘1' },
      { label: 'As List', shortcut: '⌘2' },
      { isDivider: true },
      { label: 'Enter Full Screen', shortcut: '⌃⌘F' }
    ],
    'Go': [
      { label: 'Back', shortcut: '⌘[' },
      { label: 'Forward', shortcut: '⌘]' },
      { isDivider: true },
      { label: 'Recents', shortcut: '⇧⌘F' },
      { label: 'Desktop', shortcut: '⇧⌘D' }
    ],
    'History': [
      { label: 'Show All History', shortcut: '⌘Y' },
      { isDivider: true },
      { label: 'Recently Closed' }
    ],
    'Bookmarks': [
      { label: 'Show Bookmarks', shortcut: '⌃⌘1' },
      { label: 'Add Bookmark...', shortcut: '⌘D' }
    ],
    'Window': [
      { label: 'Minimize', shortcut: '⌘M' },
      { label: 'Zoom' },
      { isDivider: true },
      { label: 'Bring All to Front' }
    ],
    'Help': [
      { label: 'Search' },
      { isDivider: true },
      { label: 'macOS Help' }
    ],
    'Generic': [
      { label: 'About App' },
      { isDivider: true },
      { label: 'Settings...', shortcut: '⌘,' },
      { isDivider: true },
      { label: 'Hide', shortcut: '⌘H' },
      { label: 'Quit', shortcut: '⌘Q' }
    ]
  };

  return (
    <div 
      className="w-full h-7 flex items-center justify-between px-3 text-[13px] font-medium text-white shadow-sm z-[100] select-none"
      style={{ 
        backdropFilter: 'blur(40px) saturate(210%) brightness(1.1)', 
        background: 'rgba(255, 255, 255, 0.3)',
        borderBottom: '0.5px solid rgba(255, 255, 255, 0.2)' 
      }}
    >
      {/* Left items */}
      <div className="flex items-center space-x-0 h-full">
        {/* Apple Logo Menu */}
        <div 
          className={`flex items-center justify-center h-full px-3 hover:bg-white/20 cursor-pointer transition-colors relative ${activeMenu === 'Apple' ? 'bg-white/20' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            setActiveMenu(activeMenu === 'Apple' ? null : 'Apple');
          }}
        >
          <svg viewBox="0 0 1024 1024" className="w-[14px] h-[14px] text-white opacity-95" fill="currentColor">
            <path d="M722 559c0-117 96-173 100-176-55-80-139-91-169-92-72-8-142 43-178 43-37 0-93-42-152-41-78 1-150 45-190 115-82 141-21 350 58 464 39 56 85 119 146 117 58-2 81-37 151-37s90 37 152 36c63-1 103-57 142-113 44-65 63-128 64-131-1-1-124-48-124-191zM609 238c31-38 52-91 46-144-46 2-101 31-135 70-30 35-56 89-49 141 51 4 102-28 138-67z" />
          </svg>
          <AnimatePresence>
            {activeMenu === 'Apple' && <MenuDropdown items={menus['Apple']} dark />}
          </AnimatePresence>
        </div>
        
        <div className="flex items-center h-full">
          {/* Active App Menu */}
          <div 
            className={`font-bold px-3 py-1 hover:bg-white/20 rounded-md cursor-pointer transition-colors whitespace-nowrap capitalize relative flex items-center h-full ${activeMenu === appMenuName ? 'bg-white/20' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setActiveMenu(activeMenu === appMenuName ? null : appMenuName);
            }}
          >
            {appMenuName}
            <AnimatePresence>
              {activeMenu === appMenuName && (
                <MenuDropdown items={menus[activeApp?.id === 'safari' ? 'Safari' : activeApp?.id === 'finder' ? 'Finder' : 'Generic']} />
              )}
            </AnimatePresence>
          </div>
          
          <div className="hidden sm:flex items-center h-full ml-1">
            {currentMenuItems.map((item) => (
              <div 
                key={item} 
                className={`px-3 py-1 hover:bg-white/20 rounded-md cursor-pointer transition-colors whitespace-nowrap relative h-full flex items-center ${activeMenu === item ? 'bg-white/20' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenu(activeMenu === item ? null : item);
                }}
              >
                {item}
                <AnimatePresence>
                  {activeMenu === item && <MenuDropdown items={menus[item]} />}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right items */}
      <div className="flex items-center space-x-1 h-full pr-1">
        <div className="flex items-center px-1.5 py-1 rounded hover:bg-white/20 cursor-pointer transition-colors">
          <Battery size={16} strokeWidth={2} />
        </div>
        <div className="flex items-center px-1.5 py-1 rounded hover:bg-white/20 cursor-pointer transition-colors">
          <Wifi size={15} strokeWidth={2.5} />
        </div>
        <div className="flex items-center px-1.5 py-1 rounded hover:bg-white/20 cursor-pointer transition-colors">
          <Search size={15} strokeWidth={2.5} />
        </div>
        <div 
          className={`flex items-center px-1.5 py-1 rounded cursor-pointer transition-colors ${isControlCenterOpen ? 'bg-white/20' : 'hover:bg-white/20'}`}
          onClick={(e) => { e.stopPropagation(); toggleControlCenter(); }}
        >
          <Settings2 size={15} strokeWidth={2.5} />
        </div>
        <div className="flex items-center px-2 py-1 rounded hover:bg-white/20 cursor-pointer transition-colors gap-2">
          {mounted && (
            <div className="flex gap-2">
              <span className="whitespace-nowrap">{date}</span>
              <span className="whitespace-nowrap">{time}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MenuDropdown({ items, dark }: { items?: { label?: string, shortcut?: string, isDivider?: boolean }[], dark?: boolean }) {
  if (!items || items.length === 0) return null;
  return (
    <motion.div 
      initial={{ opacity: 0, y: 5, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 5, scale: 0.98 }}
      transition={{ duration: 0.1 }}
      className={`absolute top-7 left-0 min-w-[220px] rounded-xl p-1.5 z-[200] flex flex-col gap-0.5 text-white/95 text-[13px] font-normal cursor-default ${dark ? 'dark-menu-glass' : 'menu-glass'}`}
      style={dark ? {
        backdropFilter: 'blur(40px) saturate(210%) brightness(0.8)',
        background: 'rgba(0, 0, 0, 0.5)',
        border: '0.5px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
      } : {}}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item, i) => <DropdownItem key={i} {...item} />)}
    </motion.div>
  );
}

function DropdownItem({ label, shortcut, isDivider }: { label?: string, shortcut?: string, isDivider?: boolean }) {
  if (isDivider) {
    return <div className="h-[0.5px] bg-white/20 my-1 mx-2" />;
  }
  return (
    <div className="flex items-center justify-between px-3 py-1.5 hover:bg-blue-600 rounded-lg cursor-default group transition-colors">
      <span className="group-hover:text-white capitalize-first">{label}</span>
      {shortcut && <span className="text-white/40 group-hover:text-white/80 text-[11px]">{shortcut}</span>}
    </div>
  );
}
