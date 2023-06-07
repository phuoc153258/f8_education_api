"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course_Level = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_generator_1 = __importDefault(require("mongoose-slug-generator"));
const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");
const Schema = mongoose_1.default.Schema;
const Course_LevelSchema = new Schema({
    level: {
        type: Number,
        require: true,
    },
    name: {
        type: String,
        require: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: new Date(),
    },
}, {
    timestamps: true,
});
Course_LevelSchema.plugin(mongoose_slug_generator_1.default);
Course_LevelSchema.plugin(paginate);
Course_LevelSchema.plugin(aggregatePaginate);
// Course_LevelSchema.index({
//   name: "text",
// });
const model = mongoose_1.default.model("Course_Level", Course_LevelSchema);
exports.Course_Level = model;
//# sourceMappingURL=course_level.js.map