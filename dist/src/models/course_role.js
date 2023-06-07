"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course_Role = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_generator_1 = __importDefault(require("mongoose-slug-generator"));
const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");
const Schema = mongoose_1.default.Schema;
const Course_RoleSchema = new Schema({
    content: {
        type: String,
        require: true,
    },
    description: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: "learning_path_1.png",
    },
    name: {
        type: String,
        require: true,
    },
    slug: {
        type: String,
        slug: "name",
        slug_padding_size: 4,
        unique: true,
    },
    isDeleted: {
        type: Boolean,
        default: true,
    },
    deletedAt: {
        type: Date,
        default: new Date(),
    },
    courses: [
        {
            _id: {
                type: mongoose_1.default.Types.ObjectId,
                require: true,
                unique: true,
            },
            courseId: {
                type: mongoose_1.default.Types.ObjectId,
                require: true,
                unique: true,
            },
        },
    ],
}, {
    timestamps: true,
});
Course_RoleSchema.plugin(mongoose_slug_generator_1.default);
Course_RoleSchema.plugin(paginate);
Course_RoleSchema.plugin(aggregatePaginate);
// Course_RoleSchema.index({
//   name: "text",
// });
const model = mongoose_1.default.model("Course_Role", Course_RoleSchema);
exports.Course_Role = model;
//# sourceMappingURL=course_role.js.map