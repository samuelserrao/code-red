'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useWindowStore } from '@/store/useWindowStore';
import { useSystemStore } from '@/store/system';
import { allAppsMap } from '@/lib/apps';
import { Search } from 'lucide-react';
import { useState } from 'react';

export default function AppsView() {
  const { isAppsOpen, toggleApps } = useSystemStore();
  const { openWindow } = useWindowStore();
  const [search, setSearch] = useState('');

  const filteredApps = allAppsMap.filter(app =>
    app.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isAppsOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={() => toggleApps(false)}
          className="fixed inset-0 z-[100] flex flex-col items-center pt-24 pb-12 overflow-y-auto"
          style={{
            backdropFilter: 'blur(50px) saturate(210%) brightness(0.7)',
            background: 'rgba(0, 0, 0, 0.4)'
          }}
        >
          {/* Search Bar */}
          <div className="w-full max-w-[300px] mb-12 px-4" onClick={(e) => e.stopPropagation()}>
            <div className="relative group">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 group-focus-within:text-white/80 transition-colors" />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-white/10 backdrop-blur-md border border-white/10 rounded-lg pl-10 pr-4 py-1.5 outline-none text-white text-[13px] focus:bg-white/20 transition-all placeholder:text-white/40"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* App Grid */}
          <div className="w-full max-w-[1100px] px-12 grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-y-12 gap-x-8">
            {filteredApps.map((app) => (
              <motion.div
                key={app.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  openWindow(app.id, app.name);
                  toggleApps(false);
                }}
                className="flex flex-col items-center gap-2 cursor-pointer group"
              >
                <div className={`w-20 h-20 rounded-[14px] shadow-2xl border border-white/10 ${app.bg} ${app.color} flex items-center justify-center transition-shadow group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-black/5 aspect-square`}>
                  {typeof app.icon === 'string' ? (
                    <img src={app.icon} alt={app.name} className="w-[70%] h-[70%] object-contain pointer-events-none aspect-square" />
                  ) : (
                    (() => {
                      const IconComponent = app.icon as any;
                      return <IconComponent size={44} strokeWidth={1.5} />;
                    })()
                  )}
                </div>
                <span className="text-white text-[13px] font-medium tracking-wide drop-shadow-md">
                  {app.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
