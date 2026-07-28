import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getAIResponse } from '../services/aiService.js';

const router = express.Router();

// Уақытша чаттар тарихын сақтау орны
const chatSessions = {};

router.post('/', authenticateToken, async (req, res) => {
  try {
    const { messages, mood, mode, chatId } = req.body;
    const userId = req.user.id;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Хабарламалар массиві жіберілмеді.' });
    }

    const { reply, updatedMemory } = await getAIResponse(userId, messages, mood, mode);

    return res.json({
      message: { role: 'assistant', content: reply, timestamp: new Date().toISOString() },
      memory: updatedMemory
    });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Сервер ішкі қателігі' });
  }
});

export default router;
