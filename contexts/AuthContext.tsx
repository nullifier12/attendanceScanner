import { AuthSession, AuthState } from '@/types/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType extends AuthState {
  setSession: (session: AuthSession) => Promise<void>;
  clearSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    session: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    loadSession();
  }, []);

  const loadSession = async () => {
    try {
      const sessionData = await AsyncStorage.getItem('auth_session');
      if (sessionData) {
        setState(prev => ({
          ...prev,
          session: JSON.parse(sessionData),
          isLoading: false,
        }));
      } else {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to load session',
        isLoading: false,
      }));
    }
  };

  const setSession = async (session: AuthSession) => {
    try {
      await AsyncStorage.setItem('auth_session', JSON.stringify(session));
      setState(prev => ({
        ...prev,
        session,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to save session',
      }));
    }
  };

  const clearSession = async () => {
    try {
      await AsyncStorage.removeItem('auth_session');
      setState({
        session: null,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to clear session',
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        setSession,
        clearSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 