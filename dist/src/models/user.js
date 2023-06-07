"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../constants/user");
const mongoose_slug_generator_1 = __importDefault(require("mongoose-slug-generator"));
const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");
const Schema = mongoose_1.default.Schema;
const UserSchema = new Schema({
    avatar: {
        type: String,
        default: user_1.AVATAR_DEFAULT,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    email_verified: {
        type: Boolean,
        default: false,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    password: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        default: "",
    },
    type_account: {
        type: String,
        default: "default",
    },
    roleId: {
        type: mongoose_1.default.Types.ObjectId,
        default: "645cb1503d269c7001631c3d",
    },
    slug: {
        type: String,
        slug: "fullname",
        slug_padding_size: 4,
        unique: true,
    },
    fullname: {
        type: String,
        require: true,
    },
    bio: {
        type: String,
        default: "",
    },
    facebook_link: {
        type: String,
        default: "",
    },
    instagram_link: {
        type: String,
        default: "",
    },
    linkedin_link: {
        type: String,
        default: "",
    },
    twitter_link: {
        type: String,
        default: "",
    },
    youtube_link: {
        type: String,
        default: "",
    },
}, { timestamps: true });
UserSchema.plugin(mongoose_slug_generator_1.default);
UserSchema.plugin(paginate);
UserSchema.plugin(aggregatePaginate);
// UserSchema.index({
//   fullname: "text",
//   slug: "text",
//   email: "text",
// });
const model = mongoose_1.default.model("User", UserSchema);
exports.User = model;
//# sourceMappingURL=user.js.map