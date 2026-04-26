"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = supertest_1.default.agent(server_1.default);
let token;
let userId;
let productId;
let orderId;
const email = `test${Date.now()}@test.com`;
describe('API Tests', () => {
    beforeAll(async () => {
        process.env.ENV = 'test';
        const userRes = await request.post('/users').send({
            firstname: 'Test',
            lastname: 'User',
            email,
            password: '1234'
        });
        token = userRes.body.token;
        userId = userRes.body.user.id;
        const productRes = await request
            .post('/products')
            .set('Authorization', `Bearer ${token}`)
            .send({
            name: 'Test Product',
            price: 100,
            category: 'Test'
        });
        productId = productRes.body.id;
        const orderRes = await request
            .post('/orders')
            .set('Authorization', `Bearer ${token}`);
        orderId = orderRes.body.id;
    });
    /**
     * USERS
     */
    it('GET /users should return all users', async () => {
        const res = await request
            .get('/users')
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
    it('GET /users/:id should return user', async () => {
        const res = await request
            .get(`/users/${userId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
    it('POST /users/authenticate should return token', async () => {
        const res = await request.post('/users/authenticate').send({
            email,
            password: '1234'
        });
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    });
    /**
     * PRODUCTS
     */
    it('GET /products should return products', async () => {
        const res = await request.get('/products');
        expect(res.status).toBe(200);
    });
    it('GET /products/:id should return product', async () => {
        const res = await request.get(`/products/${productId}`);
        expect(res.status).toBe(200);
    });
    /**
     * ORDERS
     */
    it('GET /orders/current/:user_id should return current order', async () => {
        const res = await request
            .get(`/orders/current/${userId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
    it('GET /orders/completed/:user_id should return completed orders', async () => {
        const res = await request
            .get(`/orders/completed/${userId}`)
            .set('Authorization', `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
    it('POST /orders/:id/products should add product to order', async () => {
        const res = await request
            .post(`/orders/${orderId}/products`)
            .set('Authorization', `Bearer ${token}`)
            .send({
            product_id: productId,
            quantity: 2
        });
        expect(res.status).toBe(200);
    });
});
