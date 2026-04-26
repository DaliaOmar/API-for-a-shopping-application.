"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = require("../models/user");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
const store = new user_1.UserStore();
/**
 * GET /users
 */
router.get('/', auth_1.verifyToken, async (_req, res) => {
    try {
        const users = await store.index();
        res.json(users);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
/**
 * GET /users/:id
 */
router.get('/:id', auth_1.verifyToken, async (req, res) => {
    try {
        const user = await store.show(parseInt(req.params.id));
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
/**
 * POST /users
 */
router.post('/', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
        res.status(400).json({
            error: 'firstname, lastname, email, and password are required',
        });
        return;
    }
    try {
        const user = await store.create({ firstname, lastname, email, password });
        const token = (0, auth_1.signToken)(user.id, user.email);
        res.status(201).json({ user, token });
    }
    catch (err) {
        const msg = err.message;
        if (msg.includes('unique') || msg.includes('duplicate')) {
            res.status(409).json({ error: 'Email already in use' });
        }
        else {
            res.status(500).json({ error: msg });
        }
    }
});
/**
 * POST /users/authenticate
 */
router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: 'email and password are required' });
        return;
    }
    try {
        const user = await store.authenticate(email, password);
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }
        const token = (0, auth_1.signToken)(user.id, user.email);
        res.json({ user, token });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
/**
 * DELETE /users/:id
 */
router.delete('/:id', auth_1.verifyToken, async (req, res) => {
    try {
        const deleted = await store.delete(parseInt(req.params.id));
        if (!deleted) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(deleted);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.default = router;
