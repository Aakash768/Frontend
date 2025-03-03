interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export class CacheService {
  private static CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
  private static cache = new Map<string, CacheItem<any>>();

  static set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  static get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > this.CACHE_DURATION) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  static clear(): void {
    this.cache.clear();
  }
} 