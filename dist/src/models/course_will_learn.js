"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course_Will_Learn = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_generator_1 = __importDefault(require("mongoose-slug-generator"));
const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");
const Schema = mongoose_1.default.Schema;
const Course_Will_LearnSchema = new Schema({
    content: {
        type: String,
        require: true,
    },
    courseId: {
        type: mongoose_1.default.Types.ObjectId,
        require: true,
    },
}, {
    timestamps: true,
});
Course_Will_LearnSchema.plugin(mongoose_slug_generator_1.default);
Course_Will_LearnSchema.plugin(paginate);
Course_Will_LearnSchema.plugin(aggregatePaginate);
// Course_Will_LearnSchema.index({
//   content: "text",
// });
const model = mongoose_1.default.model("Course_Will_Learn", Course_Will_LearnSchema);
exports.Course_Will_Learn = model;
//# sourceMappingURL=course_will_learn.js.map