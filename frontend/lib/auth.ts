'use client';
import { supabase } from './supabaseClient';
import { User } from '@supabase/supabase-js';

export const signUp = async (email: string, password: string, username?: string) => {
  const { data, error } = await supabase.auth.signUp({ 
    email, 
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent('/dashboard?welcome=1')}`,
      data: {
        username: username || email.split('@')[0], // Use email prefix if no username
      }
    }
  });
  return { data, error };
};

export const verifyOTP = async (email: string, token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: 'signup'
  });
  return { data, error };
};

export const resendOTP = async (email: string) => {
  const { data, error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    }
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
};

export const signInWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getUser = async (): Promise<User | null> => {
  const { data } = await supabase.auth.getUser();
  return data?.user ?? null;
};

export const getUserName = async (): Promise<string | null> => {
  const user = await getUser();
  if (!user) return null;
  
  // Get username from user metadata
  const username = user.user_metadata?.username || user.user_metadata?.full_name || user.email?.split('@')[0] || null;
  return username;
};

export const resetPasswordEmail = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/otp-verify`,
  });
  return { data, error };
};

export const verifyOtpRecovery = async (token: string) => {
  const { data, error } = await supabase.auth.verifyOtp({
    token,
    type: 'recovery',
  });
  return { data, error };
};

export const updatePassword = async (password: string) => {
  const { data, error } = await supabase.auth.updateUser({ 
    password 
  });
  return { data, error };
};
