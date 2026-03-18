/* eslint-disable @next/next/no-img-element */
import { Play, Search, Radio, Compass, Clock, LayoutGrid } from 'lucide-react';

export default function Podcasts() {
  const podcasts = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    cover: `https://picsum.photos/seed/${i + 300}/200/200`,
    title: `Podcast ${i + 1}`,
    host: `Host ${i + 1}`
  }));

  return (
    <div className="w-full h-full flex bg-[#ececec] text-gray-800 overflow-hidden">
      {/* Sidebar */}
      <div className="w-52 bg-[#e3e3e3] border-r border-gray-300 flex flex-col pt-10 drag-handle">
         <div className="px-4 mb-4">
           <div className="relative">
             <Search size={14} className="absolute left-2 top-1.5 text-gray-500" />
             <input type="text" placeholder="Search" className="w-full bg-white/50 border border-gray-300 rounded-md pl-7 pr-2 py-1 outline-none text-sm focus:ring-1 focus:ring-purple-500" />
           </div>
         </div>
         <div className="flex-1 overflow-y-auto px-2 space-y-0.5 text-sm">
            <div className="text-xs font-semibold text-gray-500 px-2 py-1 mt-2">Apple Podcasts</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-300 text-purple-600 font-medium cursor-pointer"><Radio size={16} /> Listen Now</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-300 text-gray-700 cursor-pointer"><Compass size={16} /> Browse</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-300 text-gray-700 cursor-pointer"><Clock size={16} /> Top Charts</div>
            
            <div className="text-xs font-semibold text-gray-500 px-2 py-1 mt-4">Library</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-300 text-gray-700 cursor-pointer"><LayoutGrid size={16} /> Shows</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-300 text-gray-700 cursor-pointer">Saved</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-300 text-gray-700 cursor-pointer">Downloaded</div>
         </div>
      </div>

      <div className="flex-1 flex flex-col bg-white">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-8">
           <h1 className="text-3xl font-bold mb-6">Listen Now</h1>
           
           <div className="bg-gradient-to-r from-purple-100 to-blue-50 rounded-xl p-6 mb-8 flex items-center shadow-sm border border-gray-100">
             <div className="flex-1">
               <div className="text-purple-600 font-semibold mb-1">Up Next</div>
               <h2 className="text-2xl font-bold text-gray-800 mb-2">The Daily</h2>
               <p className="text-gray-600 mb-4 max-w-md line-clamp-2">Twenty minutes a day, five days a week, hosted by Michael Barbaro and Sabrina Tavernise.</p>
               <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-[24px] font-medium flex items-center gap-2 transition-colors">
                 <Play size={16} className="fill-white" /> Play
               </button>
             </div>
             <div className="w-32 h-32 bg-purple-200 rounded-lg shadow-md shrink-0 border border-black/5 overflow-hidden">
                <img src="https://picsum.photos/seed/daily/200/200" alt="Cover" className="w-full h-full object-cover" loading="lazy" />
             </div>
           </div>

           <h2 className="text-xl font-bold mb-4 text-gray-800 border-b border-gray-200 pb-2">Recently Played</h2>
           <div className="grid grid-cols-3 gap-6">
              {podcasts.map(podcast => (
                <div key={podcast.id} className="group cursor-pointer">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-3 border border-black/5 overflow-hidden shadow-sm relative">
                    <img src={podcast.cover} alt="Cover" className="w-full h-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Play size={32} className="fill-white opacity-90 hover:opacity-100 hover:scale-110 transition-all" />
                    </div>
                  </div>
                  <div className="text-sm font-semibold truncate text-gray-800">{podcast.title}</div>
                  <div className="text-xs text-gray-500 truncate">{podcast.host}</div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
