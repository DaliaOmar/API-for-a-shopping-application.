import { Router } from 'express';
import { OrderStore } from '../models/order';
import { verifyToken } from '../middleware/auth';

const router = Router();
const store = new OrderStore();


router.post('/', verifyToken, async (req, res) => {
  const user_id = (req as any).user.id; // من token
  const order = await store.create(user_id);
  res.status(201).json(order);
});
router.get('/current/:user_id', verifyToken, async (req, res) => {
  res.json(await store.currentOrderByUser(parseInt(req.params.user_id)));
});

router.get('/completed/:user_id', verifyToken, async (req, res) => {
  res.json(await store.completedOrdersByUser(parseInt(req.params.user_id)));
});

router.post('/:id/products', verifyToken, async (req, res) => {
  const { product_id, quantity } = req.body;
  res.json(
    await store.addProduct(
      parseInt(req.params.id),
      product_id,
      quantity
    )
  );
});

export default router;