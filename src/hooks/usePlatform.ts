import { useEffect } from 'react';
import { usePlatformStore } from '@/store/usePlatformStore';

export type Platform = 'ios' | 'android';

export function usePlatform(): Platform {
  const platform = usePlatformStore((state) => state.platform);
  const setPlatform = usePlatformStore((state) => state.setPlatform);

  useEffect(() => {
    // Client-side detection (if SSR didn't run or for verification)
    if (typeof window !== 'undefined') {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

      // Check only for Android, default to iOS otherwise
      if (/android/i.test(userAgent)) {
        setPlatform('android');
      } else {
        setPlatform('ios');
      }
    }
  }, [setPlatform]);

  return platform;
}
