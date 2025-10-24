/**
 * Performance Monitoring Component
 * Tracks Core Web Vitals and reports performance metrics
 */

'use client';

import { useEffect } from 'react';

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
}

// Thresholds for Core Web Vitals
const THRESHOLDS = {
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  TTFB: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
};

/**
 * Rate a metric based on thresholds
 */
function rateMetric(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';
  
  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

/**
 * Send metric to analytics
 */
function sendToAnalytics(metric: PerformanceMetric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(
      `%c[Performance] ${metric.name}`,
      `color: ${metric.rating === 'good' ? 'green' : metric.rating === 'poor' ? 'red' : 'orange'}`,
      {
        value: `${metric.value.toFixed(2)}ms`,
        rating: metric.rating,
        delta: metric.delta ? `${metric.delta.toFixed(2)}ms` : undefined,
      }
    );
  }

  // Send to analytics service (e.g., Google Analytics)
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.value),
      metric_rating: metric.rating,
      metric_delta: metric.delta ? Math.round(metric.delta) : undefined,
    });
  }

  // You can also send to your own API
  // fetch('/api/analytics/performance', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(metric),
  // });
}

/**
 * Report Web Vitals
 */
function reportWebVital(metric: any) {
  const performanceMetric: PerformanceMetric = {
    name: metric.name,
    value: metric.value,
    rating: rateMetric(metric.name, metric.value),
    delta: metric.delta,
  };

  sendToAnalytics(performanceMetric);
}

/**
 * Performance Monitoring Component
 */
export default function PerformanceMonitor() {
  useEffect(() => {
    // Import web-vitals dynamically (onFID is deprecated in web-vitals v3+)
    import('web-vitals').then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      onCLS(reportWebVital);
      onFCP(reportWebVital);
      onLCP(reportWebVital);
      onTTFB(reportWebVital);
      onINP(reportWebVital);
    });

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              sendToAnalytics({
                name: 'Long Task',
                value: entry.duration,
                rating: entry.duration > 100 ? 'poor' : 'needs-improvement',
              });
            }
          }
        });

        longTaskObserver.observe({ entryTypes: ['longtask'] });

        return () => longTaskObserver.disconnect();
      } catch (e) {
        // Long task observer not supported
      }
    }
  }, []);

  // Report page navigation timing
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reportNavigationTiming = () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;

      if (pageLoadTime > 0) {
        sendToAnalytics({
          name: 'Page Load',
          value: pageLoadTime,
          rating: rateMetric('LCP', pageLoadTime),
        });
      }

      if (connectTime > 0) {
        sendToAnalytics({
          name: 'Server Response',
          value: connectTime,
          rating: rateMetric('TTFB', connectTime),
        });
      }

      if (renderTime > 0) {
        sendToAnalytics({
          name: 'Render Time',
          value: renderTime,
          rating: rateMetric('FCP', renderTime),
        });
      }
    };

    if (document.readyState === 'complete') {
      reportNavigationTiming();
    } else {
      window.addEventListener('load', reportNavigationTiming);
      return () => window.removeEventListener('load', reportNavigationTiming);
    }
  }, []);

  return null; // This component doesn't render anything
}

/**
 * Custom hook for tracking component render performance
 */
export function useRenderPerformance(componentName: string) {
  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;

      if (renderTime > 16) { // More than one frame (60fps)
        sendToAnalytics({
          name: `Render: ${componentName}`,
          value: renderTime,
          rating: renderTime > 50 ? 'poor' : 'needs-improvement',
        });
      }
    };
  });
}

/**
 * Measure function execution time
 */
export function measurePerformance<T extends (...args: any[]) => any>(
  fn: T,
  name: string
): T {
  return ((...args: Parameters<T>): ReturnType<T> => {
    const startTime = performance.now();
    const result = fn(...args);

    if (result instanceof Promise) {
      return result.finally(() => {
        const endTime = performance.now();
        sendToAnalytics({
          name: `Function: ${name}`,
          value: endTime - startTime,
          rating: 'good',
        });
      }) as ReturnType<T>;
    }

    const endTime = performance.now();
    sendToAnalytics({
      name: `Function: ${name}`,
      value: endTime - startTime,
      rating: 'good',
    });

    return result;
  }) as T;
}
