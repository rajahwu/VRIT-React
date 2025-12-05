'use client';

import { RitualCycleTracker } from '@gttm/ritual-ui';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        {/* The Ritual Component */}
        <div className="w-full">
           <RitualCycleTracker />
        </div>
      </div>
    </main>
  );
}
