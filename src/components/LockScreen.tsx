'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useSystemStore } from '@/store/system';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function LockScreen() {
  const setStatus = useSystemStore((state) => state.setStatus);
  const [password, setPassword] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'RAILAB31') {
      setStatus('desktop');
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      setPassword('');
    }
  };

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: 'url(/wallpapers/sequoia-light.jpg)' }}
    >
      {/* Heavy Blur Overlay purely for Lock Screen */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[20px]" />

      <div className="z-10 flex flex-col items-center gap-6 mt-20">
        <Image
          src="/profile.jpg"
          alt="Profile"
          width={150}
          height={150}
          className="rounded-[24px] shadow-2xl border-2 border-white/20 object-cover"
          priority
        />
        <h1 className="text-white text-3xl font-medium tracking-tight shadow-sm">Vikram</h1>

        <motion.form
          onSubmit={handleSubmit}
          className="relative mt-2"
          animate={isShaking ? { x: [-10, 10, -10, 10, -5, 5, 0] } : {}}
          transition={{ duration: 0.4 }}
        >
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            className="w-48 px-4 py-1.5 rounded-[24px] bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-md text-sm transition-all"
            autoFocus
          />
          {password.length > 0 && (
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 rounded-[24px] bg-white/20 hover:bg-white/40 text-white transition-colors"
            >
              <ArrowRight size={14} />
            </button>
          )}
        </motion.form>
        <p className="text-white/70 text-xs font-medium tracking-wide">Touch ID or Enter Password</p>
      </div>

      {/* Bottom Actions */}
      <div className="absolute bottom-12 flex gap-12 text-white/80 z-10">
        <div className="flex flex-col items-center gap-2 cursor-pointer hover:text-white transition-colors">
          <div className="w-10 h-10 rounded-[24px] bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-xs font-medium">Sleep</span>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer hover:text-white transition-colors">
          <div className="w-10 h-10 rounded-[24px] bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <span className="text-xs font-medium">Restart</span>
        </div>
        <div className="flex flex-col items-center gap-2 cursor-pointer hover:text-white transition-colors"
          onClick={() => setStatus('booting')}>
          <div className="w-10 h-10 rounded-[24px] bg-black/20 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-lg">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="text-xs font-medium">Shut Down</span>
        </div>
      </div>
    </div>
  );
}
