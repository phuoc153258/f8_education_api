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
exports.otpService = void 0;
const user_1 = require("../../models/user");
const auth_1 = require("../../messages/error/auth");
const index_1 = require("../../models/index");
const otp_1 = require("../helper/otp");
const index_2 = __importDefault(require("../mail/index"));
const mail_1 = __importDefault(require("../../constants/mail"));
const SendMailRequestDTO_1 = __importDefault(require("../../dtos/request/mail/SendMailRequestDTO"));
const VerifyTokenResponseDTO_1 = __importDefault(require("../../dtos/response/otp/VerifyTokenResponseDTO"));
const mongoose_1 = require("mongoose");
const env_1 = __importDefault(require("../../../config/env"));
const token_1 = __importDefault(require("../token"));
const TokenDataResponseDTO_1 = __importDefault(require("../../dtos/response/token/TokenDataResponseDTO"));
const otpService = {
    sendMail: (getMailOTPRequestDTO) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userEmail = getMailOTPRequestDTO.email;
            const user = yield user_1.User.findOne({ email: userEmail });
            if (!user)
                return Promise.reject(new mongoose_1.Error(auth_1.AuthErrorMessage.EMAIL_IS_NOT_EXIST));
            if (!user.email_verified)
                return Promise.reject(new mongoose_1.Error(auth_1.AuthErrorMessage.EMAIL_IS_NOT_VERIFIED));
            yield index_1.OTP.deleteMany({ email: userEmail });
            const otpGenarate = (0, otp_1.generateOtp)();
            const payload = {
                data: { otp: otpGenarate },
                secret: env_1.default.otp.secret,
                expire_in: env_1.default.otp.expiresIn,
            };
            const tokenData = new TokenDataResponseDTO_1.default(payload);
            const OTPToken = yield token_1.default.generateToken(tokenData);
            yield index_1.OTP.create({
                email: userEmail,
                otp: OTPToken.token,
            });
            const templateMail = mail_1.default.OTP_TEMPLATE(otpGenarate);
            const options = {
                email: userEmail,
                options: templateMail,
            };
            const sendMailOTPRequestDTO = new SendMailRequestDTO_1.default(options);
            const response = yield index_2.default.sendMail(sendMailOTPRequestDTO);
            return Promise.resolve(response);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
    sendPhone: (getPhoneOTPRequestDTO) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            var sid = env_1.default.sms.sid;
            var auth_token = env_1.default.sms.auth_token;
            var twilio = require("twilio")(sid, auth_token);
            const response = yield twilio.messages.create({
                from: "+16188160982",
                to: "+84776750418",
                body: "bủ bủ lờ mao",
            });
            return Promise.resolve(response);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
    verify: (OTPRequest) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const otp = yield index_1.OTP.findOne({ email: OTPRequest.email });
            if (!otp)
                return Promise.reject(new mongoose_1.Error(auth_1.AuthErrorMessage.EMAIL_IS_NOT_EXIST));
            const verifyOTP = token_1.default.verifyToken(otp.otp, env_1.default.otp.secret);
            if (OTPRequest._otp !== verifyOTP.otp)
                return Promise.reject(new mongoose_1.Error(auth_1.AuthErrorMessage.OTP_NOT_MATCH));
            return Promise.resolve(new VerifyTokenResponseDTO_1.default({ email: OTPRequest.email }));
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
};
exports.otpService = otpService;
//# sourceMappingURL=index.js.map