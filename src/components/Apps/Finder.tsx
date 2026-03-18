'use client';

import { useState } from 'react';
import { getFolderContents, FileNode } from '@/lib/filesystem';
import { ChevronLeft, ChevronRight, Folder, File, FileText, ChevronDown, ChevronRight as ChevronRightIcon } from 'lucide-react';
import { allAppsMap } from '@/lib/apps';
import { useSystemStore } from '@/store/system';
import { useWindowStore } from '@/store/useWindowStore';

export default function Finder() {
  const [currentPath, setCurrentPath] = useState<string[]>(['root', 'users', 'samuel']);
  const { openWindow } = useWindowStore();

  const currentFolderId = currentPath[currentPath.length - 1];
  const items = getFolderContents(currentFolderId);

  const handleNavigate = (id: string, type: 'folder' | 'file') => {
    if (type === 'folder') {
      setCurrentPath([...currentPath, id]);
    } else {
      // If it's an app, open it
      const appMatch = allAppsMap.find(a => a.name.toLowerCase() === id.replace('.app', '').toLowerCase());
      if (appMatch) {
        openWindow(appMatch.id, appMatch.name);
      } else if (id.endsWith('.txt')) {
         // Open TextEdit in Phase 3
         console.log('Opening text file:', id);
      }
    }
  };

  const handleBack = () => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, -1));
    }
  };

  // Helper to resolve nice names for breadcrumbs
  const getPathName = (id: string) => {
    if (id === 'root') return 'Macintosh HD';
    if (id === 'samuel') return 'samuel';
    return id.charAt(0).toUpperCase() + id.slice(1);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-b-xl overflow-hidden text-sm select-none">
      {/* Finder Toolbar */}
      <div className="h-[52px] border-b border-gray-200 bg-[#f6f6f6] flex items-center px-4 gap-4 justify-between shrink-0 drag-handle">
        <div className="flex gap-2 text-gray-400 ml-20">
          <ChevronLeft 
            size={20} 
            className={`cursor-pointer ${currentPath.length > 1 ? 'hover:text-gray-800 text-gray-600' : 'opacity-50'}`} 
            onClick={handleBack} 
          />
          <ChevronRight size={20} className="opacity-50" />
        </div>
        
        <div className="font-semibold text-gray-700 tracking-wide flex-1 text-center">
          {getPathName(currentFolderId)}
        </div>

        <div className="w-48" /> {/* Spacer */}
      </div>

      <div className="flex-1 flex w-full relative">
        {/* Finder Sidebar */}
        <div className="w-[180px] bg-gray-50/80 backdrop-blur-md border-r border-gray-200 py-4 px-2 shrink-0">
           <div className="text-xs font-semibold text-gray-400 px-3 mb-2 uppercase tracking-wider">Favorites</div>
           <SidebarItem icon={<Folder size={14} className="text-blue-500"/>} label="Applications" onClick={() => setCurrentPath(['root', 'applications'])} />
           <SidebarItem icon={<Folder size={14} className="text-blue-500"/>} label="Desktop" onClick={() => setCurrentPath(['root', 'users', 'samuel', 'desktop'])} />
           <SidebarItem icon={<Folder size={14} className="text-blue-500"/>} label="Documents" onClick={() => setCurrentPath(['root', 'users', 'samuel', 'documents'])} />
           <SidebarItem icon={<Folder size={14} className="text-blue-500"/>} label="Downloads" onClick={() => setCurrentPath(['root', 'users', 'samuel', 'downloads'])} />
           
           <div className="text-xs font-semibold text-gray-400 px-3 mt-6 mb-2 uppercase tracking-wider">Locations</div>
           <SidebarItem icon={<Folder size={14} className="text-gray-500"/>} label="Macintosh HD" onClick={() => setCurrentPath(['root'])} />
        </div>

        {/* File Grid */}
        <div className="flex-1 bg-white p-6 overflow-y-auto">
          {items.length === 0 ? (
            <div className="text-gray-400 text-center mt-20">Folder is empty</div>
          ) : (
            <div className="grid grid-cols-5 gap-6 gap-y-8 place-items-start">
              {items.map(item => (
                <div 
                  key={item.id} 
                  className="flex flex-col items-center gap-2 w-20 cursor-pointer group"
                  onDoubleClick={() => handleNavigate(item.id, item.type)}
                >
                  <div className="w-16 h-16 flex items-center justify-center rounded-lg group-hover:bg-blue-50 relative">
                     {item.type === 'folder' ? (
                       <Folder size={48} className="text-blue-400" fill="currentColor" />
                     ) : item.id.endsWith('.app') ? (
                       <AppIcon id={item.id} />
                     ) : (
                       <FileText size={42} className="text-gray-400" />
                     )}
                  </div>
                  <span className="text-[11px] text-center leading-tight px-1 rounded group-hover:bg-blue-500 group-hover:text-white line-clamp-2">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
  return (
    <div 
      className="flex items-center gap-2 px-3 py-1.5 rounded-md text-[13px] text-gray-700 hover:bg-black/5 cursor-pointer font-medium transition-colors"
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </div>
  );
}

function AppIcon({ id }: { id: string }) {
  const stripped = id.replace('.app', '').toLowerCase();
  const app = allAppsMap.find(a => a.name.toLowerCase() === stripped);
  
  if (app) {
    return (
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${app.bg} ${app.color}`}>
        {typeof app.icon === 'string' ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={app.icon} alt={app.name} className="w-10 h-10 object-contain pointer-events-none" />
        ) : (
          (() => {
            const IconComponent = app.icon as any;
            return <IconComponent size="28px" strokeWidth={1.5} />;
          })()
        )}
      </div>
    );
  }
  return <File size={42} className="text-gray-400" />;
}
