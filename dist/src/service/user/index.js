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
exports.userService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = __importDefault(require("../../../config/env"));
const CreateUserResponseDTO_1 = __importDefault(require("../../dtos/response/user/CreateUserResponseDTO"));
// import UserResponseDTO from "../../dtos/response/user/UserResponseDTO";
const models_1 = require("../../models");
const queries_1 = require("../../queries");
const auth_1 = require("../../messages/error/auth");
const file_1 = __importDefault(require("../file/file"));
const token_1 = __importDefault(require("../token"));
const user_1 = require("../../messages/error/user");
const user_2 = require("../../messages/success/user");
const course_1 = require("../../models/course");
const userService = {
    get: (slug) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield models_1.User.findOne({ slug: slug }).exec();
            if (!user)
                return Promise.reject(new Error(user_1.UserErrorMessage.USER_NOT_FOUND));
            const courses = yield course_1.Course.aggregate([
                {
                    $lookup: {
                        from: "user_courses",
                        localField: "_id",
                        foreignField: "courseId",
                        as: "user_courses",
                    },
                },
                {
                    $match: {
                        "user_courses.userId": user._id,
                    },
                },
            ]);
            return Promise.resolve({ user, courses });
        }
        catch (err) {
            return Promise.reject(err);
        }
    }),
    list: (options) => __awaiter(void 0, void 0, void 0, function* () {
        const query = {
            is_active: true,
        };
        const users = yield queries_1.userQuery.getAllUser(query, options);
        return Promise.resolve(users);
    }),
    update: (request, userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield models_1.User.findOne({
                _id: new mongoose_1.default.Types.ObjectId(userId),
            });
            if (!user)
                return Promise.reject(new Error(user_1.UserErrorMessage.USER_NOT_FOUND));
            // if (request.first_name) {
            //   user.first_name = request.first_name;
            // }
            // if (request.last_name) {
            //   user.last_name = request.last_name;
            // }
            if (request.avatarUpload) {
                const file = request.avatarUpload;
                const response = yield file_1.default.upload(file);
                if (response) {
                    user.avatar = response.name;
                }
            }
            if (request.email) {
                const emailFound = yield models_1.User.findOne({
                    email: request.email,
                });
                if (emailFound && user.email != request.email) {
                    return Promise.reject(new Error(auth_1.AuthErrorMessage.EMAIL_IS_EXIST));
                }
                user.email = request.email;
            }
            if (request.phone) {
                user.phone = request.phone;
            }
            const userUpdate = yield user.saveAsync();
            // const response = new UserResponseDTO().responseDTO(userUpdate);
            return Promise.resolve(userUpdate);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }),
    deactive: (listUserId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield Promise.all(listUserId.map((userId) => __awaiter(void 0, void 0, void 0, function* () {
                const user = yield models_1.User.findOne({
                    _id: new mongoose_1.default.Types.ObjectId(userId),
                });
                if (!user)
                    return Promise.reject(new Error(user_1.UserErrorMessage.USER_NOT_FOUND));
                user.is_active = false;
                yield user.saveAsync();
            })));
            return Promise.resolve(user_2.UserSuccessMessage.BLOCK_USER_SUCCESS);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }),
    get_me: (req) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.headers.authorization.split(" ")[1].trim();
            const info = token_1.default.verifyToken(token, env_1.default.jwt.secret);
            const query = {
                _id: new mongoose_1.default.Types.ObjectId(info._id),
                is_active: true,
            };
            const user = yield queries_1.userQuery.getById(query);
            if (!user)
                return Promise.reject(new Error(user_1.UserErrorMessage.USER_NOT_FOUND));
            // const response = new UserResponseDTO().responseDTO(user);
            return Promise.resolve(user);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }),
    importListUser: (listUser) => __awaiter(void 0, void 0, void 0, function* () {
        // try {
        //   let canImport = true;
        //   await Promise.all(
        //     listUser.map(async (user) => {
        //       const userFound = await User.findOne({ username: user.username });
        //       if (userFound) {
        //         canImport = false;
        //         return Promise.reject(
        //           new Error(AuthErrorMessage.USERNAME_IS_EXIST)
        //         );
        //       }
        //     })
        //   );
        //   if (canImport) {
        //     await Promise.all(
        //       listUser.map(async (user, index) => {
        //         await userService.create(user, index);
        //       })
        //     );
        //     return Promise.resolve(UserSuccessMessage.IMPORT_LIST_USER_SUCCESS);
        //   }
        // } catch (err) {
        //   return Promise.reject(err);
        // }
    }),
    create: (request, userCount) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userFound = yield models_1.User.findOne({
                email: request._email,
            });
            if (userFound) {
                throw new Error(auth_1.AuthErrorMessage.EMAIL_IS_EXIST);
            }
            // const userCountCurrent = userCount
            //   ? (await User.countDocuments()) + 1 + userCount
            //   : (await User.countDocuments()) + 1;
            // Register success
            const newUserDTO = new CreateUserResponseDTO_1.default().toJSON(request);
            const newUser = Object.assign({}, newUserDTO);
            const user = new models_1.User(newUser);
            const userSave = yield user.saveAsync();
            // const response = new UserResponseDTO().responseDTO(userSave);
            return Promise.resolve(userSave);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }),
    updateCurrentUser: (user, body, files) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const currentUser = yield models_1.User.findOne({
                _id: new mongoose_1.default.Types.ObjectId(user._id),
            });
            if (!currentUser)
                return Promise.reject(new Error(user_1.UserErrorMessage.USER_NOT_FOUND));
            if (body.fullname) {
                currentUser.fullname = body.fullname;
            }
            if (body.bio) {
                currentUser.bio = body.bio;
            }
            if (body.phone) {
                currentUser.phone = body.phone;
            }
            if (body.facebook_link) {
                currentUser.facebook_link = body.facebook_link;
            }
            if (body.instagram_link) {
                currentUser.instagram_link = body.instagram_link;
            }
            if (body.linkedin_link) {
                currentUser.linkedin_link = body.linkedin_link;
            }
            if (body.twitter_link) {
                currentUser.twitter_link = body.twitter_link;
            }
            if (body.youtube_link) {
                currentUser.youtube_link = body.youtube_link;
            }
            if (files) {
                const response = yield file_1.default.upload(files);
                if (response.avatar)
                    currentUser.avatar = response.avatar;
            }
            const userUpdate = yield currentUser.save();
            return Promise.resolve(userUpdate);
        }
        catch (err) {
            return Promise.reject(err);
        }
    }),
};
exports.userService = userService;
//# sourceMappingURL=index.js.map