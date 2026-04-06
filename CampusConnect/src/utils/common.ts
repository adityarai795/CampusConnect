// Common utility functions
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean = false;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

export const retry = async <T>(
  fn: () => Promise<T>,
  options: { attempts: number; delay: number } = { attempts: 3, delay: 1000 },
): Promise<T> => {
  for (let i = 0; i < options.attempts; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === options.attempts - 1) throw error;
      await new Promise((resolve) => setTimeout(resolve, options.delay));
    }
  }
  throw new Error("Retry failed");
};

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const groupBy = <T, K extends PropertyKey>(
  array: T[],
  key: (item: T) => K,
): Record<K, T[]> => {
  return array.reduce(
    (result, item) => {
      const k = key(item);
      if (!result[k]) result[k] = [];
      result[k].push(item);
      return result;
    },
    {} as Record<K, T[]>,
  );
};

export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const uniq = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

export const flatten = <T>(array: (T | T[])[]): T[] => {
  return array.reduce<T[]>((flat, item) => {
    return flat.concat(Array.isArray(item) ? flatten(item as T[]) : (item as T));
  }, []);
};
