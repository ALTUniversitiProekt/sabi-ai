import React from 'react';
import { Plus, MessageSquare, Trash2, User, LogOut, ShieldAlert } from 'lucide-react';
import { useChatContext } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Sidebar = ({ isOpen, onClose }) => {
  const { conversations, currentChatId, setCurrentChatId, createNewChat, deleteChat } = useChatContext();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-72 glass-panel border-r border-white/10 flex flex-col transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      
      {/* Логотип */}
      <div className="p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center font-bold text-white text-sm shadow-md">
            S
          </div>
          <span className="font-bold text-lg tracking-wide text-white">SABINA <span className="text-pink-500">AI</span></span>
        </div>
      </div>

      {/* Жаңа чат түймесі */}
      <div className="p-3">
        <button
          onClick={createNewChat}
          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 hover:border-pink-500/60 text-white font-medium text-sm flex items-center justify-center gap-2 transition-all"
        >
          <Plus size={16} />
          Жаңа Чат Бастау
        </button>
      </div>

      {/* Чаттар тізімі */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        <div className="text-[10px] uppercase tracking-wider font-semibold text-gray-500 px-3 py-1">
          Recent Conversations
        </div>
        {conversations.map((chat) => (
          <div
            key={chat.id}
            onClick={() => setCurrentChatId(chat.id)}
            className={`group flex items-center justify-between p-2.5 rounded-xl cursor-pointer text-sm transition-all ${
              currentChatId === chat.id
                ? 'bg-white/10 text-white font-medium border border-white/10'
                : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <MessageSquare size={16} className="text-pink-400 flex-shrink-0" />
              <span className="truncate">{chat.title}</span>
            </div>
            {conversations.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteChat(chat.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-opacity"
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Ақпараттық блок (AI Disclaimer) */}
      <div className="p-3 m-3 rounded-xl bg-purple-950/40 border border-purple-500/20 text-[11px] text-gray-400 flex items-start gap-2">
        <ShieldAlert size={16} className="text-pink-400 flex-shrink-0 mt-0.5" />
        <span>Sabina — AI виртуалды кейіпкері. Нақты адам емес.</span>
      </div>

      {/* Пайдаланушы профилі */}
      <div className="p-3 border-t border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/profile')}>
          <div className="w-8 h-8 rounded-full bg-purple-600/50 flex items-center justify-center text-xs font-bold text-white border border-purple-400/30">
            <User size={14} />
          </div>
          <div className="text-xs">
            <p className="font-semibold text-white">{user ? user.name : 'Қонақ'}</p>
            <p className="text-gray-400 text-[10px]">{user ? user.email : 'Кіріңіз'}</p>
          </div>
        </div>

        {user && (
          <button onClick={logout} className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all">
            <LogOut size={16} />
          </button>
        )}
      </div>

    </aside>
  );
};
