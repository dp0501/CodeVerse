'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { verifyOtpRecovery } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';

const Hero3D = dynamic(() => import('@/components/Hero3D'), { ssr: false, loading: () => null });

export default function OtpVerifyClient() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const router = useRouter();

  const otpString = otp.join('');

  const handleChange = useCallback((index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  }, [otp]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
    if (e.key === 'Enter' && otpString.length === 6) {
      handleSubmit();
    }
  }, [otpString, otp]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\\D/g, '').slice(0, 6);
    const newOtp = pasted.padEnd(6, '').split('').slice(0, 6);
    setOtp(newOtp);
    if (newOtp[5]) {
      inputs.current[5]?.focus();
    }
  }, []);

  const handleSubmit = async () => {
    if (otpString.length !== 6) {
      setMessage('Please enter full 6-digit code');
      return;
    }

    setLoading(true);
    setMessage('');

    const { error } = await verifyOtpRecovery(otpString);

    if (error) {
      setMessage(error.message);
      // Reset OTP on error
      setOtp(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    } else {
      router.push('/reset-password');
    }

    setLoading(false);
  };

  useEffect(() => {
    inputs.current[0]?.focus();
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 z-0">
        <Hero3D />
      </div>
      <div className="absolute z-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-neutral-950/60 to-neutral-950/80" />

      <div className="relative z-10 w-full max-w-sm px-6 sm:px-8 py-10">
        <div className="backdrop-blur-xl bg-neutral-900/40 border border-emerald-500/20 rounded-2xl shadow-2xl p-8 sm:p-10">
          <Link href="/login" className="mb-6 flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-sm">
            <ArrowLeft className="h-4 w-4" />
            Back to login
          </Link>

          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Enter OTP Code
            </h1>
            <p className="text-neutral-400 text-sm mb-4">
              Enter 6-digit code sent to your email
            </p>
            <div className="text-xs text-neutral-500">
              Didn't receive? Check spam folder
            </div>
          </div>

          {message && (
            <div className="mb-8 p-3 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 text-sm text-center">
              {message}
            </div>
          )}

          <div 
            className="grid grid-cols-6 gap-3 mb-8 p-6 bg-neutral-900/50 border border-neutral-700/50 rounded-2xl"
            onPaste={handlePaste}
          >
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { if (el) inputs.current[index] = el }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-full h-14 text-center text-2xl font-bold bg-neutral-800 border border-neutral-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                disabled={loading}
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || otpString.length !== 6}
            className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-green-500 text-black font-bold text-lg rounded-xl hover:from-emerald-400 hover:to-green-400 disabled:opacity-50 shadow-lg shadow-emerald-500/20 transition-all disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify & Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
