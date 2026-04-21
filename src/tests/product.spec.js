"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const store = new product_1.ProductStore();
describe('Product Model', () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should create a product', async () => {
        const result = await store.create({
            name: "Test Pajama",
            price: 50,
            category: "Men"
        });
        expect(result.name).toEqual("Test Pajama");
    });
    it('should return list of products', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    });
});
