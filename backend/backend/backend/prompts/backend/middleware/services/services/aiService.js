import OpenAI from 'openai';
import { generateSabinaPrompt } from '../prompts/sabinaPrompt.js';
import { getMemory, updateMemory, extractFactsFromMessage } from './memoryService.js';

let openai = null;

const getOpenAIClient = () => {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      console.warn('Ескерту: OPENAI_API_KEY сақталмаған. Уақытша Mock AI режимі қосылады.');
      return null;
    }
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
};

export const getAIResponse = async (userId, messages, mood = 'Calm', mode = 'Friendly') => {
  const lastUserMsg = messages[messages.length - 1]?.content || '';
  
  // Пайдаланушы хабарламасынан фактілерді анықтау және жадыны жаңарту
  const extractedFacts = extractFactsFromMessage(lastUserMsg);
  if (Object.keys(extractedFacts).length > 0) {
    updateMemory(userId, extractedFacts);
  }

  const currentMemory = getMemory(userId);
  const systemPrompt = generateSabinaPrompt(currentMemory, mood, mode);

  const client = getOpenAIClient();

  if (!client) {
    // API Key жоқ кездегі Mock (тестілік) жауап
    await new Promise((resolve) => setTimeout(resolve, 1200));
    let mockReply = `Сәлем! Мен Sabina-мын. Сіз бұлай жаздыңыз: "${lastUserMsg}". (Ескерту: Бұл жүйелік Mock жауап, шынайы OpenAI жауабы үшін backend/.env файлына OPENAI_API_KEY енгізіңіз).`;
    if (currentMemory.name) {
      mockReply = `Сәлем, ${currentMemory.name}! ${mockReply}`;
    }
    return {
      reply: mockReply,
      updatedMemory: currentMemory
    };
  }

  try {
    const apiMessages = [
      { role: 'system', content: systemPrompt },
      ...messages.map(m => ({ role: m.role, content: m.content }))
    ];

    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: apiMessages,
      temperature: 0.7,
      max_tokens: 600
    });

    const reply = response.choices[0].message.content;
    return {
      reply,
      updatedMemory: currentMemory
    };
  } catch (error) {
    console.error('OpenAI API Қателігі:', error);
    throw new Error('AI серверімен байланыс орнату мүмкін болмады.');
  }
};
