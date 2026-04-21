"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
let token = '';
describe('API Tests', () => {
    it('should create user and return token', async () => {
        const res = await request.post('/users').send({
            firstname: "API",
            lastname: "Test",
            email: "api@test.com",
            password: "1234"
        });
        token = res.body.token;
        expect(res.status).toBe(201);
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
        expect(res.status).toBe(200);
    });
    it('should create order', async () => {
        const res = await request
            .post('/orders')
            .set('Authorization', `Bearer ${token}`)
            .send({ user_id: 1 });
        expect(res.status).toBe(200);
    });
});
