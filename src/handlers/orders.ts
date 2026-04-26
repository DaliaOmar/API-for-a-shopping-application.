import { Router, Response } from 'express';
import { OrderStore } from '../models/order';
import { verifyToken } from '../middleware/auth';
import { AuthRequest } from '../types/authRequest';

const router = Router();
const store = new OrderStore();

/**
 * POST /orders
 */
router.post('/', verifyToken, async (req: AuthRequest, res: Response) => {
  const user_id = req.user!.id;

  const order = await store.create(user_id);
  res.status(201).json(order);
});

/**
 * GET current orders
 */
router.get('/current/:user_id', verifyToken, async (req: AuthRequest, res: Response) => {
  const orders = await store.currentOrderByUser(parseInt(req.params.user_id));
  res.json(orders);
});

/**
 * GET completed orders
 */
router.get('/completed/:user_id', verifyToken, async (req: AuthRequest, res: Response) => {
  const orders = await store.completedOrdersByUser(parseInt(req.params.user_id));
  res.json(orders);
});

/**
 * Add product to order
 */
router.post('/:id/products', verifyToken, async (req: AuthRequest, res: Response) => {
  const { product_id, quantity } = req.body;

  const result = await store.addProduct(
    parseInt(req.params.id),
    product_id,
    quantity
  );

  res.json(result);
});

export default router;