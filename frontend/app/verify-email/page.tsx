'use client';
import { useState, useEffect } from 'react';
import { verifyOTP, resendOTP } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';

// Dynamically import Hero3D to avoid SSR issues
const Hero3D = dynamic(() => import('@/components/Hero3D'), {
  ssr: false,
  loading: () => null,
});

export default function VerifyEmailPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Get email from URL params or localStorage
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const emailParam = params.get('email');
      const storedEmail = localStorage.getItem('signup_email');
      
      if (emailParam) {
        setEmail(emailParam);
        localStorage.setItem('signup_email', emailParam);
      } else if (storedEmail) {
        setEmail(storedEmail);
      } else {
        // No email found, redirect to signup
        router.push('/signup');
      }
    }
  }, [router]);

  const handleVerify = async () => {
    if (!otp || otp.length !== 6) {
      setMessage('Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const { data, error } = await verifyOTP(email, otp);

      if (error) {
        setMessage(error.message || 'Invalid verification code. Please try again.');
        setLoading(false);
      } else {
        // Clear stored email
        localStorage.removeItem('signup_email');
        setMessage('Email verified successfully! Redirecting to dashboard...');
        
        // Wait a moment then redirect to dashboard
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      }
    } catch (err: any) {
      setMessage(err.message || 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setMessage('');

    try {
      const { error } = await resendOTP(email);

      if (error) {
        setMessage(error.message || 'Failed to resend code. Please try again.');
      } else {
        setMessage('Verification code sent! Please check your email.');
      }
    } catch (err: any) {
      setMessage(err.message || 'An error occurred. Please try again.');
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950">
      {/* 3D Animated Background */}
      <div className="absolute inset-0 z-0 h-full w-full">
        <Hero3D />
      </div>

      {/* Background glow */}
      <div className="absolute z-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      {/* Overlay gradient */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-neutral-950/60 via-neutral-950/40 to-neutral-950/80" />

      {/* Verification Form */}
      <div className="relative z-10 w-full max-w-md px-6 sm:px-8 py-10">
        <div className="backdrop-blur-xl bg-neutral-900/40 border border-emerald-500/20 rounded-2xl shadow-2xl p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Verify Your Email
            </h1>
            <p className="text-neutral-400 text-sm sm:text-base">
              We've sent a 6-digit code to
            </p>
            <p className="text-emerald-400 font-medium mt-1">{email}</p>
          </div>

          {/* Error/Success message */}
          {message && (
            <div
              className={`mb-6 p-3 rounded-lg text-sm ${
                message.includes('successful') || message.includes('sent')
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}
            >
              {message}
            </div>
          )}

          {/* OTP Input */}
          <div className="space-y-6">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-neutral-300 mb-2">
                Verification Code
              </label>
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                placeholder="000000"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setOtp(value);
                }}
                maxLength={6}
                required
                className="w-full px-4 py-3 bg-neutral-800/50 border border-neutral-700/50 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all backdrop-blur-sm text-center text-2xl tracking-widest font-mono"
              />
              <p className="mt-2 text-xs text-neutral-500 text-center">
                Enter the 6-digit code from your email
              </p>
            </div>

            {/* Verify Button */}
            <button
              onClick={handleVerify}
              disabled={loading || otp.length !== 6}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-green-500 text-black font-semibold rounded-lg hover:from-emerald-400 hover:to-green-400 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>

            {/* Resend Code */}
            <div className="text-center">
              <button
                onClick={handleResend}
                disabled={resendLoading}
                className="text-sm text-emerald-400 hover:text-emerald-300 font-medium transition-colors disabled:opacity-50"
              >
                {resendLoading ? 'Sending...' : "Didn't receive the code? Resend"}
              </button>
            </div>

            {/* Back to Signup */}
            <div className="text-center text-sm text-neutral-400">
              <Link href="/signup" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                ← Back to Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
