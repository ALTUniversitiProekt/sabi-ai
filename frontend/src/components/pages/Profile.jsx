import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { memoryApi } from '../services/api';
import { User, Brain, ShieldCheck } from 'lucide-react';

export const Profile = () => {
  const { user } = useAuth();
  const [memory, setMemory] = useState({});

  useEffect(() => {
    memoryApi.getMemory()
      .then(res => setMemory(res.memory || {}))
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-2xl mx-auto w-full p-6 mt-8">
        <div className="glass-panel rounded-3xl p-8 border border-white/10">
          <div className="flex items-center gap-4 border-b border-white/10 pb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
              {user?.name?.[0] || 'U'}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{user?.name || 'Қолданушы'}</h2>
              <p className="text-xs text-gray-400">{user?.email}</p>
            </div>
          </div>

          {/* Memory Инспекциясы */}
          <div className="mt-6">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 mb-3">
              <Brain size={18} className="text-pink-400" /> Sabina-ның Жадындағы Сіз Тұралы Деректер:
            </h3>

            {Object.keys(memory).length === 0 ? (
              <p className="text-xs text-gray-400 glass-panel p-4 rounded-xl">
                Әлі ештеңе есте сақталмады. Сөйлесу арқылы атыңызды, қызығушылығыңызды айтыңыз.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(memory).map(([key, val]) => (
                  <div key={key} className="glass-panel p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] uppercase text-pink-400 font-bold block">{key}</span>
                    <span className="text-sm text-white font-medium">{val}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-gray-300 flex items-center gap-3">
            <ShieldCheck className="text-emerald-400 flex-shrink-0" size={20} />
            <span>Деректеріңіз қауіпсіз және тек Sabina AI-мен диалогты жақсартуға қолданылады.</span>
          </div>

        </div>
      </div>
    </div>
  );
};
