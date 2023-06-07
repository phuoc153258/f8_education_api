"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_generator_1 = __importDefault(require("mongoose-slug-generator"));
const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");
const Schema = mongoose_1.default.Schema;
const CourseSchema = new Schema({
    title: {
        type: String,
        require: true,
        unique: true,
    },
    description: {
        type: String,
        require: true,
    },
    slug: {
        type: String,
        slug: "title",
        slug_padding_size: 4,
        unique: true,
    },
    image: {
        type: String,
        default: "course_image_1.png",
    },
    icon: {
        type: String,
        default: "course_icon_1.png",
    },
    studentCount: {
        type: Number,
        default: 0,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: new Date(),
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
    publishedAt: {
        type: Date,
        default: new Date(),
    },
    levelId: {
        type: mongoose_1.default.Types.ObjectId,
        default: "6368c48e06944445dfaf62c4",
    },
    isPro: {
        type: Boolean,
        default: false,
    },
    price: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
CourseSchema.plugin(mongoose_slug_generator_1.default);
CourseSchema.plugin(paginate);
CourseSchema.plugin(aggregatePaginate);
// CourseSchema.index({
//   title: "text",
// });
const model = mongoose_1.default.model("Course", CourseSchema);
exports.Course = model;
//# sourceMappingURL=course.js.map