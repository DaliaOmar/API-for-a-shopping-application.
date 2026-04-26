import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './handlers/users';
import productsRouter from './handlers/products';
import ordersRouter from './handlers/orders';

dotenv.config();

const app = express();
const PORT = parseInt(process.env.PORT ?? '3000', 10);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', usersRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);

app.get('/', (_req, res) => {
  res.json({
    store: ' Pajama Store API',
    version: '1.0.0',
    status: 'running',
  });
});

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`  Pajama Store API running on http://localhost:${PORT}`);
});

export default app;