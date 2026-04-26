"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductsStore = void 0;
const database_1 = __importDefault(require("../database"));
class OrderProductsStore {
    async addProduct(order_id, product_id, quantity) {
        const conn = await database_1.default.connect();
        const result = await conn.query(`INSERT INTO order_products (order_id, product_id, quantity)
       VALUES ($1, $2, $3)
       RETURNING *`, [order_id, product_id, quantity]);
        conn.release();
        return result.rows[0];
    }
    async getProductsByOrder(order_id) {
        const conn = await database_1.default.connect();
        const result = await conn.query(`SELECT * FROM order_products WHERE order_id = $1`, [order_id]);
        conn.release();
        return result.rows;
    }
    async delete(order_id, product_id) {
        const conn = await database_1.default.connect();
        const result = await conn.query(`DELETE FROM order_products
       WHERE order_id = $1 AND product_id = $2
       RETURNING *`, [order_id, product_id]);
        conn.release();
        return result.rows[0];
    }
}
exports.OrderProductsStore = OrderProductsStore;
