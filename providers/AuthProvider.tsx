import { AuthError, Session, User } from '@supabase/supabase-js';
import { makeRedirectUri } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as Linking from 'expo-linking';
import { router } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';



// Required for Google Auth to work properly
WebBrowser.maybeCompleteAuthSession();

type SessionResponse = {
  user: User | null;
  session: Session | null;
} | {
  user: null;
  session: null;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  // signInWithEmail: (email: string, password: string) => Promise<{ error: any, data: SessionResponse }>;
  // signUpWithEmail: (email: string, password: string, metadata?: any) => Promise<{ error: any, data: SessionResponse }>;
  signInWithOTP: (email: string) => Promise<{
    error: AuthError;
  } | {
    error: null;
  }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);



  // Google OAuth configuration
  const [request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    androidClientId: process.env.EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
    redirectUri: makeRedirectUri({
      scheme: 'beitak', // Change this to your app scheme
    }),
  });

  // Check for existing session on mount
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Handle Google OAuth response
  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;

      supabase.auth.signInWithIdToken({
        provider: 'google',
        token: id_token,
      }).catch((error) => {
        console.error('Google sign in error:', error);
      });
    }
  }, [response]);

  // const signInWithEmail = async (email: string, password: string) => {
  //   const { error, data } = await supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   });
  //   return { error, data };
  // };

  // const signUpWithEmail = async (email: string, password: string, metadata?: any) => {
  //   const { error, data } = await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       data: metadata, // Store additional user data like name, age, etc.
  //     },
  //   });
  //   return { error, data };
  // };

  const signInWithGoogle = async () => {
    await promptAsync();
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);

      // Handle magic link verification
      if (_event === 'SIGNED_IN' && session) {
        // Check if user has completed onboarding
        checkOnboardingStatus(session.user.id);
      }
    });

    // Handle deep links (magic link from email)
    const handleDeepLink = (event: { url: string }) => {
      if (event.url) {
        const { path, queryParams } = Linking.parse(event.url);

        // Supabase magic link format: your-app://auth/callback#access_token=...
        if (path === 'auth/callback') {
          // Supabase will automatically handle the token
          console.log('Magic link clicked');
        }
      }
    };

    // Subscribe to deep link events
    const linkingSubscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.unsubscribe();
      linkingSubscription.remove();
    };
  }, []);

  const checkOnboardingStatus = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('onboarding_completed')
        .eq('id', userId)
        .single();

      if (error) throw error;

      if (data?.onboarding_completed) {
        // User has completed onboarding, go to main app
        router.replace('./(tabs)');
      } else {
        // User needs to complete onboarding
        router.replace('./onboarding/basic-profile');
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      // Default to onboarding if we can't check
      router.replace('./onboarding/basic-profile');
    }
  };

  const signInWithOTP = async (email: string) => {

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'beitak://auth/callback',
      },
    });

    return error ? { error } : { error: null }

  };



  const signOut = async () => {
    await supabase.auth.signOut();
    router.replace('/(auth)');
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'your-app://reset-password',
    });
    return { error };
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        isLoading,
        signInWithGoogle,
        signOut,
        resetPassword,
        signInWithOTP
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};