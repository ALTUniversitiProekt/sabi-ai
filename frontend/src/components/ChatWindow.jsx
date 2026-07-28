import React, { useRef, useEffect } from 'react';
import { useChatContext } from '../context/ChatContext';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import { EmptyChatState } from './EmptyChatState';
import { MoodIndicator } from './MoodIndicator';
import { SabinaAvatar } from './SabinaAvatar';

export const ChatWindow = () => {
  const { currentChat, sendMessage, isThinking, error, mood, setMood } = useChatContext();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentChat.messages, isThinking]);

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative glass-panel">
      
      {/* Чат Header-і */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <SabinaAvatar size="sm" mood={mood} />
          <div>
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              Sabina AI <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </h3>
            <p className="text-[11px] text-gray-400">Sabina is feeling <span className="text-pink-400 font-medium">{mood}</span></p>
          </div>
        </div>

        <MoodIndicator mood={mood} setMood={setMood} />
      </div>

      {/* Чат Хабарламалар Орны */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {currentChat.messages.length === 0 ? (
          <EmptyChatState onSelectPrompt={(p) => sendMessage(p)} mood={mood} />
        ) : (
          currentChat.messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))
        )}

        {isThinking && (
          <div className="flex gap-3 items-center">
            <SabinaAvatar size="sm" mood={mood} />
            <TypingIndicator />
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-300 text-xs rounded-xl text-center">
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Енгізу Барлы (Footer) */}
      <div className="p-4 border-t border-white/10 bg-black/30 backdrop-blur-md">
        <ChatInput onSend={(txt) => sendMessage(txt)} disabled={isThinking} />
      </div>

    </div>
  );
};
