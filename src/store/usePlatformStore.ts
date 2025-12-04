import { create } from 'zustand';

export type Platform = 'ios' | 'android';

interface PlatformStore {
  platform: Platform;
  setPlatform: (platform: Platform) => void;
}

export const usePlatformStore = create<PlatformStore>((set) => ({
  platform: 'ios', // Default to iOS
  setPlatform: (platform) => set({ platform }),
}));
