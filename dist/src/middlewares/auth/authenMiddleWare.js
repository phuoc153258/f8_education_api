"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = __importDefault(require("../../../config/env"));
const token_1 = __importDefault(require("../../service/token"));
const authMiddleWare = {
    requireLogin: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        if (!req.headers.authorization) {
            return res.errors("Yêu cầu đăng nhập.", 400);
        }
        try {
            const header = req.headers.authorization.split(" ")[0].trim();
            if (header !== "Bearer")
                return res.errors("Mã token không đúng.");
            const token = req.headers.authorization.split(" ")[1].trim();
            const info = token_1.default.verifyToken(token, env_1.default.jwt.secret);
            if (!info)
                return res.errors("Mã token không đúng.");
            req.user = info;
            next();
        }
        catch (error) {
            if (error.message == "jwt expired") {
                res.errors("Yêu cầu đăng nhập.", 401);
            }
            next(error);
        }
    }),
    isLogin: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (req.headers.authorization != undefined) {
                const header = req.headers.authorization.split(" ")[0].trim();
                if (header == "Bearer") {
                    const token = req.headers.authorization.split(" ")[1].trim();
                    const info = token_1.default.verifyToken(token, env_1.default.jwt.secret);
                    if (info) {
                        req.user = info;
                    }
                }
            }
        }
        catch (error) { }
        next();
    }),
};
exports.default = authMiddleWare;
//# sourceMappingURL=authenMiddleWare.js.map