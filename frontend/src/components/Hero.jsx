import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SabinaAvatar } from './SabinaAvatar';
import { Sparkles, Heart, Shield, MessageCircle } from 'lucide-react';

export const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center px-4 py-12">
      
      {/* Floating particles background effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-pink-500/10 blur-xl"
            style={{
              width: Math.random() * 200 + 100,
              height: Math.random() * 200 + 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Top Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-semibold mb-8 backdrop-blur-md"
      >
        <Sparkles size={14} />
         meet your intelligent virtual companion
      </motion.div>

      {/* Main Avatar Showcase */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <SabinaAvatar size="lg" mood="Happy" />
      </motion.div>

      {/* Headings */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-tight"
      >
        Meet <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-400">Sabina AI</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-lg md:text-xl text-gray-300 mt-4 max-w-xl font-normal"
      >
        Сабинамен сөйлес. Ойыңды бөліс. Әңгімеңді жалғастыр.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col sm:flex-row items-center gap-4 mt-8"
      >
        <button
          onClick={() => navigate('/chat')}
          className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white font-bold text-base shadow-xl shadow-pink-500/25 hover:scale-105 transition-all flex items-center justify-center gap-2"
        >
          <MessageCircle size={18} />
          Start Chatting
        </button>

        <button
          onClick={() => navigate('/chat')}
          className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel glass-panel-hover text-white font-semibold text-base border border-white/20 hover:bg-white/10 transition-all"
        >
          Meet Sabina
        </button>
      </motion.div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mt-16 text-left w-full">
        <div className="p-5 glass-panel glass-panel-hover rounded-2xl">
          <Heart className="text-pink-400 mb-2" size={24} />
          <h3 className="font-bold text-white text-base">Эмпатиялық AI</h3>
          <p className="text-gray-400 text-xs mt-1">Көңіл-күйіңізді түсінеді және сізге қолайлы жауап қайтарады.</p>
        </div>
        <div className="p-5 glass-panel glass-panel-hover rounded-2xl">
          <Sparkles className="text-purple-400 mb-2" size={24} />
          <h3 className="font-bold text-white text-base">Көптілді Серік</h3>
          <p className="text-gray-400 text-xs mt-1">Қазақша, орысша және ағылшынша табиғи еркін сөйлеседі.</p>
        </div>
        <div className="p-5 glass-panel glass-panel-hover rounded-2xl">
          <Shield className="text-blue-400 mb-2" size={24} />
          <h3 className="font-bold text-white text-base">Ұзақ Есте Сақтау</h3>
          <p className="text-gray-400 text-xs mt-1">Атыңызды, қызығушылықтарыңызды есте сақтайды.</p>
        </div>
      </div>

    </section>
  );
};
