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
    name: 'Sachin',
    preview: 'You chill. Not everything',
    time: '24 March',
    unread: true,
    avatar: '/photos/sachin.jpeg',
    messages: [
      { id: 1, text: "That meeting was wild ngl. Didn't expect them to go at you like that.", isSender: false },
      { id: 2, text: 'Yeah', isSender: true },
      { id: 3, text: "Felt off though. Like that didn't look natural at all. Nobody just switches up like that suddenly. They came prepared to oppose you. That wasn't random.", isSender: false },
      { id: 4, text: "Doesn't matter", isSender: true },
      { id: 5, text: "Nah bro , think abt it You're just letting it slide like they didn't just try to make you look bad in front of everyone.You always do this. Someone disrespects you and you just brush it off. At some point you gotta call it out.", isSender: false },
      { id: 6, text: "Why are you dragging this? I already said I'm not dealing with it right now.", isSender: true },
      { id: 7, text: "No, you're not “just saying.” You keep pushing the same thing like I didn't understand it the first time.", isSender: true },
      { id: 8, text: "I'm trying to help you see—", isSender: false },
      { id: 9, text: "I can see just fine. Stop acting like I need you to explain everything.", isSender: true },
      { id: 10, text: "Alright man, chill.", isSender: false },
      { id: 11, text: 'You chill. Not everything needs your commentary.', isSender: true },
    ]
  },
  {
    id: 1,
    name: 'Chaitesh',
    preview: "As if i'm dying to talk to youh",
    time: '24 March',
    unread: false,
    avatar: '/photos/chaithesh.jpeg',
    messages: [
      { id: 1, text: "Hey, about today's meeting", isSender: false },
      { id: 2, text: "What now", isSender: true },
      { id: 3, text: "I think things got a bit out of hand", isSender: false },
      { id: 4, text: "You think?", isSender: true },
      { id: 5, text: "I mean… I was just pointing out issues. It wasn't meant to turn into that", isSender: false },
      { id: 6, text: "Sure.", isSender: true },
      { id: 7, text: "Why are you acting like I did something wrong? I just said what I thought", isSender: false },
      { id: 8, text: "You said enough.", isSender: true },
      { id: 9, text: "Okay but don't make it sound like I attacked you or something. That wasn't the intention", isSender: false },
      { id: 10, text: "Felt like it.", isSender: true },
      { id: 11, text: "That's not fair. Everyone was already questioning it, I just spoke up", isSender: false },
      { id: 12, text: "Then stand by it.", isSender: true },
      { id: 13, text: "I am. I'm just saying it escalated more than it should've", isSender: false },
      { id: 14, text: "That's on you.", isSender: true },
      { id: 15, text: "Wow, okay. So now it's entirely my fault?", isSender: false },
      { id: 16, text: "You chose to speak.", isSender: true },
      { id: 17, text: "You're the one who started it in the first place.", isSender: true },
      { id: 18, text: "Oh please", isSender: false },
      { id: 19, text: "Like you didn't see it coming", isSender: false },
      { id: 20, text: "I said what everyone was thinking", isSender: false },
      { id: 21, text: "Don't act like you're above everyone else", isSender: false },
      { id: 22, text: "At least I dont jump in just to create a scene", isSender: true },
      { id: 23, text: "Wow!!", isSender: false },
      { id: 24, text: "Now I'm the problem!?", isSender: false },
      { id: 25, text: "YES!!", isSender: true },
      { id: 26, text: "YOU ARE", isSender: true },
      { id: 27, text: "Unbelievable", isSender: false },
      { id: 28, text: "DON'T TEXT ME ABOUT THIS AGAIN.", isSender: true },
      { id: 29, text: "JUST STAY OUT OF MY WAY.", isSender: true },
      { id: 30, text: "As if i'm dying to talk to youh", isSender: false },
    ]
  },
  {
    id: 2,
    name: 'Nisarga',
    preview: "Yeah.. maybe I should've",
    time: '24 March',
    unread: false,
    avatar: '/photos/Nisarga.jpeg',
    messages: [
      { id: 1, text: "Hey… about what happened in the meeting today", isSender: false },
      { id: 2, text: "What now?", isSender: true },
      { id: 3, text: "Can we talk for a bit?", isSender: false },
      { id: 4, text: "About?", isSender: true },
      { id: 5, text: "I feel like things got out of hand. It wasn't supposed to go like that.", isSender: false },
      { id: 6, text: "You said what you wanted to.", isSender: true },
      { id: 7, text: "No, that's not what I mean. I just… I didn't expect it to turn into that.", isSender: false },
      { id: 8, text: "It already did.", isSender: true },
      { id: 9, text: "Yeah I know, I just don't want you to think I was trying to attack you or anything", isSender: false },
      { id: 10, text: "Looked like it.", isSender: true },
      { id: 11, text: "It wasn't personal, I swear. I thought I was raising a valid concern", isSender: false },
      { id: 12, text: "You made your point.", isSender: true },
      { id: 13, text: "Still… it didn't feel right after. The way it escalated", isSender: false },
      { id: 14, text: "Then you should've stopped.", isSender: true },
      { id: 15, text: "Yeah.. maybe I should've", isSender: false },
    ]
  },
  {
    id: 3,
    name: 'Divya',
    preview: "I'm just trying to help u unlike",
    time: '24 March',
    unread: false,
    avatar: '/photos/Divya.jpeg',
    messages: [
      { id: 1, text: 'Hey u fine🙂', isSender: false },
      { id: 2, text: 'That meeting was messy today', isSender: false },
      { id: 3, text: "Yeah... didn't expect that reactio from them", isSender: true },
      { id: 4, text: "Same...", isSender: false },
      { id: 5, text: "I honestly didn't like what happened in that meeting today. The way they spoke to you was completely out of line. You put in all that effort and they just shut it down like it meant nothing. It didn't feel like professional criticism at all, it felt personal.", isSender: false },
      { id: 6, text: 'Yeah...It was a bit too much', isSender: true },
      { id: 7, text: "That meeting was actually so messed up. Like who do they think they are talking to you like that? It was straight up disrespectful and honestly embarrassing to watch. You were the only one making sense and they just kept interrupting like they had something to prove.", isSender: false },
      { id: 8, text: "It's Fine...", isSender: true },
      { id: 9, text: "No it's not fine. They were clearly trying to bring you down for no reason. You did nothing wrong, they just can't handle that you're better than them.", isSender: false },
      { id: 10, text: "okay...👍", isSender: true },
      { id: 11, text: "You're just saying that but I could literally see you were affected. You went completely quiet after that. Don't pretend like it didn't get to you.", isSender: false },
      { id: 12, text: "It's okay I'm good..", isSender: true },
      { id: 13, text: "You're not good. You looked stressed as hell. This kind of pressure isn't good for you, especially right now.", isSender: false },
      { id: 14, text: "I said ur right.. I AM FINE", isSender: true },
      { id: 15, text: "Not everything need ur input it's actually annoying.", isSender: true },
      { id: 16, text: "I'm just trying to help u unlike those idiots from the meeting", isSender: false },
    ]
  },
  {
    id: 4,
    name: 'Surakshith',
    preview: 'They got quiet when I walked in',
    time: '23 March',
    unread: false,
    avatar: '/photos/Surakshith.jpeg',
    messages: [
      { id: 1, text: "Hey", isSender: false },
      { id: 2, text: "Yeah", isSender: true },
      { id: 3, text: "Are you presenting tomorrow?", isSender: false },
      { id: 4, text: "Yeah", isSender: true },
      { id: 5, text: "Okay… just asking", isSender: false },
      { id: 6, text: "Why", isSender: true },
      { id: 7, text: "Nothing serious… just felt like people were talking about it a lot today", isSender: false },
      { id: 8, text: "They always do", isSender: true },
      { id: 9, text: "Yeah but this felt different", isSender: false },
      { id: 10, text: "How", isSender: true },
      { id: 11, text: "Not sure… just more intense than usual", isSender: false },
      { id: 12, text: "Hmm", isSender: true },
      { id: 13, text: "So?", isSender: true },
      { id: 14, text: "Nothing… just thought I'd mention", isSender: false },
      { id: 15, text: "They seemed kinda sure about what they were going to say", isSender: false },
      { id: 16, text: "Let them", isSender: true },
      { id: 17, text: "Yeah… you'll handle it anyway", isSender: false },
      { id: 18, text: "Obviously", isSender: true },
      { id: 19, text: "Alright", isSender: false },
      { id: 20, text: "Still feels weird though", isSender: false },
      { id: 21, text: "Hope I'm overthinking it", isSender: false },
      { id: 22, text: "They got quiet when I walked in", isSender: false },
    ]
  },
  {
    id: 5,
    name: 'Moksha(babe)',
    preview: '😭😭😭',
    time: '21 March',
    unread: false,
    avatar: '/photos/Moksha.jpeg',
    messages: [
      { id: 1, text: 'hii my love', isSender: true },
      { id: 2, text: 'Should i come to your place at 3:00pm?', isSender: true },
      { id: 3, text: "I don't wanna talk to you😡😡..", isSender: false },
      { id: 4, text: 'Stop defending yourself', isSender: false },
      { id: 5, text: 'Plzz leave me alone😭🙏...', isSender: false },
      { id: 6, text: 'Plzz listen for once... we can sort things..', isSender: true },
      { id: 7, text: '😭😭😭', isSender: true },
      { id: 8, text: 'plzzzzzz receive the call', isSender: true },
      { id: 9, text: 'Yeah ikik i fucked up but i can explain', isSender: true },
      { id: 10, text: "Yeah ik ur mad at me rn... but not everthing u see is what it seems", isSender: true },
      { id: 11, text: "there's nothing between me and her...we are just friends", isSender: true },
      { id: 12, text: "Stop it i won't fall for these lies again", isSender: false },
      { id: 13, text: "u think u can fool me again as u did before😭😭", isSender: false },
      { id: 14, text: "it's not like what your thinking...", isSender: true },
      { id: 15, text: "I just went to her home as i was working on her project and uk that😭", isSender: true },
      { id: 16, text: "Plzz Stop it.. i don't wanna talk to u rn", isSender: false },
      { id: 17, text: "I'll come back to u if i feel so", isSender: false },
      { id: 18, text: "😭😭😭", isSender: true },
    ]
  },
  {
    id: 6,
    name: 'Hazil (CEO)',
    preview: 'Good Night😘💋',
    time: '20 March',
    unread: false,
    avatar: '/photos/Hazil.jpeg',
    messages: [
      { id: 1, text: 'Great presentation today. You always know how to impress a room', isSender: false },
      { id: 2, text: 'Coming from you, that means a lot :)', isSender: true },
      { id: 3, text: "I mean it. You're... different from the rest ", isSender: false },
      { id: 4, text: "Still at the office?", isSender: false },
      { id: 5, text: "Yeah. Wrapping up the AI module", isSender: true },
      { id: 6, text: "You work too hard", isSender: false },
      { id: 7, text: "Only beacuse someone keeps rasing the bar", isSender: true },
      { id: 8, text: "Careful... i might think you're trying to impress me 😉", isSender: false },
      { id: 9, text: "You looked... distracted in the meeting today", isSender: true },
      { id: 10, text: "Maybe I was", isSender: false },
      { id: 11, text: "By what?", isSender: true },
      { id: 12, text: "You 😘", isSender: false },
      { id: 13, text: "That meeting was exhausting", isSender: false },
      { id: 14, text: "Come by my cabin next time", isSender: true },
      { id: 15, text: "That's exactly what we shouldn't do", isSender: false },
      { id: 16, text: "Didn't say we shouldn't", isSender: true },
      { id: 17, text: "Last night... we can't let that happen again", isSender: false },
      { id: 18, text: "...Do you regret it?", isSender: true },
      { id: 19, text: "No", isSender: false },
      { id: 20, text: "You changed your seat in the meeting", isSender: true },
      { id: 21, text: "Better view", isSender: false },
      { id: 22, text: "Of the presentation?", isSender: true },
      { id: 23, text: "Not exactly🤭", isSender: false },
      { id: 24, text: "You enjoy this a little too much", isSender: false },
      { id: 25, text: "Only when you react like that", isSender: true },
      { id: 26, text: "I don't react", isSender: false },
      { id: 27, text: "You just did😂", isSender: true },
      { id: 28, text: "i should probably keep some distance", isSender: false },
      { id: 29, text: "You won't", isSender: true },
      { id: 30, text: "Oh?", isSender: false },
      { id: 31, text: "You like breaking your own rules...", isSender: true },
      { id: 32, text: "Last night..", isSender: true },
      { id: 33, text: "Don't..", isSender: false },
      { id: 34, text: "You didn't seem like you wanted me to stop", isSender: true },
      { id: 35, text: "I didn't", isSender: false },
      { id: 36, text: "Delete our chats", isSender: false },
      { id: 37, text: "You came to my cabin... you knew what you were doing", isSender: true },
      { id: 38, text: "I shouldn't have stayed", isSender: false },
      { id: 39, text: "But you did", isSender: true },
      { id: 40, text: "Close the door next time", isSender: false },
      { id: 41, text: "Next time??🤭", isSender: true },
      { id: 42, text: "...you're impossible", isSender: false },
      { id: 43, text: "Delete our chats...", isSender: false },
      { id: 44, text: "You're scared", isSender: true },
      { id: 45, text: "I have a reputation to protect", isSender: false },
      { id: 46, text: "And I don't?", isSender: true },
      { id: 47, text: "No one can know about us", isSender: false },
      { id: 48, text: "They won't..", isSender: true },
      { id: 49, text: "You promise?", isSender: false },
      { id: 50, text: "I don't make promises I can't keep", isSender: true },
      { id: 51, text: "Your AI project.. does it store internal data?", isSender: false },
      { id: 52, text: "Why?", isSender: true },
      { id: 53, text: "Just answer", isSender: false },
      { id: 54, text: "...It logs everything", isSender: true },
      { id: 55, text: "Everything??", isSender: false },
      { id: 56, text: "Messages, access logs... even deleted data", isSender: true },
      { id: 57, text: "If this gets out, I'm finished", isSender: false },
      { id: 58, text: "Then we don't let it get out", isSender: true },
      { id: 59, text: "She's trying really hard lately", isSender: false },
      { id: 60, text: "She always does", isSender: true },
      { id: 61, text: "It's obvious", isSender: false },
      { id: 62, text: "Does it bother you?", isSender: true },
      { id: 63, text: "Not really", isSender: false },
      { id: 64, text: "Liar", isSender: true },
      { id: 65, text: "She laughed a little too much at your joke", isSender: false },
      { id: 66, text: "It wasn't that funny", isSender: true },
      { id: 67, text: "I know", isSender: false },
      { id: 68, text: "Then why are you annoyed?", isSender: true },
      { id: 69, text: "I'm not annoyed", isSender: false },
      { id: 70, text: "You're texting me about it", isSender: true },
      { id: 71, text: "Don't let her hang around your cabim", isSender: false },
      { id: 72, text: "You jealous?", isSender: true },
      { id: 73, text: "No", isSender: false },
      { id: 74, text: "Say it properly", isSender: true },
      { id: 75, text: "...A little", isSender: false },
      { id: 76, text: "She looks at you like she owns you", isSender: false },
      { id: 77, text: "And you?", isSender: true },
      { id: 78, text: "I just don't like sharing", isSender: false },
      { id: 79, text: "Yeah.. you really don't", isSender: true },
      { id: 80, text: "Anyways... get some sleep. I'll see you tomorrow...", isSender: true },
      { id: 81, text: "try not to miss me to much.😘", isSender: true },
      { id: 82, text: "Good Night😴😘", isSender: true },
      { id: 83, text: "Good Night😘💋", isSender: false },
    ]
  },
  {
    id: 7,
    name: 'Doctor',
    preview: 'Yes, certain substances can',
    time: '10 March',
    unread: false,
    avatar: '/photos/raqueeba.jpeg',
    messages: [
      { id: 1, text: "Hey doc, I've been getting that chest tightness again lately.", isSender: true },
      { id: 2, text: "Is it during exertion or even at rest?", isSender: false },
      { id: 3, text: "Mostly when I'm stressed… sometimes randomly too.", isSender: true },
      { id: 4, text: "You need to be careful. Given your condition, avoid stress and don't ignore these symptoms.", isSender: false },
      { id: 5, text: "Yeah… also I've been taking some meds recently for headaches. That okay?", isSender: true },
      { id: 6, text: "Only take prescribed medication. Some drugs can interfere with your heart condition.", isSender: false },
      { id: 7, text: "Oh… didn't know that.", isSender: true },
      { id: 8, text: "Yes, certain substances can trigger serious cardiac events in your case. Be cautious.", isSender: false },
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
