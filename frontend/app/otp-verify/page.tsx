'use client';

import { Suspense } from 'react';
import OtpVerifyClient from './OtpVerifyClient';

export default function OtpVerifyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">Loading...</div>}>
      <OtpVerifyClient />
    </Suspense>
  );
}
