import { SummaryRequest, SummaryResponse, BackendResponse } from '../types/types';
import { CacheService } from './cache';

const API_URL = import.meta.env.VITE_API_URL;

export const generateSummary = async (request: SummaryRequest): Promise<SummaryResponse> => {
  try {
    console.log('Sending request to API:', request);

    const cacheKey = JSON.stringify(request);
    const cachedResponse = CacheService.get<SummaryResponse>(cacheKey);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Make sure there's a trailing slash in the URL
    const apiEndpoint = `${API_URL}/api/gemini/process`;
    
    const response = await fetch(apiEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: BackendResponse = await response.json();

    if (!data.summary || !data.summary.text) {
      throw new Error('Invalid response format from server');
    }

    const result: SummaryResponse = {
      summary: data.summary.text,
      stats: {
        characters: data.summary.text.length,
        tokens: data.summary.tokenCount,
        apiTokens: data.summary.promptTokens + data.summary.responseTokens
      }
    };

    CacheService.set(cacheKey, result);
    return result;

  } catch (error) {
    console.error('Error in generateSummary:', error);
    throw error;
  }
}; 