import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SabinaAvatar } from '../components/SabinaAvatar';

export const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (isRegister) {
        await register(email, password, name);
      } else {
        await login(email, password);
      }
      navigate('/chat');
    } catch (err) {
      setError(err.message || 'Қате шықты');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-md p-8 rounded-3xl border border-white/10 text-center">
        <div className="flex justify-center mb-4">
          <SabinaAvatar size="md" mood="Happy" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-1">
          {isRegister ? 'Sabina AI-ге тіркелу' : 'SABINA AI-ге кіру'}
        </h2>
        <p className="text-xs text-gray-400 mb-6">Виртуалды серігіңізбен байланыс орнатыңыз</p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/40 text-red-200 text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {isRegister && (
            <div>
              <label className="text-xs font-semibold text-gray-300 block mb-1">Атыңыз:</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-pink-500"
                placeholder="Ернұр"
              />
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">Электронды Пошта:</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-pink-500"
              placeholder="test@sabina.ai"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-300 block mb-1">Құпия Сөз:</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-pink-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white font-bold text-sm shadow-lg shadow-pink-500/30 hover:opacity-90 transition-all mt-2"
          >
            {isRegister ? 'Тіркелу' : 'Кіру'}
          </button>
        </form>

        <div className="mt-6 text-xs text-gray-400">
          {isRegister ? 'Аккаунтыңыз бар ма?' : 'Аккаунтыңыз жоқ па?'}{' '}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-pink-400 font-semibold underline ml-1"
          >
            {isRegister ? 'Кіру' : 'Тіркелу'}
          </button>
        </div>
      </div>
    </div>
  );
};
