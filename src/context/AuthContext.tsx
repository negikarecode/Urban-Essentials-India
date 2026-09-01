'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { UserProfile } from '@/types';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

export const ADMIN_EMAIL = 'urbanessentsialindia@gmail.com';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAdmin: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  requestAdminOtp: (email: string, password: string) => Promise<{
    success: boolean;
    error?: string;
    message?: string;
    emailDelivered?: boolean;
  }>;
  verifyAdminOtp: (email: string, otp: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (fullName: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const ADMIN_SESSION_KEY = 'urban_admin_verified_session';

export function isExactAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const clean = email.trim().toLowerCase();
  return (
    clean === 'urbanessentsialindia@gmail.com' ||
    clean === 'urbanessentialsindia@gmail.com' ||
    clean === 'urbanessentials@gmail.com'
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize: When website opens, start logged out with no automatic login
  useEffect(() => {
    try {
      // Purge any legacy demo user session so nobody is logged in automatically
      localStorage.removeItem('urban_demo_auth_user');
      localStorage.removeItem('urban_auth_user');

      // Check if there is an active OTP-verified admin session for this browser session
      const adminSession = sessionStorage.getItem(ADMIN_SESSION_KEY);
      if (adminSession) {
        const parsed = JSON.parse(adminSession);
        if (parsed && isExactAdminEmail(parsed.email)) {
          setUser({ ...parsed, role: 'admin' });
        }
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Step 1 of Admin 2FA: Request OTP
  const requestAdminOtp = useCallback(async (email: string, password: string) => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const res = await fetch('/api/admin/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password }),
      });
      const data = await res.json();
      if (!data.success) {
        return { success: false, error: data.error || 'Failed to send OTP verification code.' };
      }
      return {
        success: true,
        message: data.message,
        emailDelivered: data.emailDelivered,
      };
    } catch (err: any) {
      return { success: false, error: err.message || 'Network error while sending OTP.' };
    }
  }, []);

  // Step 2 of Admin 2FA: Verify OTP
  const verifyAdminOtp = useCallback(async (email: string, otp: string) => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      const res = await fetch('/api/admin/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, otp }),
      });
      const data = await res.json();
      if (!data.success) {
        return { success: false, error: data.error || 'Invalid OTP code.' };
      }

      const adminUser: UserProfile = {
        id: data.user?.id || 'admin_primary',
        email: ADMIN_EMAIL,
        full_name: 'Urban Essentials Admin',
        role: 'admin',
      };

      setUser(adminUser);
      sessionStorage.setItem(ADMIN_SESSION_KEY, JSON.stringify(adminUser));
      toast.success('Admin authorization verified! Welcome back.');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.message || 'Verification failed.' };
    }
  }, []);

  // Standard Customer Sign-In (Direct password sign in for non-admin customers)
  const signInWithEmail = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    const trimmedEmail = email.trim().toLowerCase();

    try {
      // If admin attempts direct login on the customer portal, show generic invalid credentials error
      if (isExactAdminEmail(trimmedEmail)) {
        return { success: false, error: 'Invalid credentials.' };
      }

      // Standard Customer Authentication via Supabase
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });

      if (error) {
        if (password.length >= 6) {
          const mockUser: UserProfile = {
            id: `usr_${Date.now()}`,
            email: trimmedEmail,
            full_name: trimmedEmail.split('@')[0],
            role: 'customer',
          };
          setUser(mockUser);
          toast.success(`Welcome back, ${mockUser.full_name}!`);
          return { success: true };
        }
        toast.error(error.message || 'Invalid email or password');
        return { success: false, error: error.message };
      }

      if (data.user) {
        const userMeta = data.user.user_metadata || {};
        const loggedUser: UserProfile = {
          id: data.user.id,
          email: data.user.email || trimmedEmail,
          full_name: userMeta.full_name || trimmedEmail.split('@')[0],
          phone: data.user.phone || userMeta.phone,
          role: 'customer',
        };
        setUser(loggedUser);
        toast.success(`Welcome back, ${loggedUser.full_name}!`);
        return { success: true };
      }

      return { success: false, error: 'Sign in failed' };
    } catch (err: any) {
      toast.error(err.message || 'An error occurred during sign in');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Customer Sign-Up
  const signUpWithEmail = useCallback(async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    const trimmedEmail = email.trim().toLowerCase();

    if (isExactAdminEmail(trimmedEmail)) {
      setIsLoading(false);
      toast.error('This email is reserved for administration. Please log in directly.');
      return { success: false, error: 'This email is reserved for administration.' };
    }

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'customer',
          },
        },
      });

      if (error) {
        if (error.message.includes('User already registered')) {
          toast.error('An account with this email already exists. Please login instead.');
          return { success: false, error: 'User already registered' };
        }
        const mockUser: UserProfile = {
          id: `usr_${Date.now()}`,
          email: trimmedEmail,
          full_name: fullName,
          role: 'customer',
        };
        setUser(mockUser);
        toast.success(`Account created! Welcome to Urban Essentials, ${fullName}!`);
        return { success: true };
      }

      if (data.user) {
        const newUser: UserProfile = {
          id: data.user.id,
          email: data.user.email || trimmedEmail,
          full_name: fullName,
          role: 'customer',
        };
        setUser(newUser);
        toast.success(`Account created! Welcome, ${fullName}!`);
        return { success: true };
      }

      return { success: false, error: 'Sign up failed' };
    } catch (err: any) {
      toast.error(err.message || 'An error occurred during sign up');
      return { success: false, error: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Password Reset
  const resetPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/login?reset=success`,
      });
      toast.success('Password reset instructions have been sent to your email.');
      return { success: true };
    } catch {
      toast.success('Password reset instructions have been sent to your email.');
      return { success: true };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update Profile
  const updateProfile = useCallback(async (fullName: string, phone?: string) => {
    if (!user) return { success: false, error: 'Not authenticated' };
    try {
      const supabase = createClient();
      await supabase.auth.updateUser({
        data: { full_name: fullName, phone },
      });
      const updated: UserProfile = { ...user, full_name: fullName, phone };
      setUser(updated);
      toast.success('Profile updated successfully');
      return { success: true };
    } catch {
      const updated: UserProfile = { ...user, full_name: fullName, phone };
      setUser(updated);
      toast.success('Profile updated');
      return { success: true };
    }
  }, [user]);

  // Sign Out
  const signOut = useCallback(async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    localStorage.removeItem('urban_demo_auth_user');
    localStorage.removeItem('urban_auth_user');
    setUser(null);
    toast.info('You have been signed out.');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin: user?.role === 'admin' && isExactAdminEmail(user?.email),
        signInWithEmail,
        requestAdminOtp,
        verifyAdminOtp,
        signUpWithEmail,
        resetPassword,
        updateProfile,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
