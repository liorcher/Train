/* eslint-disable @typescript-eslint/no-explicit-any */
import { PreferencesApi } from '@/api';
import { UserGoals } from '@/models';
import { createContext, PropsWithChildren, useContext, useState } from 'react';

type PreferencesContext = {
  preferences: UserGoals | null;
  updatePreferences: (preferences: UserGoals | null) => void;
  fetchPreferences: () => Promise<void>;
};

const initalState: PreferencesContext = {
  preferences: null,
  updatePreferences: () => {},
  fetchPreferences: async () => {},
};

const PreferencesContext = createContext(initalState);
export const usePreferencesContext = () => useContext(PreferencesContext);

export const PreferencesProvider: React.FC<PropsWithChildren<object>> = ({ children }) => {
  const [preferences, setPreferences] = useState<UserGoals | null>(null);

  const updatePreferences = (preferences: UserGoals | null) => {
    setPreferences(preferences);
  };

  const fetchPreferences = async () => {
    try {
      const res = await PreferencesApi.getUserPreferences();
      updatePreferences(res);
    } catch (error) {
      console.error('Error fetching preferences ' + error);
    }
  };

  return (
    <PreferencesContext.Provider value={{ preferences, updatePreferences, fetchPreferences }}>
      {children}
    </PreferencesContext.Provider>
  );
};
