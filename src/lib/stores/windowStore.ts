import { writable, get } from 'svelte/store';
import type { wType } from '../types/wType';

export const windows = writable<wType[]>([]);

let nextZIndex = 1;

// Window configurations for different types
const windowConfigs = {
  terminal: {
    width: 600,
    height: 400,
    minWidth: 400,
    minHeight: 300
  },
  safari: {
    width: 1000,
    height: 600,
    minWidth: 600,
    minHeight: 400
  },
  photos: {
    width: 900,
    height: 600,
    minWidth: 500,
    minHeight: 400
  },
  projects: {
    width: 900,
    height: 650,
    minWidth: 600,
    minHeight: 500
  }
};

// Calculate window position based on existing windows
function calculatePosition(type: keyof typeof windowConfigs) {
  const currentWindows = get(windows);
  const config = windowConfigs[type];
  
  // Base position
  let x = 50;
  let y = 50;
  
  // Find windows of the same type
  const sameTypeWindows = currentWindows.filter(w => w.type === type);
  
  if (sameTypeWindows.length > 0) {
    // Cascade windows of the same type
    x += sameTypeWindows.length * 30;
    y += sameTypeWindows.length * 30;
  }
  
  // Ensure window is within viewport
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
  
  x = Math.min(x, viewportWidth - config.width - 50);
  y = Math.min(y, viewportHeight - config.height - 50);
  
  return { x, y };
}

export function addWindow(type: 'terminal' | 'safari' | 'photos' | 'projects') {
  const id = crypto.randomUUID();
  const config = windowConfigs[type];
  const position = calculatePosition(type);

  const newWindow: wType = {
    id,
    type,
    isMinimized: false,
    isMaximized: false,
    zIndex: nextZIndex++,
    position,
    size: { 
      width: config.width, 
      height: config.height 
    },
    minSize: {
      width: config.minWidth,
      height: config.minHeight
    }
  };

  windows.update(w => [...w, newWindow]);
  return id;
}

export function closeWindow(id: string) {
  windows.update(w => w.filter(window => window.id !== id));
}

export function toggleMinimize(id: string) {
  windows.update(w => w.map(window => 
    window.id === id 
      ? { ...window, isMinimized: !window.isMinimized }
      : window
  ));
}

export function toggleMaximize(id: string) {
  windows.update(w => w.map(window => 
    window.id === id 
      ? { ...window, isMaximized: !window.isMaximized }
      : window
  ));
}

export function bringToFront(id: string) {
  const currentWindows = get(windows);
  const maxZ = Math.max(...currentWindows.map(w => w.zIndex), 0);
  windows.update(w => w.map(window => 
    window.id === id 
      ? { ...window, zIndex: maxZ + 1 }
      : window
  ));
}

export function updateWindowPosition(id: string, x: number, y: number) {
  windows.update(w => w.map(window => 
    window.id === id 
      ? { ...window, position: { x, y } }
      : window
  ));
}

export function updateWindowSize(id: string, width: number, height: number) {
  const window = get(windows).find(w => w.id === id);
  if (!window) return;

  const minWidth = window.minSize?.width || 400;
  const minHeight = window.minSize?.height || 300;

  windows.update(w => w.map(window => 
    window.id === id 
      ? { 
          ...window, 
          size: { 
            width: Math.max(width, minWidth), 
            height: Math.max(height, minHeight) 
          } 
        }
      : window
  ));
}

export function isAppRunning(type: 'terminal' | 'safari' | 'photos' | 'projects'): boolean {
  const currentWindows = get(windows);
  return currentWindows.some(w => w.type === type);
}

export function isAppMinimized(type: 'terminal' | 'safari' | 'photos' | 'projects'): boolean {
  const currentWindows = get(windows);
  const window = currentWindows.find(w => w.type === type);
  return window ? window.isMinimized : false;
}