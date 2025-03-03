import { useState, useCallback } from 'react';
import { SummaryRequest, SummaryResponse } from '../types/types';
import { generateSummary } from '../services/api';

export const useApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const callApi = useCallback(async (request: SummaryRequest): Promise<SummaryResponse | null> => {
    setLoading(true);
    setError('');

    try {
      const result = await generateSummary(request);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, callApi };
}; 