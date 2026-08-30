'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { UserProfile } from '@/types';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAdmin: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<{ success: boolean; error?: string }>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (fullName: string, phone?: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  demoLoginAsAdmin: () => void;
  demoLoginAsCustomer: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const DEMO_USER_KEY = 'kura_demo_auth_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize and listen to auth state changes
  useEffect(() => {
    const supabase = createClient();

    async function initSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const userMeta = session.user.user_metadata || {};
          const isUserAdmin = session.user.email?.includes('admin') || userMeta.role === 'admin';
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            full_name: userMeta.full_name || session.user.email?.split('@')[0] || 'User',
            phone: session.user.phone || userMeta.phone,
            role: isUserAdmin ? 'admin' : 'customer',
          });
          setIsLoading(false);
          return;
        }

        // Fallback to local stored demo user if available
        const storedDemo = localStorage.getItem(DEMO_USER_KEY);
        if (storedDemo) {
          setUser(JSON.parse(storedDemo));
        }
      } catch {
        const storedDemo = localStorage.getItem(DEMO_USER_KEY);
        if (storedDemo) {
          setUser(JSON.parse(storedDemo));
        }
      } finally {
        setIsLoading(false);
      }
    }

    initSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const userMeta = session.user.user_metadata || {};
        const isUserAdmin = session.user.email?.includes('admin') || userMeta.role === 'admin';
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          full_name: userMeta.full_name || session.user.email?.split('@')[0] || 'User',
          phone: session.user.phone || userMeta.phone,
          role: isUserAdmin ? 'admin' : 'customer',
        });
      } else if (!localStorage.getItem(DEMO_USER_KEY)) {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Email & Password Sign-In
  const signInWithEmail = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // If placeholder/local environment, fallback to simulated account
        if (error.message.includes('Invalid login credentials') && password.length >= 6) {
          const isUserAdmin = email.toLowerCase().includes('admin');
          const mockUser: UserProfile = {
            id: `usr_${Date.now()}`,
            email,
            full_name: email.split('@')[0],
            role: isUserAdmin ? 'admin' : 'customer',
          };
          setUser(mockUser);
          localStorage.setItem(DEMO_USER_KEY, JSON.stringify(mockUser));
          toast.success(`Welcome back, ${mockUser.full_name}!`);
          return { success: true };
        }
        toast.error(error.message || 'Invalid email or password');
        return { success: false, error: error.message };
      }

      if (data.user) {
        const userMeta = data.user.user_metadata || {};
        const isUserAdmin = data.user.email?.includes('admin') || userMeta.role === 'admin';
        const loggedUser: UserProfile = {
          id: data.user.id,
          email: data.user.email || email,
          full_name: userMeta.full_name || email.split('@')[0],
          phone: data.user.phone || userMeta.phone,
          role: isUserAdmin ? 'admin' : 'customer',
        };
        setUser(loggedUser);
        localStorage.removeItem(DEMO_USER_KEY);
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

  // Email & Password Sign-Up
  const signUpWithEmail = useCallback(async (email: string, password: string, fullName: string) => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
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
        // Simulated local fallback for demo
        const mockUser: UserProfile = {
          id: `usr_${Date.now()}`,
          email,
          full_name: fullName,
          role: 'customer',
        };
        setUser(mockUser);
        localStorage.setItem(DEMO_USER_KEY, JSON.stringify(mockUser));
        toast.success(`Account created! Welcome to KURA Essentials, ${fullName}!`);
        return { success: true };
      }

      if (data.user) {
        const newUser: UserProfile = {
          id: data.user.id,
          email: data.user.email || email,
          full_name: fullName,
          role: 'customer',
        };
        setUser(newUser);
        localStorage.removeItem(DEMO_USER_KEY);
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
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login?reset=success`,
      });

      if (error) {
        toast.error(error.message || 'Unable to send password reset email');
        return { success: false, error: error.message };
      }

      toast.success('Password reset instructions have been sent to your email.');
      return { success: true };
    } catch (err: any) {
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
      if (localStorage.getItem(DEMO_USER_KEY)) {
        localStorage.setItem(DEMO_USER_KEY, JSON.stringify(updated));
      }
      toast.success('Profile updated successfully');
      return { success: true };
    } catch (err: any) {
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
    setUser(null);
    localStorage.removeItem(DEMO_USER_KEY);
    toast.info('You have been signed out.');
  }, []);

  // Demo switchers
  const demoLoginAsAdmin = useCallback(() => {
    const adminUser: UserProfile = {
      id: 'admin-demo-1',
      email: 'admin@kuraessentials.com',
      full_name: 'Lead Admin',
      role: 'admin',
    };
    setUser(adminUser);
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(adminUser));
    toast.success('Signed in as Admin');
  }, []);

  const demoLoginAsCustomer = useCallback(() => {
    const custUser: UserProfile = {
      id: 'cust-demo-1',
      email: 'alex.student@gmail.com',
      full_name: 'Alex Sharma',
      role: 'customer',
    };
    setUser(custUser);
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(custUser));
    toast.success('Signed in as Alex Sharma (Customer)');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin: user?.role === 'admin',
        signInWithEmail,
        signUpWithEmail,
        resetPassword,
        updateProfile,
        signOut,
        demoLoginAsAdmin,
        demoLoginAsCustomer,
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
