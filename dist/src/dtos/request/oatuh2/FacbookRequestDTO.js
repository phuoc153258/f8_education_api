"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const account_1 = require("../../../constants/account");
const user_1 = require("../../../constants/user");
class FacebookRequestDTO {
    constructor(data) {
        var _a, _b;
        if (data === null || data === void 0 ? void 0 : data.emails) {
            this.email = (_a = data === null || data === void 0 ? void 0 : data.emails[0]) === null || _a === void 0 ? void 0 : _a.value;
        }
        if (data === null || data === void 0 ? void 0 : data.photos) {
            this.avatar = (_b = data === null || data === void 0 ? void 0 : data.photos[0]) === null || _b === void 0 ? void 0 : _b.value;
        }
        this.facebook_id = data === null || data === void 0 ? void 0 : data.id;
        this.first_name = data === null || data === void 0 ? void 0 : data.name.familyName;
        this.last_name = data === null || data === void 0 ? void 0 : data.name.givenName;
        this.password = (0, uuid_1.v4)();
        this.username = user_1.NAME_DEFAULT + this.facebook_id;
        this.type_account = account_1.ACCOUNT_TYPE.FACEBOOK;
    }
    get() {
        return this;
    }
}
exports.default = FacebookRequestDTO;
//# sourceMappingURL=FacbookRequestDTO.js.map