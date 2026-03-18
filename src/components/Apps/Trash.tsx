import { Trash2 } from 'lucide-react';

export default function Trash() {
  return (
    <div className="w-full h-full flex flex-col bg-white text-gray-800 text-[13px]">
      {/* Toolbar */}
      <div className="h-14 border-b border-gray-200 bg-[#f6f6f6] flex items-center px-4 drag-handle shrink-0 pl-20">
         <div className="font-semibold text-gray-700 ml-4">Trash</div>
         <button className="ml-auto bg-white border border-gray-300 shadow-sm rounded-md px-3 py-1 text-sm font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors">
            Empty
         </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white">
         <div className="w-32 h-32 mb-4 opacity-20">
            <Trash2 size={128} className="text-gray-500" strokeWidth={1} />
         </div>
         <h2 className="text-xl font-medium text-gray-400">Trash is empty</h2>
      </div>
      
      {/* Status Bar */}
      <div className="h-6 border-t border-gray-200 bg-white flex items-center justify-center shrink-0">
         <span className="text-gray-400">0 items</span>
      </div>
    </div>
  );
}
