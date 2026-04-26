import { Router, Request, Response } from 'express';
import { UserStore } from '../models/user';
import { verifyToken, signToken } from '../middleware/auth';

const router = Router();
const store = new UserStore();

/**
 * GET /users
 */
router.get('/', verifyToken, async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

/**
 * GET /users/:id
 */
router.get('/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const user = await store.show(parseInt(req.params.id));
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

/**
 * POST /users
 */
router.post('/', async (req: Request, res: Response) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    res.status(400).json({
      error: 'firstname, lastname, email, and password are required',
    });
    return;
  }

  try {
    const user = await store.create({ firstname, lastname, email, password });
    const token = signToken(user.id as number, user.email);
    res.status(201).json({ user, token });
  } catch (err) {
    const msg = (err as Error).message;
    if (msg.includes('unique') || msg.includes('duplicate')) {
      res.status(409).json({ error: 'Email already in use' });
    } else {
      res.status(500).json({ error: msg });
    }
  }
});

/**
 * POST /users/authenticate
 */
router.post('/authenticate', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: 'email and password are required' });
    return;
  }

  try {
    const user = await store.authenticate(email, password);
    if (!user) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    const token = signToken(user.id as number, user.email);
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

/**
 * DELETE /users/:id
 */
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(parseInt(req.params.id));
    if (!deleted) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;