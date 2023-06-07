"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Track = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_slug_generator_1 = __importDefault(require("mongoose-slug-generator"));
const paginate = require("./plugins/paginate");
const aggregatePaginate = require("./plugins/aggregatePaginate");
const Schema = mongoose_1.default.Schema;
const TrackSchema = new Schema({
    title: {
        type: String,
        require: true,
    },
    position: {
        type: Number,
        require: true,
    },
    courseId: {
        type: mongoose_1.default.Types.ObjectId,
        require: true,
        ref: "Course",
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
}, {
    timestamps: true,
});
TrackSchema.plugin(mongoose_slug_generator_1.default);
TrackSchema.plugin(paginate);
TrackSchema.plugin(aggregatePaginate);
// TrackSchema.index({
//   title: "text",
// });
const model = mongoose_1.default.model("Track", TrackSchema);
exports.Track = model;
//# sourceMappingURL=track.js.map