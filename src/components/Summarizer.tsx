import React, { useState, useEffect } from 'react';
import { ModelType, SummaryRequest, SummaryResponse } from '@/types';
import TextInput from '@components/TextInput';
import KeywordsInput from './KeywordsInput';
import ModelSelector from './ModelSelector';
import CustomPrompt from './CustomPrompt';
import SummaryOutput from './SummaryOutput';
import LoadingSpinner from './LoadingSpinner';
import { useApi } from '@/hooks/useApi';

const Summarizer: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [keywords, setKeywords] = useState<string>('');
  const [model, setModel] = useState<ModelType>('1.5-flash');
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [response, setResponse] = useState<SummaryResponse | null>(null);
  const { loading, error, callApi } = useApi();
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // Simulate checking if everything is loaded
    const timer = setTimeout(() => {
      setIsInitializing(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (isInitializing) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  const handleGenerate = async () => {
    if (!text.trim()) {
      return;
    }

    try {
      const request: SummaryRequest = {
        text,
        ...(keywords && { keywords }),
        ...(model && { model }),
        ...(customPrompt && { customPrompt }),
      };

      const result = await callApi(request);
      if (result) {
        setResponse(result);
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      // Handle the error appropriately in your UI
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