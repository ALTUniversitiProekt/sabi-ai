import React from 'react';
import { motion } from 'framer-motion';

export const SabinaAvatar = ({ size = 'md', mood = 'Calm' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-24 h-24',
    lg: 'w-48 h-48 lg:w-64 lg:h-64',
  }[size];

  const moodGradients = {
    Happy: 'from-amber-400 via-pink-500 to-purple-600',
    Calm: 'from-indigo-500 via-purple-500 to-pink-500',
    Excited: 'from-pink-500 via-rose-500 to-yellow-400',
    Curious: 'from-cyan-400 via-blue-500 to-purple-600',
    Thoughtful: 'from-blue-600 via-indigo-600 to-purple-800'
  };

  return (
    <div className={`relative flex items-center justify-center ${sizeClasses}`}>
      {/* Сыртқы жарқыл (Glow) және Аура */}
      <motion.div
        className={`absolute inset-0 rounded-full bg-gradient-to-r ${moodGradients[mood] || moodGradients.Calm} opacity-60 blur-xl`}
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Аватар шеңбері */}
      <motion.div
        className={`relative z-10 w-full h-full rounded-full p-1 bg-gradient-to-tr ${moodGradients[mood]} shadow-2xl overflow-hidden glass-panel`}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full h-full rounded-full bg-[#0d071d] flex flex-col items-center justify-center relative overflow-hidden">
          {/* Беттің графикалық визуализациясы */}
          <motion.div 
            className="w-1/2 h-1/2 rounded-full bg-gradient-to-b from-pink-300/30 to-purple-500/20 flex flex-col items-center justify-center border border-pink-400/30 backdrop-blur-md"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Көздері */}
            <div className="flex gap-4 mb-2">
              <motion.div 
                className="w-2.5 h-2.5 rounded-full bg-pink-300 shadow-[0_0_8px_#f472b6]"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.95, 1] }}
              />
              <motion.div 
                className="w-2.5 h-2.5 rounded-full bg-pink-300 shadow-[0_0_8px_#f472b6]"
                animate={{ scaleY: [1, 0.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, times: [0, 0.95, 1] }}
              />
            </div>
            {/* Еріндер / Күлімсіреу */}
            <div className="w-4 h-1.5 border-b-2 border-pink-300 rounded-full" />
          </motion.div>

          {/* Виртуальды Индикатор Белгісі */}
          <div className="absolute bottom-2 px-2 py-0.5 text-[9px] font-bold tracking-widest uppercase bg-purple-950/80 text-pink-300 rounded-full border border-pink-500/30">
            AI SABINA
          </div>
        </div>
      </motion.div>
    </div>
  );
};
