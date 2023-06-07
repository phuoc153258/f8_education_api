"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User_Course = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_generator_1 = __importDefault(require("mongoose-slug-generator"));
const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");
const Schema = mongoose_1.default.Schema;
const User_CourseSchema = new Schema({
    userId: {
        type: mongoose_1.default.Types.ObjectId,
        require: true,
    },
    courseId: {
        type: mongoose_1.default.Types.ObjectId,
        require: true,
    },
    indexVideo: {
        type: Number,
        require: true,
    },
    lessonCompleted: [
        {
            _id: {
                type: mongoose_1.default.Types.ObjectId,
                require: true,
            },
            stepId: {
                type: mongoose_1.default.Types.ObjectId,
                require: true,
            },
        },
    ],
});
User_CourseSchema.plugin(mongoose_slug_generator_1.default);
User_CourseSchema.plugin(paginate);
User_CourseSchema.plugin(aggregatePaginate);
// User_CourseSchema.index({
//   userId: "text",
// });
const model = mongoose_1.default.model("User_Course", User_CourseSchema);
exports.User_Course = model;
//# sourceMappingURL=user_course.js.map