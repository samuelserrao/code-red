'use client';

import { useState, useEffect } from 'react';

export default function Notes() {
  const [content, setContent] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('macos-notes');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (saved) setContent(saved);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    localStorage.setItem('macos-notes', e.target.value);
  };

  return (
    <div className="w-full h-full flex bg-[#f7f7f7] text-gray-800">
      {/* Sidebar */}
      <div className="w-48 border-r border-gray-200 flex flex-col pt-4">
        <div className="px-4 text-xs font-semibold text-gray-500 mb-2">iCloud</div>
        <div className="px-4 py-1 bg-[#e4e4e4] rounded text-sm font-medium mx-2 cursor-pointer">All iCloud</div>
      </div>
      {/* Main Area */}
      <div className="flex-1 flex flex-col relative px-8 py-6 max-w-2xl mx-auto">
        <textarea
          className="w-full h-full bg-transparent outline-none resize-none text-[15px] leading-relaxed"
          placeholder="New Note..."
          value={content}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
