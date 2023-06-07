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
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = __importDefault(require("../../../config/env"));
const token_1 = __importDefault(require("../token"));
const TokenDataResponseDTO_1 = __importDefault(require("../../dtos/response/token/TokenDataResponseDTO"));
const mail_1 = __importDefault(require("../../constants/mail"));
const SendMailRequestDTO_1 = __importDefault(require("../../dtos/request/mail/SendMailRequestDTO"));
const models_1 = require("../../models");
const mail_2 = require("../../messages/success/mail");
const mailService = {
    sendMail: (request) => __awaiter(void 0, void 0, void 0, function* () {
        const mailOption = Object.assign({ from: env_1.default.mail.root, to: request.email }, request.options);
        try {
            const transporter = nodemailer_1.default.createTransport({
                service: env_1.default.mail.service,
                auth: {
                    user: env_1.default.mail.root,
                    pass: env_1.default.mail.key,
                },
            });
            yield transporter.sendMail(mailOption);
            return Promise.resolve(mail_2.MailSuccessMessage.SEND_MAIL_SUCCESS);
        }
        catch (err) {
            return Promise.reject({
                message: err.message,
            });
        }
    }),
    verifyMail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const secret = env_1.default.mail.secret;
            const expiresIn = env_1.default.mail.expiresIn;
            const payload = {
                data: email,
                secret: secret,
                expire_in: expiresIn,
            };
            const tokenData = new TokenDataResponseDTO_1.default(payload);
            const tokenResult = token_1.default.generateToken(tokenData);
            const templateMail = mail_1.default.VERIFY_EMAIL_TEMPLATE(tokenResult.token);
            const option = {
                email: email,
                options: templateMail,
            };
            const sendMailRequest = new SendMailRequestDTO_1.default(option);
            const response = yield mailService.sendMail(sendMailRequest);
            return Promise.resolve(response);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }),
    confirmVerify: (token, email) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const secret = env_1.default.mail.secret;
            const verified = token_1.default.verifyToken(token, secret);
            if (verified) {
                const user = yield models_1.User.findOne({ email: email });
                user.email_verified = true;
                yield user.save();
                return Promise.resolve(mail_2.MailSuccessMessage.VERIFY_EMAIL_SUCCESS);
            }
        }
        catch (err) {
            return Promise.reject(err);
        }
    }),
};
exports.default = mailService;
//# sourceMappingURL=index.js.map