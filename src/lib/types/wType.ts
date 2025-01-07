export type wType = {
  id: string;
  type: 'terminal' | 'safari' | 'photos' | 'projects';
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: {
    x: number;
    y: number;
  };
  size: {
    width: number;
    height: number;
  };
  minSize?: {
    width: number;
    height: number;
  };
};