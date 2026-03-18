import { Search, Navigation, Layers, Compass } from 'lucide-react';

export default function Maps() {
  return (
    <div className="w-full h-full flex flex-col bg-white overflow-hidden relative">
      {/* Toolbar overlay */}
      <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-white/80 to-transparent backdrop-blur-sm z-10 flex items-center px-4 drag-handle pointer-events-none" />
      
      {/* Interactive Controls */}
      <div className="absolute top-12 left-4 w-72 bg-white/90 backdrop-blur-xl border border-gray-200 rounded-xl shadow-lg z-20 flex flex-col pointer-events-auto">
         <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-2 text-gray-400" />
              <input type="text" placeholder="Search Maps" className="w-full bg-gray-100 border border-gray-200 rounded-lg pl-9 pr-3 py-1.5 outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            </div>
         </div>
         <div className="p-2 space-y-1">
            <div className="px-3 py-2 text-sm font-semibold text-gray-500">Favorites</div>
            <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-blue-50 rounded-lg cursor-pointer">
               <div className="w-8 h-8 rounded-[24px] bg-blue-100 text-blue-600 flex items-center justify-center"><Navigation size={14} /></div>
               <div className="text-sm font-medium">Home</div>
            </div>
            <div className="flex items-center gap-3 px-3 py-1.5 hover:bg-blue-50 rounded-lg cursor-pointer">
               <div className="w-8 h-8 rounded-[24px] bg-blue-100 text-blue-600 flex items-center justify-center"><Navigation size={14} /></div>
               <div className="text-sm font-medium">Work</div>
            </div>
         </div>
      </div>

      <div className="absolute top-12 right-4 flex flex-col gap-2 z-20 pointer-events-auto">
         <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-lg shadow-md p-1.5 flex flex-col gap-1 cursor-pointer">
            <div className="p-1.5 hover:bg-gray-100 rounded-md"><Compass size={18} className="text-gray-600" /></div>
            <div className="w-full h-px bg-gray-200" />
            <div className="p-1.5 hover:bg-gray-100 rounded-md"><Navigation size={18} className="text-blue-500" /></div>
         </div>
         <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-lg shadow-md p-2 hover:bg-gray-50 cursor-pointer">
            <Layers size={18} className="text-gray-600" />
         </div>
      </div>

      {/* Map Background (Mock) */}
      <div className="flex-1 bg-[#f9f6ef] w-full h-full relative cursor-crosshair">
         <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%235a9bd4\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
         
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-4 h-4 rounded-[24px] bg-blue-500 border-2 border-white shadow-[0_0_0_4px_rgba(59,130,246,0.2)] animate-pulse" />
            <div className="mt-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-[24px] text-xs font-semibold shadow-sm border border-gray-100">Cupertino, CA</div>
         </div>
      </div>
    </div>
  );
}
