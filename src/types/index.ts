export * from './types'; 

export type ModelType = "1.5" | "1.5-flash";

export interface SummaryRequest {
  text: string;
  keywords?: string;
  model?: ModelType;
  customPrompt?: string;
}

export interface SummaryResponse {
  summary: string;
  stats: {
    characters: number;
    tokens: number;
    apiTokens: number;
  };
}

export interface BackendResponse {
  summary: {
    text: string;
    tokenCount: number;
    promptTokens: number;
    responseTokens: number;
  };
} 