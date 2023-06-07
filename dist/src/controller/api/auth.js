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
const LoginRequestDTO_1 = __importDefault(require("../../dtos/request/auth/LoginRequestDTO"));
const RegisterRequestDTO_1 = __importDefault(require("../../dtos/request/auth/RegisterRequestDTO"));
const HashFunction_1 = __importDefault(require("../../helpers/HashFunction"));
const auth_1 = require("../../service/auth/auth");
const auth_2 = __importDefault(require("../../validation/auth"));
const user_1 = __importDefault(require("../../validation/user"));
const token_1 = __importDefault(require("../../service/token"));
const TokenDataResponseDTO_1 = __importDefault(require("../../dtos/response/token/TokenDataResponseDTO"));
const ResetPasswordDTO_1 = __importDefault(require("../../dtos/request/auth/ResetPasswordDTO"));
const base_1 = require("../../messages/success/base");
const authController = {
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const loginRequest = new LoginRequestDTO_1.default(req.body);
            const validateErrors = auth_2.default.loginValidation(loginRequest);
            if (validateErrors.length)
                return res.errors(validateErrors === null || validateErrors === void 0 ? void 0 : validateErrors[0]);
            const userResponse = yield auth_1.authService.login(loginRequest);
            const secret = env_1.default.jwt.secret;
            const expire_in = env_1.default.jwt.expiresIn;
            const payload = {
                data: userResponse,
                secret: secret,
                expire_in: expire_in,
            };
            const tokenData = new TokenDataResponseDTO_1.default(payload);
            const tokenResult = token_1.default.generateToken(tokenData);
            return res.success(base_1.BaseSuccesMessage.SUCCESS, tokenResult);
        }
        catch (error) {
            next(error);
        }
    }),
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let registerRequest = new RegisterRequestDTO_1.default(req.body);
            const validErrors = user_1.default.registerRequest(registerRequest);
            if (validErrors.length)
                return res.errors(validErrors[0], 400);
            registerRequest._password = HashFunction_1.default.generate(registerRequest._password);
            const userResponse = yield auth_1.authService.register(registerRequest);
            return res.success(base_1.BaseSuccesMessage.SUCCESS, userResponse);
        }
        catch (error) {
            next(error);
        }
    }),
    verifyToken: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization.split(" ")[1].trim();
            token_1.default.verifyToken(token, env_1.default.jwt.secret);
            return res.success(base_1.BaseSuccesMessage.SUCCESS);
        }
        catch (err) {
            return res.errors("JWT hết hạn", 401);
        }
    }),
    resetPassword: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { token } = req.body;
            const info = token_1.default.verifyToken(token, env_1.default.otp.secret);
            const resetPasswordDTO = new ResetPasswordDTO_1.default({
                email: info._email,
                password: req.body.password,
            });
            const resetPasswordResult = yield auth_1.authService.resetPassword(resetPasswordDTO);
            return res.success(base_1.BaseSuccesMessage.SUCCESS, resetPasswordResult);
        }
        catch (error) {
            next(error);
        }
    }),
};
exports.default = authController;
//# sourceMappingURL=auth.js.map