"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../models/product");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const store = new product_1.ProductStore();
router.get('/', async (_req, res) => {
    res.json(await store.index());
});
router.get('/:id', async (req, res) => {
    res.json(await store.show(parseInt(req.params.id)));
});
router.post('/', auth_1.verifyToken, async (req, res) => {
    const product = await store.create(req.body);
    res.status(201).json(product);
});
router.delete('/:id', auth_1.verifyToken, async (req, res) => {
    res.json(await store.delete(parseInt(req.params.id)));
});
router.put('/:id', auth_1.verifyToken, async (req, res) => {
    const updated = await store.update(parseInt(req.params.id), req.body);
    res.json(updated);
});
exports.default = router;
