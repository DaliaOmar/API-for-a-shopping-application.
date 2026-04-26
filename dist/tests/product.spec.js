"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const store = new product_1.ProductStore();
let createdProductId;
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
        createdProductId = result.id;
        expect(result.name).toEqual("Test Pajama");
    });
    it('should return list of products', async () => {
        const result = await store.index();
        expect(result.length).toBeGreaterThan(0);
    });
    it('should return one product', async () => {
        const result = await store.show(createdProductId);
        expect(result.id).toEqual(createdProductId);
    });
    it('should update a product', async () => {
        const result = await store.update(createdProductId, {
            name: "Updated Pajama",
            price: 60,
            category: "Women"
        });
        expect(result.name).toEqual("Updated Pajama");
    });
    it('should delete a product', async () => {
        const result = await store.delete(createdProductId);
        expect(result.id).toEqual(createdProductId);
    });
});
