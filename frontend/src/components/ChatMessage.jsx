import React from 'react';
import { motion } from 'framer-motion';
import { SabinaAvatar } from './SabinaAvatar';

export const ChatMessage = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 my-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="flex-shrink-0">
          <SabinaAvatar size="sm" />
        </div>
      )}

      <div
        className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-tr-none shadow-lg'
            : 'glass-panel text-gray-200 rounded-tl-none border border-white/10'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <span className="block text-[10px] opacity-40 mt-1 text-right">
          {new Date(message.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
};
