import React from 'react';
import { X, Sliders } from 'lucide-react';

export const SettingsModal = ({ isOpen, onClose, mode, setMode }) => {
  if (!isOpen) return null;

  const modes = ['Friendly', 'Study', 'Creative', 'Advice', 'Language Practice'];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-md p-6 rounded-2xl border border-white/15">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <h3 className="font-bold text-white flex items-center gap-2">
            <Sliders size={18} className="text-pink-400" /> AI БАПТАУЛАРЫ
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="py-4 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-400 block mb-2">Sabina Режимі:</label>
            <div className="grid grid-cols-2 gap-2">
              {modes.map((m) => (
                <button
                  key={m}
                  onClick={() => setMode(m)}
                  className={`p-2.5 rounded-xl text-xs font-medium border text-left transition-all ${
                    mode === m
                      ? 'bg-pink-500/20 border-pink-500 text-pink-300'
                      : 'border-white/10 text-gray-400 hover:bg-white/5'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white font-semibold text-sm mt-2"
        >
          Сақтау
        </button>
      </div>
    </div>
  );
};
