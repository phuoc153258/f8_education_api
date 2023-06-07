"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const OptionMailTemplateDTO_1 = __importDefault(require("../dtos/request/mail/OptionMailTemplateDTO"));
const MAIL_TEMPLATE = {
    OTP_TEMPLATE: (otp) => {
        const options = {
            subject: "Xác thực OTP",
            html: `</h1>Mã OTP của bạn là: ${otp} </>`,
        };
        const otp_template = new OptionMailTemplateDTO_1.default(options);
        return otp_template;
    },
    VERIFY_EMAIL_TEMPLATE: (token) => {
        const options = {
            subject: "Xác thực email",
            html: `</h1>Nhấp vào đường link sau để xác thực email của bạn: ${token} </>`,
        };
        const otp_template = new OptionMailTemplateDTO_1.default(options);
        return otp_template;
    },
};
exports.default = MAIL_TEMPLATE;
//# sourceMappingURL=mail.js.map