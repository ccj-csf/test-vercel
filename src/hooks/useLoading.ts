import { LoadingContext } from '@/components';
import { useContext } from 'react';

export const useLoading = () => {
  const context = useContext(LoadingContext);
  const { showLoading, hiddenLoading, loading } = context;
  return {
    showLoading,
    hiddenLoading,
    loading,
  };
};
