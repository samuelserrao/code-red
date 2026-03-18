import { Activity, Cpu, MemoryStick, HardDrive, Wifi, Settings2, Plus, Info, XCircle } from 'lucide-react';

export default function ActivityMonitor() {
  const processes = Array.from({ length: 20 }, (_, i) => ({
    id: i + 100,
    name: i === 0 ? 'WindowServer' : i === 1 ? 'kernel_task' : i === 2 ? 'Google Chrome Helper' : `Process ${i}`,
    cpu: (i % 5 === 0 ? 5.2 : 0.1).toFixed(1),
    threads: (i * 2 + 10),
    idle: i === 1 ? 0 : 50 + i,
    user: i === 0 ? 'samuel' : i === 1 ? 'root' : 'samuel'
  }));

  return (
    <div className="w-full h-full flex flex-col bg-white text-gray-800 text-[13px] overflow-hidden">
      {/* Toolbar */}
      <div className="h-14 border-b border-gray-200 bg-[#f6f6f6] flex items-center px-4 justify-between drag-handle shrink-0 pl-20">
         <div className="flex gap-3">
            <XCircle size={18} className="text-gray-400 hover:text-red-500 cursor-pointer transition-colors" />
            <Info size={18} className="text-gray-500 hover:text-gray-800 cursor-pointer" />
            <Settings2 size={18} className="text-gray-500 hover:text-gray-800 cursor-pointer" />
         </div>
         
         <div className="flex bg-white rounded-md border border-gray-300 overflow-hidden text-xs text-gray-600 shadow-sm">
            <button className="px-4 py-1.5 bg-gray-50 font-medium">CPU</button>
            <button className="px-4 py-1.5 bg-white border-x border-gray-300">Memory</button>
            <button className="px-4 py-1.5 bg-white border-r border-gray-300">Energy</button>
            <button className="px-4 py-1.5 bg-white border-r border-gray-300">Disk</button>
            <button className="px-4 py-1.5 bg-white">Network</button>
         </div>

         <div className="flex items-center gap-2">
            <Plus size={18} className="text-gray-500 hover:text-gray-800 cursor-pointer" />
         </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 bg-white">
        {/* Table Header */}
        <div className="flex items-center px-4 py-1 border-b border-gray-200 bg-white font-medium text-xs text-gray-500">
           <div className="flex-[3]">Process Name</div>
           <div className="flex-1 text-right">% CPU</div>
           <div className="flex-1 text-right">CPU Time</div>
           <div className="flex-1 text-right">Threads</div>
           <div className="flex-1 text-right">Idle Wake Ups</div>
           <div className="flex-1 text-right">PID</div>
           <div className="flex-1 pl-4">User</div>
        </div>

        {/* Table Body */}
        <div className="flex-1 overflow-y-auto">
           {processes.map((proc, i) => (
             <div key={proc.id} className={`flex items-center px-4 py-1 text-xs hover:bg-blue-50 cursor-default ${i % 2 === 0 ? 'bg-gray-50/50' : 'bg-white'}`}>
                <div className="flex-[3] truncate font-medium text-gray-800">{proc.name}</div>
                <div className="flex-1 text-right font-mono">{proc.cpu}</div>
                <div className="flex-1 text-right font-mono">0:01.{10 + i}</div>
                <div className="flex-1 text-right">{proc.threads}</div>
                <div className="flex-1 text-right">{proc.idle}</div>
                <div className="flex-1 text-right">{proc.id}</div>
                <div className="flex-1 pl-4 truncate text-gray-600">{proc.user}</div>
             </div>
           ))}
        </div>
      </div>

      {/* Footer Graphs */}
      <div className="h-24 border-t border-gray-200 bg-[#f6f6f6] flex items-center px-4 shrink-0 drag-handle">
         <div className="flex-1 grid grid-cols-3 gap-8">
            <div className="flex flex-col text-xs text-gray-600 space-y-1">
               <div className="flex justify-between"><span>System:</span><span className="font-mono text-red-500">2.14%</span></div>
               <div className="flex justify-between"><span>User:</span><span className="font-mono text-blue-500">4.18%</span></div>
               <div className="flex justify-between"><span>Idle:</span><span className="font-mono text-gray-500">93.68%</span></div>
            </div>
            <div className="col-span-2 flex items-center justify-center">
               <div className="w-full h-16 bg-black rounded-lg border border-black overflow-hidden relative shadow-inner">
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(rgba(0,255,0,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,0,0.2) 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
                  {/* Mock graph line */}
                  <svg className="absolute bottom-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                     <path d="M0 100 L0 80 L10 70 L20 85 L30 60 L40 75 L50 40 L60 55 L70 30 L80 45 L90 20 L100 35 L100 100 Z" fill="rgba(59,130,246,0.5)" />
                     <path d="M0 80 L10 70 L20 85 L30 60 L40 75 L50 40 L60 55 L70 30 L80 45 L90 20 L100 35" fill="none" stroke="#3b82f6" strokeWidth="2" />
                  </svg>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}
