import { useState, useEffect } from 'react';

export const useVoice = (onSpeechEnd) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'kk-KZ'; // Бастапқы тіл

      rec.onresult = (event) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        if (onSpeechEnd) onSpeechEnd(text);
      };

      rec.onerror = (e) => {
        console.error('Speech recognition error:', e);
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      setRecognition(rec);
    }
  }, []);

  const startListening = (lang = 'kk-KZ') => {
    if (recognition) {
      recognition.lang = lang;
      setTranscript('');
      setIsListening(true);
      recognition.start();
    } else {
      alert('Дауыстық тану бұл браузерде қолдау таппайды.');
    }
  };

  const stopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const speakText = (text, lang = 'kk-KZ') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.pitch = 1.1;
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  return { isListening, transcript, startListening, stopListening, speakText };
};
