// Деректерді уақытша жадыда сақтау (In-memory storage)
const userMemories = {};

export const getMemory = (userId) => {
  return userMemories[userId] || {};
};

export const updateMemory = (userId, newFacts) => {
  if (!userMemories[userId]) {
    userMemories[userId] = {};
  }
  userMemories[userId] = { ...userMemories[userId], ...newFacts };
  return userMemories[userId];
};

export const extractFactsFromMessage = (message) => {
  const facts = {};
  const lowerMsg = message.toLowerCase();

  // Қарапайым паттерн өңдеуші (Pattern Extraction)
  if (lowerMsg.includes('менің атым') || lowerMsg.includes('меня зовут') || lowerMsg.includes('my name is')) {
    const parts = message.split(/менің атым|меня зовут|my name is/i);
    if (parts[1]) {
      facts.name = parts[1].trim().split(' ')[0];
    }
  }

  if (lowerMsg.includes('жастамын') || lowerMsg.includes('лет') || lowerMsg.includes('years old')) {
    const match = message.match(/\d+/);
    if (match) facts.age = match[0];
  }

  return facts;
};
