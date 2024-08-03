import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setItemInLocalStorage,
} from '@/utils';
import { AuthApi, UserApi } from '@/api';
import { LOCAL_STORAGE_ITEMS } from '@/consts';
import { User } from '@/models';

interface AuthContextType {
  currentUser: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ACCESS_TOKEN, REFRESH_TOKEN } = LOCAL_STORAGE_ITEMS;
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(getItemFromLocalStorage(ACCESS_TOKEN));
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    getCurrentUser();
  }, [token]);

  const getCurrentUser = async () => {
    try {
      if (token) {
        setLoading(true);
        const user = await UserApi.getUser();
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    } catch (error) {
      console.log('Error fetching user  ' + error);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const tokens = await AuthApi.login(email, password);
      setToken(tokens.accessToken);
      setItemInLocalStorage(ACCESS_TOKEN, tokens.accessToken);
      setItemInLocalStorage(REFRESH_TOKEN, tokens.refreshToken);
    } catch (error) {
      setToken(null);
      console.log('error logging in: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const { tokens, ...registeredUser } = await AuthApi.register(email, password, name);
      setCurrentUser(registeredUser);
      setToken(tokens.accessToken);
      setItemInLocalStorage(ACCESS_TOKEN, tokens.accessToken);
      setItemInLocalStorage(REFRESH_TOKEN, tokens.refreshToken);
    } catch (error) {
      throw new Error('error registring: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await AuthApi.logout();
      setCurrentUser(null);
      setToken(null);
      removeItemFromLocalStorage(ACCESS_TOKEN);
      removeItemFromLocalStorage(REFRESH_TOKEN);
    } catch (error) {
      throw new Error('error logging out: ' + error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    token,
    loading,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
