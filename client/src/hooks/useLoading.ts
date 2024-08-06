import { useState } from 'react';

interface UseLoading {
  loading: boolean;
  startLoading: VoidFunction;
  stopLoading: VoidFunction;
}

export const useLoading = (): UseLoading => {
  const [loading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);

  const stopLoading = () => setLoading(false);

  return {
    loading,
    startLoading,
    stopLoading,
  };
};
