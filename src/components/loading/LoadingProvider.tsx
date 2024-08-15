'use client';
import { useBoolean, useMemoizedFn } from 'ahooks';
import { ReactNode, createContext } from 'react';
import { Loading } from './Loading';

interface LoadingProviderProps {
  children: ReactNode;
}
export const LoadingContext = createContext<{
  showLoading: () => void;
  hiddenLoading: () => void;
  loading: boolean;
}>({
  loading: false,
  showLoading: () => {},
  hiddenLoading: () => {},
});

export const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loading, loadingActions] = useBoolean(false);
  const showLoading = useMemoizedFn(() => {
    loadingActions.setTrue();
  });
  const hiddenLoading = useMemoizedFn(() => {
    loadingActions.setFalse();
  });
  return (
    <LoadingContext.Provider value={{ showLoading, hiddenLoading, loading }}>
      {children}
      {loading && <Loading />}
    </LoadingContext.Provider>
  );
};
