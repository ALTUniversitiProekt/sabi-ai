const API_BASE = '/api';

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('sabina_token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Сұранысты өңдеу кезінде қате орын алды.');
  }

  return response.json();
};

export const authApi = {
  login: (email, password) => apiFetch('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  register: (email, password, name) => apiFetch('/auth/register', { method: 'POST', body: JSON.stringify({ email, password, name }) }),
};

export const chatApi = {
  sendMessage: (messages, mood, mode, chatId) => 
    apiFetch('/chat', { method: 'POST', body: JSON.stringify({ messages, mood, mode, chatId }) }),
};

export const memoryApi = {
  getMemory: () => apiFetch('/memory'),
};
