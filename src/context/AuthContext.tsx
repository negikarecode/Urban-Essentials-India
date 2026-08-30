'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '@/types';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, role?: 'customer' | 'admin') => Promise<void>;
  signOut: () => Promise<void>;
  demoLoginAsAdmin: () => void;
  demoLoginAsCustomer: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const DEMO_USER_KEY = 'kura_demo_auth_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const supabase = createClient();

    async function loadUser() {
      try {
        // First check Supabase live session if configured
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const userMeta = session.user.user_metadata || {};
          const isUserAdmin = session.user.email?.includes('admin') || userMeta.role === 'admin';
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            full_name: userMeta.full_name || session.user.email?.split('@')[0] || 'User',
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

    loadUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const userMeta = session.user.user_metadata || {};
        const isUserAdmin = session.user.email?.includes('admin') || userMeta.role === 'admin';
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          full_name: userMeta.full_name || session.user.email?.split('@')[0] || 'User',
          role: isUserAdmin ? 'admin' : 'customer',
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, role: 'customer' | 'admin' = 'customer') => {
    setIsLoading(true);
    try {
      const mockUser: UserProfile = {
        id: `u-${Date.now()}`,
        email,
        full_name: email.split('@')[0],
        role,
      };
      setUser(mockUser);
      localStorage.setItem(DEMO_USER_KEY, JSON.stringify(mockUser));
      toast.success(`Logged in as ${email}`);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
    setUser(null);
    localStorage.removeItem(DEMO_USER_KEY);
    toast.info('Signed out successfully');
  };

  const demoLoginAsAdmin = () => {
    const adminUser: UserProfile = {
      id: 'admin-demo-1',
      email: 'admin@kuraessentials.com',
      full_name: 'Lead Admin',
      role: 'admin',
    };
    setUser(adminUser);
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(adminUser));
    toast.success('Signed in as Admin');
  };

  const demoLoginAsCustomer = () => {
    const custUser: UserProfile = {
      id: 'cust-demo-1',
      email: 'alex.student@gmail.com',
      full_name: 'Alex Sharma',
      role: 'customer',
    };
    setUser(custUser);
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(custUser));
    toast.success('Signed in as Alex Sharma');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAdmin: user?.role === 'admin',
        signIn,
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
