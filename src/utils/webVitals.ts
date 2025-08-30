// Web Vitals tracking for performance monitoring
import { trackEvent } from "@/lib/analytics";

interface WebVitalsMetric {
  id: string;
  name: string;
  value: number;
  delta: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

// Track Core Web Vitals
export const trackWebVitals = (metric: WebVitalsMetric) => {
  const { name, value, rating } = metric;
  
  trackEvent('web_vitals', {
    metric_name: name,
    metric_value: Math.round(value),
    metric_rating: rating
  });
  
  // Log to console in development
  console.log(`[Web Vitals] ${name}: ${Math.round(value)}ms (${rating})`);
};

// Initialize Web Vitals monitoring
export const initWebVitals = () => {
  if (typeof window === 'undefined') return;
  
  // Dynamic import to avoid increasing bundle size
  import('web-vitals').then((webVitals) => {
    // Use the correct API for web-vitals v3+
    if (webVitals.onCLS) webVitals.onCLS(trackWebVitals);
    if (webVitals.onINP) webVitals.onINP(trackWebVitals); // INP replaces FID
    if (webVitals.onFCP) webVitals.onFCP(trackWebVitals);
    if (webVitals.onLCP) webVitals.onLCP(trackWebVitals);
    if (webVitals.onTTFB) webVitals.onTTFB(trackWebVitals);
  }).catch(err => {
    console.warn('Failed to load web-vitals:', err);
  });
};

// Track performance milestones
export const trackPerformanceMilestone = (milestone: string, value: number) => {
  trackEvent('performance_milestone', {
    milestone,
    value: Math.round(value),
    timestamp: Date.now()
  });
};