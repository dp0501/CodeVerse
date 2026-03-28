'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { resetPasswordEmail } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Dynamic Hero3D matching login page
const Hero3D = dynamic(() => import('@/components/Hero3D'), { ssr: false, loading: () => null });

export default function ForgotPasswordClient() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'sent'>('email');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await resetPasswordEmail(email);

    if (error) {
      setMessage(error.message);
    } else {
      localStorage.setItem('recoveryEmail', email);
      setMessage('Check your email for the reset link!');
      setStep('sent');
      router.push('/otp-verify');
    }
    
    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950">
      {/* Hero3D Background */}
      <div className="absolute inset-0 z-0">
        <Hero3D />
      </div>

      {/* Glow effect */}
      <div className="absolute z-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      
      {/* Overlay */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-neutral-950/60 to-neutral-950/80" />

      <div className="relative z-10 w-full max-w-md px-6 sm:px-8 py-10">
        <div className="backdrop-blur-xl bg-neutral-900/40 border border-emerald-500/20 rounded-2xl shadow-2xl p-8 sm:p-10">
          <button
            onClick={() => router.push('/login')}
            className="mb-6 flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </button>

          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Reset Password
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base">
              Enter your email to receive a reset link
            </p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-2xl text-sm ${
              step === 'sent' 
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                : 'bg-red-500/20 text-red-400 border border-red-500/30'
            }`}>
              {message}
            </div>
          )}

          {step === 'email' ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-white placeholder-neutral-500 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all backdrop-blur-sm"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-500 text-black font-semibold rounded-lg hover:from-emerald-400 hover:to-green-400 disabled:opacity-50 shadow-lg shadow-emerald-500/20 transition-all"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="text-4xl">📧</div>
              <p className="text-neutral-300">Check your email for the password reset link.</p>
              <button
                onClick={() => router.push('/login')}
                className="w-full py-3 px-4 bg-emerald-500/90 text-black font-semibold rounded-lg hover:bg-emerald-400 transition-all"
              >
                Back to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
