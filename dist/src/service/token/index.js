"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const tokenService = {
    generateToken: (tokenData) => {
        const token = (0, jsonwebtoken_1.sign)(Object.assign({}, tokenData.data), tokenData.secret, {
            expiresIn: tokenData.expire_in,
        });
        return { token: token };
    },
    verifyToken: (token, secret) => {
        const verified = (0, jsonwebtoken_1.verify)(token, secret);
        return verified;
    },
};
exports.default = tokenService;
//# sourceMappingURL=index.js.map