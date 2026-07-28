import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth.js';
import chatRoutes from './routes/chat.js';
import memoryRoutes from './routes/memory.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Сұраныстар шегінен астыңыз, сәлден соң қайталаңыз.' }
});
app.use('/api/', limiter);

// Бағыттар (Routes)
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/memory', memoryRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'Sabina AI Backend', timestamp: new Date() });
});

app.listen(PORT, () => {
  console.log(`🚀 SABINA AI Backend сервері ${PORT} портында іске қосылды`);
});
