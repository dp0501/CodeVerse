'use client';

import { Suspense } from 'react';
import ForgotPasswordClient from './ForgotPasswordClient';

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-neutral-950 flex items-center justify-center">Loading...</div>}>
      <ForgotPasswordClient />
    </Suspense>
  );
}
