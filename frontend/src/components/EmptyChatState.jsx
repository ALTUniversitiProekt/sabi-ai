import React from 'react';
import { Sparkles } from 'lucide-react';
import { SabinaAvatar } from './SabinaAvatar';

export const EmptyChatState = ({ onSelectPrompt, mood }) => {
  const suggestions = [
    "Tell me something interesting.",
    "Help me learn English.",
    "Let's talk about technology.",
    "Мен бүгін көңілсізбін.",
    "Маған қызықты факт айтшы."
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 my-auto">
      <SabinaAvatar size="lg" mood={mood} />
      <h2 className="text-2xl font-bold mt-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400">
        Сәлем! Мен Sabina-мын
      </h2>
      <p className="text-gray-400 text-sm max-w-md mt-2">
        Сіздің виртуалды AI серігіңізбін. Төмендегі ұсыныстардың бірін таңдаңыз немесе өз ойыңызбен бөлісіңіз.
      </p>

      <div className="flex flex-wrap justify-center gap-2 max-w-lg mt-8">
        {suggestions.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt(prompt)}
            className="px-4 py-2 glass-panel glass-panel-hover rounded-xl text-xs text-gray-300 hover:text-white flex items-center gap-1.5"
          >
            <Sparkles size={14} className="text-pink-400" />
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};
