import { Suspense, lazy } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface LazyComponentProps {
  loader: () => Promise<{ default: React.ComponentType<any> }>;
  fallback?: React.ReactNode;
}

export function LazyComponent({ loader, fallback = <LoadingSpinner /> }: LazyComponentProps) {
  const LazyComp = lazy(loader);
  
  return (
    <Suspense fallback={fallback}>
      <LazyComp />
    </Suspense>
  );
}
