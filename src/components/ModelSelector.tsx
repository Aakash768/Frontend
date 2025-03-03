import React from 'react';
import { ModelType } from '../types/types';

interface ModelSelectorProps {
  value: ModelType;
  onChange: (value: ModelType) => void;
}

const ModelSelector: React.FC<ModelSelectorProps> = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as ModelType)}
      className="p-3 bg-gray-800 text-white rounded-lg 
                 focus:outline-none focus:ring-2 focus:ring-gray-600"
    >
      <option value="1.5-flash">Gemini 1.5 Flash</option>
      <option value="1.5">Gemini 1.5</option>
    </select>
  );
};

export default ModelSelector; 