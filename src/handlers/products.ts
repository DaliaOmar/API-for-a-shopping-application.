import { Router } from 'express';
import { ProductStore } from '../models/product';
import { verifyToken } from '../middleware/auth';

const router = Router();
const store = new ProductStore();

router.get('/', async (_req, res) => {
  res.json(await store.index());
});

router.get('/:id', async (req, res) => {
  res.json(await store.show(parseInt(req.params.id)));
});


router.post('/', verifyToken, async (req, res) => {
  const product = await store.create(req.body);
  res.status(201).json(product);
});

router.delete('/:id', verifyToken, async (req, res) => {
  res.json(await store.delete(parseInt(req.params.id)));
});

router.put('/:id', verifyToken, async (req, res) => {
  const updated = await store.update(parseInt(req.params.id), req.body);
  res.json(updated);
});


export default router;