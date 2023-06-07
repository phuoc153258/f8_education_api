"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course_Requirement = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_generator_1 = __importDefault(require("mongoose-slug-generator"));
const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");
const Schema = mongoose_1.default.Schema;
const Course_RequirementSchema = new Schema({
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
Course_RequirementSchema.plugin(mongoose_slug_generator_1.default);
Course_RequirementSchema.plugin(paginate);
Course_RequirementSchema.plugin(aggregatePaginate);
// Course_RequirementSchema.index({
//   content: "text",
// });
const model = mongoose_1.default.model("Course_Requirement", Course_RequirementSchema);
exports.Course_Requirement = model;
//# sourceMappingURL=course_requirement.js.map