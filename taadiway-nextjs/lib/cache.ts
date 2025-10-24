/**
 * API Response Caching Middleware
 * Implements in-memory caching for API responses
 */

import { NextResponse } from 'next/server';

interface CacheEntry {
  data: any;
  timestamp: number;
  etag: string;
}

// In-memory cache
const cache = new Map<string, CacheEntry>();

// Cache configuration
const CACHE_CONFIG = {
  // Default TTL: 5 minutes
  defaultTTL: 5 * 60 * 1000,
  // Max cache size (number of entries)
  maxSize: 1000,
  // Custom TTL per route pattern
  routeTTL: {
    '/api/orders': 2 * 60 * 1000, // 2 minutes
    '/api/drivers': 5 * 60 * 1000, // 5 minutes
    '/api/admin/dashboard': 1 * 60 * 1000, // 1 minute
    '/api/users': 10 * 60 * 1000, // 10 minutes
  } as Record<string, number>,
};

/**
 * Generate ETag for response data
 */
function generateETag(data: any): string {
  const str = typeof data === 'string' ? data : JSON.stringify(data);
  let hash = 0;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return `"${Math.abs(hash).toString(36)}"`;
}

/**
 * Get cache TTL for a specific route
 */
function getTTL(pathname: string): number {
  for (const [pattern, ttl] of Object.entries(CACHE_CONFIG.routeTTL)) {
    if (pathname.startsWith(pattern)) {
      return ttl;
    }
  }
  return CACHE_CONFIG.defaultTTL;
}

/**
 * Clean up expired cache entries
 */
function cleanupCache() {
  const now = Date.now();
  
  for (const [key, entry] of cache.entries()) {
    const pathname = key.split('?')[0];
    const ttl = getTTL(pathname);
    
    if (now - entry.timestamp > ttl) {
      cache.delete(key);
    }
  }
  
  // Enforce max size (LRU-like behavior)
  if (cache.size > CACHE_CONFIG.maxSize) {
    const entriesToDelete = cache.size - CACHE_CONFIG.maxSize;
    const sortedKeys = Array.from(cache.entries())
      .sort((a, b) => a[1].timestamp - b[1].timestamp)
      .slice(0, entriesToDelete)
      .map(([key]) => key);
    
    sortedKeys.forEach(key => cache.delete(key));
  }
}

/**
 * Cache middleware for API routes
 */
export function withCache(
  handler: (request: Request) => Promise<Response | NextResponse>,
  options: { ttl?: number; bypassCache?: boolean } = {}
) {
  return async (request: Request) => {
    const { method } = request;
    const url = new URL(request.url);
    const cacheKey = `${method}:${url.pathname}${url.search}`;

    // Only cache GET requests
    if (method !== 'GET' || options.bypassCache) {
      return handler(request);
    }

    // Check if client sent If-None-Match header
    const clientETag = request.headers.get('if-none-match');

    // Check cache
    const cached = cache.get(cacheKey);
    const now = Date.now();
    const ttl = options.ttl || getTTL(url.pathname);

    if (cached && (now - cached.timestamp) < ttl) {
      // Check ETag
      if (clientETag && clientETag === cached.etag) {
        return new NextResponse(null, {
          status: 304,
          headers: {
            'ETag': cached.etag,
            'X-Cache': 'HIT-304',
          },
        });
      }

      // Return cached response
      return NextResponse.json(cached.data, {
        headers: {
          'ETag': cached.etag,
          'X-Cache': 'HIT',
          'Cache-Control': `public, max-age=${Math.floor(ttl / 1000)}`,
        },
      });
    }

    // Call handler
    const response = await handler(request);
    
    // Only cache successful responses
    if (response.ok) {
      const clonedResponse = response.clone();
      
      try {
        const data = await clonedResponse.json();
        const etag = generateETag(data);
        
        // Store in cache
        cache.set(cacheKey, {
          data,
          timestamp: now,
          etag,
        });

        // Cleanup periodically
        if (Math.random() < 0.1) { // 10% chance
          cleanupCache();
        }

        // Add cache headers
        const headers = new Headers(response.headers);
        headers.set('ETag', etag);
        headers.set('X-Cache', 'MISS');
        headers.set('Cache-Control', `public, max-age=${Math.floor(ttl / 1000)}`);

        return new NextResponse(JSON.stringify(data), {
          status: response.status,
          headers,
        });
      } catch (error) {
        // If response is not JSON, return as-is
        return response;
      }
    }

    return response;
  };
}

/**
 * Invalidate cache for a specific key or pattern
 */
export function invalidateCache(pattern: string) {
  const keysToDelete: string[] = [];
  
  for (const key of cache.keys()) {
    if (key.includes(pattern)) {
      keysToDelete.push(key);
    }
  }
  
  keysToDelete.forEach(key => cache.delete(key));
  
  return keysToDelete.length;
}

/**
 * Clear all cache
 */
export function clearCache() {
  const size = cache.size;
  cache.clear();
  return size;
}

/**
 * Get cache stats
 */
export function getCacheStats() {
  return {
    size: cache.size,
    maxSize: CACHE_CONFIG.maxSize,
    entries: Array.from(cache.entries()).map(([key, entry]) => ({
      key,
      age: Date.now() - entry.timestamp,
      size: JSON.stringify(entry.data).length,
    })),
  };
}
