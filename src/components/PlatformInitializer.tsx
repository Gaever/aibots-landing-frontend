"use client";

import { useEffect } from 'react';
import { usePlatformStore, type Platform } from '@/store/usePlatformStore';

interface PlatformInitializerProps {
  initialPlatform: Platform;
}

export function PlatformInitializer({ initialPlatform }: PlatformInitializerProps) {
  const setPlatform = usePlatformStore((state) => state.setPlatform);

  useEffect(() => {
    setPlatform(initialPlatform);
  }, [initialPlatform, setPlatform]);

  return null;
}
