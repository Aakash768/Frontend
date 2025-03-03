export type ModelType = "1.5" | "1.5-flash";

export interface SummaryRequest {
  text: string;
  keywords?: string;
  model?: ModelType;
  customPrompt?: string;
}

// Update to match actual backend response
export interface BackendResponse {
  summary: {
    text: string;
    tokenCount: number;
    promptTokens: number;
    responseTokens: number;
  };
}

export interface SummaryResponse {
  summary: string;
  stats: {
    characters: number;
    tokens: number;
    apiTokens: number;
  };
}

// Add new types to match the backend response
export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
      role: string;
    };
    finishReason: string;
    avgLogprobs: number;
  }[];
  usageMetadata: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
  };
  modelVersion: string;
} 