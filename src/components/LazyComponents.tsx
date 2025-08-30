// Lazy loaded components for code splitting
import { lazy, Suspense } from 'react';

// Lazy load components that are not above the fold
export const LazyFAQ = lazy(() => import('./FAQ').then(module => ({ default: module.FAQ })));
export const LazyFooter = lazy(() => import('./Footer').then(module => ({ default: module.Footer })));
export const LazyHowItWorks = lazy(() => import('./HowItWorks').then(module => ({ default: module.HowItWorks })));

// Loading fallback component
const ComponentSkeleton = ({ height = 'h-32' }: { height?: string }) => (
  <div className={`${height} bg-muted animate-pulse rounded-lg`} />
);

// Wrapper components with Suspense
export const SuspendedFAQ = () => (
  <Suspense fallback={<ComponentSkeleton height="h-96" />}>
    <LazyFAQ />
  </Suspense>
);

export const SuspendedFooter = () => (
  <Suspense fallback={<ComponentSkeleton height="h-32" />}>
    <LazyFooter />
  </Suspense>
);

export const SuspendedHowItWorks = () => (
  <Suspense fallback={<ComponentSkeleton height="h-64" />}>
    <LazyHowItWorks />
  </Suspense>
);