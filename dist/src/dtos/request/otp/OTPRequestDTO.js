"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class OTPRequestDTO {
    constructor({ email, otp }) {
        this._email = email;
        this._otp = otp;
    }
    get otp() {
        return this._otp;
    }
    get email() {
        return this._email;
    }
}
exports.default = OTPRequestDTO;
//# sourceMappingURL=OTPRequestDTO.js.map