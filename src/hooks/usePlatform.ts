import { useState, useEffect } from 'react';

export type Platform = 'ios' | 'android';

export function usePlatform(): Platform {
  const [platform, setPlatform] = useState<Platform>('android');

  useEffect(() => {
    // TODO: Implement real platform detection
    // const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    // if (/android/i.test(userAgent)) {
    //   setPlatform('android');
    // } else if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
    //   setPlatform('ios');
    // }

    // For now, we mock it to 'android' as requested
    setPlatform('android');
  }, []);

  return platform;
}
