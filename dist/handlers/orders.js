"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_1 = require("../models/order");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const store = new order_1.OrderStore();
/**
 * POST /orders
 */
router.post('/', auth_1.verifyToken, async (req, res) => {
    const user_id = req.user.id;
    const order = await store.create(user_id);
    res.status(201).json(order);
});
/**
 * GET current orders
 */
router.get('/current/:user_id', auth_1.verifyToken, async (req, res) => {
    const orders = await store.currentOrderByUser(parseInt(req.params.user_id));
    res.json(orders);
});
/**
 * GET completed orders
 */
router.get('/completed/:user_id', auth_1.verifyToken, async (req, res) => {
    const orders = await store.completedOrdersByUser(parseInt(req.params.user_id));
    res.json(orders);
});
/**
 * Add product to order
 */
router.post('/:id/products', auth_1.verifyToken, async (req, res) => {
    const { product_id, quantity } = req.body;
    const result = await store.addProduct(parseInt(req.params.id), product_id, quantity);
    res.json(result);
});
exports.default = router;
