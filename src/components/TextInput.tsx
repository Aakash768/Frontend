import React from 'react';

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  characterCount: number;
}

const TextInput: React.FC<TextInputProps> = ({ value, onChange, characterCount }) => {
  return (
    <div className="space-y-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-40 p-3 bg-gray-800 text-white rounded-lg 
                   resize-none focus:outline-none focus:ring-2 focus:ring-gray-600"
        placeholder="Enter text to summarize..."
      />
      <div className="text-sm text-gray-400">
        Characters: {characterCount}
      </div>
    </div>
  );
};

export default TextInput; 