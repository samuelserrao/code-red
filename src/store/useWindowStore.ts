import { create } from 'zustand';

export interface AppWindow {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
}

interface WindowState {
  windows: Record<string, AppWindow>;
  activeWindows: string[]; // Order determines z-index
  minimizedWindows: string[];
  maximizedWindow: string | null;
  
  openWindow: (id: string, title: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  restoreWindow: (id: string) => void;
  focusWindow: (id: string) => void;
}

export const useWindowStore = create<WindowState>((set) => ({
  windows: {},
  activeWindows: [],
  minimizedWindows: [],
  maximizedWindow: null,

  openWindow: (id, title) => set((state) => {
    const windows = { ...state.windows };
    if (!windows[id]) {
      windows[id] = { id, title, isOpen: true, isMinimized: false, isMaximized: false };
    } else {
      windows[id].isOpen = true;
      windows[id].isMinimized = false;
    }

    const activeWindows = [...state.activeWindows.filter(aid => aid !== id), id];
    const minimizedWindows = state.minimizedWindows.filter(mid => mid !== id);
    
    return { 
      windows, 
      activeWindows, 
      minimizedWindows,
      // If we're opening an app and it was the maximized one, keep it maximized?
      // Usually opening a minimized app should keep its maximized state or not?
      // Let's assume opening brings it to front.
    };
  }),

  closeWindow: (id) => set((state) => {
    const windows = { ...state.windows };
    delete windows[id];
    
    return {
      windows,
      activeWindows: state.activeWindows.filter(aid => aid !== id),
      minimizedWindows: state.minimizedWindows.filter(mid => mid !== id),
      maximizedWindow: state.maximizedWindow === id ? null : state.maximizedWindow
    };
  }),

  minimizeWindow: (id) => set((state) => {
    const windows = { ...state.windows };
    if (windows[id]) windows[id].isMinimized = true;
    
    return {
      windows,
      activeWindows: state.activeWindows.filter(aid => aid !== id),
      minimizedWindows: [...state.minimizedWindows.filter(mid => mid !== id), id],
      maximizedWindow: state.maximizedWindow === id ? null : state.maximizedWindow
    };
  }),

  maximizeWindow: (id) => set((state) => {
    const windows = { ...state.windows };
    if (windows[id]) {
      windows[id].isMaximized = !windows[id].isMaximized;
      // If we maximize, this surely becomes the active window
      return {
        windows,
        maximizedWindow: windows[id].isMaximized ? id : null,
        activeWindows: [...state.activeWindows.filter(aid => aid !== id), id]
      };
    }
    return state;
  }),

  toggleMaximize: (id) => set((state) => {
    const windows = { ...state.windows };
    if (windows[id]) {
      windows[id].isMaximized = !windows[id].isMaximized;
      // If we maximize, this surely becomes the active window
      return {
        windows,
        maximizedWindow: windows[id].isMaximized ? id : null,
        activeWindows: [...state.activeWindows.filter(aid => aid !== id), id]
      };
    }
    return state;
  }),

  restoreWindow: (id) => set((state) => {
    const windows = { ...state.windows };
    if (windows[id]) windows[id].isMinimized = false;
    
    return {
      windows,
      minimizedWindows: state.minimizedWindows.filter(mid => mid !== id),
      activeWindows: [...state.activeWindows.filter(aid => aid !== id), id],
      maximizedWindow: windows[id]?.isMaximized ? id : state.maximizedWindow
    };
  }),

  focusWindow: (id) => set((state) => ({
    activeWindows: [...state.activeWindows.filter(aid => aid !== id), id]
  })),
}));
