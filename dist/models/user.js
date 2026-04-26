"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = parseInt(process.env.SALT_ROUNDS);
class UserStore {
    async index() {
        const conn = await database_1.default.connect();
        const sql = 'SELECT id, firstname, lastname, email FROM users';
        const result = await conn.query(sql);
        conn.release();
        return result.rows;
    }
    async show(id) {
        const conn = await database_1.default.connect();
        const sql = 'SELECT id, firstname, lastname, email FROM users WHERE id=$1';
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
    }
    async create(user) {
        const conn = await database_1.default.connect();
        const hash = bcrypt_1.default.hashSync(user.password + pepper, saltRounds);
        const sql = `
      INSERT INTO users (firstname, lastname, email, password)
      VALUES ($1, $2, $3, $4)
      RETURNING id, firstname, lastname, email
    `;
        const result = await conn.query(sql, [
            user.firstname,
            user.lastname,
            user.email,
            hash
        ]);
        conn.release();
        return result.rows[0];
    }
    async authenticate(email, password) {
        const conn = await database_1.default.connect();
        const sql = 'SELECT * FROM users WHERE email=$1';
        const result = await conn.query(sql, [email]);
        if (result.rows.length) {
            const user = result.rows[0];
            if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                return {
                    id: user.id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email
                };
            }
        }
        conn.release();
        return null;
    }
    async delete(id) {
        const conn = await database_1.default.connect();
        const sql = 'DELETE FROM users WHERE id=$1 RETURNING *';
        const result = await conn.query(sql, [id]);
        conn.release();
        return result.rows[0];
    }
}
exports.UserStore = UserStore;
