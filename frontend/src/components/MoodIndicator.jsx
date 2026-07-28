import React from 'react';
import { Sparkles, Moon, Sun, Search, Brain } from 'lucide-react';

export const MoodIndicator = ({ mood, setMood }) => {
  const moods = [
    { id: 'Happy', label: 'Happy 😊', icon: Sun },
    { id: 'Calm', label: 'Calm 🌙', icon: Moon },
    { id: 'Excited', label: 'Excited ✨', icon: Sparkles },
    { id: 'Curious', label: 'Curious 🔍', icon: Search },
    { id: 'Thoughtful', label: 'Thoughtful 💭', icon: Brain },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
      <span className="text-xs text-gray-400 font-medium mr-1">Mood:</span>
      {moods.map((m) => {
        const Icon = m.icon;
        const active = mood === m.id;
        return (
          <button
            key={m.id}
            onClick={() => setMood(m.id)}
            className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              active
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_12px_rgba(236,72,153,0.4)]'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Icon size={12} />
            {m.label}
          </button>
        );
      })}
    </div>
  );
};
