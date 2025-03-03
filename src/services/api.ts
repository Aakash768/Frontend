import { SummaryRequest, SummaryResponse, BackendResponse } from '../types/types';
import { CacheService } from './cache';

const API_URL = import.meta.env.VITE_API_URL || 'https://indiatoday-ivory.vercel.app/';

export const generateSummary = async (request: SummaryRequest): Promise<SummaryResponse> => {
  try {
    console.log('Sending request to API:', request);

    // Create a cache key based on the request
    const cacheKey = JSON.stringify(request);
    
    // Check cache first
    const cachedResponse = CacheService.get<SummaryResponse>(cacheKey);
    if (cachedResponse) {
      console.log('Returning cached response');
      return cachedResponse;
    }

    const response = await fetch(`${API_URL}api/gemini/process`, {
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
    console.log('Received response:', data);

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

    // Cache the response
    CacheService.set(cacheKey, result);

    console.log('Transformed response:', result);
    return result;

  } catch (error) {
    console.error('Error in generateSummary:', error);
    throw error;
  }
}; 