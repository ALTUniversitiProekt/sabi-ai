import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Mock қолданушылар қоры
const users = [
  { id: 'usr_1', email: 'test@sabina.ai', password: 'password123', name: 'Ернұр', preferredLanguage: 'kk' }
];

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Электронды пошта немесе құпия сөз қате.' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, name: user.name },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '7d' }
  );

  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      preferredLanguage: user.preferredLanguage
    }
  });
});

router.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'Бұл электронды пошта тіркелген.' });
  }

  const newUser = { id: `usr_${Date.now()}`, email, password, name, preferredLanguage: 'kk' };
  users.push(newUser);

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, name: newUser.name },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '7d' }
  );

  return res.json({
    token,
    user: { id: newUser.id, email: newUser.email, name: newUser.name, preferredLanguage: newUser.preferredLanguage }
  });
});

export default router;
