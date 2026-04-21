"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var users_1 = __importDefault(require("./handlers/users"));
var products_1 = __importDefault(require("./handlers/products"));
var orders_1 = __importDefault(require("./handlers/orders"));
dotenv_1["default"].config();
var app = (0, express_1["default"])();
var PORT = parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : '3000', 10);
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use('/users', users_1["default"]);
app.use('/products', products_1["default"]);
app.use('/orders', orders_1["default"]);
app.get('/', function (_req, res) {
    res.json({
        store: ' Pajama Store API',
        version: '1.0.0',
        status: 'running'
    });
});
app.use(function (_req, res) {
    res.status(404).json({ error: 'Route not found' });
});
app.listen(PORT, function () {
    console.log("  Pajama Store API running on http://localhost:".concat(PORT));
});
exports["default"] = app;
