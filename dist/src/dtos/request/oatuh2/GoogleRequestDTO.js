"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const account_1 = require("../../../constants/account");
const user_1 = require("../../../constants/user");
class GoogleRequestDTO {
    constructor(data) {
        this.google_id = data.id;
        this.first_name = data.name.givenName;
        this.last_name = data.name.familyName;
        this.email = data.emails[0].value;
        this.avatar = data.photos[0].value;
        this.password = (0, uuid_1.v4)();
        this.username = user_1.NAME_DEFAULT + this.google_id;
        this.type_account = account_1.ACCOUNT_TYPE.GOOGLE;
    }
    get() {
        return this;
    }
}
exports.default = GoogleRequestDTO;
//# sourceMappingURL=GoogleRequestDTO.js.map