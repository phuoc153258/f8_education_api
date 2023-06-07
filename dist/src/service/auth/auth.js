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
exports.authService = void 0;
const UserResponseDTO_1 = __importDefault(require("../../dtos/response/user/UserResponseDTO"));
const HashFunction_1 = __importDefault(require("../../helpers/HashFunction"));
const user_1 = require("../../models/user");
const user_2 = require("../user");
const auth_1 = require("../../messages/error/auth");
const index_1 = require("../../models/index");
const mongoose_1 = require("mongoose");
const auth_2 = require("../../messages/success/auth");
const index_2 = require("../../messages/error/base/index");
const authService = {
    login: (loginRequestDTO) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // Check user is in DB
            const user = yield user_1.User.findOne({
                email: loginRequestDTO.email,
            });
            if (!user)
                return Promise.reject(new mongoose_1.Error(auth_1.AuthErrorMessage.EMAIL_IS_NOT_EXIST));
            // Check user is active ( block or not block )
            if (!user.is_active)
                return Promise.reject(new mongoose_1.Error(auth_1.AuthErrorMessage.ACCOUNT_IS_LOCK));
            // Check password is correct
            if (user.type_account !== "default")
                return Promise.reject(new mongoose_1.Error(index_2.BaseErrorMessage.SOME_THING_WENT_WRONG));
            const isValid = HashFunction_1.default.verify(loginRequestDTO.password, user.password);
            if (!isValid)
                return Promise.reject(new mongoose_1.Error(auth_1.AuthErrorMessage.PASSWORD_NOT_MATCH));
            // Login success
            const response = new UserResponseDTO_1.default().responseDTO(user);
            return response;
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
    register: (registerRequestDTO) => __awaiter(void 0, void 0, void 0, function* () {
        //Check username is exist in DB
        const response = yield user_2.userService.create(registerRequestDTO);
        return response;
    }),
    resetPassword: (resetPasswordDTO) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield user_1.User.findOne({ email: resetPasswordDTO._email });
            if (!user)
                return Promise.reject(new mongoose_1.Error(auth_1.AuthErrorMessage.EMAIL_IS_NOT_EXIST));
            user.password = yield HashFunction_1.default.generate(resetPasswordDTO._password);
            user.save();
            yield index_1.OTP.deleteOne({ email: resetPasswordDTO._email });
            return Promise.resolve(auth_2.AuthSuccessMessage.RESET_PASSWORD_SUCCESS);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
};
exports.authService = authService;
//# sourceMappingURL=auth.js.map