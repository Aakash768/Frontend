import React from 'react';
import { SummaryResponse } from '../types/types';

const SummaryOutput: React.FC<{ response: SummaryResponse }> = ({ response }) => {
  if (!response || !response.summary) {
    return <div className="text-red-500">No summary available</div>;
  }

  return (
    <div className="space-y-4">
      <div className="bg-gray-800 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <p className="whitespace-pre-wrap">{response.summary}</p>
      </div>
      {response.stats && (
        <div className="text-sm text-gray-400">
          <p>Characters: {response.stats.characters}</p>
          <p>Tokens: {response.stats.tokens}</p>
          <p>API Tokens: {response.stats.apiTokens}</p>
        </div>
      )}
    </div>
  );
};

export default SummaryOutput; 