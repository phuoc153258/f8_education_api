"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Step = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_generator_1 = __importDefault(require("mongoose-slug-generator"));
const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");
const Schema = mongoose_1.default.Schema;
const StepSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    duration: {
        type: Number,
        default: 0,
    },
    imageUrl: {
        type: String,
        require: true,
    },
    videoUrl: {
        type: String,
        require: true,
    },
    trackId: {
        type: mongoose_1.default.Types.ObjectId,
        require: true,
        ref: "Track",
    },
    position: {
        type: Number,
        require: true,
    },
    description: {
        type: String,
        default: `<p>Tham gia các cộng đồng để cùng học hỏi, chia sẻ và "thám thính" xem F8 sắp có gì mới nhé!</p> <ul> <li>Fanpage: <a href="https://www.facebook.com/f8vnofficial" target="_blank" rel="noreferrer">https://www.facebook.com/f8vnofficial</a></li> <li>Group: <a href="https://www.facebook.com/groups/649972919142215" target="_blank" rel="noreferrer">https://www.facebook.com/groups/649972919142215</a></li> <li>Youtube: <a href="/external-url?continue=https%3A%2F%2Fwww.youtube.com%2FF8VNOfficial" target="_blank" rel="noreferrer">https://www.youtube.com/F8VNOfficial</a></li> <li>Sơn Đặng: <a href="/external-url?continue=https%3A%2F%2Fwww.facebook.com%2Fsondnf8" target="_blank" rel="noreferrer">https://www.facebook.com/sondnf8</a></li> </ul>`,
    },
    isPublished: {
        type: Boolean,
        default: true,
    },
    publishedAt: {
        type: Date,
        default: new Date(),
    },
}, {
    timestamps: true,
});
StepSchema.plugin(mongoose_slug_generator_1.default);
StepSchema.plugin(paginate);
StepSchema.plugin(aggregatePaginate);
// StepSchema.index({
//   title: "text",
// });
const model = mongoose_1.default.model("Step", StepSchema);
exports.Step = model;
//# sourceMappingURL=step.js.map