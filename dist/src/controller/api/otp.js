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
const GetMailOTPRequestDTO_1 = __importDefault(require("../../dtos/request/otp/GetMailOTPRequestDTO"));
const token_1 = __importDefault(require("../../service/token"));
const TokenDataResponseDTO_1 = __importDefault(require("../../dtos/response/token/TokenDataResponseDTO"));
const base_1 = require("../../messages/success/base");
const otp_1 = require("../../service/otp");
const OTPRequestDTO_1 = __importDefault(require("../../dtos/request/otp/OTPRequestDTO"));
const GetPhoneOTPRequestDTO_1 = __importDefault(require("../../dtos/request/otp/GetPhoneOTPRequestDTO"));
const otpController = {
    sendMail: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const getMailDTORequest = new GetMailOTPRequestDTO_1.default(req.query);
            const OTPResponse = yield otp_1.otpService.sendMail(getMailDTORequest);
            return res.success(base_1.BaseSuccesMessage.SUCCESS, OTPResponse);
        }
        catch (error) {
            next(error);
        }
    }),
    sendPhone: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const phone = new GetPhoneOTPRequestDTO_1.default({ phone: "123" });
            const response = yield otp_1.otpService.sendPhone(phone);
            return res.success(base_1.BaseSuccesMessage.SUCCESS, response);
        }
        catch (error) {
            next(error);
        }
    }),
    verify: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const OTPRequest = new OTPRequestDTO_1.default(req.body);
            const OTPResponse = yield otp_1.otpService.verify(OTPRequest);
            const payload = {
                data: OTPResponse,
                secret: env_1.default.otp.secret,
                expire_in: env_1.default.otp.expiresIn,
            };
            const tokenData = new TokenDataResponseDTO_1.default(payload);
            const tokenResult = token_1.default.generateToken(tokenData);
            return res.success(base_1.BaseSuccesMessage.SUCCESS, tokenResult);
        }
        catch (error) {
            if (error.message == "jwt expired") {
                res.errors("JWT hết hạn");
            }
            next(error);
        }
    }),
};
exports.default = otpController;
//# sourceMappingURL=otp.js.map