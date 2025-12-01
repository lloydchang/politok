'use client';

import React from 'react';
import Feed from '@/components/Feed';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <Feed />
    </main>
  );
}
