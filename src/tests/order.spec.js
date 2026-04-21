"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_1 = require("../models/order");
const store = new order_1.OrderStore();
describe('Order Model', () => {
    it('should create an order', async () => {
        const order = await store.create(1);
        expect(order.user_id).toEqual(1);
    });
    it('should add product to order', async () => {
        const result = await store.addProduct(1, 1, 2);
        expect(result.quantity).toEqual(2);
    });
});
