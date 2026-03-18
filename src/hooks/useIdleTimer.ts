import { useEffect, useRef } from 'react';
import { useSystemStore } from '@/store/system';

export function useIdleTimer(timeoutMs: number = 60000) {
  const setStatus = useSystemStore((state) => state.setStatus);
  const statusRef = useRef(useSystemStore.getState().status);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const unsubscribe = useSystemStore.subscribe((state) => {
      statusRef.current = state.status;
      // If status changed to something else, might need to re-evaluate timer
      if (state.status === 'sleep' && timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleUserActivity = () => {
      if (statusRef.current === 'sleep') {
         setStatus('locked');
      }
      resetTimer();
    };

    const resetTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      if (statusRef.current !== 'booting' && statusRef.current !== 'sleep') {
        timeoutRef.current = setTimeout(() => {
          setStatus('sleep');
        }, timeoutMs);
      }
    };

    resetTimer();

    const events = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll'];
    events.forEach((event) => {
      window.addEventListener(event, handleUserActivity);
    });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, handleUserActivity);
      });
    };
  }, [setStatus, timeoutMs]);
}
