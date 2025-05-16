/* eslint-disable react-hooks/exhaustive-deps */
// fetch movies

import { useEffect, useState, useCallback } from "react";

//  fetch movie details

const useFetch = <T>(fetchFunction: () => Promise<T>, autoFetch = true) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetchFunction();
      setData(response);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  }, [fetchFunction]);

  const reset = () => {
    setData(null);
    setIsLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch]);

  return { data, error, isLoading, fetchData, reset };
};
export default useFetch;
