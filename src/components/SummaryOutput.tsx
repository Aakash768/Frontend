import React from 'react';
import { SummaryResponse } from '../types/types';

interface SummaryOutputProps {
  response: SummaryResponse;
}

const SummaryOutput: React.FC<SummaryOutputProps> = ({ response }) => {
  if (!response || !response.stats) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl text-white font-bold">General Summary</h2>
        <button
          onClick={() => navigator.clipboard.writeText(response.summary)}
          className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 
                     transition-colors"
        >
          Copy
        </button>
      </div>
      
      <div className="text-white whitespace-pre-wrap">
        {response.summary}
      </div>
      
      <div className="text-sm text-gray-400">
        Characters: {response.stats.characters || 0} | 
        Tokens: {response.stats.tokens || 0} | 
        API Tokens: {response.stats.apiTokens || 0}
      </div>
    </div>
  );
};

export default SummaryOutput; 