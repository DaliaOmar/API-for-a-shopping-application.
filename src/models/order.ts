import client from '../database';

export class OrderStore {
  async create(user_id: number) {
    const conn = await client.connect();
  
    const result = await conn.query(
      'INSERT INTO orders (user_id, status) VALUES ($1, $2) RETURNING *',
      [user_id, 'active']
    );
  
    conn.release();
    return result.rows[0];
  }

  async addProduct(order_id: number, product_id: number, quantity: number) {
    const conn = await client.connect();
    const result = await conn.query(
      'INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1,$2,$3) RETURNING *',
      [order_id, product_id, quantity]
    );
    conn.release();
    return result.rows[0];
  }

  async currentOrderByUser(user_id: number) {
    const conn = await client.connect();
    const result = await conn.query(
      'SELECT * FROM orders WHERE user_id=$1 AND status=$2',
      [user_id, 'active']
    );
    conn.release();
    return result.rows;
  }

  async completedOrdersByUser(user_id: number) {
    const conn = await client.connect();
    const result = await conn.query(
      'SELECT * FROM orders WHERE user_id=$1 AND status=$2',
      [user_id, 'complete']
    );
    conn.release();
    return result.rows;
  }
}