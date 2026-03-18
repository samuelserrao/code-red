'use client';

import { useSystemStore } from '@/store/system';
import BootSequence from '@/components/BootSequence';
import LockScreen from '@/components/LockScreen';
import Desktop from '@/components/Desktop/Desktop';
import SleepScreen from '@/components/SleepScreen';
import { useIdleTimer } from '@/hooks/useIdleTimer';

export default function Home() {
  const status = useSystemStore((state) => state.status);
  useIdleTimer(60000); // 1 minute idle timeout

  return (
    <main className="w-screen h-screen overflow-hidden bg-black selection:bg-blue-500/30">
      {status === 'booting' && <BootSequence />}
      {status === 'locked' && <LockScreen />}
      {(status === 'desktop' || status === 'sleep') && <Desktop />}
      {status === 'sleep' && <SleepScreen />}
    </main>
  );
}
