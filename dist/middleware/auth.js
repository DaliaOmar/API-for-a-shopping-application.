"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.signToken = exports.verifyToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1["default"].config();
var TOKEN_SECRET = process.env.TOKEN_SECRET;
var verifyToken = function (req, res, next) {
    try {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'Access denied' });
        }
        var token = authHeader.split(' ')[1];
        var decoded = jsonwebtoken_1["default"].verify(token, TOKEN_SECRET);
        req.user = decoded;
        next();
    }
    catch (_a) {
        res.status(401).json({ error: 'Access denied' });
    }
};
exports.verifyToken = verifyToken;
var signToken = function (id, email) {
    return jsonwebtoken_1["default"].sign({ id: id, email: email }, TOKEN_SECRET);
};
exports.signToken = signToken;
