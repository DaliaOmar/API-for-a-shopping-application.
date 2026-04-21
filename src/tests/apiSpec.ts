import supertest from 'supertest';
import app from '../server';

const request = supertest(app as any);

let token = '';
let userId = 0;
let productId = 0;

const email = `api${Date.now()}@test.com`;

describe('API Tests', () => {

  it('should create user and return token', async () => {
    const res = await request.post('/users').send({
      firstname: "API",
      lastname: "Test",
      email,
      password: "1234"
    });

    expect(res.status).toBe(201);

    token = res.body.token;
    userId = res.body.id;
  });

  it('should get products', async () => {
    const res = await request.get('/products');
    expect(res.status).toBe(200);
  });

  it('should create product (protected)', async () => {
    const res = await request
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: "API Pajama",
        price: 60,
        category: "Test"
      });

    expect(res.status).toBe(201);

    productId = res.body.id;
  });

  it('should create order', async () => {
    const res = await request
      .post('/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ user_id: userId });

    expect(res.status).toBe(201);
  });

});