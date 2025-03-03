import { SummaryRequest, SummaryResponse, BackendResponse } from '../types/types';

export const generateSummary = async (request: SummaryRequest): Promise<SummaryResponse> => {
  try {
    console.log('Sending request to API:', request);

    const response = await fetch('http://localhost:5000/api/gemini/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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

    console.log('Transformed response:', result);
    return result;

  } catch (error) {
    console.error('Error in generateSummary:', error);
    throw error;
  }
}; 