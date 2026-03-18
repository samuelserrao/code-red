import { Search, ChevronDown, Wifi, Bluetooth, Monitor } from 'lucide-react';

export default function Settings() {
  return (
    <div className="w-full h-full flex bg-white/90 text-sm">
      {/* Sidebar */}
      <div className="w-60 bg-[#f5f5f5] border-r border-gray-200 flex flex-col pt-10 drag-handle">
        <div className="px-4 mb-4">
           <div className="relative">
             <Search size={14} className="absolute left-2 top-1.5 text-gray-400" />
             <input type="text" placeholder="Search" className="w-full bg-gray-200/50 border border-gray-300 rounded-md pl-7 pr-2 py-1 outline-none focus:ring-2 focus:ring-blue-400" />
           </div>
        </div>
        
        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          <div className="flex items-center gap-3 px-2 py-2 mb-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer">
             <div className="w-10 h-10 rounded-[24px] bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0" />
             <div className="overflow-hidden">
               <div className="font-medium text-gray-800 truncate">Samuel Serrao</div>
               <div className="text-xs text-gray-500 truncate">Apple ID, iCloud, Media & Purchases</div>
             </div>
          </div>
          
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-200 cursor-pointer bg-blue-500 text-white font-medium">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white"><Monitor size={14} /></div>
            Display
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-200 cursor-pointer text-gray-700">
            <div className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center text-white"><Wifi size={14} /></div>
            Wi-Fi
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-200 cursor-pointer text-gray-700">
            <div className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center text-white"><Bluetooth size={14} /></div>
            Bluetooth
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-white p-10 overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-6">Display</h2>
        <div className="space-y-6 max-w-2xl">
           <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex flex-col gap-4 shadow-sm">
             <div className="flex items-center justify-between">
                <div>
                   <div className="font-medium text-lg">Built-in Retina Display</div>
                   <div className="text-gray-500">14-inch (3024 × 1964)</div>
                </div>
                <Monitor size={48} className="text-blue-500" />
             </div>
             
             <div className="border-t border-gray-200 pt-4 flex gap-8">
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between text-gray-700"><span>Resolution</span><span className="text-gray-400">Default for display <ChevronDown size={14} className="inline mb-0.5"/></span></div>
                  <div className="flex justify-between text-gray-700"><span>Color Profile</span><span className="text-gray-400">Apple Display (XDR) <ChevronDown size={14} className="inline mb-0.5"/></span></div>
                </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
