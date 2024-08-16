import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts';
import { USER_PROGRESS_URL } from './router.const';

export const RedirectAuthenticated: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { token } = useAuth();

  return token ? <Navigate to={USER_PROGRESS_URL} /> : children;
};
