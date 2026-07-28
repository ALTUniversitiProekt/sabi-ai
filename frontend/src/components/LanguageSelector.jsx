import React from 'react';
import { Globe } from 'lucide-react';

export const LanguageSelector = ({ selectedLang, onChange }) => {
  return (
    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-gray-300">
      <Globe size={14} className="text-pink-400" />
      <select
        value={selectedLang}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-white focus:outline-none cursor-pointer"
      >
        <option value="kk" className="bg-purple-950 text-white">Қазақша</option>
        <option value="ru" className="bg-purple-950 text-white">Русский</option>
        <option value="en" className="bg-purple-950 text-white">English</option>
      </select>
    </div>
  );
};
