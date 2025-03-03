import React, { Suspense } from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load the Summarizer component
const Summarizer = React.lazy(() => import('./components/Summarizer'));

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-900 py-8 text-white">
        <h1 className="text-3xl font-bold text-center mb-8">Gemini Summarizer</h1>
        <Suspense fallback={
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner />
          </div>
        }>
          <Summarizer />
        </Suspense>
      </div>
    </ErrorBoundary>
  );
};

export default App; 