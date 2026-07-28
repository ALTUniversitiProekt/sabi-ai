import React, { createContext, useContext, useState } from 'react';
import { chatApi } from '../services/api';

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [conversations, setConversations] = useState([
    { id: 'chat_1', title: 'Алғашқы диалог', messages: [] }
  ]);
  const [currentChatId, setCurrentChatId] = useState('chat_1');
  const [mood, setMood] = useState('Calm'); // Happy, Calm, Excited, Curious, Thoughtful
  const [mode, setMode] = useState('Friendly'); // Friendly, Study, Creative, Advice, Language Practice
  const [isThinking, setIsThinking] = useState(false);
  const [error, setError] = useState(null);

  const currentChat = conversations.find(c => c.id === currentChatId) || conversations[0];

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    setError(null);
    const userMsg = { role: 'user', content: text, timestamp: new Date().toISOString() };
    
    const updatedMessages = [...currentChat.messages, userMsg];

    setConversations(prev => prev.map(c => {
      if (c.id === currentChatId) {
        return { ...c, messages: updatedMessages };
      }
      return c;
    }));

    setIsThinking(true);

    try {
      const res = await chatApi.sendMessage(updatedMessages, mood, mode, currentChatId);
      
      setConversations(prev => prev.map(c => {
        if (c.id === currentChatId) {
          return { ...c, messages: [...updatedMessages, res.message] };
        }
        return c;
      }));
    } catch (err) {
      setError(err.message || 'Жауап алу мүмкін болмады.');
    } finally {
      setIsThinking(false);
    }
  };

  const createNewChat = () => {
    const newId = `chat_${Date.now()}`;
    const newChat = { id: newId, title: `Жаңа әңгіме ${conversations.length + 1}`, messages: [] };
    setConversations([newChat, ...conversations]);
    setCurrentChatId(newId);
  };

  const deleteChat = (id) => {
    if (conversations.length === 1) return;
    const filtered = conversations.filter(c => c.id !== id);
    setConversations(filtered);
    if (currentChatId === id) {
      setCurrentChatId(filtered[0].id);
    }
  };

  return (
    <ChatContext.Provider value={{
      conversations,
      currentChatId,
      currentChat,
      setCurrentChatId,
      mood,
      setMood,
      mode,
      setMode,
      isThinking,
      error,
      sendMessage,
      createNewChat,
      deleteChat
    }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
