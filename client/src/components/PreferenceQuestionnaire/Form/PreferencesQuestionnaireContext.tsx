/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, PropsWithChildren, useContext, useState } from 'react';

type PreferencesQuestionnaireContext = {
  currentStepIndex: number;
  lastLoadedStepIndex: number;
  filledPreferences: boolean;
  incrementLastLoadedStepIndex: VoidFunction;
};

type Props = {
  currentStepIndex: number;
  filledPreferences: boolean;
};

const initalState: PreferencesQuestionnaireContext = {
  currentStepIndex: 0,
  lastLoadedStepIndex: 0,
  filledPreferences: false,
  incrementLastLoadedStepIndex: () => {},
};

const PreferencesQuestionnaireContext = createContext(initalState);
export const usePreferencesQuestionnaireContext = () => useContext(PreferencesQuestionnaireContext);

export const PreferencesQuestionnaireProvider: React.FC<PropsWithChildren<Props>> = ({
  currentStepIndex,
  filledPreferences,
  children,
}) => {
  const [lastLoadedStepIndex, setLastLoadedStepIndex] = useState<number>(0);

  // add loaded step to loaded steps
  const incrementLastLoadedStepIndex = () => {
    setLastLoadedStepIndex((prev) => prev + 1);
  };

  return (
    <PreferencesQuestionnaireContext.Provider
      value={{
        currentStepIndex,
        lastLoadedStepIndex,
        filledPreferences,
        incrementLastLoadedStepIndex,
      }}
    >
      {children}
    </PreferencesQuestionnaireContext.Provider>
  );
};
