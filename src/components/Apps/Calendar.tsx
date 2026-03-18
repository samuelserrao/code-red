'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Search } from 'lucide-react';

export default function Calendar() {
  const [currentDate] = useState(new Date());
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - firstDayOfMonth + 1;
    return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null;
  });

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Toolbar */}
      <div className="h-12 border-b border-gray-200 bg-[#f6f6f6] flex items-center px-4 justify-between drag-handle shrink-0">
        <div className="flex gap-4 items-center">
          <div className="text-xl font-semibold text-red-500 pl-16">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </div>
          <div className="flex gap-2 text-gray-400">
            <ChevronLeft size={20} className="hover:text-gray-800 cursor-pointer" />
            <ChevronRight size={20} className="hover:text-gray-800 cursor-pointer" />
          </div>
        </div>
        <div className="flex gap-4 items-center text-gray-500">
          <div className="flex rounded-md border border-gray-300 overflow-hidden text-xs">
            <button className="px-3 py-1 bg-gray-100 border-r border-gray-300">Day</button>
            <button className="px-3 py-1 bg-gray-100 border-r border-gray-300">Week</button>
            <button className="px-3 py-1 bg-white font-medium">Month</button>
            <button className="px-3 py-1 bg-gray-100">Year</button>
          </div>
          <Search size={18} className="hover:text-gray-800 cursor-pointer" />
          <Plus size={20} className="hover:text-gray-800 cursor-pointer" />
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="flex-1 flex flex-col p-4 bg-white">
        <div className="grid grid-cols-7 mb-2 text-right pr-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-xs font-medium text-gray-400 uppercase tracking-widest">{day}</div>
          ))}
        </div>
        <div className="flex-1 grid grid-cols-7 grid-rows-6 border-l border-t border-gray-100">
          {days.map((day, i) => (
            <div key={i} className="border-r border-b border-gray-100 p-2 relative">
              {day && (
                <div className={`absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-[24px] text-sm font-medium ${day === currentDate.getDate() ? 'bg-red-500 text-white' : 'text-gray-700'}`}>
                  {day}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
