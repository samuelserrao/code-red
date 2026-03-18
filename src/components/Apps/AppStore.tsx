/* eslint-disable @next/next/no-img-element */
import { Search, Compass, Gamepad2, Blocks, User, Star } from 'lucide-react';

export default function AppStore() {
  const apps = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    icon: `https://picsum.photos/seed/${i + 500}/100/100`,
    title: `App Name ${i + 1}`,
    subtitle: 'Great new utility',
    price: i % 2 === 0 ? 'GET' : '$4.99'
  }));

  return (
    <div className="w-full h-full flex bg-[#ececec] text-gray-800 overflow-hidden">
      {/* Sidebar */}
      <div className="w-48 bg-[#e3e3e3]/90 border-r border-gray-300 flex flex-col pt-10 drag-handle backdrop-blur-md">
         <div className="px-4 mb-4">
           <div className="relative">
             <Search size={14} className="absolute left-2 top-1.5 text-gray-500" />
             <input type="text" placeholder="Search" className="w-full bg-white/60 border border-gray-300 rounded-md pl-7 pr-2 py-1 outline-none text-sm focus:ring-1 focus:ring-blue-500" />
           </div>
         </div>
         <div className="flex-1 overflow-y-auto px-2 space-y-0.5 text-sm">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-300 text-blue-600 font-medium cursor-pointer"><Compass size={16} /> Discover</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-300 text-gray-700 cursor-pointer"><Gamepad2 size={16} /> Arcade</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-300 text-gray-700 cursor-pointer"><Blocks size={16} /> Play</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-300 text-gray-700 cursor-pointer"><MonitorPlay size={16} /> Develop</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-300 text-gray-700 cursor-pointer"><Star size={16} /> Categories</div>
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-300 text-gray-700 cursor-pointer"><User size={16} /> Updates</div>
         </div>
      </div>

      <div className="flex-1 flex flex-col bg-white">
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-10">
           <h1 className="text-3xl font-bold mb-8">Discover</h1>
           
           <div className="grid grid-cols-2 gap-6 mb-10">
             <div className="aspect-[4/3] bg-blue-100 rounded-2xl overflow-hidden relative shadow-sm cursor-pointer group">
               <img src="https://picsum.photos/seed/appstore1/600/400" alt="Hero" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
               <div className="absolute top-4 left-4 right-4 text-white drop-shadow-md">
                  <div className="text-xs font-semibold uppercase opacity-90">App of the Day</div>
                  <div className="text-2xl font-bold leading-tight">Procreate</div>
               </div>
             </div>
             <div className="aspect-[4/3] bg-orange-100 rounded-2xl overflow-hidden relative shadow-sm cursor-pointer group">
               <img src="https://picsum.photos/seed/appstore2/600/400" alt="Hero" className="w-full h-full object-cover transition-transform group-hover:scale-105" />
               <div className="absolute top-4 left-4 right-4 text-white drop-shadow-md">
                  <div className="text-xs font-semibold uppercase opacity-90">Game of the Day</div>
                  <div className="text-2xl font-bold leading-tight">Monument Valley</div>
               </div>
             </div>
           </div>

           <div className="flex justify-between items-end border-b border-gray-200 pb-2 mb-4">
             <h2 className="text-xl font-bold text-gray-800">Must-Have Apps</h2>
             <span className="text-sm text-blue-500 cursor-pointer hover:underline">See All</span>
           </div>
           
           <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
              {apps.map(app => (
                <div key={app.id} className="flex items-center gap-4 group cursor-pointer border-b border-gray-100 pb-4 last:border-0">
                  <img src={app.icon} alt="Icon" className="w-16 h-16 rounded-xl shadow-sm border border-gray-200" loading="lazy" />
                  <div className="flex-1 min-w-0">
                     <div className="font-semibold text-gray-800 truncate">{app.title}</div>
                     <div className="text-xs text-gray-500 truncate mb-1">{app.subtitle}</div>
                     <button className="bg-gray-100 hover:bg-gray-200 text-blue-600 text-xs font-bold px-4 py-1 rounded-[24px]">{app.price}</button>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}

// Temporary inline icon for Develop
function MonitorPlay({ size, className }: { size: number, className?: string }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="14" x="2" y="3" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="m10 8 6 4-6 4Z"/></svg>
}
