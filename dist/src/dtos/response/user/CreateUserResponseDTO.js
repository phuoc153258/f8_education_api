"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateUserResponseDTO {
    get fullname() {
        return this._fullname;
    }
    setfullname(_fullname) {
        this._fullname = _fullname;
        return this;
    }
    get password() {
        return this._fullname;
    }
    setPassword(_password) {
        this._password = _password;
        return this;
    }
    get email() {
        return this._fullname;
    }
    setEmail(_email) {
        this._email = _email;
        return this;
    }
    get() {
        const request = {
            fullname: this._fullname,
            password: this._password,
            email: this._email,
        };
        return request;
    }
    toJSON(model) {
        if (!model)
            return null;
        return this.setfullname(model.fullname)
            .setPassword(model.password)
            .setEmail(model.email)
            .get();
    }
}
exports.default = CreateUserResponseDTO;
//# sourceMappingURL=CreateUserResponseDTO.js.map