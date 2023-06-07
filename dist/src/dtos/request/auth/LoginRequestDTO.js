"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LoginRequestDTO {
    constructor({ email, password }) {
        this._email = email;
        this._password = password;
    }
    get email() {
        return this._email;
    }
    get password() {
        return this._password;
    }
}
exports.default = LoginRequestDTO;
//# sourceMappingURL=LoginRequestDTO.js.map