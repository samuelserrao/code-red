import { Plus, Search, Edit } from 'lucide-react';

export default function Contacts() {
  const letters = ['A', 'B', 'C', 'S'];
  const contacts = [
    { letter: 'A', names: ['Alice Johnson', 'Amy Smith'] },
    { letter: 'B', names: ['Bob Williams', 'Bryan Davis'] },
    { letter: 'C', names: ['Charlie Brown', 'Chris Wilson'] },
    { letter: 'S', names: ['Samuel Serrao'] },
  ];

  return (
    <div className="w-full h-full flex bg-[#ececec] text-gray-800 overflow-hidden text-sm">
      {/* Sidebar - Name List */}
      <div className="w-64 bg-[#e3e3e3] border-r border-gray-300 flex flex-col drag-handle shrink-0">
         <div className="h-14 px-3 flex items-center shrink-0 pl-20">
           <div className="relative w-full">
             <Search size={14} className="absolute left-2 top-1.5 text-gray-500" />
             <input type="text" placeholder="Search" className="w-full bg-white/50 border border-gray-300 rounded-md pl-7 pr-2 py-1 outline-none text-sm focus:ring-1 focus:ring-blue-500" />
           </div>
         </div>
         
         <div className="flex-1 overflow-y-auto">
            {contacts.map(group => (
              <div key={group.letter}>
                <div className="px-4 py-1 bg-gray-200/50 font-semibold text-gray-500 text-xs border-y border-gray-200/50 shadow-sm">{group.letter}</div>
                {group.names.map(name => (
                  <div key={name} className={`px-4 py-1.5 cursor-pointer ${name === 'Samuel Serrao' ? 'bg-blue-500 text-white font-medium' : 'hover:bg-gray-200 text-gray-800'}`}>
                    {name}
                  </div>
                ))}
              </div>
            ))}
         </div>
         
         <div className="h-10 border-t border-gray-300 flex items-center px-4 shrink-0 bg-[#e3e3e3]">
            <Plus size={18} className="text-gray-500 hover:text-gray-800 cursor-pointer" />
         </div>
      </div>

      {/* Main Content - Card */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="h-14 flex items-center px-4 justify-end border-b border-gray-100 drag-handle shrink-0">
           <div className="text-blue-500 font-medium cursor-pointer flex items-center gap-1 hover:opacity-80">
              <Edit size={16} /> Edit
           </div>
        </div>
        
        <div className="flex-1 overflow-y-auto p-12">
            <div className="flex items-center gap-6 mb-10">
               <div className="w-24 h-24 rounded-[24px] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-4xl font-light text-white shadow-inner border border-gray-200">
                  SS
               </div>
               <div>
                  <h1 className="text-3xl font-semibold text-gray-800">Samuel Serrao</h1>
                  <p className="text-gray-500">Developer</p>
               </div>
            </div>

            <div className="max-w-xl border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm">
               <div className="flex border-b border-gray-200">
                  <div className="w-24 px-4 py-3 bg-gray-50 text-right text-gray-500 font-medium text-xs uppercase self-stretch border-r border-gray-200 pt-3.5">Mobile</div>
                  <div className="flex-1 px-4 py-3 text-blue-500 cursor-pointer hover:underline">(555) 123-4567</div>
               </div>
               <div className="flex border-b border-gray-200">
                  <div className="w-24 px-4 py-3 bg-gray-50 text-right text-gray-500 font-medium text-xs uppercase self-stretch border-r border-gray-200 pt-3.5">Email</div>
                  <div className="flex-1 px-4 py-3 text-blue-500 cursor-pointer hover:underline">samuel@example.com</div>
               </div>
               <div className="flex border-b border-gray-200">
                  <div className="w-24 px-4 py-3 bg-gray-50 text-right text-gray-500 font-medium text-xs uppercase self-stretch border-r border-gray-200 pt-3.5">Work</div>
                  <div className="flex-1 px-4 py-3">
                     <div>1 Infinite Loop</div>
                     <div>Cupertino, CA 95014</div>
                     <div>United States</div>
                  </div>
               </div>
               <div className="flex bg-gray-50 px-4 py-3 justify-center gap-4 text-xs font-medium text-gray-600">
                  <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-blue-500"><div className="w-8 h-8 rounded-[24px] bg-blue-100 flex items-center justify-center text-blue-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg></div>Message</div>
                  <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-blue-500"><div className="w-8 h-8 rounded-[24px] bg-blue-100 flex items-center justify-center text-blue-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></div>Call</div>
                  <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-blue-500"><div className="w-8 h-8 rounded-[24px] bg-blue-100 flex items-center justify-center text-blue-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></div>Video</div>
                  <div className="flex flex-col items-center gap-1 cursor-pointer hover:text-blue-500"><div className="w-8 h-8 rounded-[24px] bg-blue-100 flex items-center justify-center text-blue-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>Mail</div>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
}
