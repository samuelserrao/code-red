'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSystemStore } from '@/store/system';

export default function BootSequence() {
  const setStatus = useSystemStore((state) => state.setStatus);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate boot progress over 3 seconds
    const duration = 3000;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(timer);
        // Add a slight delay before transitioning
        setTimeout(() => setStatus('locked'), 400);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [setStatus]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-black relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-16">
        <svg
          viewBox="0 0 1024 1024"
          className="w-24 h-24 text-white mb-2"
          fill="currentColor"
        >
          <path d="M722 559c0-117 96-173 100-176-55-80-139-91-169-92-72-8-142 43-178 43-37 0-93-42-152-41-78 1-150 45-190 115-82 141-21 350 58 464 39 56 85 119 146 117 58-2 81-37 151-37s90 37 152 36c63-1 103-57 142-113 44-65 63-128 64-131-1-1-124-48-124-191zM609 238c31-38 52-91 46-144-46 2-101 31-135 70-30 35-56 89-49 141 51 4 102-28 138-67z" />
        </svg>
        <div className="w-48 h-1 bg-white/20 rounded-[24px] overflow-hidden">
          <motion.div
            className="h-full bg-white rounded-[24px]"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: 'linear', duration: 0.03 }}
          />
        </div>
      </div>
    </div>
  );
}
