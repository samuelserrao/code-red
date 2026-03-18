import { Plus, Search, Calendar as CalendarIcon, Clock, Inbox, Flag, List } from 'lucide-react';

export default function Reminders() {
  const tasks = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    title: `Task ${i + 1}`,
    notes: i % 2 === 0 ? 'Remember to check the Phase 3 deployment.' : '',
    completed: i === 1
  }));

  return (
    <div className="w-full h-full flex bg-[#ececec] text-gray-800 overflow-hidden text-sm">
      {/* Sidebar */}
      <div className="w-56 bg-[#e3e3e3] border-r border-gray-300 flex flex-col pt-10 drag-handle shrink-0">
         <div className="px-4 mb-4">
           <div className="relative">
             <Search size={14} className="absolute left-2 top-1.5 text-gray-500" />
             <input type="text" placeholder="Search" className="w-full bg-white/50 border border-gray-300 rounded-md pl-7 pr-2 py-1 outline-none text-sm focus:ring-1 focus:ring-blue-500" />
           </div>
         </div>
         
         <div className="px-3 mb-4 grid grid-cols-2 gap-2">
            <div className="bg-white/50 py-2 px-3 rounded-xl border border-gray-200/50 shadow-sm cursor-pointer hover:bg-white/80">
               <div className="flex justify-between items-start mb-1">
                 <div className="w-8 h-8 rounded-[24px] bg-blue-500 text-white flex items-center justify-center"><CalendarIcon size={16} /></div>
                 <div className="text-xl font-bold">2</div>
               </div>
               <div className="font-semibold text-gray-600">Today</div>
            </div>
            <div className="bg-white/50 py-2 px-3 rounded-xl border border-gray-200/50 shadow-sm cursor-pointer hover:bg-white/80">
               <div className="flex justify-between items-start mb-1">
                 <div className="w-8 h-8 rounded-[24px] bg-red-500 text-white flex items-center justify-center"><Clock size={16} /></div>
                 <div className="text-xl font-bold">0</div>
               </div>
               <div className="font-semibold text-gray-600">Scheduled</div>
            </div>
            <div className="bg-white/50 py-2 px-3 rounded-xl border border-gray-200/50 shadow-sm cursor-pointer hover:bg-white/80">
               <div className="flex justify-between items-start mb-1">
                 <div className="w-8 h-8 rounded-[24px] bg-gray-600 text-white flex items-center justify-center"><Inbox size={16} /></div>
                 <div className="text-xl font-bold">5</div>
               </div>
               <div className="font-semibold text-gray-600">All</div>
            </div>
            <div className="bg-white/50 py-2 px-3 rounded-xl border border-gray-200/50 shadow-sm cursor-pointer hover:bg-white/80">
               <div className="flex justify-between items-start mb-1">
                 <div className="w-8 h-8 rounded-[24px] bg-orange-500 text-white flex items-center justify-center"><Flag size={16} /></div>
                 <div className="text-xl font-bold">1</div>
               </div>
               <div className="font-semibold text-gray-600">Flagged</div>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
            <div className="text-xs font-semibold text-gray-500 px-2 py-1">My Lists</div>
            <div className="flex items-center justify-between px-2 py-1.5 rounded-md hover:bg-gray-300 cursor-pointer">
               <div className="flex items-center gap-2"><List size={16} className="text-blue-500" /> Reminders</div>
               <span className="text-xs text-gray-500">5</span>
            </div>
         </div>
      </div>

      <div className="flex-1 flex flex-col bg-white">
        {/* Main Content */}
        <div className="h-12 flex items-center px-4 justify-between border-b border-gray-100 drag-handle shrink-0">
           <div className="font-bold text-gray-800 text-lg">Reminders</div>
           <Plus size={20} className="text-blue-500 cursor-pointer" />
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
           {tasks.map(task => (
             <div key={task.id} className="flex gap-3 mb-2 border-b border-gray-100 pb-2 group">
                <div className="shrink-0 mt-0.5">
                  <div className={`w-5 h-5 rounded-[24px] border flex items-center justify-center cursor-pointer ${task.completed ? 'bg-blue-500 border-blue-500' : 'border-gray-300 group-hover:border-gray-400'}`}>
                    {task.completed && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`outline-none ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {task.title}
                  </div>
                  {task.notes && (
                    <div className="text-xs text-gray-500 mt-0.5">{task.notes}</div>
                  )}
                </div>
             </div>
           ))}
           
           <div className="flex gap-3 mt-4 text-gray-400 cursor-text">
              <div className="shrink-0 mt-0.5">
                  <Plus size={20} />
              </div>
              <div className="flex-1">New Reminder</div>
           </div>
        </div>
      </div>
    </div>
  );
}
