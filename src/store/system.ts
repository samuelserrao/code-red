import { create } from 'zustand';

export type SystemStatus = 'booting' | 'locked' | 'desktop' | 'sleep';

export interface AppWindow {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
}

interface SystemState {
  status: SystemStatus;
  setStatus: (status: SystemStatus) => void;
  isControlCenterOpen: boolean;
  toggleControlCenter: () => void;
  
  windows: Record<string, AppWindow>;
  activeWindow: string | null;
  isAppsOpen: boolean;
  toggleApps: (open?: boolean) => void;
  openApp: (id: string, title?: string) => void;
  closeApp: (id: string) => void;
  minimizeApp: (id: string) => void;
  maximizeApp: (id: string) => void;
  focusApp: (id: string) => void;
}

export const useSystemStore = create<SystemState>((set) => ({
  status: 'booting',
  isControlCenterOpen: false,
  setStatus: (status) => set({ status }),
  toggleControlCenter: () => set((state) => ({ isControlCenterOpen: !state.isControlCenterOpen })),
  
  windows: {},
  activeWindow: null,
  isAppsOpen: false,
  toggleApps: (open) => set((state) => ({ 
    isAppsOpen: typeof open === 'boolean' ? open : !state.isAppsOpen 
  })),
  
  openApp: (id, title = id) => set((state) => {
    const wins = { ...state.windows };
    if (!wins[id]) {
      wins[id] = { id, title, isOpen: true, isMinimized: false, isMaximized: false };
    } else {
      wins[id].isOpen = true;
      wins[id].isMinimized = false;
    }
    return { windows: wins, activeWindow: id };
  }),
  
  closeApp: (id) => set((state) => {
    const wins = { ...state.windows };
    if (wins[id]) delete wins[id];
    return { 
      windows: wins, 
      activeWindow: state.activeWindow === id ? null : state.activeWindow 
    };
  }),
  
  minimizeApp: (id) => set((state) => {
    const wins = { ...state.windows };
    if (wins[id]) wins[id].isMinimized = true;
    const active = state.activeWindow === id ? null : state.activeWindow;
    return { windows: wins, activeWindow: active };
  }),
  
  maximizeApp: (id) => set((state) => {
    const wins = { ...state.windows };
    if (wins[id]) wins[id].isMaximized = !wins[id].isMaximized;
    return { windows: wins, activeWindow: id };
  }),
  
  focusApp: (id) => set({ activeWindow: id }),
}));
