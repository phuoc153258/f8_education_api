"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const course_1 = require("../../../models/course");
const course_2 = __importDefault(require("../course"));
const track_1 = require("../../../models/track");
const trackService = {
    position: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courseModel = yield course_1.Course.findOne({
                _id: mongoose_1.default.Types.ObjectId(id),
            });
            if (!courseModel)
                return Promise.reject(new Error("Course is not exits !!!"));
            const trackModel = yield track_1.Track.find({ courseId: courseModel._id });
            return { courseId: courseModel._id, position: trackModel.length };
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
    create: (track) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const courseModel = yield course_1.Course.findOne({
                _id: mongoose_1.default.Types.ObjectId(track.courseId),
            });
            if (!courseModel)
                return Promise.reject(new Error("Course is not exits !!!"));
            const position = yield trackService.position(courseModel._id);
            if (track.position > position.position)
                return Promise.reject(new Error("Position is not valid !!!"));
            const tracks = yield track_1.Track.find({
                position: { $gte: track.position },
                courseId: courseModel._id,
            });
            tracks.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
                item.position += 1;
                yield item.save();
            }));
            const trackModel = new track_1.Track();
            if (track.title)
                trackModel.title = track.title;
            trackModel.position = track.position;
            trackModel.isPublished = track.isPublished;
            if (track.courseId)
                trackModel.courseId = mongoose_1.default.Types.ObjectId(track.courseId);
            yield trackModel.save();
            return yield course_2.default.detail(courseModel._id);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const trackModel = yield track_1.Track.findOne({
                _id: mongoose_1.default.Types.ObjectId(id),
            });
            if (!trackModel)
                return Promise.reject(new Error("Track is not exits !!!"));
            const courseModel = yield course_1.Course.findOne({
                _id: trackModel.courseId,
            });
            if (!courseModel)
                return Promise.reject(new Error("Course is not exits !!!"));
            const tracks = yield track_1.Track.find({
                position: { $gt: trackModel.position },
                courseId: courseModel._id,
            });
            tracks.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
                item.position -= 1;
                yield item.save();
            }));
            yield trackModel.delete();
            return yield course_2.default.detail(courseModel._id);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
    update: (id, track) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const trackModel = yield track_1.Track.findOne({
                _id: mongoose_1.default.Types.ObjectId(id),
            });
            if (!trackModel)
                return Promise.reject(new Error("Track is not exits !!!"));
            const courseModel = yield course_1.Course.findOne({
                _id: trackModel.courseId,
            });
            if (!courseModel)
                return Promise.reject(new Error("Course is not exits !!!"));
            if (trackModel.position > track.position) {
                const tracks = yield track_1.Track.find({
                    position: { $gte: track.position, $lt: trackModel.position },
                    courseId: courseModel._id,
                });
                tracks.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
                    item.position += 1;
                    yield item.save();
                }));
            }
            else if (trackModel.position < track.position) {
                const tracks = yield track_1.Track.find({
                    position: { $gt: trackModel.position, $lte: track.position },
                    courseId: courseModel._id,
                });
                tracks.forEach((item) => __awaiter(void 0, void 0, void 0, function* () {
                    item.position -= 1;
                    yield item.save();
                }));
            }
            if (track.title)
                trackModel.title = track.title;
            trackModel.position = track.position;
            trackModel.isPublished = track.isPublished;
            if (track.courseId)
                trackModel.courseId = mongoose_1.default.Types.ObjectId(track.courseId);
            yield trackModel.save();
            return yield course_2.default.detail(courseModel._id);
        }
        catch (error) {
            return Promise.reject(error);
        }
    }),
};
exports.default = trackService;
//# sourceMappingURL=index.js.map