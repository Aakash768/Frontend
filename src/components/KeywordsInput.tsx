import React from 'react';

interface KeywordsInputProps {
  value: string;
  onChange: (value: string) => void;
}

const KeywordsInput: React.FC<KeywordsInputProps> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex-1 p-3 bg-gray-800 text-white rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-gray-600"
      placeholder="Enter keywords (optional, separate by commas)"
    />
  );
};

export default KeywordsInput; 