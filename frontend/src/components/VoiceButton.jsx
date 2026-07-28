import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useVoice } from '../hooks/useVoice';

export const VoiceButton = ({ onSpeechInput }) => {
  const { isListening, startListening, stopListening } = useVoice((text) => {
    if (onSpeechInput) onSpeechInput(text);
  });

  const toggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening('kk-KZ');
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`p-3 rounded-xl border transition-all ${
        isListening
          ? 'bg-red-500/20 border-red-500 text-red-400 animate-pulse'
          : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10 hover:text-white'
      }`}
      title={isListening ? 'Дауыс жазуды тоқтату' : 'Дауыспен сөйлесу'}
    >
      {isListening ? <MicOff size={18} /> : <Mic size={18} />}
    </button>
  );
};
