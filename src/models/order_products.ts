import client from '../database';

export type OrderProduct = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class OrderProductsStore {

  async addProduct(order_id: number, product_id: number, quantity: number): Promise<OrderProduct> {
    const conn = await client.connect();

    const result = await conn.query(
      `INSERT INTO order_products (order_id, product_id, quantity)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [order_id, product_id, quantity]
    );

    conn.release();
    return result.rows[0];
  }

  async getProductsByOrder(order_id: number): Promise<OrderProduct[]> {
    const conn = await client.connect();

    const result = await conn.query(
      `SELECT * FROM order_products WHERE order_id = $1`,
      [order_id]
    );

    conn.release();
    return result.rows;
  }

  async delete(order_id: number, product_id: number): Promise<OrderProduct> {
    const conn = await client.connect();

    const result = await conn.query(
      `DELETE FROM order_products
       WHERE order_id = $1 AND product_id = $2
       RETURNING *`,
      [order_id, product_id]
    );

    conn.release();
    return result.rows[0];
  }
}