'use client';

import { FileText, Type, List, Image as ImageIcon, Layout, Share } from 'lucide-react';

export default function Pages() {
  return (
    <div className="w-full h-full flex flex-col bg-white text-gray-800">
      {/* Toolbar */}
      <div className="h-12 border-b border-gray-200 bg-[#f6f6f6] flex items-center px-4 justify-between drag-handle shrink-0 pl-20">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 px-3 py-1 bg-white border border-gray-300 rounded-md shadow-sm">
             <Layout size={14} className="text-gray-500" />
             <span className="text-xs font-medium">View</span>
          </div>
          <div className="h-6 w-px bg-gray-300 mx-1" />
          <div className="flex gap-1">
             <button className="p-1.5 hover:bg-gray-200 rounded transition-colors"><Type size={16} /></button>
             <button className="p-1.5 hover:bg-gray-200 rounded transition-colors"><ImageIcon size={16} /></button>
             <button className="p-1.5 hover:bg-gray-200 rounded transition-colors"><List size={16} /></button>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <button className="flex items-center gap-1.5 px-3 py-1 hover:bg-gray-200 rounded-md transition-colors text-xs font-medium">
             <Share size={14} />
             Share
           </button>
        </div>
      </div>

      {/* Document Area */}
      <div className="flex-1 overflow-y-auto bg-gray-100 flex justify-center p-12">
        <div className="w-[600px] h-[842px] bg-white shadow-2xl p-16 flex flex-col gap-6">
           <h1 className="text-4xl font-serif text-gray-900 border-b border-gray-100 pb-4">Untitled</h1>
           <p className="text-lg text-gray-600 font-serif leading-relaxed">
             Start typing your new document here in Pages for macOS.
           </p>
           <div className="flex-1 border-2 border-dashed border-gray-100 rounded-xl flex items-center justify-center text-gray-300">
              <FileText size={48} strokeWidth={1} />
           </div>
        </div>
      </div>
    </div>
  );
}
