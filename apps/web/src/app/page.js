'use client';

import React, { useState } from 'react';
import Feed from '@/components/Feed';
import SplashScreen from '@/components/SplashScreen';

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      {!showSplash && <Feed />}
    </main>
  );
}
