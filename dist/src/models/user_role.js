"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User_Role = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_generator_1 = __importDefault(require("mongoose-slug-generator"));
const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");
const Schema = mongoose_1.default.Schema;
const User_RoleSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    level: {
        type: Number,
        require: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        require: true,
    },
}, {
    timestamps: true,
});
User_RoleSchema.plugin(mongoose_slug_generator_1.default);
User_RoleSchema.plugin(paginate);
User_RoleSchema.plugin(aggregatePaginate);
// User_RoleSchema.index({
//   name: "text",
// });
const model = mongoose_1.default.model("User_Role", User_RoleSchema);
exports.User_Role = model;
//# sourceMappingURL=user_role.js.map