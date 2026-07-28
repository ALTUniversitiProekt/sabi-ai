import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sparkles, User, LogIn } from 'lucide-react';

export const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/10 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center font-extrabold text-white text-lg shadow-lg shadow-pink-500/30">
          S
        </div>
        <span className="font-extrabold text-xl tracking-tight text-white">SABINA <span className="text-pink-500">AI</span></span>
      </div>

      <div className="flex items-center gap-4">
        {user ? (
          <button
            onClick={() => navigate('/chat')}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-sm flex items-center gap-2 shadow-lg shadow-pink-500/25 hover:opacity-90 transition-all"
          >
            <Sparkles size={16} />
            Chat-қа өту
          </button>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2 rounded-full bg-white/10 border border-white/15 text-white font-semibold text-sm flex items-center gap-2 hover:bg-white/20 transition-all"
          >
            <LogIn size={16} />
            Кіру / Тіркелу
          </button>
        )}
      </div>
    </nav>
  );
};
