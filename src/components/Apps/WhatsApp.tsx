/* eslint-disable @next/next/no-img-element */
'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, MoreVertical, Paperclip, Smile, Send, Video, Phone } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'other';
  time: string;
}

interface Chat {
  id: string;
  name: string;
  avatarColor: string;
  avatarLetter: string;
  messages: Message[];
  online: boolean;
}

const INITIAL_CHATS: Chat[] = [
  {
    id: 'apple-fan',
    name: 'Apple Fan',
    avatarColor: 'bg-green-500',
    avatarLetter: 'A',
    online: true,
    messages: [
      { id: '1', text: 'Hey there! Is this the new macOS clone?', sender: 'other', time: '10:00 AM' },
      { id: '2', text: 'Yes it is! Built with Next.js and Tailwind.', sender: 'me', time: '10:02 AM' },
    ]
  },
  {
    id: 'craig',
    name: 'Craig F.',
    avatarColor: 'bg-blue-500',
    avatarLetter: 'C',
    online: true,
    messages: [
      { id: '1', text: 'Hair force one is cleared for takeoff.', sender: 'other', time: '09:41 AM' },
      { id: '2', text: 'Ready when you are.', sender: 'me', time: '09:45 AM' },
    ]
  },
  {
    id: 'tim',
    name: 'Tim C.',
    avatarColor: 'bg-zinc-800',
    avatarLetter: 'T',
    online: false,
    messages: [
      { id: '1', text: 'Good morning!', sender: 'other', time: '07:00 AM' },
      { id: '2', text: 'We have big things coming today.', sender: 'other', time: '07:01 AM' },
    ]
  },
  {
    id: 'phil',
    name: 'Phil S.',
    avatarColor: 'bg-orange-500',
    avatarLetter: 'P',
    online: true,
    messages: [
      { id: '1', text: 'Did you see the new camera features?', sender: 'other', time: '11:15 AM' },
      { id: '2', text: 'Stunning.', sender: 'other', time: '11:16 AM' },
    ]
  },
  {
    id: 'eddy',
    name: 'Eddy C.',
    avatarColor: 'bg-rose-500',
    avatarLetter: 'E',
    online: false,
    messages: [
      { id: '1', text: 'The Music app looks great.', sender: 'other', time: 'Yesterday' },
      { id: '2', text: 'Let me know if you need anything from the content team.', sender: 'other', time: 'Yesterday' },
    ]
  }
];

export default function WhatsApp() {
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
  const [activeChatId, setActiveChatId] = useState<string>('apple-fan');
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat.messages]);

  // Load from local storage gracefully
  useEffect(() => {
    const saved = localStorage.getItem('whatsapp-multi-chats');
    if (saved) {
      try {
        setChats(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse chats', e);
      }
    } else {
      localStorage.setItem('whatsapp-multi-chats', JSON.stringify(INITIAL_CHATS));
    }
    
    // Attempt to sync the global 'apple-fan' chat with supabase if available
    async function syncSupabase() {
      if (!supabase) return;
      const { data, error } = await supabase.from('messages').select('*').order('created_at', { ascending: true });
      if (!error && data && data.length > 0) {
        setChats(prev => {
           const mapped = data.map(d => ({
             id: d.id, text: d.text, sender: d.sender, 
             time: new Date(d.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
           }));
           return prev.map(chat => chat.id === 'apple-fan' ? { ...chat, messages: mapped } : chat);
        });
      }
    }
    syncSupabase();
  }, []);

  const handleSend = async () => {
    if (!inputVal.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputVal,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    // Optimistic Update
    const updatedChats = chats.map(chat => {
      if (chat.id === activeChatId) {
        return { ...chat, messages: [...chat.messages, newMessage] };
      }
      return chat;
    });
    
    setChats(updatedChats);
    setInputVal('');
    localStorage.setItem('whatsapp-multi-chats', JSON.stringify(updatedChats));

    if (supabase && activeChatId === 'apple-fan') {
       await supabase.from('messages').insert([{ text: newMessage.text, sender: 'me' }]);
    }

    // Simulate auto-reply based on who we are talking to
    setTimeout(async () => {
      let replyText = 'That looks awesome! 🚀';
      if (activeChatId === 'craig') replyText = 'Let us completely bake this feature into the OS.';
      if (activeChatId === 'tim') replyText = 'I think you are going to love it.';
      if (activeChatId === 'phil') replyText = 'This is the most powerful feature we have ever built.';
      if (activeChatId === 'eddy') replyText = 'This syncs perfectly across all our services.';

      const replyMsg: Message = {
          id: (Date.now() + 1).toString(),
          text: replyText,
          sender: 'other',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setChats(prev => {
        const afterReply = prev.map(chat => {
          if (chat.id === activeChatId) return { ...chat, messages: [...chat.messages, replyMsg] };
          return chat;
        });
        localStorage.setItem('whatsapp-multi-chats', JSON.stringify(afterReply));
        return afterReply;
      });

      if (supabase && activeChatId === 'apple-fan') {
        await supabase.from('messages').insert([{ text: replyText, sender: 'other' }]);
      }
    }, 1500);
  };

  return (
    <div className="w-full h-full flex bg-[#efeae2] text-gray-800 font-sans">
      {/* Left Pane: Chat List */}
      <div className="w-[320px] bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="h-16 bg-gray-50 flex items-center justify-between px-4 border-b border-gray-200 shrink-0">
          <div className="w-10 h-10 rounded-[24px] bg-gray-300 overflow-hidden flex items-center justify-center text-gray-500 font-bold">
            ME
          </div>
          <div className="flex gap-4 text-gray-500">
            <MoreVertical size={20} className="cursor-pointer hover:text-gray-800 transition-colors" />
          </div>
        </div>
        
        <div className="p-2 border-b border-gray-200 shrink-0">
          <div className="bg-gray-100 rounded-lg flex items-center px-3 py-1.5 h-9">
            <Search size={16} className="text-gray-500 mr-2" />
            <input type="text" placeholder="Search or start new chat" className="bg-transparent text-sm w-full outline-none" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.map(chat => {
            const lastMsg = chat.messages[chat.messages.length - 1];
            return (
              <div 
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className={`flex items-center px-3 py-3 hover:bg-gray-50 cursor-pointer ${activeChatId === chat.id ? 'bg-gray-100' : 'bg-white'}`}
              >
                <div className={`w-12 h-12 rounded-[24px] ${chat.avatarColor} shrink-0 text-white flex items-center justify-center font-bold text-lg`}>
                  {chat.avatarLetter}
                </div>
                <div className="ml-3 flex-1 border-b border-gray-100 pb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-[15px]">{chat.name}</span>
                    <span className="text-xs text-gray-500">{lastMsg?.time || ''}</span>
                  </div>
                  <div className="text-[13px] text-gray-500 truncate w-[200px]">
                    {lastMsg?.text || 'No messages'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Pane: Active Chat */}
      <div className="flex-1 flex flex-col relative w-full overflow-hidden bg-[#efeae2]">
        {/* Chat Header */}
        <div className="h-16 bg-gray-50 flex items-center px-4 border-b border-gray-200 justify-between shrink-0 absolute top-0 left-0 right-0 z-10">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-[24px] ${activeChat.avatarColor} text-white flex items-center justify-center font-bold`}>
              {activeChat.avatarLetter}
            </div>
            <div>
              <div className="font-semibold text-[15px]">{activeChat.name}</div>
              <div className="text-xs text-gray-500">{activeChat.online ? 'online' : 'offline'}</div>
            </div>
          </div>
          <div className="flex gap-5 text-gray-500">
            <Video size={20} className="cursor-pointer hover:text-gray-800 transition-colors" />
            <Phone size={20} className="cursor-pointer hover:text-gray-800 transition-colors" />
            <Search size={20} className="cursor-pointer hover:text-gray-800 transition-colors" />
          </div>
        </div>

        {/* Chat Messages */}
        <div 
          className="flex-1 overflow-y-auto p-8 flex flex-col gap-[10px] mt-16 mb-16"
          style={{ backgroundImage: 'url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)', backgroundSize: 'contain' }}
        >
          {activeChat.messages.map((m) => (
            <div key={m.id} className={`max-w-[75%] rounded-lg p-2 px-3 shadow-sm relative text-[14px] leading-relaxed ${m.sender === 'me' ? 'bg-[#d9fdd3] self-end rounded-tr-none' : 'bg-white self-start rounded-tl-none'}`}>
              <div className="pr-[40px] pb-[6px]">{m.text}</div>
              <div className="text-[10px] text-gray-500 absolute bottom-1 right-2">{m.time}</div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="h-16 bg-gray-50 px-4 flex items-center gap-4 shrink-0 absolute bottom-0 left-0 right-0 z-10">
          <Smile size={24} className="text-gray-500 cursor-pointer hover:text-gray-800 transition-colors" />
          <Paperclip size={24} className="text-gray-500 cursor-pointer hover:text-gray-800 transition-colors" />
          <div className="flex-1 bg-white rounded-lg h-10 flex border border-gray-200 shadow-sm overflow-hidden">
            <input 
              type="text" 
              placeholder={`Message ${activeChat.name}`} 
              className="w-full h-full px-4 outline-none text-sm"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
          </div>
          <Send size={24} className="text-gray-500 cursor-pointer hover:text-gray-800 transition-colors" onClick={handleSend} />
        </div>
      </div>
    </div>
  );
}
