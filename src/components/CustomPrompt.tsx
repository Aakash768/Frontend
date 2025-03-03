import React from 'react';

interface CustomPromptProps {
  value: string;
  onChange: (value: string) => void;
}

const CustomPrompt: React.FC<CustomPromptProps> = ({ value, onChange }) => {
  return (
    <div>
      <button
        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 
                   transition-colors"
        onClick={() => onChange(value ? '' : 'Please summarize the following text:')}
      >
        Add Custom Summarizer Prompt
      </button>
      {value && (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full p-3 bg-gray-800 text-white rounded-lg 
                     resize-none focus:outline-none focus:ring-2 focus:ring-gray-600"
          placeholder="Enter custom prompt..."
        />
      )}
    </div>
  );
};

export default CustomPrompt; 