"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = void 0;
const otp_generator_1 = __importDefault(require("otp-generator"));
const OTP_1 = require("../../constants/OTP");
const generateOtp = () => {
    return otp_generator_1.default.generate(OTP_1.OTP_CONFIG.length, OTP_1.OTP_CONFIG.options);
};
exports.generateOtp = generateOtp;
//# sourceMappingURL=otp.js.map