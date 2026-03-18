'use client';

import { useState } from 'react';
import { Edit, Video, Info } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isSender: boolean;
}

interface Thread {
  id: number;
  name: string;
  preview: string;
  time: string;
  unread: boolean;
  messages: Message[];
  avatar: string;
}

const INITIAL_THREADS: Thread[] = [
  {
    id: 0,
    name: 'Hazil (CEO)',
    preview: 'Sounds good! See you then.',
    time: 'Now',
    unread: false,
    avatar: 'https://i.pravatar.cc/150?u=Hazil',
    messages: [
      { id: 1, text: 'Hey, are we still on for the integration test at noon?', isSender: false },
      { id: 2, text: 'Yes absolutely. The Phase 3 App Expansion is fully deployed!', isSender: true },
      { id: 3, text: 'Just wrapping up the iMessage UI shell now.', isSender: true },
      { id: 4, text: 'Sounds good! See you then.', isSender: false },
    ]
  },
  {
    id: 1,
    name: 'Sachin',
    preview: 'Haha true 🤣',
    time: '10:42 AM',
    unread: true,
    avatar: 'https://i.pravatar.cc/150?u=Sachin',
    messages: [
      { id: 1, text: 'Did you see the new update?', isSender: false },
      { id: 2, text: 'Yes, looking great!', isSender: true },
      { id: 3, text: 'Haha true 🤣', isSender: false },
    ]
  },
  {
    id: 2,
    name: 'Chaitesh',
    preview: 'Can you send me the files?',
    time: 'Yesterday',
    unread: false,
    avatar: 'https://i.pravatar.cc/150?u=Chaitesh',
    messages: [
      { id: 1, text: 'Can you send me the files?', isSender: false },
    ]
  },
  {
    id: 3,
    name: 'Nisarga',
    preview: 'Got it. See you then!',
    time: '12:00',
    unread: false,
    avatar: 'https://i.pravatar.cc/150?u=Nisarga',
    messages: [
      { id: 1, text: 'Meeting is moved to 3:30 PM today.', isSender: false },
      { id: 2, text: 'Got it. See you then!', isSender: true },
    ]
  },
  {
    id: 4,
    name: 'Aashritha',
    preview: 'FU*K you',
    time: '12:45',
    unread: false,
    avatar: 'https://i.pravatar.cc/150?u=Aashritha2',
    messages: [
      { id: 1, text: 'Are you free at 5:00?', isSender: false },
      { id: 2, text: 'Yes ??', isSender: true },
      { id: 3, text: 'What now', isSender: true },
      { id: 4, text: 'We have nothing to talk', isSender: true },
      { id: 5, text: 'FU*K you', isSender: true },
    ]
  },
  {
    id: 5,
    name: 'Surakshith',
    preview: 'Ohh get the report for meeting ',
    time: '4:30',
    unread: false,
    avatar: 'https://i.pravatar.cc/150?u=Surakshith',
    messages: [
      { id: 1, text: 'What are you doing?', isSender: true },
      { id: 2, text: 'I am working on my project.', isSender: false },
      { id: 3, text: 'ohh get the report for meeting ', isSender: true },
    ]
  },
  {
    id: 6,
    name: 'Moksha(babe)',
    preview: 'Kkk seeya',
    time: 'Today',
    unread: false,
    avatar: 'https://i.pravatar.cc/150?u=Moksha3',
    messages: [
      { id: 1, text: 'hii my love', isSender: true },
      { id: 2, text: 'Should i come to your place at 3:00pm?', isSender: true },
      { id: 3, text: 'Hiii babe.', isSender: false },
      { id: 4, text: 'My mumma is at home , ill call you after she leaves.', isSender: false },
      { id: 5, text: 'Kkk seeya', isSender: false },
    ]
  },
  {
    id: 7,
    name: 'Doctor',
    preview: 'Ohh get the report for meeting ',
    time: '4:30',
    unread: false,
    avatar: 'https://i.pravatar.cc/150?u=Doctor4',
    messages: [
      { id: 1, text: 'Your report has come..', isSender: false },
      { id: 2, text: 'its confirmed that you are having Heart disease..', isSender: false },
      { id: 3, text: 'Ill be sending you a diet chart.. stictly follow it..', isSender: false },
    ]
  },
];

export default function Messages() {
  const [threads, setThreads] = useState<Thread[]>(INITIAL_THREADS);
  const [activeThreadId, setActiveThreadId] = useState<number>(INITIAL_THREADS[0].id);
  const [inputText, setInputText] = useState('');

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    setThreads(prev => prev.map(thread => {
      if (thread.id === activeThreadId) {
        return {
          ...thread,
          preview: inputText,
          messages: [
            ...thread.messages,
            { id: Date.now(), text: inputText, isSender: true }
          ]
        };
      }
      return thread;
    }));
    setInputText('');
  };

  const selectThread = (id: number) => {
    setActiveThreadId(id);
    setThreads(prev => prev.map(t => t.id === id ? { ...t, unread: false } : t));
  };

  return (
    <div className="w-full h-full flex bg-white/95 backdrop-blur-3xl text-gray-800 text-sm overflow-hidden select-none">
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
            <div
              key={thread.id}
              onClick={() => selectThread(thread.id)}
              className={`flex items-center gap-3 px-4 py-3 border-b border-gray-100 cursor-pointer hover:bg-gray-200/50 transition-colors ${thread.id === activeThreadId ? 'bg-blue-500 text-white hover:bg-blue-500' : ''}`}
            >
              <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden bg-gray-200">
                <img src={thread.avatar} alt={thread.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className={`font-semibold truncate ${thread.id === activeThreadId ? 'text-white' : 'text-gray-800'}`}>{thread.name}</span>
                  <span className={`text-[11px] ${thread.id === activeThreadId ? 'text-blue-50' : 'text-gray-500'}`}>{thread.time}</span>
                </div>
                <div className={`truncate text-sm ${thread.id === activeThreadId ? 'text-blue-100' : 'text-gray-500'}`}>{thread.preview}</div>
              </div>
              {thread.unread && thread.id !== activeThreadId && <div className="w-2.5 h-2.5 rounded-[24px] bg-blue-500 ml-2" />}
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="h-12 border-b border-gray-200 bg-[#f6f6f6]/80 backdrop-blur-md flex items-center px-6 justify-between drag-handle shrink-0">
          <div className="font-semibold text-gray-800">{activeThread.name}</div>
          <div className="flex gap-4">
            <Video size={18} className="text-blue-500 cursor-pointer hover:opacity-80" />
            <Info size={18} className="text-blue-500 cursor-pointer hover:opacity-80" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col">
          <div className="text-center text-xs text-gray-400 mb-6 font-medium">{activeThread.time}</div>

          <div className="flex flex-col gap-2 mb-4">
            {activeThread.messages.map((msg, index) => {
              const isNextSameSender = activeThread.messages[index + 1]?.isSender === msg.isSender;
              const isPrevSameSender = activeThread.messages[index - 1]?.isSender === msg.isSender;

              let roundedClassStr = 'rounded-2xl';
              if (msg.isSender) {
                if (isPrevSameSender && isNextSameSender) roundedClassStr = 'rounded-l-2xl rounded-r-sm';
                else if (isPrevSameSender) roundedClassStr = 'rounded-tl-2xl rounded-bl-2xl rounded-tr-sm rounded-br-2xl';
                else if (isNextSameSender) roundedClassStr = 'rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl rounded-br-sm';
                else roundedClassStr = 'rounded-2xl';
              } else {
                if (isPrevSameSender && isNextSameSender) roundedClassStr = 'rounded-r-2xl rounded-l-sm';
                else if (isPrevSameSender) roundedClassStr = 'rounded-tr-2xl rounded-br-2xl rounded-tl-sm rounded-bl-2xl';
                else if (isNextSameSender) roundedClassStr = 'rounded-tr-2xl rounded-br-2xl rounded-tl-2xl rounded-bl-sm';
                else roundedClassStr = 'rounded-2xl';
              }

              if (msg.isSender) {
                return (
                  <div
                    key={msg.id}
                    className={`px-3.5 py-2 w-fit max-w-[70%] text-[15px] leading-tight shadow-sm ${roundedClassStr} bg-blue-500 text-white self-end`}
                  >
                    {msg.text}
                  </div>
                );
              } else {
                return (
                  <div key={msg.id} className="flex gap-2 self-start w-full max-w-[70%]">
                    {!isNextSameSender ? (
                      <div className="w-7 h-7 rounded-full shrink-0 self-end overflow-hidden bg-gray-200">
                        <img src={activeThread.avatar} alt="Profile" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 shrink-0" />
                    )}
                    <div className={`px-3.5 py-2 w-fit text-[15px] leading-tight shadow-sm ${roundedClassStr} bg-[#e9e9eb] text-black`}>
                      {msg.text}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-white">
          <form onSubmit={handleSendMessage} className="relative">
            <input
              type="text"
              placeholder="iMessage"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full border border-gray-300 rounded-[24px] pl-4 pr-10 py-1.5 outline-none focus:border-blue-500 transition-colors bg-white text-gray-900"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="absolute right-1.5 top-1 w-7 h-7 bg-blue-500 rounded-[24px] flex items-center justify-center cursor-pointer hover:bg-blue-600 disabled:opacity-50 disabled:cursor-default"
            >
              <svg className="w-3.5 h-3.5 text-white ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
