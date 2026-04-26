"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signToken = (id, email) => {
    return jsonwebtoken_1.default.sign({ id, email }, process.env.TOKEN_SECRET);
};
exports.signToken = signToken;
const verifyToken = (req, res, next) => {
    try {
        const header = req.headers.authorization;
        if (!header) {
            return res.status(401).json('Access denied');
        }
        const token = header.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
        next();
    }
    catch {
        res.status(401).json('Invalid token');
    }
};
exports.verifyToken = verifyToken;
