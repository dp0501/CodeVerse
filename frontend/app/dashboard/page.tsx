'use client';

import { useEffect, useState } from 'react';
import { getUser, getUserName, signOut } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import Dashboard from '@/components/Dashboard';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const u = await getUser();
        console.log('Dashboard getUser:', u ? 'Found' : 'No user');
        if (u) {
          setUser(u);
          const userName = await getUserName();
          setUsername(userName || u.email?.split('@')[0] || 'Coder');
        } else {
          // Don't redirect - middleware handles
          console.log('Dashboard: No user, but middleware should handle');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        router.push('/login?redirect=/dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, [router]);

  useEffect(() => {
    // Always show welcome popup on first load after login
    const welcomeShown = localStorage.getItem('welcomeShown');
    if (!welcomeShown) {
      setShowWelcome(true);
      localStorage.setItem('welcomeShown', 'true');
      const timer = setTimeout(() => setShowWelcome(false), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-neutral-400">
        <div className="text-center">
          <div className="mb-4">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="relative min-h-screen bg-neutral-950">
      {/* Welcome Popup */}
      {showWelcome && (
        <div className="fixed left-1/2 top-6 z-50 -translate-x-1/2 transform">
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/40 bg-neutral-900/95 px-6 py-4 text-sm font-semibold text-emerald-100 shadow-2xl shadow-emerald-500/40 backdrop-blur-xl animate-in slide-in-from-top-2 duration-300">
            <span className="inline-block h-3 w-3 rounded-full bg-emerald-400 animate-ping" />
            Welcome to CodeVerse! 🚀
          </div>
        </div>
      )}

      <Dashboard />

      {/* User Info */}
      <div className="absolute right-6 top-6 z-40 hidden md:block">
        <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
          Signed in as <span className="font-semibold text-white">{username}</span>
          <button
            onClick={handleSignOut}
            className="ml-3 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white hover:bg-white/20 transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
  );
}
