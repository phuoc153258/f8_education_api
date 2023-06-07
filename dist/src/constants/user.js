"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NAME_DEFAULT = exports.AVATAR_DEFAULT = exports.GENDERS = exports.AVATAR = exports.GENDER = void 0;
var GENDER;
(function (GENDER) {
    GENDER["FEMALE"] = "Female";
    GENDER["MALE"] = "Male";
    GENDER["OTHER"] = "Other";
})(GENDER = exports.GENDER || (exports.GENDER = {}));
var AVATAR;
(function (AVATAR) {
    AVATAR["DEFAULT"] = "user_avatar_default.jpg";
})(AVATAR = exports.AVATAR || (exports.AVATAR = {}));
exports.GENDERS = [GENDER.FEMALE, GENDER.MALE, GENDER.OTHER];
exports.AVATAR_DEFAULT = AVATAR.DEFAULT;
exports.NAME_DEFAULT = "user";
//# sourceMappingURL=user.js.map