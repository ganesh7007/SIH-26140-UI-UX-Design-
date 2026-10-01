import { useState, useRef, useCallback, useEffect } from 'react';

/**
 * Custom hook implementing a delayed loading state.
 *
 * @param {Function} asyncFn - The asynchronous function (e.g. data fetch)
 * @param {number} delayMs - Delay before showing spinner (default 500ms)
 * @returns {Object} { isLoading, data, error, execute, reset }
 */
export function useDelayedLoading(asyncFn, delayMs = 500) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);

  // Clear pending timeout helper
  const cancelTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const execute = useCallback(async (...args) => {
    // 1. Clear previous timeout and reset error
    cancelTimeout();
    setError(null);
    
    // 2. Set timeout for delayMs (e.g., 500ms). If it expires before data arrives, set isLoading to true
    timeoutRef.current = setTimeout(() => {
      setIsLoading(true);
    }, delayMs);

    try {
      // 3. Execute the fetch function
      const result = await asyncFn(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      // 4. Once data is received or error occurs, clear timeout and reset isLoading to false
      cancelTimeout();
      setIsLoading(false);
    }
  }, [asyncFn, delayMs, cancelTimeout]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => cancelTimeout();
  }, [cancelTimeout]);

  return {
    isLoading,
    data,
    error,
    execute,
    reset: () => {
      cancelTimeout();
      setIsLoading(false);
      setData(null);
      setError(null);
    }
  };
}

export default useDelayedLoading;
