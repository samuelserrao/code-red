/* eslint-disable @next/next/no-img-element */
import { Play, SkipBack, SkipForward, Volume2, Search, ListMusic, Mic2, Radio } from 'lucide-react';

export default function Music() {
  const albums = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    cover: `https://picsum.photos/seed/${i + 200}/200/200`,
    title: `Album ${i + 1}`,
    artist: `Artist ${i + 1}`
  }));

  return (
    <div className="w-full h-full flex bg-[#1c1c1e] text-white overflow-hidden">
      {/* Sidebar */}
      <div className="w-52 bg-[#2d2d2d]/80 border-r border-white/10 flex flex-col pt-10 drag-handle backdrop-blur-md">
         <div className="px-4 mb-4">
           <div className="relative">
             <Search size={14} className="absolute left-2 top-1.5 text-gray-400" />
             <input type="text" placeholder="Search" className="w-full bg-black/20 border border-white/10 rounded-md pl-7 pr-2 py-1 outline-none text-sm focus:ring-1 focus:ring-rose-500" />
           </div>
         </div>
         <div className="flex-1 overflow-y-auto px-2 space-y-0.5 text-sm">
            <div className="text-xs font-semibold text-gray-400 px-2 py-1 mt-2">Apple Music</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 text-rose-500 font-medium cursor-pointer"><Play size={16} /> Listen Now</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 text-gray-300 cursor-pointer"><Radio size={16} /> Browse</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 text-gray-300 cursor-pointer"><Mic2 size={16} /> Radio</div>
            
            <div className="text-xs font-semibold text-gray-400 px-2 py-1 mt-4">Library</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 text-gray-300 cursor-pointer"><ListMusic size={16} /> Recently Added</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 text-gray-300 cursor-pointer">Artists</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 text-gray-300 cursor-pointer">Albums</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-white/10 text-gray-300 cursor-pointer">Songs</div>
         </div>
      </div>

      <div className="flex-1 flex flex-col">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
           <h1 className="text-3xl font-bold mb-6">Listen Now</h1>
           <div className="mb-8">
             <h2 className="text-lg font-semibold mb-4 text-gray-200 border-b border-white/10 pb-2">Top Picks</h2>
             <div className="grid grid-cols-4 gap-6">
                {albums.slice(0, 4).map(album => (
                  <div key={album.id} className="group cursor-pointer">
                    <div className="aspect-square bg-gray-800 rounded-md mb-2 overflow-hidden relative shadow-lg">
                      <img src={album.cover} alt="Cover" className="w-full h-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play size={32} className="fill-white" />
                      </div>
                    </div>
                    <div className="text-sm font-medium truncate">{album.title}</div>
                    <div className="text-xs text-gray-400 truncate">{album.artist}</div>
                  </div>
                ))}
             </div>
           </div>
        </div>

        {/* Player Bar */}
        <div className="h-16 border-t border-white/10 bg-[#2d2d2d]/95 backdrop-blur-xl flex items-center justify-between px-6 shrink-0 drag-handle">
           <div className="flex items-center gap-4 w-1/3">
              <div className="flex gap-4">
                <SkipBack size={20} className="fill-white/80 hover:fill-white cursor-pointer" />
                <Play size={24} className="fill-white hover:scale-105 transition-transform cursor-pointer" />
                <SkipForward size={20} className="fill-white/80 hover:fill-white cursor-pointer" />
              </div>
           </div>
           
           <div className="flex-1 flex flex-col items-center max-w-md mx-4">
              <div className="flex items-center w-full gap-2">
                 <div className="text-xs text-gray-400 w-8 text-right">0:00</div>
                 <div className="h-1.5 flex-1 bg-white/20 rounded-[24px] overflow-hidden cursor-pointer group">
                    <div className="h-full bg-white/40 w-0 group-hover:bg-white/60 transition-colors" />
                 </div>
                 <div className="text-xs text-gray-400 w-8">-3:40</div>
              </div>
           </div>

           <div className="flex items-center gap-4 w-1/3 justify-end">
              <Volume2 size={16} className="text-gray-400" />
              <div className="w-24 h-1.5 bg-white/20 rounded-[24px] overflow-hidden cursor-pointer">
                 <div className="h-full bg-white/60 w-2/3" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
