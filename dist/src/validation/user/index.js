"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const validationUtils = __importStar(require("../../utils/utils"));
const user_1 = require("../../messages/error/user");
const auth_1 = require("../../messages/error/auth");
class UserValidation {
    constructor() {
        this.registerRequest = (params) => {
            const errors = [];
            if (validationUtils.isBlank(params._fullname)) {
                errors.push(user_1.UserErrorMessage.FULLNAME_IS_REQUIRED);
            }
            if (validationUtils.isBlank(params._password)) {
                errors.push(user_1.UserErrorMessage.PASSWORD_IS_REQUIRED);
            }
            if (params._password.length < 6) {
                errors.push(user_1.UserErrorMessage.PASSWORD_TOO_SHORT);
            }
            if (!validationUtils.isEmailValid1(params._email)) {
                errors.push(auth_1.AuthErrorMessage.EMAIL_IS_REQUIRED);
            }
            return errors;
        };
        this.updateUserReqest = (params) => {
            const errors = [];
            if (validationUtils.isBlank(params.username)) {
                errors.push(user_1.UserErrorMessage.USERNAME_IS_REQUIRED);
            }
            return errors;
        };
    }
}
const userValidation = new UserValidation();
exports.default = userValidation;
//# sourceMappingURL=index.js.map