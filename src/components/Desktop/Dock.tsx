'use client';

import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { useWindowStore, AppWindow } from '@/store/useWindowStore';
import { useSystemStore } from '@/store/system';
import { allAppsMap } from '@/lib/apps';
import { Trash2, Rocket } from 'lucide-react';

export default function Dock() {
  const mouseX = useMotionValue(Infinity);
  const windows = useWindowStore((state) => state.windows);
  const minimizedWindowIds = useWindowStore((state) => state.minimizedWindows);
  const minimizedWindows = minimizedWindowIds.map(id => windows[id]).filter(Boolean);

  return (
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[95vw]">
      <div
        className="glass px-2 py-2 flex items-end gap-2 shadow-2xl transition-all duration-300 ring-1 ring-white/20 rounded-[18px]"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        <DockItem
          app={{ id: 'apps', name: 'Apps', icon: '/assets/macos/apps.png', color: 'text-white', bg: 'transparent', core: true }}
          mouseX={mouseX}
        />

        {allAppsMap.filter(app => app.core).map((app) => (
          <DockItem key={app.id} app={app} mouseX={mouseX} />
        ))}

        {minimizedWindows.length > 0 && (
          <>
            <div className="w-0 h-8 self-center border-l border-white/20 mx-1" />
            {minimizedWindows.map(app => (
              <MinimizedWindowProxy key={app.id} app={app} mouseX={mouseX} />
            ))}
          </>
        )}

        <div className="w-0 h-8 self-center border-l border-white/20 mx-1" />

        <DockItem
          app={{ id: 'trash', name: 'Trash', icon: '/assets/macos/trash.png', color: 'text-zinc-400', bg: 'transparent', core: true }}
          mouseX={mouseX}
        />
      </div>
    </div>
  );
}

interface DockAppMeta {
  id: string;
  name: string;
  icon: any;
  color: string;
  bg: string;
  core: boolean;
}

function DockItem({ app, mouseX }: { app: DockAppMeta, mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [48, 80, 48]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });
  const openWindow = useWindowStore((state) => state.openWindow);
  const toggleApps = useSystemStore((state) => state.toggleApps);

  return (
    <div className="relative group flex flex-col items-center">
      {/* Tooltip */}
      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-md text-xs border border-white/10 pointer-events-none">
        {app.name}
      </div>

      <motion.div
        ref={ref}
        style={{ width, height: width }}
        onClick={(e) => {
          e.stopPropagation();
          if (app.id === 'apps') {
            toggleApps();
          } else {
            openWindow(app.id, app.name);
          }
        }}
        className={`flex items-center justify-center cursor-pointer transition-shadow rounded-[12px] aspect-square ${app.bg} ${app.color}`}
      >
        {typeof app.icon === 'string' ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={app.icon}
            alt={app.name}
            loading="eager"
            className="w-full h-full object-contain pointer-events-none aspect-square"
          />
        ) : (
          (() => {
            const IconComponent = app.icon as any;
            return <IconComponent size="24px" strokeWidth={1.5} />;
          })()
        )}
      </motion.div>
      <div className="absolute -bottom-1 w-1 h-1 rounded-[24px] bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

function MinimizedWindowProxy({ app, mouseX }: { app: AppWindow, mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 60, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });
  const restoreWindow = useWindowStore((state) => state.restoreWindow);

  const appMeta = allAppsMap.find(a => a.id === app.id);

  return (
    <div className="relative group flex flex-col items-center">
      {/* Tooltip */}
      <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-md text-xs border border-white/10 pointer-events-none z-[100]">
        {app.title}
      </div>

      <motion.div
        layoutId={`window-${app.id}`}
        ref={ref}
        style={{ width, height: width }}
        onClick={(e) => {
          e.stopPropagation();
          restoreWindow(app.id);
        }}
        className="flex flex-col items-center justify-center cursor-pointer transition-shadow rounded-[10px] bg-white border border-gray-300 shadow-md overflow-hidden relative"
      >
        <div className="w-full h-[6px] bg-gray-200 border-b border-gray-300 shrink-0 absolute top-0 left-0" />
        <div className="w-full h-full flex items-center justify-center bg-gray-50/50 pt-[4px]">
          {appMeta && (
            typeof appMeta.icon === 'string' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={appMeta.icon}
                loading="eager"
                className="w-1/2 h-1/2 object-contain pointer-events-none"
                alt={appMeta.name}
              />
            ) : (
              (() => {
                const IconComponent = appMeta.icon as any;
                return <IconComponent size="50%" strokeWidth={1.5} />;
              })()
            )
          )}
        </div>
      </motion.div>
      <div className="absolute -bottom-1 w-1 h-1 rounded-[24px] bg-white/80 opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}
