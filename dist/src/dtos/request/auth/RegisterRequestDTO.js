"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RegisterRequestDTO {
    constructor({ fullname, password, email }) {
        this._fullname = fullname;
        this._password = password;
        this._email = email;
    }
    get fullname() {
        return this._fullname;
    }
    get password() {
        return this._password;
    }
    get email() {
        return this._email;
    }
}
exports.default = RegisterRequestDTO;
//# sourceMappingURL=RegisterRequestDTO.js.map