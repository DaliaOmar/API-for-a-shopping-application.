"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("../models/order");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const store = new order_1.OrderStore();
router.post('/', auth_1.verifyToken, async (req, res) => {
    const order = await store.create(req.body.user_id);
    res.json(order);
});
router.get('/current/:user_id', auth_1.verifyToken, async (req, res) => {
    res.json(await store.currentOrderByUser(parseInt(req.params.user_id)));
});
router.get('/completed/:user_id', auth_1.verifyToken, async (req, res) => {
    res.json(await store.completedOrdersByUser(parseInt(req.params.user_id)));
});
router.post('/:id/products', auth_1.verifyToken, async (req, res) => {
    const { product_id, quantity } = req.body;
    res.json(await store.addProduct(parseInt(req.params.id), product_id, quantity));
});
exports.default = router;
