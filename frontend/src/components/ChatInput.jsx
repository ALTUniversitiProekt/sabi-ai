import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { VoiceButton } from './VoiceButton';

export const ChatInput = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
      <VoiceButton onSpeechInput={(text) => setInput(text)} />
      
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Sabina-ға хабарлама жазыңыз..."
        disabled={disabled}
        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all"
      />

      <button
        type="submit"
        disabled={!input.trim() || disabled}
        className="p-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white font-semibold shadow-lg shadow-pink-500/20 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        <Send size={18} />
      </button>
    </form>
  );
};
