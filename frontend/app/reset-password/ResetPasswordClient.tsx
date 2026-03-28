'use client';

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { updatePassword } from '@/lib/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

const Hero3D = dynamic(() => import('@/components/Hero3D'), { ssr: false, loading: () => null });

export default function ResetPasswordClient() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    passwordRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setMessage('Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    setMessage('');

    const { error } = await updatePassword(newPassword);

    if (error) {
      setMessage(error.message);
    } else {
      setSuccess(true);
      setMessage('Password updated successfully! Please login again.');
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950">
        <div className="absolute inset-0 z-0">
          <Hero3D />
        </div>
        <div className="relative z-10 w-full max-w-md px-6 sm:px-8 py-10 text-center">
          <div className="backdrop-blur-xl bg-neutral-900/40 border border-emerald-500/20 rounded-2xl shadow-2xl p-10">
            <CheckCircle2 className="w-24 h-24 text-emerald-400 mx-auto mb-6" />
            <h1 className="text-3xl font-extrabold mb-4 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Password Reset!
            </h1>
            <p className="text-neutral-300 mb-8 text-lg">Your password has been updated successfully.</p>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-500 text-black font-semibold px-8 py-4 rounded-xl hover:from-emerald-400 hover:to-green-400 shadow-lg shadow-emerald-500/25 transition-all w-full justify-center"
            >
              Login to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 z-0">
        <Hero3D />
      </div>
      <div className="absolute z-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-neutral-950/60 to-neutral-950/80" />

      <div className="relative z-10 w-full max-w-md px-6 sm:px-8 py-10">
        <div className="backdrop-blur-xl bg-neutral-900/40 border border-emerald-500/20 rounded-2xl shadow-2xl p-8 sm:p-10">
          <Link href="/login" className="mb-6 flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium">
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              New Password
            </h1>
            <p className="text-neutral-400">Enter your new password below.</p>
          </div>

          {message && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                New Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                placeholder="At least 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-white placeholder-neutral-500 focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-white placeholder-neutral-500 focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading || newPassword !== confirmPassword}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-500 text-black font-semibold rounded-lg hover:from-emerald-400 hover:to-green-400 disabled:opacity-50 shadow-lg shadow-emerald-500/20 disabled:cursor-not-allowed transition-all"
            >
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
