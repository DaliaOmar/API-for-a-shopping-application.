"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signToken = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const TOKEN_SECRET = process.env.TOKEN_SECRET;
const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            throw new Error();
        const token = authHeader.split(' ')[1];
        jsonwebtoken_1.default.verify(token, TOKEN_SECRET);
        next();
    }
    catch {
        res.status(401).json({ error: 'Access denied' });
    }
};
exports.verifyToken = verifyToken;
const signToken = (id, email) => {
    return jsonwebtoken_1.default.sign({ id, email }, TOKEN_SECRET);
};
exports.signToken = signToken;
