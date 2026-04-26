"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./handlers/users"));
const products_1 = __importDefault(require("./handlers/products"));
const orders_1 = __importDefault(require("./handlers/orders"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT ?? '3000', 10);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/users', users_1.default);
app.use('/products', products_1.default);
app.use('/orders', orders_1.default);
app.get('/', (_req, res) => {
    res.json({
        store: ' Pajama Store API',
        version: '1.0.0',
        status: 'running',
    });
});
app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
app.listen(PORT, () => {
    console.log(`  Pajama Store API running on http://localhost:${PORT}`);
});
exports.default = app;
