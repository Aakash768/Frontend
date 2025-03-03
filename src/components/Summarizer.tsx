import React, { useState } from 'react';
import { ModelType, SummaryRequest, SummaryResponse } from '../types/types';
import TextInput from './TextInput';
import KeywordsInput from './KeywordsInput';
import ModelSelector from './ModelSelector';
import CustomPrompt from './CustomPrompt';
import SummaryOutput from './SummaryOutput';
import { generateSummary } from '../services/api';
import LoadingSpinner from './LoadingSpinner';

const Summarizer: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [model, setModel] = useState<ModelType>('1.5-flash');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<SummaryResponse | null>(null);
  const [error, setError] = useState<string>('');

  const handleGenerate = async () => {
    if (!text.trim()) {
      setError('Please enter some text to summarize');
      return;
    }

    setLoading(true);
    setError('');
    setResponse(null);

    try {
      const request: SummaryRequest = {
        text,
        ...(keywords && { keywords }),
        ...(model && { model }),
        ...(customPrompt && { customPrompt }),
      };

      console.log('Sending request with:', { text: text.substring(0, 100) + '...', keywords, model, customPrompt });
      
      const result = await generateSummary(request);
      console.log('Received result:', result);
      
      if (!result.summary) {
        throw new Error('No summary generated');
      }
      setResponse(result);
    } catch (err) {
      console.error('Error in handleGenerate:', err);
      setError(err instanceof Error ? 
        `Error: ${err.message}` : 
        'Error processing text. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <TextInput 
        value={text}
        onChange={setText}
        characterCount={text.length}
      />
      
      <div className="flex flex-wrap gap-4">
        <KeywordsInput 
          value={keywords}
          onChange={setKeywords}
        />
        <ModelSelector 
          value={model}
          onChange={setModel}
        />
      </div>

      <CustomPrompt 
        value={customPrompt}
        onChange={setCustomPrompt}
      />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <button
          onClick={handleGenerate}
          disabled={loading || !text.trim()}
          className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 
                     disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
        >
          Generate
        </button>
      )}

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      {response && (
        <SummaryOutput response={response} />
      )}
    </div>
  );
};

export default Summarizer; 