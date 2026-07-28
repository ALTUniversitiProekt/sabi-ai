import React from 'react';
import { motion } from 'framer-motion';

export const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-2 p-3 px-4 glass-panel rounded-2xl w-fit">
      <span className="text-xs text-pink-400 font-medium">Sabina is thinking</span>
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-pink-400"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
    </div>
  );
};
