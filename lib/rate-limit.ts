import 'server-only'

interface RateLimitRecord {
  timestamps: number[]
}

const store = new Map<string, RateLimitRecord>()

// Clean up stale entries every 5 minutes to avoid memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now()
    for (const [key, record] of store.entries()) {
      record.timestamps = record.timestamps.filter((ts) => now - ts < 600000) // 10 minutes
      if (record.timestamps.length === 0) {
        store.delete(key)
      }
    }
  }, 300000).unref?.()
}

export interface RateLimitOptions {
  intervalMs: number // e.g. 60000 for 1 minute
  maxRequests: number // e.g. 5
}

export interface RateLimitResult {
  success: boolean
  remaining: number
  resetMs: number
}

/**
 * Sliding window rate limiter.
 * @param identifier Unique key (e.g., `login:wertix.global@gmail.com` or `quote:${ip}`)
 * @param options Window options
 */
export async function checkRateLimit(
  identifier: string,
  options: RateLimitOptions
): Promise<RateLimitResult> {
  const now = Date.now()
  const windowStart = now - options.intervalMs

  let record = store.get(identifier)
  if (!record) {
    record = { timestamps: [] }
    store.set(identifier, record)
  }

  // Filter timestamps within current window
  record.timestamps = record.timestamps.filter((ts) => ts > windowStart)

  if (record.timestamps.length >= options.maxRequests) {
    const oldestTimestamp = record.timestamps[0]
    const resetMs = Math.max(0, oldestTimestamp + options.intervalMs - now)
    return {
      success: false,
      remaining: 0,
      resetMs,
    }
  }

  record.timestamps.push(now)
  return {
    success: true,
    remaining: options.maxRequests - record.timestamps.length,
    resetMs: options.intervalMs,
  }
}
