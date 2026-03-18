import { Edit, Video, Info } from 'lucide-react';

export default function Messages() {
  const threads = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    name: `Contact ${i + 1}`,
    preview: i % 2 === 0 ? 'Sounds good! See you then.' : 'Haha true 🤣',
    time: i === 0 ? 'Now' : '10:42 AM',
    unread: i === 0
  }));

  return (
    <div className="w-full h-full flex bg-white/95 backdrop-blur-3xl text-gray-800 text-sm overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 bg-[#f5f5f5]/80 border-r border-gray-200 flex flex-col pt-10 drag-handle shrink-0">
         <div className="px-4 mb-2 flex justify-between items-center">
            <h2 className="font-semibold text-gray-700 text-lg">Messages</h2>
            <Edit size={18} className="text-blue-500 cursor-pointer hover:opacity-80" />
         </div>
         <div className="px-4 mb-4">
           <input type="text" placeholder="Search" className="w-full bg-gray-200/50 border border-gray-300 rounded-md px-2 py-1 outline-none text-sm focus:ring-1 focus:ring-blue-500" />
         </div>
         <div className="flex-1 overflow-y-auto">
            {threads.map(thread => (
              <div key={thread.id} className={`flex items-center gap-3 px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-200/50 transition-colors ${thread.id === 0 ? 'bg-blue-500 text-white hover:bg-blue-500' : ''}`}>
                 <div className="w-10 h-10 rounded-[24px] bg-gradient-to-br from-gray-300 to-gray-400 shrink-0" />
                 <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                       <span className={`font-semibold truncate ${thread.id === 0 ? 'text-white' : 'text-gray-800'}`}>{thread.name}</span>
                       <span className={`text-xs ${thread.id === 0 ? 'text-blue-100' : 'text-gray-400'}`}>{thread.time}</span>
                    </div>
                    <div className={`truncate text-sm ${thread.id === 0 ? 'text-blue-50' : 'text-gray-500'}`}>{thread.preview}</div>
                 </div>
                 {thread.unread && thread.id !== 0 && <div className="w-2.5 h-2.5 rounded-[24px] bg-blue-500 ml-2" />}
              </div>
            ))}
         </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
         <div className="h-12 border-b border-gray-200 bg-[#f6f6f6]/80 backdrop-blur-md flex items-center px-6 justify-between drag-handle shrink-0">
           <div className="font-semibold text-gray-800">Contact 1</div>
           <div className="flex gap-4">
             <Video size={18} className="text-blue-500 cursor-pointer hover:opacity-80" />
             <Info size={18} className="text-blue-500 cursor-pointer hover:opacity-80" />
           </div>
         </div>
         
         <div className="flex-1 overflow-y-auto p-4 flex flex-col">
           <div className="text-center text-xs text-gray-400 mb-6">Today 9:41 AM</div>
           
           <div className="flex flex-col gap-2 mb-4">
              <div className="bg-gray-200 text-black px-4 py-2 rounded-2xl w-fit max-w-[70%] rounded-tl-sm self-start">
                Hey, are we still on for the integration test at noon?
              </div>
              <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl w-fit max-w-[70%] rounded-br-sm self-end">
                Yes absolutely. The Phase 3 App Expansion is fully deployed!
              </div>
              <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl w-fit max-w-[70%] rounded-tr-sm self-end">
                Just wrapping up the iMessage UI shell now.
              </div>
              <div className="bg-gray-200 text-black px-4 py-2 rounded-2xl w-fit max-w-[70%] rounded-bl-sm self-start">
                Sounds good! See you then.
              </div>
           </div>
         </div>

         <div className="p-4 border-t border-gray-100">
           <div className="relative">
             <input 
               type="text" 
               placeholder="iMessage" 
               className="w-full border border-gray-300 rounded-[24px] pl-4 pr-10 py-2 outline-none focus:border-blue-500 transition-colors"
             />
             <div className="absolute right-2 top-1.5 w-7 h-7 bg-blue-500 rounded-[24px] flex items-center justify-center cursor-pointer hover:bg-blue-600">
               <svg className="w-4 h-4 text-white ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
}
