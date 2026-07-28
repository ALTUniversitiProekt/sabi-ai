import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { getMemory, updateMemory } from '../services/memoryService.js';

const router = express.Router();

router.get('/', authenticateToken, (req, res) => {
  const memory = getMemory(req.user.id);
  res.json({ memory });
});

router.put('/', authenticateToken, (req, res) => {
  const updated = updateMemory(req.user.id, req.body.facts || {});
  res.json({ memory: updated });
});

export default router;
