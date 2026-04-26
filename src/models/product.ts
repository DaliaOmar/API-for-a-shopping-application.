import client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category?: string;
};

export class ProductStore {
  async index(): Promise<Product[]> {
    const conn = await client.connect();
    const result = await conn.query('SELECT * FROM products');
    conn.release();
    return result.rows;
  }

  async show(id: number): Promise<Product> {
    const conn = await client.connect();
    const result = await conn.query(
      'SELECT * FROM products WHERE id=$1',
      [id]
    );
    conn.release();
    return result.rows[0];
  }

  async create(p: Product): Promise<Product> {
    const conn = await client.connect();
    const result = await conn.query(
      'INSERT INTO products (name, price, category) VALUES ($1,$2,$3) RETURNING *',
      [p.name, p.price, p.category]
    );
    conn.release();
    return result.rows[0];
  }

  async update(id: number, p: Product): Promise<Product> {
    const conn = await client.connect();
    const sql = `
      UPDATE products 
      SET name=$1, price=$2, category=$3 
      WHERE id=$4 
      RETURNING *`;
    const result = await conn.query(sql, [p.name, p.price, p.category, id]);
    conn.release();
    return result.rows[0];
  }

  
  async delete(id: number): Promise<Product> {
    const conn = await client.connect();
    const result = await conn.query(
      'DELETE FROM products WHERE id=$1 RETURNING *',
      [id]
    );
    conn.release();
    return result.rows[0];
  }


}