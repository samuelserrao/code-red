/* eslint-disable @next/next/no-img-element */
import { Image as ImageIcon, Heart, PlaySquare, Folder, Search } from 'lucide-react';

export default function Photos() {
  const mockImages = Array.from({ length: 24 }, (_, i) => `https://picsum.photos/seed/${i + 100}/400/300`);

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="h-12 border-b border-gray-200 bg-[#f6f6f6] flex items-center px-4 justify-between drag-handle shrink-0 pl-20">
         <div className="flex bg-white rounded-md border border-gray-300 overflow-hidden text-xs text-gray-600">
            <button className="px-3 py-1 bg-gray-100 border-r border-gray-300">Years</button>
            <button className="px-3 py-1 bg-gray-100 border-r border-gray-300">Months</button>
            <button className="px-3 py-1 bg-gray-100 border-r border-gray-300">Days</button>
            <button className="px-3 py-1 bg-white font-medium">All Photos</button>
         </div>
         <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-2 top-1.5 text-gray-400" />
              <input type="text" placeholder="Search" className="w-48 bg-gray-200/50 border border-gray-300 rounded-md pl-7 pr-2 py-1 outline-none text-sm" />
            </div>
         </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 border-r border-gray-200 bg-[#f5f5f5] p-2 overflow-y-auto">
           <div className="text-xs font-semibold text-gray-400 px-2 mb-1 mt-2">Library</div>
           <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-200 cursor-pointer bg-blue-500 text-white"><ImageIcon size={16} /> Photos</div>
           <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-200 cursor-pointer text-gray-700"><Heart size={16} className="text-rose-500"/> Favorites</div>
           <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-200 cursor-pointer text-gray-700"><PlaySquare size={16} className="text-blue-500"/> Recents</div>
           
           <div className="text-xs font-semibold text-gray-400 px-2 mb-1 mt-4">Albums</div>
           <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-200 cursor-pointer text-gray-700"><Folder size={16} className="text-blue-400"/> Family</div>
           <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-200 cursor-pointer text-gray-700"><Folder size={16} className="text-blue-400"/> Trip 2026</div>
        </div>

        {/* Gallery */}
        <div className="flex-1 p-4 overflow-y-auto bg-white">
           <div className="grid grid-cols-4 gap-1">
             {mockImages.map((src, i) => (
                <div key={i} className="aspect-square bg-gray-100 border border-gray-200 hover:border-blue-400 cursor-pointer relative overflow-hidden group">
                  <img src={src} alt="Photo" className="w-full h-full object-cover transition-transform group-hover:scale-105" loading="lazy" />
                </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}
