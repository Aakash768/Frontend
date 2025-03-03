import React from 'react';
import Summarizer from './components/Summarizer';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900 py-8 text-white">
        <h1 className="text-3xl font-bold text-center mb-8">Gemini Summarizer</h1>
        <Summarizer />
      </div>
    </ErrorBoundary>
  );
};

export default App; 